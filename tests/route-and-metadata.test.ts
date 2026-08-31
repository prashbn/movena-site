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
];

test("the explicit route manifest contains the seven legacy and four commercial routes", () => {
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

test("the retired product comparison route permanently redirects into pricing", () => {
  const nextConfig = readFileSync("next.config.ts", "utf8");

  assert.match(nextConfig, /source: "\/product-comparison\/"/);
  assert.match(nextConfig, /destination: "\/pricing\/#compare"/);
  assert.match(nextConfig, /permanent: true/);
});
