import { Gallery } from "@/components/Gallery";
import { ClusterLinks } from "@/components/layout/ClusterLinks";
import { PageIntro } from "@/components/layout/PageIntro";
import { pageMetadata, SEO_PAGES } from "@/lib/seo-pages";

export const metadata = pageMetadata("galeria");

export default function GaleriaPage() {
  const seo = SEO_PAGES.galeria;
  return (
    <>
      <PageIntro
        h1={seo.h1}
        lead="Zdjęcia domków Viva, wnętrz, łazienek i terenu obiektu w Grzybowie. Zobacz, jak wygląda pobyt nad morzem, zanim zarezerwujesz termin – ofertę opisujemy na osobnej podstronie."
        breadcrumbs={[
          { label: "Start", href: "/" },
          { label: "Galeria" },
        ]}
      />
      <Gallery />
      <ClusterLinks page="galeria" />
    </>
  );
}
