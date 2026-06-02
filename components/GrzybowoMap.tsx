"use client";

import { GRZYBOWO_MAP } from "@/lib/site";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function GrzybowoMap() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className="group relative w-full overflow-hidden rounded-2xl border border-sand-dark bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition hover:shadow-[0_8px_32px_rgba(247,198,0,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        onClick={() => setOpen(true)}
        aria-label="Powiększ mapę Grzybowa i okolic"
      >
        <Image
          src={GRZYBOWO_MAP.src}
          alt={GRZYBOWO_MAP.alt}
          width={GRZYBOWO_MAP.width}
          height={GRZYBOWO_MAP.height}
          className="h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 1280px"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-warm-dark/0 transition group-hover:bg-warm-dark/10">
          <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink opacity-0 shadow-md transition group-hover:opacity-100">
            Kliknij, aby powiększyć
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Mapa Grzybowa – powiększenie"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Zamknij"
            onClick={close}
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-h-[90vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GRZYBOWO_MAP.src}
              alt={GRZYBOWO_MAP.alt}
              width={GRZYBOWO_MAP.width}
              height={GRZYBOWO_MAP.height}
              className="h-auto max-h-[85vh] w-full object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
