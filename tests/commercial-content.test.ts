import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import {
  movenaPackages,
  optionalAddOns,
  packageComparisonRows,
  platformAdministrationFee,
} from "../lib/commercial.ts";
import { publicIntegrations } from "../lib/integrations.ts";
import { siteConfig } from "../lib/site-config.ts";

const expectedComparisonRows = [
  ["Price", "A$129/mo + GST", "A$349/mo + GST", "Custom"],
  ["Locations", "1", "Up to 3", "Custom"],
  ["Members", "Unlimited", "Unlimited", "Unlimited"],
  ["Owners, managers, staff & coaches", "Unlimited", "Unlimited", "Unlimited"],
  ["Membership & billing", "Included", "Included", "Included"],
  ["Timetable & bookings", "Included", "Included", "Included"],
  ["Member app", "Included", "Included", "Included"],
  ["Programming", "Included", "Included", "Included"],
  ["Messaging", "Included", "Included", "Included"],
  ["Check-in & waivers", "Included", "Included", "Included"],
  ["Core reporting", "Included", "Included", "Included"],
  ["Native Retail / Shop", "—", "Included", "Included"],
  ["Multi-location management", "—", "Included", "Included"],
  ["Advanced analytics", "—", "—", "Included"],
  ["Organisation-wide insights", "—", "—", "Included"],
  ["Enterprise integrations", "—", "—", "Tailored"],
  ["Enterprise onboarding/support", "—", "—", "Tailored"],
] as const;

test("locked package prices and comparison allocation remain exact", () => {
  assert.deepEqual(
    movenaPackages.map(({ name, price }) => [name, price]),
    [
      ["Movena One", "A$129 / month + GST"],
      ["Movena Collective", "A$349 / month + GST"],
      ["Movena Enterprise", "Custom"],
    ],
  );
  assert.deepEqual(packageComparisonRows, expectedComparisonRows);

  const [one, collective, enterprise] = movenaPackages;
  assert.match(one.highlights.join(" "), /Unlimited members/);
  assert.match(one.highlights.join(" "), /Unlimited owners, managers, staff & coaches/);
  assert.doesNotMatch(one.highlights.join(" "), /Native Retail \/ Shop/);
  assert.match(collective.highlights.join(" "), /Unlimited members and team users/);
  assert.match(collective.highlights.join(" "), /Native Retail \/ Shop/);
  assert.match(
    enterprise.highlights.join(" "),
    /Advanced analytics & organisation insights/,
  );
  assert.match(enterprise.highlights.join(" "), /Unlimited members and team users/);

  const commercialModel = JSON.stringify({
    movenaPackages,
    optionalAddOns,
    packageComparisonRows,
  });
  assert.doesNotMatch(commercialModel, /unlimited locations/i);
  assert.match(commercialModel, /unlimited members/i);
  assert.doesNotMatch(commercialModel, /Up to \d+ members|per (?:user|seat)|member cap/i);
  assert.doesNotMatch(commercialModel, /Shopify/i);
});

test("pricing is explicitly free of member and team-user caps", () => {
  const pricingPage = readFileSync("app/pricing/page.tsx", "utf8");
  const publicPricingSources = [
    pricingPage,
    readFileSync("components/commercial-pricing.tsx", "utf8"),
    readFileSync("lib/commercial.ts", "utf8"),
    readFileSync("lib/routes.ts", "utf8"),
  ].join("\n");

  assert.match(pricingPage, /Unlimited members\. Unlimited team\./);
  assert.match(pricingPage, /not by member count or seats/);
  assert.doesNotMatch(
    publicPricingSources,
    /Up to \d[\d,]* (?:active )?members|Custom member scale|per member|member cap/i,
  );
  assert.deepEqual(
    packageComparisonRows.find(([capability]) => capability === "Members"),
    ["Members", "Unlimited", "Unlimited", "Unlimited"],
  );
  assert.deepEqual(
    packageComparisonRows.find(([capability]) => capability.includes("staff")),
    [
      "Owners, managers, staff & coaches",
      "Unlimited",
      "Unlimited",
      "Unlimited",
    ],
  );
});

