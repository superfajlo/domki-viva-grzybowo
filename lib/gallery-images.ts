import manifest from "./gallery-manifest.json";

export type GalleryImage = {
  src: string;
  alt: string;
  orientation?: "landscape" | "portrait";
};

export type GallerySection = {
  id: string;
  title: string;
  description: string;
  images: readonly GalleryImage[];
};

/** Galeria – generowane przez npm run sync:gallery */
export const GALLERY_SECTIONS = manifest.sections as readonly GallerySection[];

export const GALLERY_IMAGES = GALLERY_SECTIONS.flatMap((section) => [...section.images]);

/** Hero – zdjęcie główne obiektu (public/images/viva/glowne/) */
export const HERO_IMAGE = manifest.heroImage;

/** Open Graph – 1200×630 WebP (scripts/generate-favicons-og.mjs) */
export const OG_IMAGE = "/images/og-domki-viva.webp";
