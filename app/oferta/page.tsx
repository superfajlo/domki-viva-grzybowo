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
        lead="Komfortowe domki letniskowe w Grzybowie nad morzem – od 2 do 5 osób, z aneksem kuchennym, łazienką i udogodnieniami dla rodzin. Obiekt położony ok. 500 m od plaży, w cichej okolicy blisko Kołobrzegu."
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
