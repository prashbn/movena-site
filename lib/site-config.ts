export const siteConfig = {
  name: "Movena",
  legalName: "Movena Pty Ltd",
  acn: "700 863 618",
  origin: "https://movena.com.au",
  locale: "en_AU",
  language: "en-AU",
  email: "info@movena.com.au",
  supportEmail: "support@movena.com.au",
  businessSignInUrl: "https://app.movena.com.au/sign-in",
  memberApp: {
    path: "/app/",
    url: "https://movena.com.au/app/",
    appStoreUrl: "https://apps.apple.com/au/app/movena/id6770032378",
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=au.com.movena.member&pli=1",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61594035146486",
    instagram: "https://www.instagram.com/movena_au/",
    linkedin: "https://www.linkedin.com/company/movena-au/",
  },
  contactHref: "/contact/",
} as const;

export type SiteConfig = typeof siteConfig;
