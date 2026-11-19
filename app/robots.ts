// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/recipes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}

// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllRecipes, SITE } from "@/lib/recipes";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date() },
    ...getAllRecipes().map((r) => ({
      url: `${SITE}/recipes/${r.slug}`,
      lastModified: new Date(r.updated),
    })),
  ];
}