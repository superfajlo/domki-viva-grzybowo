import { LogoBrand } from "@/components/LogoBrand";
import { CONTACT, NAV_ITEMS, SEO_KEYWORDS } from "@/lib/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="section-dark-warm border-t border-sand-dark">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <LogoBrand variant="footer" linked={false} size="sm" className="!text-2xl" />
            <p className="mt-3 text-sm text-cream/90">
              Komfortowe noclegi w Grzybowie nad morzem – domki 2, 3, 4 i 5 osobowe około
              500 metrów od plaży.
            </p>
            <address className="mt-4 not-italic text-sm text-cream/85">
              {CONTACT.fullAddress}
              <br />
              <a href={CONTACT.phoneHref} className="mt-2 inline-block font-semibold text-brand-light hover:underline">
                {CONTACT.phone}
              </a>
            </address>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold">Menu</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-cream/85">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold">Noclegi nad morzem</h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/85">
              {SEO_KEYWORDS.slice(0, 8).join(" · ")}
            </p>
            <p className="mt-3 text-xs text-cream/60">
              Grzybowo · Kołobrzeg · Bałtyk · woj. zachodniopomorskie
            </p>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-cream/70">
          © {new Date().getFullYear()} Domki Viva Grzybowo. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
