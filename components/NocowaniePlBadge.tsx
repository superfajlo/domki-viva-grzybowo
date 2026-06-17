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
      <div className="flex flex-col items-center rounded-2xl border border-sand-dark bg-white p-5 text-center shadow-sm sm:p-6">
        <p className="mb-4 text-xs font-bold uppercase tracking-wide text-ink-muted">
          Zweryfikowany obiekt na Nocowanie.pl
        </p>
        <div id={NOCOWANIE_KEY} className="min-h-[80px] w-full" />
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col items-center border-t border-white/10 pt-8">
      <p className="mb-4 text-xs font-medium uppercase tracking-wide text-cream/60">
        Obiekt na Nocowanie.pl
      </p>
      <div id={NOCOWANIE_KEY} className="min-h-[80px]" />
    </div>
  );
}
