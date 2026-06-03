import { EventsCategoryTiles } from "@/components/events/EventsCategoryTiles";

export function WydarzeniaSection() {
  return (
    <section id="wydarzenia-kolobrzeg" className="section-padding bg-cream !pt-0">
      <div className="mx-auto max-w-7xl">
        <h1 className="section-title">Wydarzenia w okolicy</h1>
        <p className="section-lead max-w-3xl">
          Podczas pobytu w Domkach Viva sprawdź aktualne koncerty, kino, sport, kulturę, teatr i
          stand-up w Kołobrzegu. Wybierz kategorię i przejdź do oficjalnego kalendarza
          i-kolobrzeg.pl.
        </p>

        <EventsCategoryTiles />

        <p className="mt-10 text-center text-xs text-ink-muted">
          Kalendarze prowadzą do serwisu Urzędu Miasta Kołobrzeg (i-kolobrzeg.pl). Linki
          otwierają się w nowej karcie.
        </p>
      </div>
    </section>
  );
}
