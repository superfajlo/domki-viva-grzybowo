"use client";

import { FAQ_ITEMS } from "@/lib/site";
import { useState } from "react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-cream">
      <div className="mx-auto max-w-3xl">
        <h2 className="section-title text-center">Najczęściej zadawane pytania</h2>
        <p className="section-lead mx-auto text-center">
          Odpowiedzi na pytania o noclegi w Grzybowie, domki nad morzem i rezerwację w Domkach
          Viva.
        </p>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-xl border border-sand-dark bg-surface"
              >
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {item.question}
                    <span className="shrink-0 text-secondary text-xl" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <p className="border-t border-sand px-5 pb-4 pt-2 text-sm leading-relaxed text-ink-muted">
                    {item.answer}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
