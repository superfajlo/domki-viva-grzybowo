"use client";

import { NocowaniePlBadge } from "@/components/NocowaniePlBadge";
import { usePathname } from "next/navigation";

/** Stopka: odznaka Nocowanie.pl, oprócz strony Kontakt (tam jest w sekcji rezerwacji). */
export function FooterNocowanieBadge() {
  const pathname = usePathname();
  if (pathname === "/kontakt" || pathname === "/kontakt/") {
    return null;
  }
  return <NocowaniePlBadge variant="footer" />;
}
