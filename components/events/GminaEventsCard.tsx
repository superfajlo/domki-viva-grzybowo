import { GMINA_EVENTS_URL } from "@/lib/site";

type GminaEventsCardProps = {
  className?: string;
  compact?: boolean;
};

export function GminaEventsCard({ className = "", compact = false }: GminaEventsCardProps) {
  return (
    <article
      className={`premium-frame group ${className}`.trim()}
    >
      <div className="premium-frame-inner bg-gradient-to-br from-surface via-surface to-primary/5 p-6 sm:p-8">
        <div
          className={
            compact
              ? "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
              : "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          }
        >
          <div className="max-w-xl">
            <span className="icon-gold-bg h-14 w-14 rounded-2xl text-3xl" aria-hidden>
              📅
            </span>
            <h3
              className={`mt-4 font-display font-bold text-ink ${
                compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
              }`}
            >
              Wydarzenia w Gminie Kołobrzeg
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              Oficjalny kalendarz imprez, festynów i wydarzeń sezonowych w gminie – w tym Grzybowie
              i okolicy. Źródło:{" "}
              <span className="font-medium text-ink">gmina.kolobrzeg.pl</span>
            </p>
          </div>
          <a
            href={GMINA_EVENTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta shrink-0 text-center"
          >
            Sprawdź wydarzenia
          </a>
        </div>
      </div>
    </article>
  );
}
