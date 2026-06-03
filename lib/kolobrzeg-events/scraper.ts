import {
  KOLOBRZEG_EVENTS_BASE,
  KOLOBRZEG_EVENT_SOURCES,
  type EventSourceId,
} from "./constants";
import type { KolobrzegEvent } from "./types";

const USER_AGENT = "Mozilla/5.0 (compatible; DomkiViva/1.0; +https://domkiviva.pl)";

export function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&oacute;/g, "ó")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${KOLOBRZEG_EVENTS_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

function todayInWarsaw(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Warsaw" });
}

function parsePolishDate(ddmmyyyy: string): string | null {
  const m = ddmmyyyy.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!m) return null;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function buildSortKey(isoDate: string, time?: string): number {
  const [y, mo, d] = isoDate.split("-").map(Number);
  const [hh = 0, mm = 0] = (time || "00:00").split(":").map(Number);
  return new Date(y, mo - 1, d, hh, mm).getTime();
}

function isCurrentOrFuture(isoDate: string, time?: string): boolean {
  const today = todayInWarsaw();
  if (isoDate > today) return true;
  if (isoDate < today) return false;
  if (!time) return true;
  const now = new Date().toLocaleString("en-GB", { timeZone: "Europe/Warsaw", hour12: false });
  const currentTime = now.split(", ")[1]?.slice(0, 5) || "00:00";
  return time >= currentTime;
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} dla ${url}`);
  return res.text();
}

function detectMaxPage(html: string, categoryId: number): number {
  const re = new RegExp(`wydarzenia-kategoria-${categoryId},strona-(\\d+)`, "g");
  let max = 1;
  for (const m of html.matchAll(re)) {
    max = Math.max(max, Number(m[1]));
  }
  return max;
}

function categoryPageUrl(categoryId: number, page: number): string {
  if (page <= 1) return `${KOLOBRZEG_EVENTS_BASE}/wydarzenia-kategoria-${categoryId}.html`;
  return `${KOLOBRZEG_EVENTS_BASE}/wydarzenia-kategoria-${categoryId},strona-${page}.html`;
}

function parseListingBlock(
  block: string,
  source: (typeof KOLOBRZEG_EVENT_SOURCES)[number],
): Omit<KolobrzegEvent, "location"> | null {
  const href = block.match(/href="(\/wydarzenie-[^"]+)"/)?.[1];
  if (!href) return null;

  const titleBlock = block.match(/<span class="title">([\s\S]*?)<\/span>/i)?.[1];
  const title = stripHtml(titleBlock || "");
  if (!title) return null;

  const dateRaw = block.match(/kali_data_od">[\s\S]*?<span>(\d{2}-\d{2}-\d{4})<\/span>/)?.[1];
  const isoDate = dateRaw ? parsePolishDate(dateRaw) : null;
  if (!isoDate) return null;

  const time = block.match(/godz\.<\/span><span>(\d{2}:\d{2})<\/span>/)?.[1];
  if (!isCurrentOrFuture(isoDate, time)) return null;

  const img = block.match(/<img[^>]+src="([^"]+)"/)?.[1];
  const id = href.replace(/[^\w-]+/g, "-").slice(0, 120);

  return {
    id,
    title,
    date: isoDate,
    time,
    category: source.label,
    categoryId: source.id,
    imageUrl: img ? absoluteUrl(img) : undefined,
    detailUrl: absoluteUrl(href),
    sortKey: buildSortKey(isoDate, time),
  };
}

async function fetchEventLocation(detailUrl: string): Promise<string | undefined> {
  try {
    const html = await fetchHtml(detailUrl);
    const raw = html.match(/class="miejsce-adres"[^>]*>([\s\S]*?)<\/div>/i)?.[1];
    if (!raw) return undefined;
    const text = stripHtml(raw).replace(/^MIEJSCE:\s*/i, "").trim();
    return text || undefined;
  } catch {
    return undefined;
  }
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

export type ScrapeOptions = {
  /** Pobieranie adresu z podstrony szczegółów – wolne; domyślnie wyłączone. */
  includeLocations?: boolean;
};

export async function scrapeKolobrzegEvents(
  options: ScrapeOptions = {},
): Promise<KolobrzegEvent[]> {
  const includeLocations = options.includeLocations ?? false;
  const byUrl = new Map<string, KolobrzegEvent>();

  for (const source of KOLOBRZEG_EVENT_SOURCES) {
    const firstHtml = await fetchHtml(categoryPageUrl(source.categoryId, 1));
    const maxPage = detectMaxPage(firstHtml, source.categoryId);

    for (let page = 1; page <= maxPage; page++) {
      const html = page === 1 ? firstHtml : await fetchHtml(categoryPageUrl(source.categoryId, page));
      const blocks = html.match(/<li class="zaj-wrapper"[\s\S]*?<\/li>/g) || [];

      for (const block of blocks) {
        const parsed = parseListingBlock(block, source);
        if (!parsed) continue;
        if (!byUrl.has(parsed.detailUrl)) {
          byUrl.set(parsed.detailUrl, { ...parsed, location: undefined });
        }
      }
    }
  }

  let list = [...byUrl.values()];

  if (includeLocations && list.length > 0) {
    list = await mapPool(list, 4, async (event) => {
      const location = await fetchEventLocation(event.detailUrl);
      return { ...event, location };
    });
  }

  return list.sort((a, b) => a.sortKey - b.sortKey);
}

export function countByCategory(events: KolobrzegEvent[]): Record<EventSourceId, number> {
  const counts = {} as Record<EventSourceId, number>;
  for (const s of KOLOBRZEG_EVENT_SOURCES) counts[s.id] = 0;
  for (const e of events) counts[e.categoryId]++;
  return counts;
}
