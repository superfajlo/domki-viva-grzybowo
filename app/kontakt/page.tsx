import { PageFaq } from "@/components/faq/PageFaq";
import { ClusterLinks } from "@/components/layout/ClusterLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { LogoBrand } from "@/components/LogoBrand";
import { KontaktSection } from "@/components/sections/KontaktSection";
import { KONTAKT_FAQ } from "@/lib/page-faqs";
import { pageMetadata, SEO_PAGES } from "@/lib/seo-pages";

export const metadata = pageMetadata("kontakt");

export default function KontaktPage() {
  const seo = SEO_PAGES.kontakt;
  return (
    <>
      <PageIntro
        h1={seo.h1}
        lead="Rezerwacja noclegów w Domkach Viva – zadzwoń, napisz lub wypełnij formularz. Chętnie podpowiemy wolne terminy, typ domku i warunki pobytu w Grzybowie nad morzem."
        breadcrumbs={[
          { label: "Start", href: "/" },
          { label: "Kontakt" },
        ]}
        aside={<LogoBrand variant="footer" linked={false} className="mx-auto lg:mx-0" />}
      />
      <KontaktSection />
      <PageFaq title="Pytania przed rezerwacją" items={KONTAKT_FAQ} />
      <ClusterLinks page="kontakt" />
    </>
  );
}
