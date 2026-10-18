import assert from "node:assert/strict";
import test from "node:test";
import { readLegacyMainMarkup } from "../lib/legacy-content.ts";
import { rewriteHomepageForOwners } from "../lib/home-owner-copy.ts";
import { ownerHomeWorkflows } from "../lib/home-owner-workflows.ts";

test("owner wording preserves the original homepage media, classes and links", () => {
  const before = readLegacyMainMarkup("index.html");
  const after = rewriteHomepageForOwners(before);
  // Text changes must not remove, reorder or replace any photograph, screenshot,
  // badge, image description, destination or existing layout class.
  for (const attribute of ["src", "srcset", "alt", "href"]) {
    const pattern = new RegExp(`\\b${attribute}="[^"]*"`, "g");
    assert.deepEqual(after.match(pattern), before.match(pattern), attribute);
  }
  const classes = (markup: string) => [...markup.matchAll(/class="([^"]+)"/g)]
    .map(match => match[1]).filter(name => name !== "owner-eyebrow");
  assert.deepEqual(classes(after), classes(before));
  assert.match(after, /<h1>Run every location from one place\.<\/h1>/);
  assert.match(before, /<h1>The gym platform that remembers the training\.<\/h1>/);
  assert.match(after, /Doors that know who’s paid/);
  assert.match(after, /Optional add-on/);
});

test("owner workflows keep the original four-tab shape and human approval", () => {
  assert.deepEqual(ownerHomeWorkflows.map(area => area.id), ["day", "money", "member", "team"]);
  for (const area of ownerHomeWorkflows) assert.equal(area.steps.length, 3);
  const copy = JSON.stringify(ownerHomeWorkflows);
  assert.match(copy, /approve it before anything is sent/);
  assert.match(copy, /escalates overdue follow-ups to you/);
  assert.match(copy, /Facebook and Instagram lead ads/);
  assert.match(copy, /Kanban board/);
  assert.doesNotMatch(copy, /ChatGPT|Claude|payroll|commissions|performance scores|on autopilot|never lose a lead/i);
});
