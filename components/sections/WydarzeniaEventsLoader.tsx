import { EventsExplorer } from "@/components/events/EventsExplorer";
import { getKolobrzegEventsCache, toApiResponse } from "@/lib/kolobrzeg-events/server";
import type { EventsApiResponse } from "@/lib/kolobrzeg-events/types";

export async function WydarzeniaEventsLoader() {
  let initialData: EventsApiResponse;
  try {
    const cache = await getKolobrzegEventsCache();
    initialData = toApiResponse(cache);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Nie udało się załadować wydarzeń z Kołobrzegu.";
    initialData = {
      events: [],
      fetchedAt: new Date().toISOString(),
      expiresAt: new Date().toISOString(),
      error: message,
      sourceNote: "Dane z kalendarza UM Kołobrzeg (i-kolobrzeg.pl).",
    };
  }

  return <EventsExplorer initialData={initialData} />;
}
