import { AttractionCard } from "@/components/attractions/AttractionCard";
import { GrzybowoMap } from "@/components/GrzybowoMap";
import { AREA_ATTRACTIONS } from "@/lib/area-attractions";
import { AREA_SEO_PHRASES, GMINA_EVENTS_URL } from "@/lib/site";

export function OkolicaAtrakcjeSection() {
  return (
    <section id="atrakcje-okolicy" className="section-padding bg-cream !pt-0">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-title">Atrakcje okolicy Grzybowo i Kołobrzeg</h1>
        <p className="section-lead">
          Grzybowo oraz pobliski Kołobrzeg oferują szerokie plaże, rodzinne atrakcje, liczne
          wydarzenia sezonowe oraz wiele możliwości aktywnego wypoczynku nad Bałtykiem.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
          Szukacie inspiracji na{" "}
          <strong className="font-medium text-ink">wakacje Grzybowo</strong> i zastanawiacie się,{" "}
          <strong className="font-medium text-ink">co zobaczyć w Grzybowie</strong> oraz{" "}
          <strong className="font-medium text-ink">co robić w Grzybowie</strong>? Domki Viva to{" "}
          <strong className="font-medium text-ink">noclegi blisko atrakcji</strong> – odkryjcie{" "}
          <strong className="font-medium text-ink">okolicę Grzybowo</strong>,{" "}
          <strong className="font-medium text-ink">atrakcje Grzybowo</strong> i{" "}
          <strong className="font-medium text-ink">atrakcje Kołobrzeg</strong>, a także{" "}
          <strong className="font-medium text-ink">rodzinne atrakcje Grzybowo</strong> oraz{" "}
          <strong className="font-medium text-ink">atrakcje nad Bałtykiem</strong>.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {AREA_ATTRACTIONS.map((attraction) => (
            <li key={attraction.id} className="flex">
              <AttractionCard attraction={attraction} />
            </li>
          ))}
        </ul>

        <article className="premium-frame mt-12">
          <div className="premium-frame-inner bg-gradient-to-br from-surface via-surface to-primary/5 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="icon-gold-bg h-14 w-14 rounded-2xl text-3xl" aria-hidden>
                  📅
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                  Wydarzenia w okolicy
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                  Sprawdź co ciekawego może czekać cię w okolicy. Każdy znajdzie coś dla siebie.
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

        <div id="mapa-grzybowa" className="mt-20 scroll-mt-28">
          <h2 className="section-title">Mapa Grzybowa i okolic</h2>
          <p className="section-lead mt-3">
            Poznaj Grzybowo i najciekawsze miejsca w okolicy
          </p>

          <div className="mt-8">
            <GrzybowoMap />
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Grzybowo i okolice oferują liczne atrakcje, szerokie plaże, ścieżki rowerowe oraz
            łatwy dostęp do Kołobrzegu. Sprawdź rozmieszczenie najważniejszych punktów na
            mapie.
          </p>
        </div>

        <p className="sr-only">{AREA_SEO_PHRASES.join(", ")}</p>
      </div>
    </section>
  );
}
