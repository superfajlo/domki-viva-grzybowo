import { EVENT_CATEGORY_TILES } from "@/lib/event-categories";

export function EventsCategoryTiles() {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {EVENT_CATEGORY_TILES.map((category) => (
        <li key={category.id}>
          <article className="group flex h-full flex-col rounded-2xl border border-sand-dark bg-surface p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md hover:shadow-primary/10 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="icon-gold-bg h-12 w-12 shrink-0 text-xl" aria-hidden>
                {category.icon}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                  {category.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {category.description}
                </p>
              </div>
            </div>
            <a
              href={category.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-outline mt-5 w-full text-center transition group-hover:border-secondary sm:w-auto"
            >
              Sprawdź wydarzenia
            </a>
          </article>
        </li>
      ))}
    </ul>
  );
}
