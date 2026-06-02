import { HERO_IMAGE } from "@/lib/gallery-images";

/** Preload Hero – tylko strona główna (grupa tras (home)). */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="preload"
        href={HERO_IMAGE}
        as="image"
        type="image/webp"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
