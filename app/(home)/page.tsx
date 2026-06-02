import {
  HomeAboutGrzybowo,
  HomeAdvantages,
  HomeAttractionsPreview,
  HomeFaqSection,
  HomeTopicClusterLinks,
} from "@/components/hub/HomeHubContent";
import { Hero } from "@/components/Hero";
import { WirtualnySpacerSection } from "@/components/sections/WirtualnySpacerSection";
import { pageMetadata } from "@/lib/seo-pages";

export const metadata = pageMetadata("home");

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeAboutGrzybowo />
      <HomeAdvantages />
      <HomeAttractionsPreview />
      <HomeTopicClusterLinks />
      <WirtualnySpacerSection />
      <HomeFaqSection />
    </>
  );
}
