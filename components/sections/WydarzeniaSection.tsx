import { EventsExplorer } from "@/components/events/EventsExplorer";
import { getKolobrzegEventsCache, toApiResponse } from "@/lib/kolobrzeg-events/server";

export async function WydarzeniaSection() {
  let initialData;
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

  return (
    <section id="wydarzenia-kolobrzeg" className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-title">Aktualne wydarzenia w Kołobrzegu</h1>
        <p className="section-lead max-w-3xl">
          Podczas pobytu w Domkach Viva możesz na bieżąco sprawdzać koncerty, wydarzenia
          sportowe, seanse kinowe, spektakle teatralne i inne atrakcje odbywające się w
          Kołobrzegu i okolicy.
        </p>

        <div className="mt-10">
          <EventsExplorer initialData={initialData} />
        </div>
      </div>
    </section>
  );
}