test("public add-ons contain only capabilities available to order", () => {
  assert.deepEqual(optionalAddOns, [
    {
      name: "Access Control Integration",
      price: "+A$49 / location / month + GST",
      detail:
        "Movena integration fee only. Hardware, installation and access-control provider subscriptions are purchased separately.",
    },
  ]);
  assert.doesNotMatch(JSON.stringify(optionalAddOns), /Branded App|\bAI\b/);
  assert.equal(
    platformAdministrationFee,
    "Plus a 0.30% platform administration fee on applicable Movena-processed payments.",
  );
});

test("business sign-in is an external link with no marketing auth route", () => {
  assert.equal(
    siteConfig.businessSignInUrl,
    "https://app.movena.com.au/sign-in",
  );
  assert.equal(existsSync("app/sign-in"), false);
  assert.equal(existsSync("app/login"), false);

  const header = readFileSync("components/site-header.tsx", "utf8");
  assert.match(header, /businessSignInUrl/);
  assert.doesNotMatch(header, /fetch\s*\(/);
});

test("FAQ is published while deferred download aliases remain absent", () => {
  assert.equal(existsSync("app/faq/page.tsx"), true);
  assert.equal(existsSync("app/businesses/page.tsx"), true);
  assert.equal(existsSync("app/download"), false);
  assert.equal(existsSync("app/app-download"), false);
});

test("desktop and mobile commercial navigation retain accessible controls", () => {
  const header = readFileSync("components/site-header.tsx", "utf8");
  const shellCss = readFileSync("styles/premium-shell.css", "utf8");
  const commercialCss = readFileSync("styles/commercial.css", "utf8");

  for (const label of [
    "For businesses",
    "For members",
    "Member experience",
    "Download the app",
    "Platform",
    "Who it’s for",
    "Pricing",
    "Integrations",
    "FAQ",
    "Blog",
    "Help",
    "Sign in",
    "Talk to Movena",
  ]) {
    assert.match(header, new RegExp(label));
  }

  assert.match(header, /aria-expanded=/);
  assert.match(header, /aria-controls=/);
  assert.match(header, /event\.key !== "Escape"/);
  assert.match(shellCss, /@media \(max-width: 840px\)/);
  assert.match(commercialCss, /@media \(max-width: 760px\)/);
  assert.match(commercialCss, /@media \(max-width: 520px\)/);
  assert.match(commercialCss, /data-plan/);
  assert.doesNotMatch(header, /Product comparison/);
});

test("pricing owns the single package comparison and the legacy route is retired", () => {
  const pricingPage = readFileSync("app/pricing/page.tsx", "utf8");

  assert.match(pricingPage, /<PackageCards \/>/);
  assert.match(pricingPage, /<PaymentOperations \/>/);
  assert.match(pricingPage, /<PlatformFee \/>/);
  assert.match(pricingPage, /<PackageComparison \/>/);
  assert.match(pricingPage, /<OptionalAddOns \/>/);
  assert.match(pricingPage, /<CommercialCta \/>/);
  const pricingFlow = [
    "<PaymentOperations />",
    "<PackageCards />",
    "<PlatformFee />",
    "<PackageComparison />",
    "<OptionalAddOns />",
    "<CommercialCta />",
  ].map((component) => pricingPage.indexOf(component));
  assert.deepEqual(pricingFlow, [...pricingFlow].sort((a, b) => a - b));
  assert.equal(existsSync("app/product-comparison"), false);
});

test("pricing explains Australian payments and accounting export boundaries", () => {
  const components = readFileSync("components/commercial-pricing.tsx", "utf8");

  assert.match(components, /Card, BECS direct debit and PayTo/);
  assert.match(components, /Your own Stripe account/);
  assert.match(
    components,
    /Xero-ready, QuickBooks-ready and MYOB-ready/,
  );
});

test("the public integrations surface remains exact and conservative", () => {
  assert.deepEqual(publicIntegrations, [
    {
      name: "Xero",
      description: "Xero-ready exports.",
      mark: {
        kind: "image",
        src: "/assets/integrations/xero-logo.svg",
        width: 144,
        height: 144,
      },
    },
    {
      name: "QuickBooks®",
      description: "QuickBooks-ready exports.",
      mark: {
        kind: "text",
        label: "QuickBooks®",
      },
    },
    {
      name: "MYOB",
      description: "MYOB-ready exports.",
      mark: {
        kind: "text",
        label: "MYOB",
      },
    },
    {
      name: "Kisi",
      description: "Access control integration — listed in Kisi’s marketplace.",
      href: "/integrations/kisi/",
      mark: {
        kind: "image",
        src: "/assets/integrations/kisi-logo.png",
        width: 228,
        height: 228,
      },
    },
    {
      name: "Apple Health",
      description: "Member-controlled workout and health data from iPhone.",
      mark: {
        kind: "text",
        label: "Apple Health",
      },
    },
    {
      name: "Health Connect",
      description: "Member-controlled health and fitness data from Android.",
      mark: {
        kind: "image",
        src: "/assets/integrations/health-connect-logo.png",
        width: 192,
        height: 192,
      },
    },
    {
      name: "Payments built in",
      description: "Payments and billing, built into Movena.",
      mark: {
        kind: "text",
        label: "Movena",
      },
    },
    {
      name: "Brevo — Available shortly",
      mark: {
        kind: "image",
        src: "/assets/integrations/brevo-logo.svg",
        width: 32,
        height: 32,
      },
    },
  ]);

  const integrationCopy = JSON.stringify(publicIntegrations);
  const integrationCss = readFileSync("styles/integrations.css", "utf8");
  assert.doesNotMatch(integrationCopy, /HealthKit/);
  assert.doesNotMatch(
    integrationCopy,
    /Siri|Gemini|Apple Intelligence|App Intents/i,
  );
  assert.doesNotMatch(
    integrationCopy,
    /GymMaster|Mindbody|Hapana|competitor/i,
  );
  assert.doesNotMatch(
    integrationCopy,
    /apps\.apple\.com|play\.google\.com|QR code|download/i,
  );
  assert.doesNotMatch(
    JSON.stringify(
      publicIntegrations.filter(({ name }) => /QuickBooks|MYOB/.test(name)),
    ),
    /kind":"image"|logo/i,
  );

  const paidAddOns = optionalAddOns.map((addOn) => addOn.name);
  assert.doesNotMatch(paidAddOns.join(" "), /Apple Health|Health Connect/);
  assert.match(paidAddOns.join(" "), /Access Control Integration/);
  assert.doesNotMatch(paidAddOns.join(" "), /Kisi/);
  assert.match(integrationCss, /@media \(max-width: 860px\)/);
  assert.match(integrationCss, /@media \(max-width: 560px\)/);
});

test("Kisi partner proof links to the official listing and setup guide", () => {
  const page = readFileSync("app/integrations/page.tsx", "utf8");

  assert.match(page, /Kisi integration partner/);
  assert.match(page, /Listed in Kisi’s integration marketplace/);
  assert.match(page, /https:\/\/www\.getkisi\.com\/integrations\/movena/);
  assert.match(
    page,
    /https:\/\/docs\.kisi\.io\/marketplace\/fitness\/movena\//,
  );
  assert.match(page, /Kisi remains authoritative for doors/);
  assert.match(page, /For 24\/7 and unstaffed gyms/);
  assert.match(page, /Intuit and QuickBooks are trademarks of Intuit Inc\./);
  assert.match(
    page,
    /MYOB is a registered trademark of MYOB\s+Technology Pty Ltd\./,
  );
});
