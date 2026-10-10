import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { readLegacyMainMarkup } from "../lib/legacy-content.ts";
import { rewriteWebsiteCapabilityCopy } from "../lib/website-capability-copy.ts";

test("member identity is prominent without promising universal gym access", () => {
  const members = readLegacyMainMarkup("members/index.html");
  assert.match(members, /<h1>One identity\.<br>Your training story\.<\/h1>/);
  assert.match(members, /sessions, programs, results and milestones—connected through one Movena identity/);
  assert.match(members, /You join through their invite/);
  assert.match(members, /If your gym enables automatic promotion/);
  assert.doesNotMatch(members, /Different gyms\. Still you|access to every gym/i);
  assert.match(readLegacyMainMarkup("index.html"), /One identity\. Their training story\./);
});

test("platform copy separates connections, exports and gym-enabled automation", () => {
  const platform = readLegacyMainMarkup("platform/index.html");
  assert.doesNotMatch(platform, /Book a walkthrough|attendance, minutes, or streaks|promotion happens automatically/);
  assert.match(platform, /Book a demo/);
  assert.match(platform, /automatic promotion when your gym enables it/);
  assert.match(platform, /attendance-based challenges, scored from marked attendance/);
  assert.match(platform, /owners refresh the list/);
  assert.match(platform, /connect Xero or QuickBooks directly/);
  assert.match(platform, /MYOB uses exports, not a direct connection/);
});

test("AI help agrees with Claude availability and preserves sharing safeguards", () => {
  const help = readLegacyMainMarkup("help/ai-assistants/index.html");
  assert.match(help, /Last updated: 11 October 2026/);
  assert.match(help, /id="claude">Claude — in review/);
  assert.match(help, /not yet available/);
  assert.doesNotMatch(help, /Add custom connector|api\/mcp|Make the same choices as above/);
  assert.match(help, /Every choice starts unticked/);
  assert.match(help, /The assistant can only read/);
  assert.match(help, /My training and My session health are separate choices/);
  assert.match(help, /Members aged 18 or over/);
  assert.match(help, /access is checked on every request/);
});

test("integration outcomes describe a connected journey without promising autonomous agents", () => {
  const page = readFileSync("app/integrations/page.tsx", "utf8");
  assert.match(page, /From the first enquiry to the gym floor/);
  for (const title of ["New lead", "Membership", "Booking", "Gym access"]) {
    assert.ok(page.includes(`title: "${title}"`));
  }
  assert.match(page, /Read-only, permission-based answers—not autonomous changes/);
  assert.match(page, /separate, optional choices for eligible adult members/);
  assert.doesNotMatch(page, /AI responds to leads|AI assigns|AI checks completion|AI escalates|api\/mcp/i);
  assert.match(page, /href="\/help\/ai-assistants\/#chatgpt"/);
});

test("capability refresh never rewrites legal policies or unrelated source pages", () => {
  for (const source of ["legal/privacy/index.html", "legal/terms/index.html", "help/index.html", "integrations/kisi/index.html"] as const) {
    assert.equal(rewriteWebsiteCapabilityCopy("Unchanged policy text", source), "Unchanged policy text");
  }
});
