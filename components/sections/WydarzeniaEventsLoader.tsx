import { EventsExplorer } from "@/components/events/EventsExplorer";

/** Wydarzenia ładują się po stronie klienta (/api/events) – bez blokowania SSR. */
export function WydarzeniaEventsLoader() {
  return <EventsExplorer />;
}
