import { siteConfig } from "./site-config.ts";

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

export function serializeJsonLd(value: JsonLdValue): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
