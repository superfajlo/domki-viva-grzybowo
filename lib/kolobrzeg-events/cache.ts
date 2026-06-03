import fs from "fs/promises";
import os from "os";
import path from "path";
import { EVENTS_CACHE_TTL_MS, KOLOBRZEG_EVENT_SOURCES } from "./constants";
import { scrapeKolobrzegEvents } from "./scraper";
import type { EventsApiResponse, EventsCachePayload } from "./types";

/** Vercel maxDuration 60s – zapas na scraping 7 kategorii równolegle. */
const SCRAPE_TIMEOUT_MS = 55_000;

let memoryCache: EventsCachePayload | null = null;
let refreshPromise: Promise<EventsCachePayload> | null = null;

function getOptionalDiskCachePath(): string | null {
  if (process.env.VERCEL === "1") {
    return "/tmp/events-cache/kolobrzeg-events.json";
  }
  return path.join(os.tmpdir(), "domki-viva-kolobrzeg-events.json");
}

async function readDiskCache(): Promise<EventsCachePayload | null> {
  const file = getOptionalDiskCachePath();
  if (!file) return null;
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as EventsCachePayload;
    return parsed.events?.length ? parsed : null;
  } catch {
    return null;
  }
}

async function writeDiskCache(payload: EventsCachePayload): Promise<void> {
  if (!payload.events.length) return;
  const file = getOptionalDiskCachePath();
  if (!file) return;
  try {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(payload), "utf8");
  } catch {
    /* pamięć wystarczy */
  }
}

function setMemoryCache(payload: EventsCachePayload): EventsCachePayload {
  memoryCache = payload;
  return payload;
}

function isExpired(payload: EventsCachePayload): boolean {
  return Date.now() > new Date(payload.expiresAt).getTime();
}

function isValidCache(payload: EventsCachePayload | null): payload is EventsCachePayload {
  return Boolean(payload?.events?.length);
}

function emptyPayload(error?: string): EventsCachePayload {
  const now = new Date();
  return {
    fetchedAt: now.toISOString(),
    expiresAt: now.toISOString(),
    events: [],
    sources: KOLOBRZEG_EVENT_SOURCES.map((s) => ({ id: s.id, label: s.label, count: 0 })),
    error,
  };
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Przekroczono czas pobierania wydarzeń. Spróbuj ponownie za chwilę.")),
      ms,
    );
    promise
      .then((v) => {
        clearTimeout(timer);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(timer);
        reject(e);
      });
  });
}

function buildPayload(events: Awaited<ReturnType<typeof scrapeKolobrzegEvents>>): EventsCachePayload {
  const fetchedAt = new Date();
  const counts = {} as Record<string, number>;
  for (const s of KOLOBRZEG_EVENT_SOURCES) counts[s.id] = 0;
  for (const e of events) counts[e.categoryId]++;

  return {
    fetchedAt: fetchedAt.toISOString(),
    expiresAt: new Date(fetchedAt.getTime() + EVENTS_CACHE_TTL_MS).toISOString(),
    events,
    sources: KOLOBRZEG_EVENT_SOURCES.map((s) => ({
      id: s.id,
      label: s.label,
      count: counts[s.id],
    })),
  };
}

async function refreshCache(): Promise<EventsCachePayload> {
  try {
    const events = await withTimeout(
      scrapeKolobrzegEvents({ includeLocations: true }),
      SCRAPE_TIMEOUT_MS,
    );

    if (!events.length) {
      const previous = memoryCache || (await readDiskCache());
      if (isValidCache(previous)) {
        return setMemoryCache({ ...previous, error: "Brak aktualnych wydarzeń w kalendarzu." });
      }
      return setMemoryCache(
        emptyPayload("Nie znaleziono aktualnych wydarzeń na i-kolobrzeg.pl."),
      );
    }

    const payload = buildPayload(events);
    await writeDiskCache(payload);
    return setMemoryCache(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Nie udało się pobrać wydarzeń.";
    const previous = memoryCache || (await readDiskCache());
    if (isValidCache(previous)) {
      return setMemoryCache({ ...previous, error: message });
    }
    return setMemoryCache(emptyPayload(message));
  }
}

export async function getKolobrzegEventsCache(force = false): Promise<EventsCachePayload> {
  if (!force && isValidCache(memoryCache) && !isExpired(memoryCache!)) {
    return memoryCache!;
  }

  const diskCache = await readDiskCache();
  if (!force && isValidCache(diskCache) && !isExpired(diskCache)) {
    return setMemoryCache(diskCache);
  }

  if (!refreshPromise) {
    refreshPromise = refreshCache().finally(() => {
      refreshPromise = null;
    });
  }

  const result = await refreshPromise;

  if (isValidCache(result)) {
    return result;
  }

  if (isValidCache(diskCache)) {
    return setMemoryCache(diskCache);
  }

  return result;
}

export function toApiResponse(payload: EventsCachePayload, stale = false): EventsApiResponse {
  return {
    events: payload.events ?? [],
    fetchedAt: payload.fetchedAt,
    expiresAt: payload.expiresAt,
    stale,
    error: payload.error,
    sourceNote: "Dane z kalendarza UM Kołobrzeg (i-kolobrzeg.pl). Odświeżane automatycznie co 4 godziny.",
  };
}
