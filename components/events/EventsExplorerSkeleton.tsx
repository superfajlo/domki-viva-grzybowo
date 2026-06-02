export function EventsExplorerSkeleton() {
  return (
    <div className="mt-10" aria-busy="true" aria-label="Ładowanie wydarzeń">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-11 w-24 animate-pulse rounded-full bg-sand" />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-2xl border border-sand-dark bg-surface"
          >
            <div className="aspect-[16/10] bg-sand" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 rounded bg-sand" />
              <div className="h-4 w-1/2 rounded bg-sand" />
              <div className="h-10 w-full rounded-full bg-sand" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
