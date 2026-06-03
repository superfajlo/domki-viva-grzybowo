import { getKolobrzegEventsCache, toApiResponse } from "@/lib/kolobrzeg-events/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const force = new URL(request.url).searchParams.get("refresh") === "1";

  try {
    const cache = await getKolobrzegEventsCache(force);
    const stale = Date.now() > new Date(cache.expiresAt).getTime();
    const body = toApiResponse(cache, stale);
    return NextResponse.json(body, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Nie udało się załadować wydarzeń z Kołobrzegu.";
    return NextResponse.json(
      {
        events: [],
        fetchedAt: new Date().toISOString(),
        expiresAt: new Date().toISOString(),
        error: message,
        sourceNote: "Dane z kalendarza UM Kołobrzeg (i-kolobrzeg.pl).",
      },
      { status: 200 },
    );
  }
}
