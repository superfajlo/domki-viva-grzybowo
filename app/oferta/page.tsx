import { PageFaq } from "@/components/faq/PageFaq";
import { ClusterLinks } from "@/components/layout/ClusterLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { DomkiSection } from "@/components/sections/DomkiSection";
import { DronVideoSection } from "@/components/sections/DronVideoSection";
import { UdogodnieniaSection } from "@/components/sections/UdogodnieniaSection";
import { OFERTA_FAQ } from "@/lib/page-faqs";
import { pageMetadata, SEO_PAGES } from "@/lib/seo-pages";

export const metadata = pageMetadata("oferta");

export default function OfertaPage() {
  const seo = SEO_PAGES.oferta;
  return (
    <>
      <PageIntro
        h1={seo.h1}
        lead="Komfortowe, murowane domki letniskowe z antresolą (37 m²) w Grzybowie nad morzem – zakwaterowanie dla 2–5 osób. Na parterze i antresoli: aneks kuchenny, łazienka, sprzęt plażowy i bogate wyposażenie. Obiekt ok. 500 m od morza, w spokojnej okolicy – w pobliżu sklep, przystanek autobusowy, poczta, apteka i kościół; szybki dojazd do Kołobrzegu."
        breadcrumbs={[
          { label: "Start", href: "/" },
          { label: "Oferta" },
        ]}
      />
      <DomkiSection />
      <UdogodnieniaSection />
      <PageFaq
        title="Pytania o ofertę domków"
        lead="Odpowiedzi dotyczą wyłącznie zakwaterowania – ceny znajdziesz w Cenniku."
        items={OFERTA_FAQ}
      />
      <ClusterLinks page="oferta" />
      <DronVideoSection />
    </>
  );
}
