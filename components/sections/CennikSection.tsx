"use client";

import { AnimateIn } from "@/components/pricing/AnimateIn";
import { PricingIcon } from "@/components/pricing/PricingIcons";
import { CONTACT } from "@/lib/site";
import {
  PRICING_IMPORTANT,
  PRICING_INFO_BAR,
  PRICING_JUNE,
  PRICING_MAY,
  PRICING_SEPTEMBER,
  PRICING_SUMMER,
  type PriceLine,
  type PeriodCard,
} from "@/lib/pricing-data";
import Link from "next/link";

const glassCard =
  "pricing-card group relative overflow-hidden rounded-2xl border border-sand-dark/80 bg-surface/90 p-6 shadow-lg shadow-primary/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-xl hover:shadow-primary/20 sm:p-7";

const monthHeading =
  "font-display text-sm font-bold uppercase tracking-[0.2em] text-secondary";

function PriceRows({ lines }: { lines: PriceLine[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {lines.map((line) => (
        <li key={line.label} className="flex items-end justify-between gap-4 border-b border-sand-dark/60 pb-3 last:border-0 last:pb-0">
          <span className="text-sm text-ink-muted">{line.label}</span>
          <span className="text-right font-display text-lg font-bold text-ink sm:text-xl">
            {line.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PeriodCardBlock({
  card,
  featured = false,
}: {
  card: PeriodCard;
  featured?: boolean;
}) {
  const mainPrice = card.lines[0]?.value.replace(" zł / doba", "") ?? "";

  return (
    <article className={`${glassCard} ${featured ? "ring-2 ring-accent-glow/50" : ""}`}>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 transition group-hover:scale-110" aria-hidden />
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-secondary">
        <PricingIcon name="calendar" className="h-4 w-4" />
        {card.period}
      </p>
      {card.lines.length === 1 && card.extraPrice ? (
        <>
          <p className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {mainPrice}
            <span className="ml-1 text-lg font-semibold text-ink-muted">zł / doba</span>
          </p>
          {card.lines[0].label ? (
            <p className="mt-1 text-xs text-ink-muted">{card.lines[0].label}</p>
          ) : null}
          <div className="mt-4 flex items-center justify-between rounded-xl bg-sand/60 px-4 py-3">
            <span className="text-sm text-ink-muted">{card.extraPrice.label}</span>
            <span className="font-semibold text-secondary">{card.extraPrice.value}</span>
          </div>
        </>
      ) : (
        <PriceRows lines={card.lines} />
      )}
    </article>
  );
}

function TurnusBanner({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-sand-dark bg-sand/60 px-5 py-4 backdrop-blur-sm">
      <PricingIcon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
      <p className="text-sm font-medium text-ink">{text}</p>
    </div>
  );
}

export function CennikSection() {
  return (
    <section
      id="cennik"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sand/50 to-cream section-padding"
    >
      <div className="pointer-events-none absolute inset-0 premium-glow-bg" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <AnimateIn>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">Sezon 2026</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl xl:text-5xl">
              Cennik pobytu 2026
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink-muted sm:text-lg">
              Sprawdź aktualne ceny pobytu w Domkach Viva w Grzybowie.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={80} className="mt-10">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PRICING_INFO_BAR.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/60 px-4 py-3.5 shadow-sm backdrop-blur-md transition hover:bg-white/90"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-secondary">
                  <PricingIcon name={item.icon} />
                </span>
                <span className="text-sm font-medium leading-snug text-ink">{item.text}</span>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* MAJ */}
        <AnimateIn delay={100} className="mt-16">
          <p className={monthHeading}>{PRICING_MAY.monthLabel}</p>
          <article className={`mt-6 ${glassCard} max-w-3xl`}>
            <p className="flex items-center gap-2 font-display text-xl font-bold text-ink">
              <PricingIcon name="sun" className="h-5 w-5 text-secondary" />
              {PRICING_MAY.period}
            </p>
            <PriceRows lines={[...PRICING_MAY.lines]} />
            <div className="mt-6 rounded-xl border border-sand-dark bg-gradient-to-br from-sand/80 to-white/80 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-ink">
                {PRICING_MAY.weekendTitle}
              </p>
              <ul className="mt-3 space-y-2">
                {PRICING_MAY.weekendLines.map((line) => (
                  <li key={line.label} className="flex justify-between gap-4 text-sm">
                    <span className="text-ink-muted">{line.label}</span>
                    <span className="font-semibold text-ink">{line.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm text-ink-muted">
              <PricingIcon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              {PRICING_MAY.note}
            </p>
          </article>
        </AnimateIn>

        {/* CZERWIEC */}
        <AnimateIn delay={120} className="mt-16">
          <p className={monthHeading}>{PRICING_JUNE.monthLabel}</p>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PRICING_JUNE.cards.map((card, i) => (
              <AnimateIn key={card.id} delay={i * 60}>
                <PeriodCardBlock card={card} />
              </AnimateIn>
            ))}
          </div>
          <div className="mt-6">
            <TurnusBanner text={PRICING_JUNE.turnusNote} />
          </div>
        </AnimateIn>

        {/* LIPIEC I SIERPIEŃ – wyróżniona */}
        <AnimateIn delay={140} className="mt-20">
          <div className="premium-frame relative shadow-2xl">
            <div className="premium-frame-inner bg-gradient-to-b from-surface/95 to-background p-6 backdrop-blur-sm sm:p-8 lg:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  {PRICING_SUMMER.monthLabel}
                </p>
                <span className="badge-gold w-fit">
                  <PricingIcon name="sun" className="h-4 w-4" />
                  {PRICING_SUMMER.popularBadge}
                </span>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {PRICING_SUMMER.infoLines.map((line) => (
                  <li
                    key={line}
                    className="rounded-full border border-sand-dark bg-surface/90 px-4 py-2 text-sm text-ink backdrop-blur-sm"
                  >
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {PRICING_SUMMER.cards.map((card, i) => (
                  <AnimateIn key={card.id} delay={i * 50}>
                    <PeriodCardBlock card={card} featured={i === 2} />
                  </AnimateIn>
                ))}
              </div>

              <div className="mt-8">
                <TurnusBanner text={PRICING_SUMMER.turnusNote} />
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* WRZESIEŃ */}
        <AnimateIn delay={160} className="mt-16">
          <p className={monthHeading}>{PRICING_SEPTEMBER.monthLabel}</p>
          <article className={`mt-6 ${glassCard} max-w-3xl`}>
            <p className="font-display text-xl font-bold text-ink">{PRICING_SEPTEMBER.period}</p>
            <PriceRows lines={[...PRICING_SEPTEMBER.lines]} />
          </article>
        </AnimateIn>

        {/* WAŻNE INFORMACJE */}
        <AnimateIn delay={180} className="mt-20">
          <div className="premium-frame">
            <div className="premium-frame-inner bg-surface/95 p-6 backdrop-blur-xl sm:p-10">
              <h3 className="flex items-center gap-3 font-display text-2xl font-bold text-ink">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-secondary">
                  <PricingIcon name="info" className="h-6 w-6" />
                </span>
                {PRICING_IMPORTANT.title}
              </h3>

              <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
                {PRICING_IMPORTANT.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-xl border border-sand-dark/50 bg-cream/50 px-4 py-3 text-sm leading-relaxed text-ink"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-gradient-to-br from-warm-dark via-warm-dark-mid to-amber-deep p-6 text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <PricingIcon name="coin" className="h-6 w-6 text-accent-glow" />
                    <p className="font-display text-lg font-bold">{PRICING_IMPORTANT.localTax.title}</p>
                  </div>
                  <p className="mt-4 font-display text-3xl font-bold text-accent-glow sm:text-4xl">
                    {PRICING_IMPORTANT.localTax.amount}
                  </p>
                </div>
                <div className="flex items-center rounded-2xl border border-sand-dark bg-sand/40 px-6 py-5">
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {PRICING_IMPORTANT.localTax.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={200} className="mt-12 text-center">
          <p className="text-ink-muted">
            Rezerwacja i wycena indywidualna:
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={CONTACT.phoneHref} className="btn-cta inline-flex items-center gap-2">
              <PricingIcon name="phone" className="h-5 w-5" />
              {CONTACT.phone}
            </a>
            <Link href="/kontakt/" className="btn-cta-outline">
              Formularz kontaktowy
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
