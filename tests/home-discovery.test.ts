import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { homeWorkflows } from "../lib/home-workflows.ts";
import { readLegacyMainMarkup } from "../lib/legacy-content.ts";

const platform = readFileSync("components/home-platform-discovery.tsx", "utf8");
const loop = readFileSync("components/home-loop.tsx", "utf8");
const css = readFileSync("styles/home-discovery.css", "utf8");

test("each discovery category has a concrete three-step workflow and two benefits", () => {
  assert.deepEqual(homeWorkflows.map(area => area.id), ["day", "money", "member", "team"]);
  for (const area of homeWorkflows) {
    assert.equal(area.steps.length, 3);
    assert.equal(area.features.length, 2);
    assert.ok(area.description && area.example && area.note);
    for (const step of area.steps) assert.ok(step.title && step.detail && step.mode);
  }
  assert.match(platform, /Illustrative workflow · Not a product screen/);
  assert.doesNotMatch(JSON.stringify(homeWorkflows), /\b(?:Claude|AI|QuickBooks|Kisi|readiness|injury risk)\b/i);
});

test("workflow copy keeps automatic behaviour, permissions and prerequisites explicit", () => {
  const [day, money, member, team] = homeWorkflows;
  assert.match(day.note, /auto-promote enabled/);
  assert.match(money.steps[1].title, /Stripe retries/);
  assert.match(money.steps[2].detail, /gym’s settings/);
  assert.match(money.features[1][1], /Owner-only Xero/);
  assert.equal(member.steps[1].mode, "Your team");
  assert.equal(member.steps[2].mode, "Your team");
  assert.match(member.features[0][1], /40%.*14 days.*six weeks/);
  assert.match(member.note, /owner must press Recompute/);
  assert.match(member.note, /front desk staff use Members segments instead/);
  assert.equal(team.steps[0].mode, "Owner");
  assert.match(team.note, /Removing a role takes effect immediately/);
});

test("the Loop connects three equal steps without implying front-desk retention access", () => {
  assert.match(loop, /01 \/ Record/);
  assert.match(loop, /02 \/ Keep/);
  assert.match(loop, /03 \/ Act/);
  assert.match(loop, /Members can log their assigned workouts/);
  assert.match(loop, /Eligible logs update personal bests/);
  assert.match(loop, /marked attendance earns milestone badges automatically/);
  assert.match(loop, /Attendance-drop segments and milestone reward queues/);
  assert.match(loop, /Illustrative workflow with example results/);
  assert.doesNotMatch(loop, /fortnight|Retention page|home-discovery-loop__member/);
  assert.match(css, /\.home-page \.home-loop-journey\s*\{[^}]*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /grid-template-rows: subgrid/);
  assert.match(css, /@media \(max-width: 1000px\)/);
});

test("tab discovery preserves keyboard navigation and stable accessible hidden panels", () => {
  for (const key of ["ArrowRight", "ArrowLeft", "Home", "End"]) assert.ok(platform.includes(`"${key}"`));
  assert.match(platform, /role="tablist"/);
  assert.match(platform, /role="tabpanel"/);
  assert.match(platform, /aria-controls=/);
  assert.match(platform, /tabs\.current\[next\]\?\.focus\(\)/);
  assert.match(platform, /hidden=\{index !== active\} inert=/);
  assert.match(css, /\.home-discovery-panel\[hidden\]\s*\{[^}]*visibility: hidden;[^}]*pointer-events: none;/);
  assert.match(css, /grid-area: 1 \/ 1/);
  assert.match(css, /focus-visible/);
});

test("homepage inactivity copy is manual while existing Kisi promotion remains", () => {
  const homepage = readLegacyMainMarkup("index.html");
  assert.match(homepage, /Owners can refresh the inactivity list/);
  assert.match(homepage, /An owner refreshes the list/);
  assert.doesNotMatch(homepage, /attendance puts a member on your list/);
  assert.match(homepage, /Movena is listed in Kisi’s integration marketplace/);
});
