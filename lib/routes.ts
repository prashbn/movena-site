import { siteConfig } from "./site-config.ts";

export const legacyRoutes = [
  {
    path: "/",
    source: "index.html",
    title: "Movena — The gym platform that remembers the training.",
    description:
      "Memberships, payments, bookings, team management and workout programming. Plus a training history members keep. Movena is built for everyday gyms.",
    socialDescription:
      "Memberships, payments, bookings, team management and workout programming. Plus a training history members keep.",
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
      "One Movena account goes with you. Book sessions, follow your gym’s programs and keep your personal bests—with sharing controlled by you, per gym.",
    socialDescription:
      "One identity. Your training story. Your personal bests stay yours; a new gym sees a summary only if you choose to share.",
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
    path: "/help/ai-assistants/",
    source: "help/ai-assistants/index.html",
    title: "Connect Movena to ChatGPT — Movena Help",
    description:
      "Movena AI connections: ChatGPT setup, permissions, optional member sharing and disconnecting. The Claude connector is enabled; its Anthropic directory listing is in review.",
    kind: "document",
  },
  {
    path: "/integrations/kisi/",
    source: "integrations/kisi/index.html",
    title: "Movena + Kisi — access control for 24/7 and unstaffed gyms",
    description:
      "Connect Movena to Kisi for staffed, 24/7 and unstaffed gyms. Eligible, enrolled members receive access as memberships and bookings change, while Kisi keeps managing the doors and hardware.",
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
      "Movena brings memberships, bookings, payments, check-ins, programming, progress and optional Kisi access together for gyms, studios and coaching businesses.",
    kind: "marketing",
  },
  {
    path: "/pricing/",
    title: "Gym software pricing with unlimited members — Movena",
    description:
      "Simple location-based Movena pricing with unlimited members and team users on every plan.",
    kind: "marketing",
  },
  {
    path: "/integrations/",
    title: "Integrations — Movena",
    description:
      "From the first enquiry to the gym floor: connect leads, memberships, Stripe payments, bookings and Kisi access. Explore booking patterns with permission-based ChatGPT answers.",
    kind: "marketing",
  },
  {
    path: "/app/",
    title: "Movena member app — Movena",
    description:
      "Native Movena apps for iPhone and Android. Book classes, follow your program, track progress and shop for merchandise to collect at your gym.",
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
    title: "Movena Blog — Gym operations, training and performance",
    description:
      "Practical, carefully sourced articles about gym operations, payments, retention, training, wellbeing and performance from Movena.",
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
