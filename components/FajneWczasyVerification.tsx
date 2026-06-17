import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon";

export const FAJNE_WCZASY_OFFER_URL =
  "https://www.fajnewczasy.pl/noclegi/grzybowo/domki_letniskowe/23428";

export function FajneWczasyVerificationCard() {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-sand-dark/80 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-7">
      <div
        className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent-glow"
        aria-hidden
      />
      <div className="relative pl-3">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-cream to-white shadow-inner">
            <ShieldCheckIcon size={44} />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
              Zweryfikowany obiekt na FajneWczasy.pl
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              Oferta Domki Viva została zweryfikowana i jest aktywnie prezentowana w serwisie
              FajneWczasy.pl.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-stretch gap-3 sm:items-start">
          <a
            href={FAJNE_WCZASY_OFFER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta w-full text-center sm:w-auto sm:px-8"
          >
            Zobacz ofertę
          </a>
          <p className="text-center text-xs leading-relaxed text-ink-muted sm:text-left">
            Potwierdzona prezentacja obiektu w serwisie FajneWczasy.pl
          </p>
        </div>
      </div>
    </article>
  );
}

export function FajneWczasyTrustBar() {
  return (
    <div className="border-t border-sand-dark bg-white/95 backdrop-blur-sm">
      <div className="page-container mx-auto max-w-7xl py-3">
        <a
          href={FAJNE_WCZASY_OFFER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto flex max-w-fit items-center gap-2.5 rounded-full border border-sand-dark/80 bg-cream/60 px-4 py-2 text-sm font-medium text-ink-muted shadow-sm transition duration-300 hover:border-secondary/40 hover:bg-white hover:text-ink hover:shadow-md"
        >
          <ShieldCheckIcon size={22} className="shrink-0 transition duration-300 group-hover:scale-105" />
          <span>✓ Zweryfikowany obiekt na FajneWczasy.pl</span>
        </a>
      </div>
    </div>
  );
}
