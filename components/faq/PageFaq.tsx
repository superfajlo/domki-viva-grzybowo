type FaqItem = { question: string; answer: string };

export function PageFaq({
  title,
  lead,
  items,
}: {
  title: string;
  lead?: string;
  items: readonly FaqItem[];
}) {
  return (
    <section className="section-padding border-t border-sand-dark bg-cream">
      <div className="mx-auto max-w-3xl">
        <h2 className="section-title">{title}</h2>
        {lead ? <p className="section-lead">{lead}</p> : null}
        <ul className="mt-8 space-y-4">
          {items.map((item) => (
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
