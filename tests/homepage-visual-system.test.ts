import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

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
