import { EventsExplorerSkeleton } from "@/components/events/EventsExplorerSkeleton";

export default function WydarzeniaLoading() {
  return (
    <div className="section-padding bg-cream">
      <div className="page-container mx-auto max-w-7xl">
        <div className="h-8 w-64 max-w-full animate-pulse rounded-lg bg-sand" />
        <div className="mt-3 h-4 w-full max-w-2xl animate-pulse rounded bg-sand" />
        <EventsExplorerSkeleton />
      </div>
    </div>
  );
}
