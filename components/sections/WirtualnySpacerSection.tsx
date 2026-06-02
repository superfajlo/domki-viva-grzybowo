"use client";

import {
  KOLOBRZEG_360_URL,
  VIRTUAL_TOUR_SEO_PHRASES,
  VIVA_VIRTUAL_TOUR_URL,
} from "@/lib/site";
import { useState } from "react";

export function WirtualnySpacerSection() {
  const [iframeBlocked, setIframeBlocked] = useState(false);

  return (
    <section
      id="wirtualny-spacer"
      className="section-dark-warm section-padding premium-glow-bg"
      aria-labelledby="wirtualny-spacer-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="wirtualny-spacer-heading" className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Wirtualny spacer
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-cream/90">
          Poznaj obiekt i okolicę jeszcze przed przyjazdem –{" "}
          <strong className="font-semibold text-white">wirtualny spacer Grzybowo</strong> oraz
          panoramę Kołobrzegu. Domki Viva to{" "}
          <strong className="font-semibold text-white">noclegi Grzybowo blisko plaży</strong> i{" "}
          <strong className="font-semibold text-white">domki nad morzem Grzybowo</strong> dla
          rodzin – idealne <strong className="font-semibold text-white">Grzybowo noclegi dla rodzin</strong>.
        </p>

        {!iframeBlocked && (
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/20 bg-black/20 shadow-2xl backdrop-blur-sm">
            <iframe
              title="Wirtualny spacer po Domkach Viva w Grzybowie"
              src={VIVA_VIRTUAL_TOUR_URL}
              className="aspect-[16/10] w-full min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]"
              allowFullScreen
              loading="lazy"
              onError={() => setIframeBlocked(true)}
            />
          </div>
        )}

        {iframeBlocked && (
          <p className="mt-8 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-cream/90">
            Podgląd spaceru w ramce strony jest niedostępny – uruchom wirtualny spacer w nowej
            karcie przyciskiem poniżej.
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="group flex min-h-[240px] flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition hover:bg-white/20">
            <div>
              <span className="icon-gold-bg h-14 w-14 rounded-2xl text-2xl shadow-lg">
                🏠
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold">
                Wirtualny spacer po Domkach Viva
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/90">
                Poznaj obiekt jeszcze przed przyjazdem i zobacz układ domków oraz najważniejsze
                miejsca na terenie obiektu.{" "}
                <span className="text-brand-light/90">
                  Domki Grzybowo wirtualny spacer – noclegi Grzybowo nad morzem.
                </span>
              </p>
            </div>
            <a
              href={VIVA_VIRTUAL_TOUR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta mt-6 w-full sm:w-fit !px-6 !py-3 !text-sm"
            >
              Uruchom wirtualny spacer
            </a>
          </article>

          <article className="group flex min-h-[240px] flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition hover:bg-white/20">
            <div>
              <span className="icon-gold-bg h-14 w-14 rounded-2xl text-2xl">
                🌐
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold">Kołobrzeg 360°</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/90">
                Zobacz panoramę Kołobrzegu i najciekawsze miejsca regionu w widoku 360°.{" "}
                <span className="text-brand-light/90">
                  Atrakcje Grzybowo i okolicy – Kołobrzeg 360.
                </span>
              </p>
            </div>
            <a
              href={KOLOBRZEG_360_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-outline mt-6 w-full sm:w-fit !px-6 !py-3 !text-sm text-white border-accent-glow/80 hover:border-amber-hover hover:bg-primary/25 hover:text-white"
            >
              Otwórz Kołobrzeg 360°
            </a>
          </article>
        </div>

        <p className="sr-only">{VIRTUAL_TOUR_SEO_PHRASES.join(", ")}</p>
      </div>
    </section>
  );
}
