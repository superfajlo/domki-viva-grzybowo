import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClusterLinks } from "@/components/layout/ClusterLinks";
import { WydarzeniaSection } from "@/components/sections/WydarzeniaSection";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata = pageMetadata("wydarzenia");

export default function WydarzeniaPage() {
  return (
    <>
      <div className="page-container mx-auto max-w-7xl pt-[calc(var(--header-height)+1.5rem)] pb-4">
        <Breadcrumbs
          items={[
            { label: "Start", href: "/" },
            { label: "Wydarzenia w okolicy" },
          ]}
        />
      </div>
      <WydarzeniaSection />
      <ClusterLinks page="wydarzenia" />
    </>
  );
}
