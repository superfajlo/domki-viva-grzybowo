/**
 * Test cache bez zapisu do .cache (symulacja Vercel).
 * VERCEL=1 node scripts/test-events-cache.mjs
 */
process.env.VERCEL = "1";

const { getKolobrzegEventsCache, toApiResponse } = await import(
  "../lib/kolobrzeg-events/cache.ts"
);

try {
  const cache = await getKolobrzegEventsCache(true);
  const res = toApiResponse(cache);
  console.log("OK events:", res.events.length, "error:", res.error ?? "none");
  process.exit(res.events.length > 0 || !res.error ? 0 : 1);
} catch (e) {
  console.error("FAIL", e);
  process.exit(1);
}
