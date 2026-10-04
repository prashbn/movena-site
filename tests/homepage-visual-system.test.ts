import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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
  const tokensCss = readFileSync("styles/tokens.css", "utf8");

  assert.match(shellCss, /@media \(max-width: 840px\)/);
  assert.match(homeCss, /@media \(max-width: 900px\)/);
  assert.match(homeCss, /@media \(max-width: 640px\)/);
  assert.match(homeCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(homeCss, /\.home-page \.shot/);
  assert.match(shellCss, /\.marketing-page \.wrap[\s\S]*var\(--container-site\)/);
  assert.match(tokensCss, /--container-site: 1480px/);
  assert.match(tokensCss, /--container-media: 1720px/);
  assert.match(tokensCss, /--site-gutter: clamp\(1\.25rem, 3vw, 3rem\)/);
});

test("the shared shell uses the approved outlined brand lockup", () => {
  const lockup = readFileSync("components/brand-lockup.tsx", "utf8");
  const header = readFileSync("components/site-header.tsx", "utf8");
  const footer = readFileSync("components/site-footer.tsx", "utf8");

  assert.match(lockup, /\/brand\/header-light\.svg/);
  assert.match(header, /<BrandLockup priority \/>/);
  assert.match(header, /Move for a better you\./);
  assert.match(footer, /<BrandLockup \/>/);
  assert.doesNotMatch(header, /className="dot"/);
  assert.doesNotMatch(footer, /className="dot"/);
});

test("trade mark notice is limited to the shared header and footer", () => {
  const header = readFileSync("components/site-header.tsx", "utf8");
  const footer = readFileSync("components/site-footer.tsx", "utf8");
  const config = readFileSync("lib/site-config.ts", "utf8");
  const shellCss = readFileSync("styles/premium-shell.css", "utf8");

  assert.match(header, /aria-label="Movena™ — Move for a better you\."/);
  assert.match(header, /className="site-logo__trademark" aria-hidden="true">™<\/span>/);
  assert.equal((header.match(/>™<\/span>/g) ?? []).length, 1);
  assert.match(footer, /Movena™ is a trade mark of Movena Holdings Pty Ltd\./);
  assert.equal((footer.match(/™/g) ?? []).length, 1);
  assert.match(footer, /\{siteConfig\.legalName\} \(ACN \{siteConfig\.acn\}\)/);
  assert.match(config, /legalName: "Movena Pty Ltd"/);
  assert.doesNotMatch(header + footer, /®|registered trade ?mark/i);
  assert.match(shellCss, /\.site-logo__trademark\s*\{[^}]*position: absolute;[^}]*font-size: 0\.5rem;/);
});

test("the approved homepage banner stays inside the existing cool visual system", () => {
  const homeCss = readFileSync("styles/home.css", "utf8");
  const shellCss = readFileSync("styles/premium-shell.css", "utf8");

  assert.match(homeCss, /\.home-page \.hero \.split/);
  assert.match(homeCss, /\.home-page \.hero > \.wrap[\s\S]*max-width: var\(--home-content-width\)/);
  assert.match(homeCss, /font-weight: 700/);
  assert.match(homeCss, /var\(--site-navy\) url\("\/home-hero-banner\.jpg"\)/);
  assert.match(homeCss, /\.home-page \.hero \.split \.btn-ghost/);
  assert.match(shellCss, /\.site-logo__tagline[\s\S]*font-size: 0\.72rem/);
  assert.match(shellCss, /\.site-logo__tagline[\s\S]*font-weight: 700/);
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
  assert.match(homeCss, /margin-inline: auto/);
  assert.match(homeCss, /@media \(max-width: 520px\)/);
});

test("the homepage carries verified commercial proof without roadmap claims", () => {
  const homepage = readLegacyMainMarkup("index.html");
  const homeCss = readFileSync("styles/home.css", "utf8");

  for (const marker of [
    "Unlimited members and team",
    "Card, BECS direct debit and PayTo",
    "Xero-ready, QuickBooks-ready and MYOB-ready",
    "Memberships and bookings, carried through to the door.",
    "Movena is listed in Kisi’s integration marketplace",
    "Kisi remains authoritative for doors, hardware and opening schedules",
  ]) {
    assert.match(homepage, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(homepage, /Branded App|\bAI-powered\b/i);
  assert.match(homeCss, /\.home-page \.home-access/);
  assert.match(homeCss, /\.home-page \.home-access__inner[\s\S]*max-width: var\(--home-content-width\)/);
  assert.match(homeCss, /\.home-page \.home-access__brand[\s\S]*justify-self: center/);
  assert.match(homeCss, /#platform \.featgrid[\s\S]*repeat\(4/);
});

test("the homepage showcases the native member app with real product screens", () => {
  const homepage = readLegacyMainMarkup("index.html");
  const homeCss = readFileSync("styles/home.css", "utf8");

  for (const screen of [
    "movement-progress.jpg",
    "session-detail.jpg",
  ]) {
    assert.equal(existsSync(`public/home-app/${screen}`), true, screen);
    assert.match(homepage, new RegExp(`/home-app/${screen}`));
  }

  assert.doesNotMatch(homepage, /home-app\/milestones\.jpg/);

  assert.equal(homepage.match(/An app worth opening\./g)?.length, 1);
  assert.match(homepage, /Available for iPhone and Android\./);
  assert.match(homepage, /movena-app-page-qr\.png/);
  assert.match(homeCss, /\.home-app-showcase__stage/);
  assert.match(homeCss, /scroll-snap-type: x mandatory/);
});
