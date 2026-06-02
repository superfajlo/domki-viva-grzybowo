import { PageFaq } from "@/components/faq/PageFaq";
import { ClusterLinks } from "@/components/layout/ClusterLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { CennikSection } from "@/components/sections/CennikSection";
import { CENNIK_FAQ } from "@/lib/page-faqs";
import { pageMetadata, SEO_PAGES } from "@/lib/seo-pages";

export const metadata = pageMetadata("cennik");

export default function CennikPage() {
  const seo = SEO_PAGES.cennik;
  return (
    <>
      <PageIntro
        h1={seo.h1}
        lead="Aktualne stawki za dobę w Domkach Viva w Grzybowie – sezon 2026, weekend majowy, pobyty lipiec–sierpień oraz zasady minimum 6 noclegów. Szczegóły organizacyjne uzupełnia Regulamin obiektu."
        breadcrumbs={[
          { label: "Start", href: "/" },
          { label: "Cennik" },
        ]}
      />
      <CennikSection />
      <PageFaq
        title="Pytania o ceny i terminy"
        items={CENNIK_FAQ}
      />
      <ClusterLinks page="cennik" />
    </>
  );
}
