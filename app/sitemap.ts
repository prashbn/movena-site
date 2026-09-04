import type { MetadataRoute } from "next";

import { blogPath, blogPosts } from "@/lib/blog";
import { canonicalUrl, publicRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicRoutes.map((route) => ({
      url: canonicalUrl(route.path),
      ...(route.path === "/pricing/"
        ? { lastModified: "2026-09-04" }
        : {}),
    })),
    ...blogPosts.map((post) => ({
      url: canonicalUrl(blogPath(post.slug)),
      lastModified: post.published,
    })),
  ];
}
