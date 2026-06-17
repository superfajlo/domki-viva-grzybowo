import { HOME_ATTRACTION_TEASERS, HOME_HUB_LINKS, HOME_FAQ } from "@/lib/home-hub";
import { GALLERY_SECTIONS } from "@/lib/gallery-images";
import { PRICING } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const ABOUT_IMAGE = GALLERY_SECTIONS[0]?.images[1]?.src ?? GALLERY_SECTIONS[0]?.images[0]?.src;

const ADVANTAGE_ICONS = ["🏖️", "🏡", "🌳", "🚗", "🌊", "📅"] as const;

const ATTRACTION_ICONS = ["🌊", "⛵", "🛶", "🗼", "🌲", "🎡"] as const;

export function HomeAboutGrzybowo() {
  return (
    <section id="o-obiekcie" className="section-padding sand-grain bg-cream scroll-mt-24">
      <div className="page-container mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="badge-gold w-fit">O obiekcie</p>
          <h2 className="section-title mt-4">Domki Viva w Grzybowie nad morzem</h2>
          <div className="mt-6 space-y-4 text-ink-muted leading-relaxed">
            <p>
              <strong className="text-ink">Grzybowo</strong> to malowniczo usytuowana miejscowość
              letniskowa w bezpośrednim sąsiedztwie morza. Cicha, spokojna okolica przyciąga
              turystów szukających <strong className="text-ink">noclegów Grzybowo</strong> z łatwym
              dostępem do plaży – Domki Viva leżą około 700 metrów od wybrzeża Bałtyku.
            </p>
            <p>
              Dodatkową zaletą pobytu jest bliskość <strong className="text-ink">Kołobrzegu</strong>{" "}
              – zaledwie ok. 5 km do centrum miasta uzdrowiskowego z wyjątkowym mikroklimatem,
              deptakiem, molo i licznymi atrakcjami.
            </p>
            <p>
              Oferujemy komfortowe <strong className="text-ink">domki Grzybowo</strong> dla 2–5 osób –
              z własnym aneksem kuchennym, ogrodem i placem zabaw.
            </p>
          </div>
          <Link href="/oferta" className="btn-cta mt-8 inline-flex">
            Poznaj ofertę domków
          </Link>
        </div>
        {ABOUT_IMAGE && (
          <div className="premium-frame float-soft">
            <div className="premium-frame-inner relative aspect-[4/3] overflow-hidden">
              <Image
                src={ABOUT_IMAGE}
                alt="Domki Viva Grzybowo – widok obiektu nad morzem"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
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
    <section className="section-padding bg-gradient-to-b from-white to-sand/40">
      <div className="page-container mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="badge-gold mx-auto w-fit">Atuty</p>
          <h2 className="section-title mt-4">Dlaczego Domki Viva?</h2>
          <p className="section-lead mx-auto">
            Najważniejsze zalety pobytu – szczegóły wyposażenia i zdjęcia na podstronie Oferta.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <article
              key={item.title}
              className="card-surface group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent-glow"
                aria-hidden
              />
              <span className="icon-gold-bg h-12 w-12 rounded-xl text-xl" aria-hidden>
                {ADVANTAGE_ICONS[i]}
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePricingTeaser() {
  return (
    <section className="section-padding bg-cream" aria-labelledby="home-pricing-heading">
      <div className="page-container mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="badge-gold w-fit">Cennik</p>
            <h2 id="home-pricing-heading" className="section-title mt-4">
              Ceny od 160 zł za dobę
            </h2>
            <p className="section-lead">
              Stawki zależą od wielkości domku i terminu – pełny cennik sezonowy na osobnej stronie.
            </p>
          </div>
          <Link href="/cennik" className="btn-cta shrink-0">
            Zobacz cennik 2026
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PRICING.map((row) => (
            <article
              key={row.guests}
              className="pricing-card relative overflow-hidden rounded-2xl border border-sand-dark bg-surface p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-medium text-ink-muted">{row.label}</p>
              <p className="font-display mt-2 text-3xl font-bold text-ink">
                od {row.priceFrom}
                <span className="text-base font-semibold text-ink-muted"> zł</span>
              </p>
              <p className="mt-1 text-xs text-ink-muted">za dobę</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeAttractionsPreview() {
  const featured = HOME_ATTRACTION_TEASERS.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="page-container mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="badge-gold mx-auto w-fit">Okolica</p>
          <h2 className="section-title mt-4">Grzybowo i okolice – atrakcje w skrócie</h2>
          <p className="section-lead mx-auto">
            Plaża, Kołobrzeg, rejsy i rozrywka – na stronie Atrakcje okolicy znajdziesz pełne opisy i
            mapy.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((a, i) => (
            <li
              key={a.title}
              className="card-surface flex gap-4 p-5 transition hover:border-secondary/40 hover:shadow-md"
            >
              <span
                className="icon-gold-bg h-11 w-11 shrink-0 rounded-xl text-lg"
                aria-hidden
              >
                {ATTRACTION_ICONS[i]}
              </span>
              <div>
                <h3 className="font-display font-bold text-ink">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{a.teaser}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <Link href="/atrakcje-okolicy" className="btn-cta-outline">
            Wszystkie atrakcje okolicy
          </Link>
        </p>
      </div>
    </section>
  );
}

export function HomeTopicClusterLinks() {
  return (
    <section className="section-padding bg-gradient-to-b from-sand/50 to-cream">
      <div className="page-container mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="badge-gold mx-auto w-fit">Nawigacja</p>
          <h2 className="section-title mt-4">Informacje dla gości</h2>
          <p className="section-lead mx-auto">
            Każdy temat na osobnej podstronie – przejrzysta nawigacja bez powielania treści.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_HUB_LINKS.map((card) => (
            <article
              key={card.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand-dark bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-secondary opacity-0 transition group-hover:opacity-100"
                aria-hidden
              />
              <h3 className="font-display text-xl font-bold text-ink">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-secondary transition group-hover:gap-2"
              >
                {card.cta}
                <span aria-hidden>→</span>
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
    <section className="section-padding bg-white" aria-labelledby="home-faq-heading">
      <div className="page-container mx-auto max-w-3xl">
        <div className="text-center">
          <p className="badge-gold mx-auto w-fit">FAQ</p>
          <h2 id="home-faq-heading" className="section-title mt-4">
            Pytania o pobyt w Grzybowie
          </h2>
          <p className="section-lead mx-auto">
            Krótkie odpowiedzi – o ceny i terminy w Cenniku, o zasady w Regulaminie.
          </p>
        </div>
        <div className="mt-10 space-y-3">
          {HOME_FAQ.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-sand-dark bg-cream/50 px-5 py-4 open:bg-surface open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-lg text-amber-deep transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/kontakt" className="btn-cta">
            Zapytaj o termin
          </Link>
        </p>
      </div>
    </section>
  );
}
