import { siteConfig } from "./site-config.ts";

export const legacyRoutes = [
  {
    path: "/",
    source: "index.html",
    title: "Movena — The gym platform that remembers the training.",
    description:
      "Memberships, timetable, billing and check-in — plus a training history members keep. Movena is the performance intelligence platform for everyday gyms.",
    socialDescription:
      "Memberships, timetable, billing and check-in. Plus a training history members keep.",
    kind: "marketing",
  },
  {
    path: "/platform/",
    source: "platform/index.html",
    title: "The platform — Movena",
    description:
      "Memberships and billing, timetable and bookings, kiosk check-in, waivers, leads, messaging, programming, roles and locations — everything a gym runs on, in one platform.",
    socialDescription:
      "Everything a gym runs on, in one place — and one member record behind all of it.",
    kind: "marketing",
  },
  {
    path: "/members/",
    source: "members/index.html",
    title: "For members — Movena",
    description:
      "Book classes, check in, follow your program, and watch a training history build with every session — badges, challenges and a record that's yours to keep.",
    socialDescription:
      "Your training, remembered. Book, check in, follow a program, and keep the history.",
    kind: "marketing",
  },
  {
    path: "/help/",
    source: "help/index.html",
    title: "Help & Support — Movena",
    description:
      "Get help with the Movena member app — contact details, account access, bookings, billing, messaging and health data.",
    kind: "document",
  },
  {
    path: "/integrations/kisi/",
    source: "integrations/kisi/index.html",
    title: "Movena + Kisi — door access from your memberships",
    description:
      "Connect Movena to Kisi and memberships become door access. Eligible, enrolled members receive the right access automatically as their memberships and bookings change — Kisi keeps managing the doors and hardware.",
    kind: "document",
  },
  {
    path: "/legal/privacy/",
    source: "legal/privacy/index.html",
    title: "Privacy Policy — Movena",
    description:
      "Movena privacy policy — what the member apps and platform collect, how it is used, who it is shared with, and your choices.",
    kind: "document",
  },
  {
    path: "/legal/terms/",
    source: "legal/terms/index.html",
    title: "Terms of Service — Movena",
    description:
      "Movena terms of service — how the member apps and platform may be used, your gym's role, payments, health features and Australian consumer rights.",
    kind: "document",
  },
] as const;

export const commercialRoutes = [
  {
    path: "/businesses/",
    title: "Gym and studio software — Who Movena is for",
    description:
      "Movena brings memberships, bookings, payments, check-ins, programming and progress together for gyms, studios and coaching businesses.",
    kind: "marketing",
  },
  {
    path: "/pricing/",
    title: "Pricing — Movena",
    description:
      "Simple location-based Movena pricing with unlimited members and team users on every plan.",
    kind: "marketing",
  },
  {
    path: "/integrations/",
    title: "Integrations — Movena",
    description:
      "Movena integrations for accounting, access control, health and fitness data, payments and billing infrastructure.",
    kind: "marketing",
  },
  {
    path: "/app/",
    title: "Movena member app — Movena",
    description:
      "Native Movena member apps for iPhone and Android. Book classes, check in, follow your program, and watch a training history build with every session.",
    kind: "marketing",
  },
  {
    path: "/contact/",
    title: "Talk to Movena — Movena",
    description:
      "Tell Movena about your gym, locations and the platform capabilities you are interested in.",
    kind: "marketing",
  },
  {
    path: "/blog/",
    title: "Movena Blog — Training, wellbeing and performance",
    description:
      "Practical, carefully sourced articles about training, wellbeing, recovery and performance from Movena.",
    kind: "marketing",
  },
  {
    path: "/faq/",
    title: "Frequently asked questions — Movena",
    description:
      "Clear answers about Movena contracts, data migration, payments, the member app, Kisi access control, lead tracking, data hosting and ownership.",
    kind: "marketing",
  },
] as const;

export const publicRoutes = [...legacyRoutes, ...commercialRoutes] as const;

export type PublicRoute = (typeof publicRoutes)[number];
export type PublicPath = PublicRoute["path"];
export type LegacySource = (typeof legacyRoutes)[number]["source"];

export function withTrailingSlash(path: string): string {
  if (path === "/") return path;
  return `${path.replace(/^\/+|\/+$/g, "")}/`.replace(/^/, "/");
}

export function canonicalUrl(path: string): string {
  return new URL(withTrailingSlash(path), `${siteConfig.origin}/`).toString();
}

export function routeByPath<Path extends PublicPath>(
  path: Path,
): Extract<PublicRoute, { path: Path }> {
  const route = publicRoutes.find((candidate) => candidate.path === path);

  if (!route) {
    throw new Error(`Unknown public route: ${path}`);
  }

  return route as Extract<PublicRoute, { path: Path }>;
}
