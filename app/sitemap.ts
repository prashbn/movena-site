import type { MetadataRoute } from "next";

import { canonicalUrl, publicRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: canonicalUrl(route.path),
  }));
}
