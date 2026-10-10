import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync("app/concept/page.tsx", "utf8");
const css = readFileSync("app/concept/page.module.css", "utf8");

test("the homepage concept is a separate static no-index route", () => {
  assert.match(page, /robots: \{ index: false, follow: false \}/);
  assert.match(page, /Homepage concept · For review only/);
  assert.match(page, /<SiteHeader \/>/);
  assert.match(page, /<SiteFooter marketing \/>/);
  assert.doesNotMatch(page, /use client|<script|<iframe/);
  for (const file of ["app/page.tsx", "components/site-header.tsx", "components/site-footer.tsx", "lib/routes.ts"]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /\/concept\//);
  }
});

test("the concept uses existing Movena assets and one ordered product story", () => {
  for (const name of ["concept-heading", "run-heading", "training-heading", "member-heading", "community-heading", "closing-heading"]) {
    assert.ok(page.includes(`id="${name}"`));
  }
  assert.ok(page.indexOf('id="run-heading"') < page.indexOf('id="training-heading"'));
  assert.ok(page.indexOf('id="training-heading"') < page.indexOf('id="member-heading"'));
  assert.ok(page.indexOf('id="member-heading"') < page.indexOf('id="community-heading"'));
  for (const [, path] of page.matchAll(/(?:src|srcSet)="(\/[^" ]+)/g)) {
    assert.equal(existsSync(`public${path}`), true, path);
  }
  assert.match(page, /Actual product screen · Demonstration data/);
  assert.match(page, /What’s On/);
  assert.match(page, /Know How/);
  assert.match(page, /The Goss/);
});

test("concept styles stay scoped, responsive, and aligned with the approved identity", () => {
  assert.match(page, /page\.module\.css/);
  assert.match(css, /var\(--site-blue\)/);
  assert.match(css, /var\(--site-navy\)/);
  assert.match(css, /var\(--site-surface-tint\)/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i);
  assert.match(css, /max-width: 800px/);
  assert.match(css, /max-width: 520px/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /focus-visible/);
  assert.match(css, /\.phone img \{[^}]*height: auto/);
  assert.match(css, /\.communityPhoto img \{[^}]*height: auto/);
  assert.doesNotMatch(css, /100vw|position: fixed/);
});
