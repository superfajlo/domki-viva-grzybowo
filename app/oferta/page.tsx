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
        lead="Oferujemy komfortowe, murowane domki letniskowe z antresolą o powierzchni 37 m², położone w spokojnej części Grzybowa, zaledwie około 500 metrów od szerokiej, piaszczystej plaży. Każdy domek został przygotowany z myślą o wygodnym wypoczynku od 2 do 5 osób i wyposażony jest we wszystko, co niezbędne do udanego pobytu nad morzem – funkcjonalny aneks kuchenny, łazienkę, sprzęt plażowy oraz praktyczne wyposażenie zapewniające komfort zarówno podczas krótkich, jak i dłuższych wakacji. Dogodna lokalizacja sprawia, że w najbliższej okolicy znajdują się sklep spożywczy, przystanek autobusowy, poczta, apteka oraz kościół. Dodatkowym atutem jest bliskość Kołobrzegu, do którego można szybko i wygodnie dotrzeć, korzystając z licznych atrakcji turystycznych, restauracji i nadmorskich spacerów."
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
