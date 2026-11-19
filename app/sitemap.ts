import type { MetadataRoute } from "next";
import { getAllRecipes, SITE } from "@/lib/recipes";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date() },
    { url: `${SITE}/about`, lastModified: new Date() },
    ...getAllRecipes().map((r) => ({ url: `${SITE}/recipes/${r.slug}`, lastModified: r.updated })),
  ];
}
