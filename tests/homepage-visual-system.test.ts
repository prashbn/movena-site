import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { readLegacyMainMarkup } from "../lib/legacy-content.ts";
import { legacyRoutes } from "../lib/routes.ts";

test("the homepage leads with the approved feature copy and selected yoga and Pilates images", () => {
  const homepage = readLegacyMainMarkup("index.html");
  const copy = "Memberships, payments, bookings, team management and workout programming. Plus a training history members keep.";
  const homeRoute = legacyRoutes.find((route) => route.path === "/");

  assert.ok(homepage.includes(copy));
  assert.ok(homeRoute?.description.startsWith(copy));
  assert.equal(homeRoute?.socialDescription, copy);
  assert.doesNotMatch(homepage, /Memberships, timetable, billing and check-in/);
  assert.doesNotMatch(homepage, /class-floor-(900|1600)\.jpg/);
  assert.match(homepage, /Four women chatting in a bright studio while holding rolled yoga mats/);
  for (const size of [900, 1600]) {
    assert.equal(existsSync(`public/home-yoga/group-${size}.jpg`), true);
    assert.ok(homepage.includes(`/home-yoga/group-${size}.jpg`));
  }
  assert.doesNotMatch(homepage, /pilates-class-(900|1600)\.jpg/);
  for (const size of [900, 1600]) {
    assert.equal(existsSync(`public/home-pilates/class-${size}.jpg`), true);
    assert.ok(homepage.includes(`/home-pilates/class-${size}.jpg`));
  }
  assert.doesNotMatch(homepage, /istock-2211676552-preview\.jpg/);
  assert.equal(existsSync("public/home-pilates/istock-2211676552-preview.jpg"), false);
  assert.match(homepage, /A group Pilates class extending their arms with straps while kneeling on reformers/);
});

