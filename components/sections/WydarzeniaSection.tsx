import { EventsExplorerSkeleton } from "@/components/events/EventsExplorerSkeleton";
import { WydarzeniaEventsLoader } from "@/components/sections/WydarzeniaEventsLoader";
import { Suspense } from "react";

export function WydarzeniaSection() {
  return (
    <section id="wydarzenia-kolobrzeg" className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-title">Aktualne wydarzenia w Kołobrzegu</h1>
        <p className="section-lead max-w-3xl">
          Podczas pobytu w Domkach Viva możesz na bieżąco sprawdzać koncerty, wydarzenia
          sportowe, seanse kinowe, spektakle teatralne i inne atrakcje odbywające się w
          Kołobrzegu i okolicy.
        </p>

        <Suspense fallback={<EventsExplorerSkeleton />}>
          <WydarzeniaEventsLoader />
        </Suspense>
      </div>
    </section>
  );
}
