import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const customStylePaths = [
  "styles/tokens.css",
  "styles/premium-shell.css",
  "styles/home.css",
  "styles/members.css",
  "styles/commercial.css",
  "styles/businesses.css",
  "styles/integrations.css",
  "styles/member-app.css",
  "styles/contact.css",
  "styles/blog.css",
  "styles/faq.css",
] as const;

test("the Platform page is the documented visual source of truth", () => {
  const readme = readFileSync("README.md", "utf8");
  const guidance = readFileSync("docs/design-guidelines.md", "utf8");

  assert.match(readme, /Platform page at `\/platform\/` is the visual source of truth/);
  assert.match(guidance, /Visual source of truth:.*Platform page at `\/platform\/`/);
  assert.match(guidance, /white\s+canvas, very pale blue-grey washes/);
  assert.doesNotMatch(guidance, /homepage is the canonical/i);
});

test("custom pages resolve to the Platform colour primitives", () => {
  const tokens = readFileSync("styles/tokens.css", "utf8");

  for (const alias of [
    "--site-canvas: var(--bg)",
    "--site-surface-tint: var(--bg-tint)",
    "--site-surface-soft: var(--bg-soft)",
    "--site-paper: var(--site-surface-tint)",
    "--site-ink: var(--ink)",
    "--site-ink-soft: var(--ink-2)",
    "--site-ink-faint: var(--ink-3)",
    "--site-blue: var(--accent)",
    "--site-blue-deep: var(--accent-ink)",
    "--site-line: var(--line)",
  ]) {
    assert.match(tokens, new RegExp(alias.replace(/[()]/g, "\\$&")));
  }
});

test("custom pages preserve the Platform cool-white surface hierarchy", () => {
  const home = readFileSync("styles/home.css", "utf8");
  const commercial = readFileSync("styles/commercial.css", "utf8");
  const integrations = readFileSync("styles/integrations.css", "utf8");
  const blog = readFileSync("styles/blog.css", "utf8");

  assert.match(home, /\.home-page \.hero \{[\s\S]*?background: var\(--site-canvas\)/);
  assert.match(commercial, /\.commercial-hero \{[\s\S]*?background: var\(--site-canvas\)/);
  assert.match(integrations, /\.integration-card \{[\s\S]*?background: var\(--site-surface\)/);
  assert.match(integrations, /\.integration-card__brand \{[\s\S]*?background: var\(--site-surface-soft\)/);
  assert.match(blog, /\.blog-index,[\s\S]*?background: var\(--site-surface-tint\)/);
});

test("the retired warm and Apple-clone palettes cannot return to custom styles", () => {
  const customStyles = customStylePaths
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  for (const colour of [
    "#f6f4ef",
    "#fcfbf8",
    "#dfe8df",
    "#e9e2d7",
    "#f5f4f0",
    "#f5f5f7",
    "#1d1d1f",
    "#6e6e73",
    "#86868b",
    "#e8e8ed",
    "#424245",
    "#000000",
  ]) {
    assert.doesNotMatch(customStyles.toLowerCase(), new RegExp(colour));
  }
});
