import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { siteConfig } from "../lib/site-config.ts";
import { readLegacyMainMarkup } from "../lib/legacy-content.ts";

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

test("member app destinations remain exact and Movena-owned", () => {
  assert.deepEqual(siteConfig.memberApp, {
    path: "/app/",
    url: "https://movena.com.au/app/",
    appStoreUrl: "https://apps.apple.com/au/app/movena/id6770032378",
    googlePlayUrl:
      "https://play.google.com/store/apps/details?id=au.com.movena.member&pli=1",
  });
});

test("the member app page is static and has no device-sniffing behaviour", () => {
  const page = readFileSync("app/app/page.tsx", "utf8");
  const storeActions = readFileSync(
    "components/app-store-actions.tsx",
    "utf8",
  );

  assert.doesNotMatch(page, /["']use client["']/);
  assert.doesNotMatch(page, /fetch\s*\(/);
  assert.doesNotMatch(page, /navigator|userAgent|headers\s*\(|redirect\s*\(/);
  assert.match(storeActions, /siteConfig\.memberApp\.appStoreUrl/);
  assert.match(storeActions, /siteConfig\.memberApp\.googlePlayUrl/);
  assert.match(page, /movena-app-page-qr\.png/);
  assert.match(page, /movena-member-home\.png/);
  assert.match(page, /movena-member-book\.png/);
  assert.match(page, /movena-member-movements\.png/);
  assert.match(page, /Your gym\. Your training\. One app\./);
});

test("approved Movena product assets and the QR output retain exact hashes", () => {
  assert.equal(
    sha256("public/assets/app/movena-training-performance.jpg"),
    "d87c9afe4ee4cfa6971c1c8ad427f97d31a10ea2868eedec4dd81dc37d6040e6",
  );
  assert.equal(
    sha256("public/assets/app/movena-class-booking.jpg"),
    "9c96e4a9fd5a163e44724a08a713c7af4b61e7e57b6c6f7163a1af8fc568f163",
  );
  assert.equal(
    sha256("public/assets/app/movena-app-page-qr.png"),
    "6ff7c41b3a65b185210f321d9819deed3e7a2b8063593e13a70fcfe3ef44dcd7",
  );
});

test("the deterministic QR generator encodes and verifies the stable app URL", () => {
  const generator = readFileSync("scripts/generate-app-qr.swift", "utf8");

  assert.match(
    generator,
    /let destination = "https:\/\/movena\.com\.au\/app\/"/,
  );
  assert.match(generator, /CIQRCodeGenerator/);
  assert.match(generator, /CIQRCodeFeature/);
  assert.match(generator, /guard decoded == \[destination\]/);
});

test("member navigation exposes the app without adding deferred surfaces", () => {
  const header = readFileSync("components/site-header.tsx", "utf8");
  const footer = readFileSync("components/site-footer.tsx", "utf8");
  const page = readFileSync("app/app/page.tsx", "utf8");

  assert.match(header, /href: "\/members\/", label: "Member experience"/);
  assert.match(header, /href: "\/app\/", label: "Download the app"/);
  assert.match(header, /href: "\/help\/", label: "Help"/);
  assert.match(footer, /href="\/app\/">Download the app/);
  assert.equal(existsSync("app/faq/page.tsx"), true);
  assert.doesNotMatch(
    `${header}\n${footer}\n${page}`,
    /Siri|Gemini|Apple Intelligence|App Intents/i,
  );
});

test("the member experience exposes both app stores and a clear owner journey", () => {
  const memberPage = readLegacyMainMarkup("members/index.html");
  const membersCss = readFileSync("styles/members.css", "utf8");

  assert.match(memberPage, /Available for iPhone and Android\./);
  assert.match(
    memberPage,
    new RegExp(siteConfig.memberApp.appStoreUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
  );
  assert.match(
    memberPage,
    new RegExp(
      siteConfig.memberApp.googlePlayUrl
        .replaceAll("&", "&amp;")
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    ),
  );
  assert.match(memberPage, /For gym owners/);
  assert.match(memberPage, /href="\/businesses\/">See who Movena is for/);
  assert.match(memberPage, /href="\/contact\/">Talk to Movena/);
  assert.match(membersCss, /\.members-store-actions/);
  assert.match(membersCss, /\.members-owner-cta/);
});

test("the member app layout has desktop, mobile and reduced-motion contracts", () => {
  const css = readFileSync("styles/member-app.css", "utf8");
  const footer = readFileSync("components/site-footer.tsx", "utf8");
  const shellCss = readFileSync("styles/premium-shell.css", "utf8");

  assert.match(css, /\.member-app-download-card/);
  assert.match(css, /\.member-app-store-actions/);
  assert.match(css, /\.member-app-product-stage/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.member-app-qr\s*\{[\s\S]*?display: none;/);
  assert.match(footer, /className="site-footer__app" href="\/app\/"/);
  assert.match(footer, /Get the app <PlatformMarks \/>/);
  assert.match(shellCss, /\.site-footer__column/);
  assert.match(
    shellCss,
    /grid-template-columns: 1\.15fr 1fr 0\.65fr 0\.65fr 1fr/,
  );
});
