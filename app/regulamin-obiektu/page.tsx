import { ClusterLinks } from "@/components/layout/ClusterLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { RegulaminSection } from "@/components/sections/RegulaminSection";
import { pageMetadata, SEO_PAGES } from "@/lib/seo-pages";

export const metadata = pageMetadata("regulamin");

export default function RegulaminObiektuPage() {
  const seo = SEO_PAGES.regulamin;
  return (
    <>
      <PageIntro
        h1={seo.h1}
        lead="Przed przyjazdem zapoznaj się z zasadami pobytu w Domkach Viva – segregacja odpadów, cisza nocna, doba hotelowa, parking i pozostałe regulacje obowiązujące na terenie obiektu w Grzybowie."
        breadcrumbs={[
          { label: "Start", href: "/" },
          { label: "Regulamin obiektu" },
        ]}
      />
      <RegulaminSection showHeader={false} />
      <ClusterLinks page="regulamin" />
    </>
  );
}
