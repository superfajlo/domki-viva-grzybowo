import { SITEMAP_PATHS } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map((path) => {
    const priority = path === "/" ? 1 : 0.8;
    return {
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority,
    };
  });
}
