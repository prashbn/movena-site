import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { readLegacyMainMarkup } from "../lib/legacy-content.ts";

test("the homepage uses its dedicated static shell", () => {
  const page = readFileSync("app/page.tsx", "utf8");
  const shells = readFileSync("components/page-shells.tsx", "utf8");

  assert.match(page, /HomePageShell/);
  assert.match(shells, /className="site-shell home-page"/);
  assert.doesNotMatch(page, /["']use client["']/);
  assert.doesNotMatch(shells, /["']use client["']/);
});

test("the visual system includes responsive and reduced-motion contracts", () => {
  const shellCss = readFileSync("styles/premium-shell.css", "utf8");
  const homeCss = readFileSync("styles/home.css", "utf8");

  assert.match(shellCss, /@media \(max-width: 840px\)/);
  assert.match(homeCss, /@media \(max-width: 900px\)/);
  assert.match(homeCss, /@media \(max-width: 640px\)/);
  assert.match(homeCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(homeCss, /\.home-page \.shot/);
});

test("the retention section uses the complete new badge collection", () => {
  const homepage = readLegacyMainMarkup("index.html");
  const homeCss = readFileSync("styles/home.css", "utf8");

  for (const badge of [
    "retention-milestone-005.png",
    "retention-milestone-025.png",
    "retention-milestone-050.png",
    "retention-milestone-100.png",
    "retention-milestone-150.png",
    "retention-milestone-200.png",
    "retention-milestone-500.png",
    "retention-challenge-weekly.png",
    "retention-challenge-monthly.png",
    "retention-challenge-complete.png",
    "retention-challenge-winner.png",
  ]) {
    assert.match(homepage, new RegExp(`/assets/badges/${badge}`));
  }

  assert.doesNotMatch(homepage, /src="\/assets\/badges\/milestone-/);
  assert.match(homepage, /badge-collection__label">Milestones/);
  assert.match(homepage, /badge-collection__label">Challenges/);
  assert.match(homeCss, /grid-template-columns: repeat\(7/);
  assert.match(homeCss, /grid-template-columns: repeat\(4/);
  assert.match(homeCss, /@media \(max-width: 520px\)/);
});
