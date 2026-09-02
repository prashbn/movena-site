import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  readLegacyDocument,
  readLegacyMainMarkup,
} from "../lib/legacy-content.ts";
import { createRouteMetadata } from "../lib/metadata.ts";
import {
  canonicalUrl,
  legacyRoutes,
  publicRoutes,
  withTrailingSlash,
} from "../lib/routes.ts";

const expectedPaths = [
  "/",
  "/platform/",
  "/members/",
  "/help/",
  "/integrations/kisi/",
  "/legal/privacy/",
  "/legal/terms/",
  "/businesses/",
  "/pricing/",
  "/integrations/",
  "/app/",
  "/contact/",
  "/blog/",
  "/faq/",
];

test("the explicit route manifest contains the seven legacy and seven commercial routes", () => {
  assert.deepEqual(
    publicRoutes.map((route) => route.path),
    expectedPaths,
  );
});

test("canonical path and URL generation preserve trailing slashes", () => {
  assert.equal(withTrailingSlash("/"), "/");
  assert.equal(withTrailingSlash("platform"), "/platform/");
  assert.equal(withTrailingSlash("/legal/privacy"), "/legal/privacy/");

  for (const route of publicRoutes) {
    const expectedCanonical = `https://movena.com.au${route.path}`;
    const metadata = createRouteMetadata(route);

    assert.equal(canonicalUrl(route.path), expectedCanonical);
    assert.equal(metadata.alternates?.canonical, expectedCanonical);
    assert.equal(metadata.openGraph?.url, expectedCanonical);
    assert.equal(metadata.title, route.title);
    assert.equal(metadata.description, route.description);
  }
});

test("legacy internal links are rewritten to canonical slash routes", () => {
  const knownPaths = new Set(expectedPaths);

  for (const route of legacyRoutes) {
    const markup = readLegacyMainMarkup(route.source);
    const hrefs = Array.from(markup.matchAll(/href="([^"]+)"/g), (match) =>
      match[1],
    );

    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("/assets/")) continue;

      const path = href.split(/[?#]/, 1)[0];
      assert.ok(
        knownPaths.has(path),
        `${route.source} links to unknown internal route ${href}`,
      );
    }
  }
});

test("the live marketing pages use the approved public-facing payments copy", () => {
  const homepage = readLegacyMainMarkup("index.html");
  const platform = readLegacyMainMarkup("platform/index.html");
  const sourceMarkup = [
    readLegacyDocument("index.html"),
    readLegacyDocument("platform/index.html"),
  ].join("\n");

  assert.match(homepage, /Card, BECS direct debit and PayTo/);
  assert.match(homepage, /Xero-ready, QuickBooks-ready and MYOB-ready/);
  assert.match(platform, /Offer card, BECS direct debit or PayTo/);
  assert.match(platform, /Your Stripe account/);
  assert.doesNotMatch(homepage, /Stripe/);
  assert.doesNotMatch(homepage, /Other gym software\? Yeah, nah/);
  assert.doesNotMatch(homepage, /Movena\? Nah, yeah/);
  assert.doesNotMatch(homepage, /Closed beta|limited number of Australian gyms/);
  assert.doesNotMatch(platform, /Closed beta/);
  assert.doesNotMatch(
    sourceMarkup,
    /Closed beta|limited number of Australian gyms|limited onboarding/i,
  );
  assert.match(homepage, /Available now for Australian gyms/);
  assert.match(platform, /Know what changed\. Know what to do next\./);
  assert.match(platform, /\/product-screenshots\/movena-financials\.png/);
  assert.match(platform, /\/product-screenshots\/movena-program-builder\.png/);
  assert.match(platform, /\/product-screenshots\/movena-exercise-library\.png/);
});

test("the retired product comparison route permanently redirects into pricing", () => {
  const nextConfig = readFileSync("next.config.ts", "utf8");

  assert.match(nextConfig, /source: "\/product-comparison\/"/);
  assert.match(nextConfig, /destination: "\/pricing\/#compare"/);
  assert.match(nextConfig, /permanent: true/);
});
