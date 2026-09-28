import type { Metadata } from "next";

import { canonicalUrl, type PublicRoute } from "./routes.ts";
import { siteConfig } from "./site-config.ts";

type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  socialDescription?: string;
};

export function createPageMetadata({
  path,
  title,
  description,
  socialDescription = description,
}: PageMetadataInput): Metadata {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url,
      title,
      description: socialDescription,
      images: [
        {
          url: "/brand/social-dark-1200x630.png",
          width: 1200,
          height: 630,
          alt: "Movena",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
      images: ["/brand/social-dark-1200x630.png"],
    },
  };
}

export function createRouteMetadata(route: PublicRoute): Metadata {
  return createPageMetadata({
    path: route.path,
    title: route.title,
    description: route.description,
    socialDescription:
      "socialDescription" in route
        ? route.socialDescription
        : route.description,
  });
}
