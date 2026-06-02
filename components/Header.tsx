"use client";

import { LogoBrand } from "@/components/LogoBrand";
import { NAV_ITEMS } from "@/lib/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isActivePath(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  const base = href.replace(/\/$/, "");
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="page-container flex h-[var(--header-height)] max-w-7xl items-center justify-between gap-3 py-0">
        <LogoBrand variant="dark" size="lg" className="max-w-[min(100%,14rem)] sm:max-w-none" />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Menu główne">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-2.5 py-2 text-sm font-medium transition-colors xl:px-3 ${
                  active
                    ? "bg-sand text-ink"
                    : "text-ink-muted hover:bg-sand hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          href="tel:+48507130571"
          className="btn-cta hidden min-h-11 shrink-0 !px-4 !py-2 !text-sm md:inline-flex"
        >
          507 130 571
        </a>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-black/[0.08] bg-white lg:hidden"
          aria-label="Menu mobilne"
        >
          <ul className="page-container flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex min-h-11 items-center rounded-lg px-3 text-base font-medium ${
                      active ? "bg-sand text-ink" : "text-ink hover:bg-sand"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-sand-dark pt-3">
              <a
                href="tel:+48507130571"
                className="btn-cta flex min-h-11 w-full items-center justify-center !rounded-xl"
              >
                Zadzwoń: 507 130 571
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
