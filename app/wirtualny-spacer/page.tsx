import { ClusterLinks } from "@/components/layout/ClusterLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { WirtualnySpacerSection } from "@/components/sections/WirtualnySpacerSection";
import { pageMetadata, SEO_PAGES } from "@/lib/seo-pages";

export const metadata = pageMetadata("wirtualnySpacer");

export default function WirtualnySpacerPage() {
  const seo = SEO_PAGES.wirtualnySpacer;
  return (
    <>
      <PageIntro
        h1={seo.h1}
        lead="Poznaj Domki Viva i okolicę przed przyjazdem – wirtualny spacer po obiekcie, kamera na żywo z plaży w Grzybowie, Kołobrzeg 360° oraz widoki z lotu ptaka."
        breadcrumbs={[
          { label: "Start", href: "/" },
          { label: "Wirtualny spacer" },
        ]}
      />
      <WirtualnySpacerSection />
      <ClusterLinks page="wirtualnySpacer" />
    </>
  );
}
