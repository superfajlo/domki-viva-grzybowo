import { EventsExplorer } from "@/components/events/EventsExplorer";
import { getKolobrzegEventsCache, toApiResponse } from "@/lib/kolobrzeg-events/server";

export async function WydarzeniaEventsLoader() {
  let initialData = null;
  try {
    const cache = await getKolobrzegEventsCache();
    if (cache.events.length > 0) {
      initialData = toApiResponse(cache);
    }
  } catch {
    initialData = null;
  }

  return <EventsExplorer initialData={initialData} />;
}
