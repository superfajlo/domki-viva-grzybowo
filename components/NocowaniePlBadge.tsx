import Script from "next/script";

export const NOCOWANIE_KEY = "1fa017ad2cee2ebf25739acc49002973_";
export const NOCOWANIE_LOCATION_ID = "103987";

/** Skrypt Nocowanie.pl – raz na całą stronę (layout). */
export function NocowaniePlScripts() {
  return (
    <>
      <Script id="nocowanie-pl-config" strategy="lazyOnload">
        {`var _noc = {key: '${NOCOWANIE_KEY}',controller: '_obiekty_Weryfikacja',id_lokalizacji: '${NOCOWANIE_LOCATION_ID}',layout: 'v4'};`}
      </Script>
      <Script src="https://d.nocimg.pl/js/external.js" strategy="lazyOnload" />
    </>
  );
}

type NocowaniePlBadgeProps = {
  variant?: "footer" | "card";
};

export function NocowaniePlBadge({ variant = "footer" }: NocowaniePlBadgeProps) {
  if (variant === "card") {
    return (
      <div className="rounded-2xl border border-secondary/35 bg-gradient-to-br from-primary/30 via-cream to-white p-6 shadow-md sm:p-7">
        <div className="flex items-start gap-4">
          <span className="icon-gold-bg h-12 w-12 shrink-0 rounded-xl text-xl" aria-hidden>
            ✓
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
              Zweryfikowany obiekt
            </h2>
            <p className="mt-1 text-base font-medium text-ink sm:text-lg">
              Profil na{" "}
              <span className="font-bold text-secondary">Nocowanie.pl</span>
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <div id={NOCOWANIE_KEY} className="nocowanie-badge-slot w-auto max-w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/10 pt-6">
      <p className="text-sm font-semibold text-cream/80">
        Obiekt na <span className="text-brand-light">Nocowanie.pl</span>
      </p>
      <div id={NOCOWANIE_KEY} className="nocowanie-badge-slot w-auto max-w-full leading-none" />
    </div>
  );
}
