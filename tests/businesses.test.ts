import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { businessTypes, supportedDisciplines } from "../lib/businesses.ts";

test("the business hub uses approved types and the existing discipline catalogue", () => {
  assert.deepEqual(
    businessTypes.map((business) => business.name),
    [
      "Functional fitness",
      "Strength and conditioning",
      "Pilates and yoga",
      "Boxing and martial arts",
      "Personal training",
      "Multi-discipline gyms",
    ],
  );
  assert.equal(supportedDisciplines.length, 18);
  assert.ok(supportedDisciplines.includes("Pilates"));
  assert.ok(supportedDisciplines.includes("Personal Training"));
});

test("the business hub is text-led and gives owners clear next steps", () => {
  const page = readFileSync("app/businesses/page.tsx", "utf8");

  assert.match(page, /Built for how your business trains\./);
  assert.match(page, /siteConfig\.contactHref/);
  assert.match(page, /href="\/platform\/"/);
  assert.match(page, /href="\/pricing\/"/);
  assert.doesNotMatch(page, /next\/image|<Image/);
  assert.doesNotMatch(page, /white.?label|guarantee|unlimited/i);
});

test("the business hub follows the cool-white system and is responsive", () => {
  const globals = readFileSync("app/globals.css", "utf8");
  const css = readFileSync("styles/businesses.css", "utf8");

  assert.match(globals, /styles\/businesses\.css/);
  assert.match(css, /background: var\(--site-canvas\)/);
  assert.match(css, /background: var\(--site-surface-tint\)/);
  assert.match(css, /background: var\(--site-surface\)/);
  assert.match(css, /@media \(max-width: 860px\)/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(max-width: 480px\)/);
});
