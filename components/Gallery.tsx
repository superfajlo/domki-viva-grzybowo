"use client";

import { GALLERY_IMAGES, GALLERY_SECTIONS } from "@/lib/gallery-images";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hasImages = GALLERY_IMAGES.length > 0;

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : i === 0 ? GALLERY_IMAGES.length - 1 : i - 1,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : i === GALLERY_IMAGES.length - 1 ? 0 : i + 1,
    );
  }, []);

  const sectionOffsets = useMemo(() => {
    let offset = 0;
    return GALLERY_SECTIONS.map((section) => {
      const start = offset;
      offset += section.images.length;
      return { section, start };
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, showNext, showPrev]);

  return (
    <section id="galeria" className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title">Galeria</h2>
        <p className="section-lead">
          Zobacz domki Viva w Grzybowie – noclegi nad morzem, blisko plaży i atrakcji
          wybrzeża Bałtyku.
        </p>

        {!hasImages ? (
          <p className="mt-12 rounded-2xl border border-dashed border-sand-dark bg-cream/50 px-6 py-10 text-center text-ink-muted">
            Galeria zostanie wkrótce uzupełniona o nowe zdjęcia obiektu i wnętrz domków.
          </p>
        ) : (
          <div className="mt-12 space-y-16">
            {sectionOffsets.map(({ section, start }) =>
              section.images.length === 0 ? null : (
                <div key={section.id}>
                  <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {section.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-ink-muted sm:text-base">
                    {section.description}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                    {section.images.map((img, indexInSection) => {
                      const index = start + indexInSection;
                      return (
                        <li key={img.src}>
                          <button
                            type="button"
                            className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-2 ring-transparent transition hover:ring-secondary focus:outline-none focus-visible:ring-secondary"
                            onClick={() => setActiveIndex(index)}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              quality={85}
                              loading="lazy"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition duration-300 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 bg-primary/0 transition group-hover:bg-primary/25" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ),
            )}
          </div>
        )}
      </div>

      {activeIndex !== null && hasImages && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Zamknij"
            onClick={close}
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6"
            aria-label="Poprzednie zdjęcie"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            ‹
          </button>

          <div
            className="relative h-[70vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[activeIndex].src}
              alt={GALLERY_IMAGES[activeIndex].alt}
              fill
              quality={95}
              className="object-contain"
              sizes="100vw"
              priority
            />
            <p className="absolute -bottom-10 left-0 right-0 text-center text-sm text-white/90">
              {GALLERY_IMAGES[activeIndex].alt}
            </p>
          </div>

          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6"
            aria-label="Następne zdjęcie"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
