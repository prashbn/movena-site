import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { readLegacyMainMarkup } from "../lib/legacy-content.ts";
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
  "/pricing/",
  "/integrations/",
  "/app/",
  "/contact/",
  "/blog/",
  "/faq/",
];

test("the explicit route manifest contains the seven legacy and six commercial routes", () => {
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

test("the live homepage uses the approved public-facing payments copy", () => {
  const homepage = readLegacyMainMarkup("index.html");
  const platform = readLegacyMainMarkup("platform/index.html");

  assert.match(homepage, />Payments built in</);
  assert.match(homepage, /Take payments online/);
  assert.match(platform, /Online payments/);
  assert.doesNotMatch(homepage, /Stripe/);
  assert.doesNotMatch(platform, /Stripe/);
  assert.doesNotMatch(homepage, /Other gym software\? Yeah, nah/);
  assert.doesNotMatch(homepage, /Movena\? Nah, yeah/);
});

test("the retired product comparison route permanently redirects into pricing", () => {
  const nextConfig = readFileSync("next.config.ts", "utf8");

  assert.match(nextConfig, /source: "\/product-comparison\/"/);
  assert.match(nextConfig, /destination: "\/pricing\/#compare"/);
  assert.match(nextConfig, /permanent: true/);
});