test("the homepage uses its dedicated static shell", () => {
  const page = readFileSync("app/page.tsx", "utf8");
  const shells = readFileSync("components/page-shells.tsx", "utf8");

  assert.match(page, /HomePageShell/);
  assert.match(shells, /className="site-shell home-page"/);
  assert.doesNotMatch(page, /["']use client["']/);
  assert.doesNotMatch(shells, /["']use client["']/);
});

test("the closing photo and sales action share one responsive accessible frame", () => {
  const homepage = readLegacyMainMarkup("index.html");
  const homeCss = readFileSync("styles/home.css", "utf8");
  const closing = homepage.match(/<section class="home-closing"[\s\S]*?<\/section>/)?.[0];

  assert.ok(closing);
  assert.match(closing, /aria-labelledby="home-closing-heading"/);
  assert.match(closing, /<h2 id="home-closing-heading">Run your gym on Movena\.<\/h2>/);
  assert.match(closing, /Single sites and multi-location groups\. Tell us about yours\./);
  assert.match(closing, /href="\/contact\/">Talk to Movena<\/a>/);
  assert.match(closing, /loading="lazy"/);
  assert.match(closing, /alt="A woman in blue activewear using her phone on the gym floor"/);
  assert.match(closing, /<source media="\(max-width: 700px\)"/);
  for (const name of ["member-900.jpg", "member-1800.jpg", "member-mobile-900.jpg"]) {
    assert.equal(existsSync(`public/home-closing/${name}`), true);
    assert.ok(closing.includes(`/home-closing/${name}`));
  }
  assert.equal(homepage.match(/Run your gym on Movena\./g)?.length, 1);
  assert.doesNotMatch(homepage, /after-session-(1000|1800)\.jpg|class="close-cta"/);
  assert.match(homeCss, /\.home-photo-panel__photo img\s*\{[^}]*object-fit: cover;/);
  assert.match(homeCss, /\.home-photo-panel::after[\s\S]*linear-gradient/);
  assert.match(homeCss, /@media \(max-width: 700px\)[\s\S]*\.home-photo-panel__copy\s*\{[^}]*width: 100%;/);
  // Other pages retain their existing closing sections.
  assert.match(readLegacyMainMarkup("platform/index.html"), /class="close-cta"/);
  assert.match(readLegacyMainMarkup("members/index.html"), /class="close-cta"/);
});

test("the yoga overlay introduces Hangout and leaves the Loop story intact", () => {
  const loop = readFileSync("components/home-loop.tsx", "utf8");
  const homepage = readLegacyMainMarkup("index.html");
  const css = readFileSync("styles/home.css", "utf8");
  const community = homepage.match(/<section class="home-community"[\s\S]*?<\/section>/)?.[0];

  assert.ok(community);
  assert.match(community, /aria-labelledby="home-community-heading"/);
  assert.match(community, /<h2 id="home-community-heading">A place to train\.<br>A place to belong\.<\/h2>/);
  assert.match(community, /<span class="kicker">Hangout<\/span>/);
  assert.ok(community.includes("Keep your members connected between sessions. Share what’s on, useful advice and stories from your gym—all in Hangout, inside the Movena app."));
  assert.doesNotMatch(community, /Shared sessions\. Familiar faces\./);
  assert.match(community, /class="home-photo-panel__copy"/);
  assert.equal(homepage.match(/src="\/home-yoga\/group-1600\.jpg"/g)?.length, 1);
  assert.match(loop, /id="home-loop-heading">One session\.<br \/>Everyone connected\./);
  assert.match(loop, /Coaches capture it\./);
  assert.match(loop, /The desk sees it\./);
  assert.match(loop, /Members keep it\./);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*\.home-community \.home-photo-panel__photo img\s*\{[^}]*height: auto/);
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
    "home.png",
    "progress-dark.png",
  ]) {
    assert.equal(existsSync(`public/members-screens/1.8.0/${screen}`), true, screen);
    assert.ok(homepage.includes(`/members-screens/1.8.0/${screen}`));
  }

  assert.doesNotMatch(homepage, /home-app\/(?:milestones|session-detail|movement-progress)\.jpg/);
  assert.match(homepage, /Home screen in light mode/);
  assert.match(homepage, /Progress screen in dark mode/);
  assert.match(homepage, /Book the next session\. Follow the workout\./);

  assert.equal(homepage.match(/An app worth opening\./g)?.length, 1);
  assert.match(homepage, /Available for iPhone and Android\./);
  assert.match(homepage, /movena-app-page-qr\.png/);
  assert.match(homeCss, /\.home-app-showcase__stage/);
  assert.match(homeCss, /\.home-app-showcase__stage\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(homeCss, /scroll-snap-type/);
});

test("real product proof is integrated into the original homepage sections", () => {
  const homepage = readLegacyMainMarkup("index.html");
  const platform = readFileSync("components/home-platform-discovery.tsx", "utf8");
  const training = readFileSync("components/home-training-connection.tsx", "utf8");
  const window = readFileSync("components/home-product-window.tsx", "utf8");
  const renderer = readFileSync("components/legacy-main.tsx", "utf8");
  const css = readFileSync("styles/home-discovery.css", "utf8");

  assert.doesNotMatch(homepage, /app\.movena\.com\.au — Timetable|class="console"/);
  assert.match(homepage, /<div class="hero">[\s\S]*<\/div>\s*<\/div>\s*<div class="facts">/);
  assert.match(platform, /Everything a gym runs on\./);
  assert.match(platform, /Less switching\.<br \/>More coaching\./);
  assert.match(platform, /movena-financials\.png/);
  assert.match(platform, /role="tablist"/);
  assert.match(training, /id="disciplines"/);
  assert.match(training, /Built for how your gym trains\./);
  assert.match(training, /The session doesn’t end at the gym door\./);
  assert.match(training, /movena-program-builder\.png/);
  assert.match(training, /workout-dark\.png/);
  assert.match(training, /home-pilates\/class-1600\.jpg/);
  assert.equal(training.match(/"(?:CrossFit|Yoga|Personal Training)"/g)?.length, 3);
  assert.match(renderer, /<HomeTrainingDisciplines/);
  assert.match(window, /Actual product screen · Demonstration data/);
  assert.match(css, /\.home-product-window img,[\s\S]*height: auto;/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.home-training-connection__flow \{ grid-template-columns: minmax\(0, 1fr\)/);
});
