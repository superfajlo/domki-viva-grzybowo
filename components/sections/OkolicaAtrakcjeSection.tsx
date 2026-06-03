import { CameraIcon } from "@/components/icons/CameraIcon";
import { GrzybowoMap } from "@/components/GrzybowoMap";
import {
  AREA_ATTRACTIONS,
  AREA_SEO_PHRASES,
  BEACH_LIVE_CAMERA_URL,
  KOLOBRZEG_360_URL,
} from "@/lib/site";

const ATTRACTION_ICONS: Record<string, string> = {
  "Szeroka plaża w Grzybowie": "🏖️",
  Kołobrzeg: "🏙️",
  "Port morski": "⚓",
  "Latarnia morska": "🗼",
  Molo: "🌊",
  "Rejsy wycieczkowe": "⛵",
  "Trasy rowerowe": "🚴",
  "Atrakcje dla dzieci": "🎠",
  "Restauracje i smażalnie": "🍽️",
  "Turystyka rodzinna": "👨‍👩‍👧‍👦",
  "Wydarzenia sezonowe": "🎪",
  "Spacery nad morzem": "🌅",
};

export function OkolicaAtrakcjeSection() {
  return (
    <section id="atrakcje-okolicy" className="section-padding bg-cream !pt-0">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-title">Atrakcje Grzybowa, Kołobrzegu i Bałtyku</h1>
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

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {AREA_ATTRACTIONS.map((place) => (
            <article
              key={place.title}
              className="group rounded-2xl border border-sand-dark bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-3xl" aria-hidden>
                {ATTRACTION_ICONS[place.title] ?? "◆"}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{place.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{place.description}</p>
            </article>
          ))}
        </div>

        {/* Kamera na żywo – plaża */}
        <article className="premium-frame relative mt-12 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent-glow" aria-hidden />
          <div className="premium-frame-inner bg-gradient-to-br from-surface via-surface to-primary/5 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="icon-gold-bg h-14 w-14 rounded-2xl">
                  <CameraIcon className="h-7 w-7 text-secondary" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                  <span aria-hidden>🎥 </span>
                  Kamera na żywo – Plaża w Grzybowie
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                  Sprawdź aktualny widok na plażę w Grzybowie dzięki kamerze online. Zobacz
                  pogodę, stan morza i atmosferę nad Bałtykiem bez wychodzenia z domu.
                </p>
              </div>
              <a
                href={BEACH_LIVE_CAMERA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta inline-flex shrink-0 items-center gap-2"
              >
                <CameraIcon className="h-5 w-5" />
                Zobacz transmisję na żywo
              </a>
            </div>
          </div>
        </article>

        {/* Kołobrzeg 360° */}
        <article className="premium-frame mt-12">
          <div className="premium-frame-inner p-8 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <span className="icon-gold-bg h-14 w-14 rounded-2xl text-3xl">🌐</span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                  Kołobrzeg 360°
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                  Zobacz panoramę Kołobrzegu oraz najciekawsze miejsca regionu w widoku 360°
                  jeszcze przed przyjazdem. Poznaj{" "}
                  <strong className="font-medium text-ink">Kołobrzeg 360</strong> i zaplanuj
                  wycieczki z Grzybowa.
                </p>
              </div>
              <a
                href={KOLOBRZEG_360_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta shrink-0"
              >
                Otwórz Kołobrzeg 360°
              </a>
            </div>
          </div>
        </article>

        {/* Mapa Grzybowa i okolic */}
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
