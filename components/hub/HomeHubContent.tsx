import { HOME_ATTRACTION_TEASERS, HOME_HUB_LINKS, HOME_FAQ } from "@/lib/home-hub";
import Link from "next/link";

export function HomeAboutGrzybowo() {
  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Domki Viva w Grzybowie nad morzem</h2>
        <div className="mt-6 max-w-3xl space-y-4 text-ink-muted leading-relaxed">
          <p>
            <strong className="text-ink">Grzybowo</strong> to malowniczo usytuowana miejscowość
            letniskowa w bezpośrednim sąsiedztwie morza. Cicha, spokojna okolica przyciąga
            turystów szukających <strong className="text-ink">noclegów Grzybowo</strong> z łatwym
            dostępem do plaży – Domki Viva leżą około 700 metrów od wybrzeża Bałtyku.
          </p>
          <p>
            Dodatkową zaletą pobytu jest bliskość <strong className="text-ink">Kołobrzegu</strong>{" "}
            – zaledwie ok. 5 km do centrum miasta uzdrowiskowego z wyjątkowym mikroklimatem,
            deptakiem, molo i licznymi atrakcjami. To idealne połączenie dla osób planujących
            wypoczynek w <strong className="text-ink">domkach nad morzem</strong> w spokojnej
            miejscowości Grzybowo w okolicy Kołobrzegu.
          </p>
          <p>
            Oferujemy komfortowe <strong className="text-ink">domki Grzybowo</strong> dla 2–5 osób –
            z własnym aneksem kuchennym, ogrodem i placem zabaw. Zapraszamy na wakacje w Grzybowie
            i rodzinny wypoczynek nad Bałtykiem.
          </p>
        </div>
      </div>
    </section>
  );
}

export function HomeAdvantages() {
  const items = [
    { title: "700 m do plaży", text: "Krótki spacer do szerokiej, piaszczystej plaży w Grzybowie." },
    { title: "Domki 2–5 osób", text: "Własny aneks kuchenny i łazienka w każdym domku." },
    { title: "Ogród i plac zabaw", text: "Przestrzeń dla dzieci, grill i spokojna atmosfera." },
    { title: "Parking i Wi-Fi", text: "Bezpłatny parking (1 miejsce na domek) i internet." },
    { title: "Blisko Kołobrzegu", text: "Szybki dojazd do portu, molo i atrakcji miasta." },
    { title: "Noclegi przez cały rok", text: "Sezon letni i możliwość pobytu poza szczytem." },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Dlaczego Domki Viva?</h2>
        <p className="section-lead">
          Najważniejsze atuty pobytu – szczegóły wyposażenia i zdjęcia znajdziesz na podstronie
          Oferta.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-sand-dark bg-cream/50 p-5"
            >
              <h3 className="font-display font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{item.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link
            href="/oferta/"
            className="btn-cta"
          >
            Poznaj pełną ofertę domków
          </Link>
        </p>
      </div>
    </section>
  );
}

export function HomeAttractionsPreview() {
  return (
    <section className="section-padding bg-gradient-to-b from-sand/80 to-cream">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Grzybowo i okolice – atrakcje w skrócie</h2>
        <p className="section-lead">
          Region nad Bałtykiem oferuje plażę, sport, kulturę i rozrywkę. Poniżej krótkie
          podpowiedzi – rozbudowane opisy, mapy wydarzeń i Kołobrzeg 360° znajdziesz na stronie
          Atrakcje okolicy.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {HOME_ATTRACTION_TEASERS.map((a) => (
            <li
              key={a.title}
              className="rounded-xl border border-sand-dark bg-white px-4 py-3"
            >
              <h3 className="text-sm font-bold text-ink">{a.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{a.teaser}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <Link
            href="/atrakcje-okolicy/"
            className="btn-cta-outline"
          >
            Wszystkie atrakcje okolicy
          </Link>
        </p>
      </div>
    </section>
  );
}

export function HomeTopicClusterLinks() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Informacje dla gości</h2>
        <p className="section-lead">
          Każdy temat opisujemy na osobnej podstronie – bez powielania treści, z przejrzystą
          nawigacją.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HOME_HUB_LINKS.map((card) => (
            <article
              key={card.href}
              className="group flex flex-col rounded-2xl border border-sand-dark bg-cream/40 p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="font-display text-xl font-bold text-ink">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-muted">{card.description}</p>
              <Link
                href={card.href}
                className="mt-4 inline-flex text-sm font-semibold text-secondary group-hover:underline"
              >
                {card.cta} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeFaqSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="mx-auto max-w-3xl">
        <h2 className="section-title text-center">Pytania o pobyt w Grzybowie</h2>
        <p className="section-lead mx-auto text-center">
          Krótkie odpowiedzi – o ceny i terminy przeczytasz w Cenniku, o zasady w Regulaminie.
        </p>
        <ul className="mt-8 space-y-4">
          {HOME_FAQ.map((item) => (
            <li key={item.question} className="rounded-xl border border-sand-dark bg-white p-5">
              <h3 className="font-semibold text-ink">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
