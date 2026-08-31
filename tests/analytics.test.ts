import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const consentSource = readFileSync(
  "components/analytics-consent.tsx",
  "utf8",
);
const eventSource = readFileSync("lib/client-analytics.ts", "utf8");
const contactSource = readFileSync("components/contact-form.tsx", "utf8");
const layoutSource = readFileSync("app/layout.tsx", "utf8");
const footerSource = readFileSync("components/site-footer.tsx", "utf8");
const privacySource = readFileSync(
  "content/legacy/legal/privacy/index.html",
  "utf8",
);
const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
  dependencies?: Record<string, string>;
};

test("Google Analytics stays disabled until a visitor grants consent", () => {
  assert.match(
    consentSource,
    /consent === "granted"[\s\S]*?<GoogleAnalytics gaId=\{measurementId\}/,
  );
  assert.match(consentSource, /ga-disable-/);
  assert.match(consentSource, /removeGoogleAnalyticsCookies/);
  assert.match(consentSource, /Allow analytics/);
  assert.match(consentSource, /Not now/);
  assert.match(consentSource, /window\.location\.reload\(\)/);
  assert.doesNotMatch(layoutSource, /G-[A-Z0-9]{6,}/);
  assert.ok(packageJson.dependencies?.["@next/third-parties"]);
});

test("analytics can be reopened and the privacy policy explains the choice", () => {
  assert.match(layoutSource, /<AnalyticsConsentManager \/>/);
  assert.match(footerSource, /<AnalyticsSettingsButton \/>/);
  assert.match(privacySource, /Optional website analytics:/);
  assert.match(privacySource, /Google Analytics remains off until you allow it/);
  assert.match(privacySource, /Analytics settings/);
  assert.match(privacySource, /Last updated: 31 August 2026/);
});

test("a successful enquiry sends one consent-gated event without form data", () => {
  assert.match(contactSource, /trackContactEnquiry\(\)/);
  assert.match(eventSource, /"generate_lead"/);
  assert.match(eventSource, /form_name: "website_contact"/);
  assert.match(eventSource, /!== "granted"/);
  assert.doesNotMatch(
    eventSource,
    /workEmail|businessName|phone|message|utmSource|referrer/,
  );
});

