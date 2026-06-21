import { HERO_IMAGE } from "@/lib/gallery-images";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="start"
      className="relative flex min-h-[min(70dvh,640px)] flex-col justify-center overflow-hidden bg-ink text-white sm:min-h-[min(74dvh,700px)]"
    >
      {/* Rozmyte tło wypełnia puste marginesy przy object-contain */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          quality={35}
          sizes="100vw"
          className="scale-110 object-cover object-center opacity-40 blur-2xl"
        />
      </div>
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Domki Viva Grzybowo – widok obiektu, domki letniskowe nad morzem"
          fill
          priority
          fetchPriority="high"
          quality={82}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
          className="object-contain object-center"
        />
      </div>
      {/* Delikatny ciemny gradient – czytelność tekstu */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/15"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55"
        aria-hidden
      />

      <div className="page-container relative z-10 mx-auto max-w-7xl pb-20 pt-[calc(var(--header-height)+1rem)] sm:pb-24 sm:pt-[calc(var(--header-height)+1.5rem)] lg:pb-28 lg:pt-[calc(var(--header-height)+2rem)]">
        <p className="mb-3 inline-flex max-w-full rounded-full border border-white/30 bg-black/25 px-3 py-1 text-xs font-medium backdrop-blur-sm sm:mb-4 sm:px-4 sm:text-sm">
          Noclegi w Grzybowie · ok. 700 m od plaży
        </p>
        <div className="max-w-4xl rounded-2xl bg-black/20 px-4 py-3 backdrop-blur-[2px] sm:px-5 sm:py-4">
          <h1 className="font-display text-[1.625rem] font-bold leading-[1.2] tracking-tight drop-shadow-sm sm:text-4xl md:text-5xl lg:text-6xl">
            Domki Viva Grzybowo – noclegi nad morzem
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/95 drop-shadow-sm sm:mt-5 sm:text-lg md:text-xl">
            Komfortowe domki 2, 3, 4 i 5 osobowe z własnym aneksem kuchennym, około 700
            metrów od plaży.
          </p>
        </div>
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap">
          <Link href="/kontakt" className="btn-cta w-full sm:w-auto">
            Zapytaj o termin
          </Link>
          <Link
            href="/oferta"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-white/80 bg-black/30 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-black/45 sm:w-auto sm:px-8"
          >
            Poznaj ofertę
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2 sm:gap-3">
          {[
            "700 m do plaży",
            "Domki 2–5 osób",
            "Parking i Wi-Fi",
            "Plac zabaw",
          ].map((label) => (
            <li
              key={label}
              className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:px-4 sm:text-sm"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-28 overflow-hidden sm:h-40 lg:h-48"
        aria-hidden
      >
        <div className="wave-layer-slow absolute bottom-0 flex w-[200%]">
          <WaveSvg className="h-20 w-1/2 text-brand-light/50 sm:h-32" />
          <WaveSvg className="h-20 w-1/2 text-brand-light/50 sm:h-32" />
        </div>
        <div className="wave-layer absolute bottom-0 flex w-[200%]">
          <WaveSvg className="h-16 w-1/2 text-white/25 sm:h-28" />
          <WaveSvg className="h-16 w-1/2 text-white/25 sm:h-28" />
        </div>
        <div className="wave-layer-fast absolute bottom-0 flex w-[200%]">
          <WaveSvg className="h-14 w-1/2 text-sand sm:h-24" />
          <WaveSvg className="h-14 w-1/2 text-sand sm:h-24" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-12 bg-gradient-to-t from-cream to-transparent sm:h-16" aria-hidden />
    </section>
  );
}

function WaveSvg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M0,64 C150,120 350,0 600,48 C850,96 1050,32 1200,64 L1200,120 L0,120 Z"
      />
    </svg>
  );
}
