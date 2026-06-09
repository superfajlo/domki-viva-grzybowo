import { SITEMAP_PATHS } from "@/lib/seo-pages";
import { SITE_URL, VIVA_VIRTUAL_TOUR_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

/** Dodatkowe URL-e poza podstronami SEO (np. wirtualny spacer) */
const EXTRA_SITEMAP: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  {
    path: VIVA_VIRTUAL_TOUR_URL,
    priority: 0.6,
    changeFrequency: "yearly",
  },
];

function toSitemapUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = SITEMAP_PATHS.map((path) => ({
    url: toSitemapUrl(path),
    lastModified: new Date(),
    changeFrequency: (path === "/" ? "weekly" : "monthly") as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: path === "/" ? 1 : 0.8,
  }));

  const extra = EXTRA_SITEMAP.map((entry) => ({
    url: toSitemapUrl(entry.path),
    lastModified: new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  return [...pages, ...extra];
}
