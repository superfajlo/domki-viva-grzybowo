import { KOLOBRZEG_EVENT_SOURCES, KOLOBRZEG_EVENTS_BASE } from "@/lib/kolobrzeg-events/constants";

const CATEGORY_ICONS: Record<string, string> = {
  concerts: "🎵",
  cinema: "🎬",
  sport: "⚽",
  culture: "🎭",
  library: "📚",
  theatre: "🎪",
  standup: "🎤",
};

export function EventCategoryFallback() {
  return (
    <div className="mt-10">
      <p className="rounded-2xl border border-secondary/30 bg-primary/10 px-5 py-4 text-center text-sm text-ink sm:text-base">
        Aktualne wydarzenia możesz sprawdzić bezpośrednio w wybranej kategorii.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {KOLOBRZEG_EVENT_SOURCES.map((source) => (
          <li key={source.id}>
            <article className="flex h-full flex-col rounded-2xl border border-sand-dark bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md">
              <div className="flex items-start gap-3">
                <span
                  className="icon-gold-bg h-12 w-12 shrink-0 text-xl"
                  aria-hidden
                >
                  {CATEGORY_ICONS[source.id] ?? "📅"}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{source.label}</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    Kalendarz wydarzeń w Kołobrzegu – oficjalne źródło i-kolobrzeg.pl
                  </p>
                </div>
              </div>
              <a
                href={`${KOLOBRZEG_EVENTS_BASE}${source.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-outline mt-5 w-full text-center sm:w-auto"
              >
                Sprawdź wydarzenia
              </a>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
