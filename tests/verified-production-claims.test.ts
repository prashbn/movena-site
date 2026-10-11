import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { blogPostBySlug } from "../lib/blog.ts";
import { packageComparisonRows } from "../lib/commercial.ts";
import { faqItems } from "../lib/faq.ts";
import { homeWorkflows } from "../lib/home-workflows.ts";
import { publicIntegrations } from "../lib/integrations.ts";
import { readLegacyMainMarkup } from "../lib/legacy-content.ts";

test("11 October verification replaces the erroneous retention threshold and permissions", () => {
  const retention = JSON.stringify(blogPostBySlug("notice-member-drift-before-cancellation"));
  const workflow = JSON.stringify(homeWorkflows.find(({ id }) => id === "member"));
  for (const copy of [retention, workflow]) {
    assert.doesNotMatch(copy, /40%|AI-powered|predicts churn/i);
    assert.match(copy, /four classes.*six weeks/);
    assert.match(copy, /Absent/);
    assert.match(copy, /Recompute/);
    assert.match(copy, /only owners and coaches/i);
    assert.match(copy, /email or SMS/);
  }
  assert.match(retention, /New active members with no attendance records/);
  assert.match(retention, /Flags never clear automatically/);
});

test("public member check-in is kiosk-only and waitlist promotion is conditional", () => {
  const members = readLegacyMainMarkup("members/index.html");
  assert.match(members, /30 minutes by default/);
  assert.match(members, /next person in the queue/);
  assert.match(members, /before booking closes and class starts/);
  assert.doesNotMatch(JSON.stringify(homeWorkflows), /check in from their account/);
  assert.doesNotMatch(readFileSync("app/app/page.tsx", "utf8"), /Book classes, check in/);
});

test("attendance challenges retain all three metrics and exclude workout results", () => {
  for (const copy of [readLegacyMainMarkup("members/index.html"), readLegacyMainMarkup("platform/index.html"), JSON.stringify(faqItems)]) {
    assert.match(copy, /classes attended, minutes attended or (?:a )?daily streak/i);
    assert.match(copy, /[Ww]orkout results/);
  }
});

test("portable personal bests do not imply portable gym records or permanent badges", () => {
  const members = readLegacyMainMarkup("members/index.html");
  const homepage = readLegacyMainMarkup("index.html");
  assert.match(members, /5, 25, 50, 100, 150, 200, 250, 500 and 1,000/);
  assert.match(members, /Badges stay with the gym/);
  assert.match(members, /Raw workout logs aren’t shared across gyms/);
  assert.match(members, /Account deletion is by request/);
  assert.match(homepage, /new gym sees a summary only with their permission/);
  assert.doesNotMatch(members + homepage, /kept permanently|kept for good|Change gyms, keep the history/);
});

test("Shop is on every plan and fulfilment is gym collection with Stripe", () => {
  assert.deepEqual(packageComparisonRows.find(([name]) => name === "Native Retail / Shop"), ["Native Retail / Shop", "Included", "Included", "Included"]);
  assert.match(readLegacyMainMarkup("members/index.html"), /No delivery or shipping/);
  const platform = readLegacyMainMarkup("platform/index.html");
  assert.match(platform, /physical merchandise on every plan/);
  assert.match(platform, /with Stripe configured/);
});

test("accounting and Claude status distinguish shipped functionality from directory review", () => {
  const copy = JSON.stringify(publicIntegrations);
  assert.doesNotMatch(copy, /Brevo|Connect QuickBooks directly|not yet available/);
  assert.match(copy, /CSV statements for QuickBooks/);
  assert.match(copy, /OFX statements for MYOB/);
  assert.match(copy, /connector is enabled in production/);
  assert.match(copy, /directory listing is in review/);
});
