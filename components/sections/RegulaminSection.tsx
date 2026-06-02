import {
  REGULAMIN_HIGHLIGHTS,
  REGULAMIN_RULES,
  REGULAMIN_SEO,
  REGULAMIN_SEO_PHRASES,
  type RegulaminBlock,
} from "@/lib/regulamin-data";

function DocumentIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function RuleContent({ blocks }: { blocks: RegulaminBlock[] }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-ink-muted sm:text-base">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={index}>{block.text}</p>;
        }
        return (
          <div key={index}>
            {block.intro ? <p className="mb-2">{block.intro}</p> : null}
            <ul className="list-inside list-disc space-y-1 pl-1">
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
      className="section-padding scroll-mt-24 border-t border-sand-dark bg-gradient-to-b from-white to-cream"
      aria-labelledby={showHeader ? "regulamin-heading" : undefined}
    >
      <RegulaminJsonLd />

      <div className="mx-auto max-w-4xl">
        {showHeader ? (
          <div className="text-center">
            <span className="icon-gold-bg mx-auto h-14 w-14 rounded-2xl">
              <DocumentIcon />
            </span>
            <h2 id="regulamin-heading" className="section-title mt-4">
              Regulamin obiektu
            </h2>
            <p className="section-lead mx-auto">
              Przed rozpoczęciem pobytu prosimy o zapoznanie się z zasadami obowiązującymi na
              terenie obiektu Domki Viva.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-muted">
              <span className="sr-only">{REGULAMIN_SEO.title}. </span>
              {REGULAMIN_SEO.description}
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="icon-gold-bg h-14 w-14 rounded-2xl">
              <DocumentIcon />
            </span>
          </div>
        )}

        <ol className="mt-12 space-y-4">
          {REGULAMIN_RULES.map((rule) => (
            <li key={rule.number}>
              <article className="group flex gap-4 rounded-2xl border border-sand-dark bg-surface/95 p-5 shadow-sm backdrop-blur-sm transition hover:border-secondary/30 hover:shadow-md sm:gap-5 sm:p-6">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-display text-lg font-bold text-ink shadow-md transition group-hover:scale-105 sm:h-11 sm:w-11"
                  aria-hidden
                >
                  {rule.number}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <RuleContent blocks={rule.blocks} />
                </div>
              </article>
            </li>
          ))}
        </ol>

        <article className="premium-frame mt-10">
          <div className="premium-frame-inner p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
              Najważniejsze zasady
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {REGULAMIN_HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-sand-dark bg-cream/60 px-4 py-3 text-sm font-medium text-ink"
                >
                  <span className="flex h-2 w-2 shrink-0 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <p className="sr-only">{REGULAMIN_SEO_PHRASES.join(", ")}</p>
      </div>
    </section>
  );
}
