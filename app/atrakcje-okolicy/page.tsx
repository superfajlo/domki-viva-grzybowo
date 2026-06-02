import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageFaq } from "@/components/faq/PageFaq";
import { ClusterLinks } from "@/components/layout/ClusterLinks";
import { OkolicaAtrakcjeSection } from "@/components/sections/OkolicaAtrakcjeSection";
import { ATRAKCJE_FAQ } from "@/lib/page-faqs";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata = pageMetadata("atrakcje");

export default function AtrakcjeOkolicyPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Start", href: "/" },
            { label: "Atrakcje okolicy" },
          ]}
        />
      </div>
      <OkolicaAtrakcjeSection />
      <PageFaq title="Pytania o okolicę i wypoczynek" items={ATRAKCJE_FAQ} />
      <ClusterLinks page="atrakcje" />
    </>
  );
}
