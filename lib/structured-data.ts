import { siteConfig } from "./site-config.ts";
import { blogPath, type BlogPost } from "./blog.ts";
import { faqAnswerText, faqItems } from "./faq.ts";

export type JsonLdValue = Record<string, unknown>;

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: `${siteConfig.origin}/`,
  email: siteConfig.email,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "ACN",
    value: siteConfig.acn,
  },
} satisfies JsonLdValue;

export const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Movena Blog",
  description:
    "Practical, carefully sourced articles about training, wellbeing, recovery and performance.",
  url: `${siteConfig.origin}/blog/`,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: `${siteConfig.origin}/`,
  },
} satisfies JsonLdValue;

export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faqAnswerText(item),
    },
  })),
} satisfies JsonLdValue;

export function articleStructuredData(post: BlogPost): JsonLdValue {
  const url = new URL(blogPath(post.slug), siteConfig.origin).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: new URL(post.image, siteConfig.origin).toString(),
    datePublished: post.published,
    dateModified: post.published,
    articleSection: post.category,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: `${siteConfig.origin}/`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: `${siteConfig.origin}/`,
    },
  };
}

export function serializeJsonLd(value: JsonLdValue): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
