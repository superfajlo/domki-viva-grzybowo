import {
  HomeAboutGrzybowo,
  HomeAdvantages,
  HomeAttractionsPreview,
  HomeFaqSection,
  HomePricingTeaser,
  HomeTopicClusterLinks,
} from "@/components/hub/HomeHubContent";
import { HomeGalleryPreview } from "@/components/hub/HomeGalleryPreview";
import { Hero } from "@/components/Hero";
import { DomkiSection } from "@/components/sections/DomkiSection";
import { DronVideoSection } from "@/components/sections/DronVideoSection";
import { WirtualnySpacerSection } from "@/components/sections/WirtualnySpacerSection";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata = pageMetadata("home");

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeAboutGrzybowo />
      <DomkiSection />
      <HomeAdvantages />
      <HomeGalleryPreview />
      <DronVideoSection />
      <HomePricingTeaser />
      <HomeAttractionsPreview />
      <HomeTopicClusterLinks />
      <WirtualnySpacerSection />
      <HomeFaqSection />
    </>
  );
}
