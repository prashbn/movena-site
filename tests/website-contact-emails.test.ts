import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { readLegacyMainMarkup, readUnmodifiedLegacyMainMarkup } from "../lib/legacy-content.ts";
import type { LegacySource } from "../lib/routes.ts";
import { siteConfig } from "../lib/site-config.ts";
import { organizationStructuredData } from "../lib/structured-data.ts";
import { rewriteWebsiteContactEmails } from "../lib/website-contact-emails.ts";

const general = '<a href="mailto:info@movena.com.au">info@movena.com.au</a>';
const privacy = '<a href="mailto:privacy@movena.com.au">privacy@movena.com.au</a>';

test("the rendered privacy policy has dedicated privacy and general legal contacts", () => {
  const source = "legal/privacy/index.html";
  const original = readUnmodifiedLegacyMainMarkup(source);
  const updated = rewriteWebsiteContactEmails(original, source);
  assert.equal(updated.match(/mailto:privacy@movena\.com\.au/g)?.length, 6);
  assert.equal(updated.match(/mailto:info@movena\.com\.au/g)?.length, 2);
  assert.match(readLegacyMainMarkup(source), /deletion of your personal information[\s\S]*?mailto:privacy@movena\.com\.au/);

  // Reversing only the contact changes must restore every other byte of copy.
  const restored = updated
    .replace(`<li><strong>Privacy enquiries:</strong> ${privacy}</li>\n      <li><strong>General legal enquiries:</strong> ${general}</li>`, `<li><strong>Privacy and legal enquiries:</strong> ${privacy}</li>`)
    .replace(`<li>Privacy enquiries: ${privacy}</li>\n      <li>General legal enquiries: ${general}</li>`, `<li>Privacy and legal enquiries: ${privacy}</li>`)
    .replaceAll(privacy, general);
  assert.equal(restored, original);
  assert.match(updated, /Last updated: 8 October 2026/);
});

test("the rendered terms change only contact details and keep legal correspondence at info", () => {
  const source = "legal/terms/index.html";
  const original = readUnmodifiedLegacyMainMarkup(source);
  const updated = rewriteWebsiteContactEmails(original, source);
  assert.equal(updated.match(/mailto:privacy@movena\.com\.au/g)?.length, 4);
  assert.equal(updated.match(/mailto:info@movena\.com\.au/g)?.length, 3);
  const restored = updated
    .replace(`<li>Legal matters: ${general}</li>\n      <li>Privacy matters: ${privacy}</li>`, `<li>Legal and privacy matters: ${general}</li>`)
    .replace(`<li><strong>A legal issue:</strong> ${general}</li>\n      <li><strong>A privacy issue:</strong> ${privacy}</li>`, `<li><strong>A legal or privacy issue:</strong> ${general}</li>`)
    .replace(`Australia. Legal: ${general} Privacy: ${privacy} Product support:`, `Australia. Legal and privacy: ${general} Product support:`)
    .replaceAll(privacy, general);
  assert.equal(restored, original);
  assert.match(updated, /Last updated: 19 September 2026/);
});

test("help separates privacy requests from unchanged product support", () => {
  const help = readLegacyMainMarkup("help/index.html");
  assert.equal(help.match(/mailto:privacy@movena\.com\.au/g)?.length, 2);
  assert.equal(help.match(/mailto:support@movena\.com\.au/g)?.length, 3);
  assert.match(help, /General legal enquiries:<\/strong>.*mailto:info@movena\.com\.au/);
  assert.match(readLegacyMainMarkup("help/ai-assistants/index.html"), /Questions\? Write to.*mailto:privacy@movena\.com\.au/);
});

test("unrelated legacy pages, commercial form links, SEO and footer remain intact", () => {
  for (const source of ["index.html", "platform/index.html", "members/index.html", "integrations/kisi/index.html"] as LegacySource[]) {
    const original = readUnmodifiedLegacyMainMarkup(source);
    assert.equal(rewriteWebsiteContactEmails(original, source), original);
  }
  assert.equal(organizationStructuredData.email, "info@movena.com.au");
  assert.equal(siteConfig.contactHref, "/contact/");
  const footer = readFileSync("components/site-footer.tsx", "utf8");
  assert.doesNotMatch(footer, /salesEmail|privacyEmail|prashan@/);
  const pricing = readFileSync("components/commercial-pricing.tsx", "utf8");
  assert.match(pricing, /href=\{siteConfig.contactHref\}/);
  assert.doesNotMatch(pricing, /mailto:/);
});

test("the contact page exposes functional addresses without adding a founder address", () => {
  const page = readFileSync("app/contact/page.tsx", "utf8");
  for (const property of ["salesEmail", "email", "supportEmail"]) {
    assert.ok(page.includes(`href={\`mailto:${"${siteConfig." + property + "}"}\`}`));
  }
  assert.match(page, /<ContactForm \/>/);
  assert.doesNotMatch(page, /prashan@|developer@/);
});
