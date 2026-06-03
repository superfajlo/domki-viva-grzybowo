import fs from "fs/promises";
import os from "os";
import path from "path";
import { EVENTS_CACHE_TTL_MS, KOLOBRZEG_EVENT_SOURCES } from "./constants";
import { scrapeKolobrzegEvents } from "./scraper";
import type { EventsApiResponse, EventsCachePayload } from "./types";

const SCRAPE_TIMEOUT_MS = 45_000;

/** Cache w pamięci – główny store (działa na Vercel/serverless). */
let memoryCache: EventsCachePayload | null = null;
let refreshPromise: Promise<EventsCachePayload> | null = null;

/**
 * Opcjonalny zapis na dysk tylko w katalogu zapisywalnym (nigdy .cache w projekcie).
 * Na Vercel: /tmp/events-cache. Lokalnie: katalog tymczasowy OS.
 */
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
    return JSON.parse(raw) as EventsCachePayload;
  } catch {
    return null;
  }
}

async function writeDiskCache(payload: EventsCachePayload): Promise<void> {
  const file = getOptionalDiskCachePath();
  if (!file) return;
  try {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(payload), "utf8");
  } catch {
    /* Tylko pamięć – brak crasha na read-only FS */
  }
}

function setMemoryCache(payload: EventsCachePayload): EventsCachePayload {
  memoryCache = payload;
  return payload;
}

function isExpired(payload: EventsCachePayload): boolean {
  return Date.now() > new Date(payload.expiresAt).getTime();
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
    const timer = setTimeout(() => reject(new Error("Przekroczono czas pobierania wydarzeń.")), ms);
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
      scrapeKolobrzegEvents({ includeLocations: false }),
      SCRAPE_TIMEOUT_MS,
    );
    const payload = buildPayload(events);
    await writeDiskCache(payload);
    return setMemoryCache(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Nie udało się pobrać wydarzeń.";
    const previous = memoryCache || (await readDiskCache());
    if (previous?.events.length) {
      return setMemoryCache({ ...previous, error: message });
    }
    return setMemoryCache(emptyPayload(message));
  }
}

export async function getKolobrzegEventsCache(force = false): Promise<EventsCachePayload> {
  if (!force && memoryCache && !isExpired(memoryCache) && memoryCache.events.length > 0) {
    return memoryCache;
  }

  const diskCache = await readDiskCache();
  if (!force && diskCache && !isExpired(diskCache) && diskCache.events.length > 0) {
    return setMemoryCache(diskCache);
  }

  // Stale – zwróć od razu, odśwież w tle (bez blokowania odpowiedzi)
  if (!force) {
    const stale = memoryCache?.events.length ? memoryCache : diskCache;
    if (stale?.events.length) {
      setMemoryCache(stale);
      if (!refreshPromise) {
        refreshPromise = refreshCache().finally(() => {
          refreshPromise = null;
        });
      }
      return stale;
    }
  }

  if (!refreshPromise) {
    refreshPromise = refreshCache().finally(() => {
      refreshPromise = null;
    });
  }

  const result = await refreshPromise;

  if (result.events.length > 0) {
    return result;
  }

  if (diskCache?.events.length) {
    return setMemoryCache(diskCache);
  }

  return result;
}

export function toApiResponse(payload: EventsCachePayload, stale = false): EventsApiResponse {
  return {
    events: payload.events,
    fetchedAt: payload.fetchedAt,
    expiresAt: payload.expiresAt,
    stale,
    error: payload.error,
    sourceNote: "Dane z kalendarza UM Kołobrzeg (i-kolobrzeg.pl). Odświeżane automatycznie co 4 godziny.",
  };
}
