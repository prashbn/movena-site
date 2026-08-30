export const siteConfig = {
  name: "Movena",
  legalName: "Movena Pty Ltd",
  acn: "700 863 618",
  origin: "https://movena.com.au",
  locale: "en_AU",
  language: "en-AU",
  email: "info@movena.com.au",
  supportEmail: "support@movena.com.au",
} as const;

export type SiteConfig = typeof siteConfig;
