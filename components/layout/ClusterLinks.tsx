import Link from "next/link";

const RELATED: Record<string, { href: string; label: string }[]> = {
  oferta: [
    { href: "/cennik/", label: "Cennik" },
    { href: "/galeria/", label: "Galeria" },
    { href: "/kontakt/", label: "Kontakt" },
  ],
  cennik: [
    { href: "/oferta/", label: "Oferta" },
    { href: "/regulamin-obiektu/", label: "Regulamin" },
    { href: "/kontakt/", label: "Rezerwacja" },
  ],
  galeria: [
    { href: "/oferta/", label: "Oferta" },
    { href: "/atrakcje-okolicy/", label: "Atrakcje" },
    { href: "/kontakt/", label: "Kontakt" },
  ],
  atrakcje: [
    { href: "/", label: "Strona główna" },
    { href: "/wydarzenia/", label: "Wydarzenia w okolicy" },
    { href: "/kontakt/", label: "Kontakt" },
  ],
  wydarzenia: [
    { href: "/atrakcje-okolicy/", label: "Atrakcje okolicy" },
    { href: "/oferta/", label: "Oferta" },
    { href: "/kontakt/", label: "Kontakt" },
  ],
  kontakt: [
    { href: "/oferta/", label: "Oferta" },
    { href: "/cennik/", label: "Cennik" },
    { href: "/regulamin-obiektu/", label: "Regulamin" },
  ],
  regulamin: [
    { href: "/cennik/", label: "Cennik" },
    { href: "/kontakt/", label: "Kontakt" },
    { href: "/oferta/", label: "Oferta" },
  ],
};

export function ClusterLinks({ page }: { page: keyof typeof RELATED }) {
  const links = RELATED[page];
  return (
    <nav
      aria-label="Powiązane strony"
      className="border-t border-sand-dark bg-white py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 text-sm">
        <span className="font-medium text-ink-muted">Zobacz także:</span>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full border border-sand-dark px-4 py-2 font-medium text-ink hover:bg-sand hover:text-secondary"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
