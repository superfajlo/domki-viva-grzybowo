import { COTTAGES } from "@/lib/site";

export function DomkiSection() {
  return (
    <section id="domki" className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Domki w Grzybowie nad morzem</h2>
        <p className="section-lead">
          Oferujemy noclegi w Grzybowie w domkach letniskowych dla 2, 3, 4 i 5 osób – każdy z
          własnym aneksem kuchennym, łazienką i bogatym wyposażeniem. Idealne na rodzinne
          wakacje nad Bałtykiem, blisko plaży i Kołobrzegu.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {COTTAGES.map((cottage) => (
            <article
              key={cottage.title}
              className="group flex flex-col rounded-2xl border border-sand-dark bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="icon-gold-bg mb-4 h-12 w-12 rounded-xl text-2xl">
                🏡
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{cottage.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {cottage.description}
              </p>
              <ul className="mt-4 space-y-2 border-t border-sand pt-4 text-sm text-ink">
                {cottage.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-secondary" aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
