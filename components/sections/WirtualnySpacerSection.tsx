"use client";

import { CameraIcon } from "@/components/icons/CameraIcon";
import {
  BEACH_LIVE_CAMERA_URL,
  KOLOBRZEG_360_URL,
  KOLOBRZEG_BIRDS_EYE_YOUTUBE_URL,
  VIRTUAL_TOUR_SEO_PHRASES,
  VIVA_VIRTUAL_TOUR_URL,
} from "@/lib/site";
import Link from "next/link";
import { useState } from "react";

export function WirtualnySpacerSection() {
  const [iframeBlocked, setIframeBlocked] = useState(false);

  const handleIframeError = () => {
    requestAnimationFrame(() => setIframeBlocked(true));
  };

  return (
    <section
      id="wirtualny-spacer"
      className="section-dark-warm section-padding premium-glow-bg"
      aria-label="Wirtualny spacer i widoki okolicy"
    >
      <div className="mx-auto max-w-7xl">
        <p
          role="note"
          className="max-w-3xl rounded-xl border border-accent-glow/40 bg-white/10 px-4 py-3 text-sm leading-relaxed text-cream/95 sm:px-5 sm:py-4 sm:text-base"
        >
          <span className="mr-1.5" aria-hidden>
            ℹ️
          </span>
          Wirtualny spacer został wykonany na początku powstania obiektu i nie obejmuje jeszcze
          obecnego wyglądu ogrodu. Aktualne zdjęcia ogrodu znajdziesz w{" "}
          <Link
            href="/galeria/"
            className="font-semibold text-accent-glow underline decoration-accent-glow/60 underline-offset-2 transition hover:text-white"
          >
            galerii
          </Link>
          .
        </p>

        {!iframeBlocked && (
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/20 bg-black/20 shadow-2xl backdrop-blur-sm">
            <iframe
              title="Wirtualny spacer po Domkach Viva w Grzybowie"
              src={VIVA_VIRTUAL_TOUR_URL}
              className="aspect-[16/10] w-full min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]"
              allowFullScreen
              loading="lazy"
              onError={handleIframeError}
            />
          </div>
        )}

        {iframeBlocked && (
          <p className="mt-8 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-cream/90">
            Podgląd spaceru w ramce strony jest niedostępny – uruchom wirtualny spacer w nowej
            karcie przyciskiem poniżej.
          </p>
        )}

        <article className="relative mt-10 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm sm:p-8">
          <div
            className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent-glow"
            aria-hidden
          />
          <div className="flex flex-col gap-6 pl-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="icon-gold-bg h-14 w-14 rounded-2xl">
                <CameraIcon className="h-7 w-7 text-secondary" />
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                <span aria-hidden>🎥 </span>
                Kamera na żywo – Plaża w Grzybowie
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/90 sm:text-base">
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
        </article>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

          <article className="group flex min-h-[240px] flex-col justify-between rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition hover:bg-white/20">
            <div>
              <span className="icon-gold-bg h-14 w-14 rounded-2xl text-2xl" aria-hidden>
                🛩️
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide">
                Kołobrzeg z lotu ptaka
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/90">
                Zobacz Kołobrzeg i wybrzeże z perspektywy lotu ptaka – film na YouTube.
              </p>
            </div>
            <a
              href={KOLOBRZEG_BIRDS_EYE_YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-outline mt-6 w-full sm:w-fit !px-6 !py-3 !text-sm text-white border-accent-glow/80 hover:border-amber-hover hover:bg-primary/25 hover:text-white"
            >
              Obejrzyj na YouTube
            </a>
          </article>
        </div>

        <p className="sr-only">{VIRTUAL_TOUR_SEO_PHRASES.join(", ")}</p>
      </div>
    </section>
  );
}
