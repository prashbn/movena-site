import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { getSiteTheme, resolveSiteTheme, setSiteTheme, subscribeSiteTheme, THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from "../lib/site-theme.ts";

test("only an explicit saved dark choice overrides the light default", () => {
  for (const value of [null, "light", "system", "invalid", "DARK", ""]) {
    assert.equal(resolveSiteTheme(value), "light");
  }
  assert.equal(resolveSiteTheme("dark"), "dark");
});

test("the pre-paint bootstrap handles fresh visits, saved choices and blocked storage", () => {
  for (const saved of [null, "light", "dark", "invalid", "blocked"]) {
    const dataset = { theme: "light" };
    const meta = { content: "#ffffff" };
    runInNewContext(THEME_INIT_SCRIPT, {
      document: { documentElement: { dataset }, querySelector: () => meta },
      localStorage: { getItem: (key: string) => {
        assert.equal(key, THEME_STORAGE_KEY);
        if (saved === "blocked") throw new Error("Storage disabled");
        return saved;
      } },
    });
    assert.equal(dataset.theme, saved === "dark" ? "dark" : "light");
    assert.equal(meta.content, saved === "dark" ? "#0b1018" : "#ffffff");
  }
  assert.doesNotThrow(() => runInNewContext(THEME_INIT_SCRIPT, {
    document: { documentElement: { dataset: {} }, querySelector: () => null },
  }));
});

test("switching updates the DOM, browser chrome and subscribers even without storage", () => {
  const original = Object.fromEntries(["document", "window", "localStorage"].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const dataset = { theme: "light" };
  const meta = { content: "#ffffff" };
  const listeners = new Map<string, Set<(event: { key?: string | null; newValue?: string | null }) => void>>();
  let saved = "";
  let blocked = false;
  const mockWindow = {
    addEventListener(type: string, callback: () => void) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type)!.add(callback);
    },
    removeEventListener(type: string, callback: () => void) { listeners.get(type)?.delete(callback); },
    dispatchEvent(event: Event) { listeners.get(event.type)?.forEach((callback) => callback({})); },
  };
  Object.defineProperties(globalThis, {
    document: { configurable: true, value: { documentElement: { dataset }, querySelector: () => meta } },
    window: { configurable: true, value: mockWindow },
    localStorage: { configurable: true, value: { setItem(key: string, value: string) {
      assert.equal(key, THEME_STORAGE_KEY);
      if (blocked) throw new Error("Storage disabled");
      saved = value;
    } } },
  });
  try {
    let updates = 0;
    const unsubscribe = subscribeSiteTheme(() => updates++);
    setSiteTheme("dark");
    assert.equal(getSiteTheme(), "dark");
    assert.equal(meta.content, "#0b1018");
    assert.equal(saved, "dark");
    assert.equal(updates, 1);
    blocked = true;
    setSiteTheme("light");
    assert.equal(getSiteTheme(), "light");
    assert.equal(meta.content, "#ffffff");
    assert.equal(updates, 2);
    const storageChange = (key: string | null, newValue: string | null) => listeners.get("storage")?.forEach((callback) => callback({ key, newValue }));
    storageChange("unrelated", "dark");
    assert.equal(updates, 2);
    storageChange(THEME_STORAGE_KEY, "dark");
    assert.equal(getSiteTheme(), "dark");
    storageChange(THEME_STORAGE_KEY, null);
    assert.equal(getSiteTheme(), "light");
    storageChange(null, null);
    assert.equal(updates, 5);
    unsubscribe();
    assert.ok([...listeners.values()].every((callbacks) => callbacks.size === 0));
  } finally {
    for (const key of Object.keys(original)) {
      const descriptor = original[key];
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
});

function contrast(foreground: string, background: string) {
  const luminance = (hex: string) => {
    const rgb = hex.slice(1).match(/../g)!.map((part) => parseInt(part, 16) / 255).map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("dark-mode text and actions meet normal-text contrast on the shared surfaces", () => {
  const css = readFileSync("styles/themes.css", "utf8").split("}")[0];
  const token = (name: string) => css.match(new RegExp(`${name}: (#[a-f0-9]{6});`))![1];
  for (const background of ["--bg", "--bg-tint", "--bg-soft", "--site-surface", "--accent-soft", "--tint-violet"]) {
    for (const foreground of ["--ink", "--ink-2", "--ink-3", "--accent", "--accent-ink"]) {
      assert.ok(contrast(token(foreground), token(background)) >= 4.5, `${foreground} on ${background}`);
    }
  }
  for (const background of ["--theme-action-bg", "--theme-action-hover"]) {
    assert.ok(contrast("#ffffff", token(background)) >= 4.5, `White action label on ${background}`);
  }
});

test("theme controls preserve static rendering, approved logos and unchanged imagery", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");
  const header = readFileSync("components/site-header.tsx", "utf8");
  const toggle = readFileSync("components/theme-toggle.tsx", "utf8");
  const logos = readFileSync("components/brand-lockup.tsx", "utf8");
  const css = readFileSync("styles/themes.css", "utf8");
  assert.match(layout, /force-static/);
  assert.match(layout, /data-theme="light" suppressHydrationWarning/);
  assert.match(layout, /<head>\s*<script dangerouslySetInnerHTML=\{\{ __html: THEME_INIT_SCRIPT \}\}/);
  assert.equal(header.match(/<ThemeToggle \/>/g)?.length, 2, "One control in each alternative header variant");
  assert.match(toggle, /type="button"/);
  assert.match(toggle, /aria-label=\{label\}/);
  assert.match(css, /min-height: 44px/);
  assert.match(logos, /\/brand\/header-light.svg/);
  assert.match(logos, /\/brand\/header-dark.svg/);
  assert.doesNotMatch(css, /invert\(|filter:/);
  assert.match(css, /@media print/);
});

test("closing sections reuse purple in both themes rather than decorative green", () => {
  const tokens = readFileSync("styles/tokens.css", "utf8");
  const themes = readFileSync("styles/themes.css", "utf8");
  assert.match(tokens, /--tint-mint: var\(--tint-violet\)/);
  assert.match(tokens, /--site-wash-mint: var\(--site-wash-violet\)/);
  assert.equal(themes.match(/--tint-mint: var\(--tint-violet\)/g)?.length, 2);
  assert.doesNotMatch(themes, /#142924|#eef7f1/i);
});

test("privacy columns have equal insets, bottom spacing and no dark-mode card fills", () => {
  const home = readFileSync("styles/home.css", "utf8");
  const themes = readFileSync("styles/themes.css", "utf8");
  assert.match(home, /\.home-page \.bound-grid \.cap \{\s*padding: 2rem clamp\(1\.25rem, 3vw, 2\.5rem\);/);
  assert.doesNotMatch(home, /\.home-page \.bound-grid \.cap:first-child/);
  assert.match(home, /\.home-page \.bound-grid \.cap h3 \{\s*margin: 0 0 0\.75rem;/);
  assert.match(themes, /:root\[data-theme="dark"\] \.home-page \.bound-grid \.cap \{ background: transparent; \}/);
});
