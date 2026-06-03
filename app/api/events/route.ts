import { getKolobrzegEventsCache, toApiResponse } from "@/lib/kolobrzeg-events/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SOURCE_NOTE =
  "Dane z kalendarza UM Kołobrzeg (i-kolobrzeg.pl) oraz wydarzenia gminy (gmina.kolobrzeg.pl). Odświeżane co 4 godziny.";

export async function GET(request: Request) {
  const force = new URL(request.url).searchParams.get("refresh") === "1";

  try {
    const cache = await getKolobrzegEventsCache(force);
    const stale = Date.now() > new Date(cache.expiresAt).getTime();
    const body = toApiResponse(cache, stale);

    return NextResponse.json(
      {
        events: body.events ?? [],
        fetchedAt: body.fetchedAt ?? new Date().toISOString(),
        expiresAt: body.expiresAt ?? new Date().toISOString(),
        stale: body.stale ?? false,
        error: body.error ?? undefined,
        sourceNote: body.sourceNote ?? SOURCE_NOTE,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Nie udało się załadować wydarzeń z Kołobrzegu.";
    return NextResponse.json(
      {
        events: [],
        fetchedAt: new Date().toISOString(),
        expiresAt: new Date().toISOString(),
        stale: false,
        error: message,
        sourceNote: SOURCE_NOTE,
      },
      { status: 200 },
    );
  }
}
