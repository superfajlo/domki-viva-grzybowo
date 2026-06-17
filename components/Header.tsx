"use client";

import { LogoBrand } from "@/components/LogoBrand";
import { NAV_ITEMS } from "@/lib/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function normalizePath(href: string): string {
  const path = href.split("#")[0];
  if (!path || path === "/") return "/";
  return path.replace(/\/$/, "");
}

function isActivePath(pathname: string, href: string) {
  if (href.includes("#")) return false;
  const base = normalizePath(href);
  if (base === "/") return pathname === "/";
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

  const linkClass = (active: boolean, desktop: boolean) => {
    if (desktop) {
      return `relative z-10 shrink-0 rounded-full px-2.5 py-2 text-sm font-semibold transition-colors duration-200 xl:px-3 ${
        active
          ? "bg-sand-dark text-ink"
          : "text-ink-muted hover:bg-sand-dark hover:text-ink"
      }`;
    }
    return `relative z-10 flex min-h-11 items-center rounded-lg px-3 text-base font-semibold ${
      active ? "bg-sand text-ink" : "text-ink hover:bg-sand"
    }`;
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="page-container flex h-[var(--header-height)] max-w-7xl items-center gap-2 py-0 sm:gap-3">
        <LogoBrand variant="dark" size="lg" className="max-w-[min(100%,14rem)] shrink-0 sm:max-w-none" />

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto overscroll-x-contain px-1 lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Menu główne"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                prefetch={item.href.startsWith("/#") ? false : true}
                className={linkClass(active, true)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0 lg:gap-3">
          <a
            href="tel:+48507130571"
            className="btn-cta relative z-10 hidden min-h-11 !px-4 !py-2 !text-sm md:inline-flex"
          >
            507 130 571
          </a>

          <button
            type="button"
            className="relative z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-ink lg:hidden"
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
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={item.href.startsWith("/#") ? false : true}
                    className={linkClass(active, false)}
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
