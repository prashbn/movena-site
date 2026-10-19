import { siteConfig } from "./site-config.ts";
import { blogPath, type BlogPost } from "./blog.ts";
import { faqAnswerText, faqItems } from "./faq.ts";

export type JsonLdValue = Record<string, unknown>;

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.origin}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: `${siteConfig.origin}/`,
  email: siteConfig.email,
  sameAs: Object.values(siteConfig.social),
  identifier: {
    "@type": "PropertyValue",
    propertyID: "ACN",
    value: siteConfig.acn,
  },
} satisfies JsonLdValue;

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.origin}/#website`,
  name: siteConfig.name,
  url: `${siteConfig.origin}/`,
  inLanguage: siteConfig.language,
  publisher: { "@id": organizationStructuredData["@id"] },
} satisfies JsonLdValue;

// Describe the web platform using published capabilities. No invented offers,
// ratings or reviews: this identifies the product, not rich-result eligibility.
export const softwareStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${siteConfig.origin}/#software`,
  name: siteConfig.name,
  url: `${siteConfig.origin}/platform/`,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Gym CRM and management software",
  operatingSystem: "Web browser",
  inLanguage: siteConfig.language,
  description:
    "Australian gym CRM and management software for leads, memberships, bookings, payments, programs and multiple locations.",
  publisher: { "@id": organizationStructuredData["@id"] },
  featureList: [
    "Lead capture, follow-up reminders and a funnel by location",
    "Follow-up email drafts reviewed and approved before sending",
    "Memberships, class bookings and payments",
    "Coach-built programs and recorded training",
    "Multiple locations with location-scoped staff access",
    "Staff tasks and comments on a Kanban board",
  ],
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
    dateModified: post.modified ?? post.published,
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
