import {
  REGULAMIN_HIGHLIGHTS,
  REGULAMIN_RULES,
  REGULAMIN_SEO,
  REGULAMIN_SEO_PHRASES,
  type RegulaminBlock,
} from "@/lib/regulamin-data";
import Link from "next/link";

function RuleContent({ blocks }: { blocks: RegulaminBlock[] }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-ink-muted sm:text-[0.95rem]">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={index}>{block.text}</p>;
        }
        return (
          <div key={index}>
            {block.intro ? <p className="mb-2">{block.intro}</p> : null}
            <ul className="list-disc space-y-1.5 pl-5 marker:text-secondary">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function RegulaminJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    name: REGULAMIN_SEO.title,
    description: REGULAMIN_SEO.description,
    isPartOf: { "@type": "WebPage", name: "Domki Viva Grzybowo" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function RegulaminSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section
      id="regulamin"
      className="section-padding scroll-mt-24 bg-gradient-to-b from-cream via-white to-sand/30"
      aria-labelledby={showHeader ? "regulamin-heading" : undefined}
    >
      <RegulaminJsonLd />

      <div className="page-container mx-auto max-w-5xl">
        {showHeader ? (
          <div className="text-center">
            <p className="badge-gold mx-auto w-fit">Zasady pobytu</p>
            <h2 id="regulamin-heading" className="section-title mt-4">
              Regulamin obiektu
            </h2>
            <p className="section-lead mx-auto">
              Przed rozpoczęciem pobytu prosimy o zapoznanie się z zasadami obowiązującymi na
              terenie obiektu Domki Viva.
            </p>
          </div>
        ) : null}

        <article className="premium-frame mt-8 sm:mt-10">
          <div className="premium-frame-inner p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  Najważniejsze zasady
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Szybki skrót przed pełnym regulaminem poniżej.
                </p>
              </div>
              <span className="icon-gold-bg h-12 w-12 shrink-0 rounded-2xl text-xl" aria-hidden>
                📋
              </span>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {REGULAMIN_HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-sand-dark bg-cream/70 px-4 py-3 text-sm font-medium text-ink"
                >
                  <span
                    className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-secondary"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <ol className="mt-10 space-y-5">
          {REGULAMIN_RULES.map((rule) => (
            <li key={rule.number} id={`regulamin-punkt-${rule.number}`} className="scroll-mt-28">
              <article className="card-surface group overflow-hidden transition hover:shadow-md">
                <div className="flex items-stretch gap-0">
                  <div
                    className="flex w-14 shrink-0 flex-col items-center justify-center bg-gradient-to-b from-primary/30 via-primary/15 to-transparent sm:w-16"
                    aria-hidden
                  >
                    <span className="font-display text-2xl font-bold text-amber-deep sm:text-3xl">
                      {rule.number}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 border-l border-sand-dark/80 p-5 sm:p-6">
                    <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                      {rule.title}
                    </h3>
                    <div className="mt-3">
                      <RuleContent blocks={rule.blocks} />
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-2xl border border-sand-dark bg-gradient-to-r from-cream to-sand/50 p-6 text-center sm:p-8">
          <p className="text-ink-muted">
            Masz pytania do regulaminu lub warunków pobytu?
          </p>
          <Link href="/kontakt/" className="btn-cta mt-4 inline-flex">
            Skontaktuj się z nami
          </Link>
        </div>

        <p className="sr-only">{REGULAMIN_SEO_PHRASES.join(", ")}</p>
      </div>
    </section>
  );
}
