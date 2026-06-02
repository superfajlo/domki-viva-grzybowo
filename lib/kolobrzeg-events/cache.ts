import fs from "fs/promises";
import path from "path";
import { EVENTS_CACHE_TTL_MS, KOLOBRZEG_EVENT_SOURCES } from "./constants";
import { scrapeKolobrzegEvents, countByCategory } from "./scraper";
import type { EventsApiResponse, EventsCachePayload } from "./types";

const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "kolobrzeg-events.json");

let memoryCache: EventsCachePayload | null = null;
let refreshPromise: Promise<EventsCachePayload> | null = null;

async function readCacheFile(): Promise<EventsCachePayload | null> {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf8");
    return JSON.parse(raw) as EventsCachePayload;
  } catch {
    return null;
  }
}

async function writeCacheFile(payload: EventsCachePayload): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(CACHE_FILE, JSON.stringify(payload), "utf8");
  memoryCache = payload;
}

function isExpired(payload: EventsCachePayload): boolean {
  return Date.now() > new Date(payload.expiresAt).getTime();
}

async function refreshCache(): Promise<EventsCachePayload> {
  const fetchedAt = new Date();
  try {
    const events = await scrapeKolobrzegEvents();
    const counts = countByCategory(events);
    const payload: EventsCachePayload = {
      fetchedAt: fetchedAt.toISOString(),
      expiresAt: new Date(fetchedAt.getTime() + EVENTS_CACHE_TTL_MS).toISOString(),
      events,
      sources: KOLOBRZEG_EVENT_SOURCES.map((s) => ({
        id: s.id,
        label: s.label,
        count: counts[s.id],
      })),
    };
    await writeCacheFile(payload);
    return payload;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Nie udało się pobrać wydarzeń.";
    const previous = memoryCache || (await readCacheFile());
    const payload: EventsCachePayload = {
      fetchedAt: previous?.fetchedAt ?? fetchedAt.toISOString(),
      expiresAt: previous?.expiresAt ?? fetchedAt.toISOString(),
      events: previous?.events ?? [],
      sources: previous?.sources ?? [],
      error: message,
    };
    if (previous?.events.length) {
      memoryCache = payload;
      return payload;
    }
    throw err;
  }
}

export async function getKolobrzegEventsCache(force = false): Promise<EventsCachePayload> {
  if (!force && memoryCache && !isExpired(memoryCache)) {
    return memoryCache;
  }

  const fileCache = await readCacheFile();
  if (!force && fileCache && !isExpired(fileCache)) {
    memoryCache = fileCache;
    return fileCache;
  }

  if (!refreshPromise) {
    refreshPromise = refreshCache().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
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
