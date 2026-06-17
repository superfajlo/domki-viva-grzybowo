import { VIVA_DRONE_EMBED_URL, VIVA_DRONE_YOUTUBE_URL } from "@/lib/site";
import Link from "next/link";

const TRUST_POINTS = [
  "Rzeczywiste ujęcia obiektu",
  "Okolica i plaża z lotu ptaka",
  "Autentyczny wygląd Domków VIVA",
] as const;

/** Podsumowanie oferty – film z drona (strona Oferta / Domki). */
export function DronVideoSection() {
  return (
    <section
      id="lot-ptaka"
      className="section-padding bg-gradient-to-b from-cream to-background"
      aria-labelledby="dron-video-heading"
    >
      <div className="page-container mx-auto w-full max-w-7xl">
        <h2 id="dron-video-heading" className="section-title text-center sm:text-left">
          Zobacz Domki VIVA z lotu ptaka
        </h2>
        <p className="section-lead mx-auto max-w-3xl text-center sm:mx-0 sm:text-left">
          Poznaj nasz obiekt, układ domków, najbliższą okolicę oraz odległość od plaży dzięki
          ujęciom wykonanym dronem.
        </p>

        <div className="premium-frame mx-auto mt-8 w-full max-w-5xl sm:mt-10">
          <div className="premium-frame-inner overflow-hidden rounded-[14px] shadow-[0_8px_32px_rgba(43,43,43,0.12)]">
            <div className="relative aspect-video w-full bg-ink/5">
              <iframe
                title="Domki VIVA Grzybowo – film z drona, układ obiektu i odległość od plaży"
                src={VIVA_DRONE_EMBED_URL}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
          {TRUST_POINTS.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 rounded-xl border border-sand-dark bg-surface px-4 py-3 text-sm text-ink shadow-sm sm:text-base"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/25 text-sm font-bold text-amber-deep"
                aria-hidden
              >
                ✓
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
          <a
            href={VIVA_DRONE_YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-secondary underline-offset-2 hover:text-amber-hover hover:underline"
          >
            Otwórz film na YouTube
          </a>
          <Link href="/kontakt" className="btn-cta w-full sm:w-auto">
            Zapytaj o termin
          </Link>
        </div>
      </div>
    </section>
  );
}
