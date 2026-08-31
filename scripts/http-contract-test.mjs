import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const host = "127.0.0.1";
const port = Number(process.env.MOVENA_TEST_PORT ?? 4127);
const origin = `http://${host}:${port}`;
const nextBin = "node_modules/next/dist/bin/next";

const routes = [
  "/",
  "/platform/",
  "/members/",
  "/help/",
  "/integrations/kisi/",
  "/legal/privacy/",
  "/legal/terms/",
  "/pricing/",
  "/integrations/",
  "/app/",
  "/contact/",
  "/faq/",
  "/blog/",
  "/blog/movement-and-mental-health/",
  "/blog/strength-training-for-everyday-movement/",
  "/blog/how-to-fuel-for-hyrox/",
];

const frozenDocumentMarkers = new Map([
  ["/help/", ["Help &amp; Support", "Last updated: 2 August 2026"]],
  ["/integrations/kisi/", ["Movena + Kisi", "Ending the integration"]],
  ["/legal/privacy/", ["Privacy Policy", "Last updated: 6 August 2026"]],
  ["/legal/terms/", ["Terms of Service", "Last updated: 3 August 2026"]],
]);

const server = spawn(
  process.execPath,
  [nextBin, "start", "--hostname", host, "--port", String(port)],
  {
    cwd: process.cwd(),
    env: { ...process.env, NODE_ENV: "production" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next server exited early:\n${serverOutput}`);
    }

    try {
      const response = await fetch(`${origin}/`, { redirect: "manual" });
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await delay(250);
  }

  throw new Error(`Timed out waiting for Next server:\n${serverOutput}`);
}

function canonicalFromHtml(html) {
  const match = html.match(
    /<link[^>]+rel="canonical"[^>]+href="([^"]+)"|<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i,
  );
  return match?.[1] ?? match?.[2] ?? null;
}

async function runContract() {
  await waitForServer();

  const homepageResponse = await fetch(`${origin}/`);
  const homepageHtml = await homepageResponse.text();
  assert.match(homepageHtml, /class="site-shell home-page"/);
  assert.match(homepageHtml, /class="nav site-header"/);
  assert.match(homepageHtml, /class="site-footer"/);
  assert.match(
    homepageHtml,
    /The gym platform that remembers the training\./,
  );
  assert.match(homepageHtml, /href="\/contact\/"[^>]*>Book a walkthrough<\/a>/);

  const contactHtml = await (await fetch(`${origin}/contact/`)).text();
  for (const marker of [
    "Tell us about your gym.",
    "Start the conversation.",
    'name="businessName"',
    'name="workEmail"',
    'name="locations"',
    'name="interest"',
    "Privacy Policy",
  ]) {
    assert.match(
      contactHtml,
      new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  const contactApiWithoutSlash = await fetch(`${origin}/api/contact`, {
    redirect: "manual",
  });
  assert.equal(contactApiWithoutSlash.status, 308);

  const contactGet = await fetch(`${origin}/api/contact/`, {
    redirect: "manual",
  });
  assert.equal(contactGet.status, 405);

  const contactHeaders = {
    "content-type": "application/json",
    origin,
  };
  const invalidContact = await fetch(`${origin}/api/contact/`, {
    method: "POST",
    headers: contactHeaders,
    body: "{}",
  });
  assert.equal(invalidContact.status, 422);
  const invalidContactBody = await invalidContact.json();
  assert.equal(invalidContactBody.ok, false);
  assert.ok(invalidContactBody.fieldErrors.workEmail);

  const honeypotContact = await fetch(`${origin}/api/contact/`, {
    method: "POST",
    headers: contactHeaders,
    body: JSON.stringify({ website: "https://spam.example" }),
  });
  assert.equal(honeypotContact.status, 200);
  assert.equal((await honeypotContact.json()).ok, true);

  const crossOriginContact = await fetch(`${origin}/api/contact/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://attacker.example",
    },
    body: "{}",
  });
  assert.equal(crossOriginContact.status, 403);

  const primaryNavigation = homepageHtml.match(
    /<nav class="site-navigation" aria-label="Primary">([\s\S]*?)<\/nav>/,
  )?.[1];
  assert.ok(primaryNavigation, "homepage should render the shared navigation");
  for (const href of [
    "/platform/",
    "/pricing/",
    "/integrations/",
    "/blog/",
    "/members/",
    "/app/",
    "/help/",
  ]) {
    assert.match(primaryNavigation, new RegExp(`href="${href}"`));
  }
  assert.match(
    homepageHtml,
    /href="https:\/\/app\.movena\.com\.au\/sign-in"[^>]*>Sign in<\/a>/,
  );

  const memberAppHtml = await (await fetch(`${origin}/app/`)).text();
  for (const marker of [
    "Native Movena apps for iPhone and Android.",
    "https://apps.apple.com/au/app/movena/id6770032378",
    "https://play.google.com/store/apps/details?id=au.com.movena.member&amp;pli=1",
    "/assets/app/movena-app-page-qr.png",
    "/assets/app/movena-training-performance.jpg",
    "/assets/app/movena-class-booking.jpg",
  ]) {
    assert.match(
      memberAppHtml,
      new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  const pricingHtml = await (await fetch(`${origin}/pricing/`)).text();
  for (const marker of [
    "A$129 / month + GST",
    "A$349 / month + GST",
    "Access Control Integration",
    "+A$49 / location / month + GST",
    "Movena integration fee only. Hardware, installation and access-control provider subscriptions are purchased separately.",
    "+A$99 / brand / month + GST",
    "Optional usage-based",
    "Plus a 0.30% platform administration fee on applicable Movena-processed payments.",
    'id="compare"',
    "Package comparison",
    "Native Retail / Shop",
    "Advanced analytics",
    "Organisation-wide insights",
  ]) {
    assert.match(pricingHtml, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  const integrationsHtml = await (await fetch(`${origin}/integrations/`)).text();
  for (const marker of [
    "Xero",
    "Accounting integration.",
    "Kisi",
    "Access control integration.",
    "Apple Health",
    "Supported member health and workout data.",
    "Health Connect",
    "Supported Android health and fitness data.",
    "Payments built in",
    "Payments and billing, built into Movena.",
    "Brevo — Coming soon",
  ]) {
    assert.match(integrationsHtml, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(
    integrationsHtml,
    /Siri|Gemini|Apple Intelligence|App Intents|HealthKit|GymMaster|Mindbody|Hapana/i,
  );

  const faqHtml = await (await fetch(`${origin}/faq/`)).text();
  for (const marker of [
    "Questions, answered.",
    "Do we have to sign a lock-in contract?",
    "30 days’ notice",
    "Payments settle into your own Stripe account",
    "Kisi subscription directly from Kisi",
    "hosted in Sydney, Australia",
  ]) {
    assert.match(faqHtml, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(faqHtml, /FAQPage/);

  const blogHtml = await (await fetch(`${origin}/blog/`)).text();
  for (const marker of [
    "Useful notes for people who train.",
    "Movement and mental health: a practical, pressure-free guide",
    "Strength training for everyday movement",
    "How to fuel for HYROX training and race day",
    "Useful before searchable.",
  ]) {
    assert.match(blogHtml, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  const mentalHealthArticle = await (
    await fetch(`${origin}/blog/movement-and-mental-health/`)
  ).text();
  assert.match(mentalHealthArticle, /Movement is support, not a replacement for care/);
  assert.match(mentalHealthArticle, /Lifeline is available on 13 11 14/);
  assert.match(mentalHealthArticle, /Healthdirect Australia/);

  const strengthArticle = await (
    await fetch(`${origin}/blog/strength-training-for-everyday-movement/`)
  ).text();
  assert.match(strengthArticle, /Train patterns, not just body parts/);
  assert.match(strengthArticle, /This is not an individual exercise prescription/);

  const hyroxArticle = await (
    await fetch(`${origin}/blog/how-to-fuel-for-hyrox/`)
  ).text();
  assert.match(hyroxArticle, /Race morning: familiar beats clever/);
  assert.match(hyroxArticle, /Accredited Sports Dietitian/);
  assert.match(hyroxArticle, /Australian Institute of Sport/);

  const productComparison = await fetch(`${origin}/product-comparison/`, {
    redirect: "manual",
  });
  assert.equal(productComparison.status, 308);
  const productComparisonDestination = new URL(
    productComparison.headers.get("location"),
    origin,
  );
  assert.equal(productComparisonDestination.pathname, "/pricing/");
  assert.equal(productComparisonDestination.hash, "#compare");

  const productComparisonWithoutSlash = await fetch(
    `${origin}/product-comparison`,
    { redirect: "manual" },
  );
  assert.equal(productComparisonWithoutSlash.status, 308);
  assert.equal(
    new URL(productComparisonWithoutSlash.headers.get("location"), origin)
      .pathname,
    "/product-comparison/",
  );

  for (const route of routes) {
    const response = await fetch(`${origin}${route}`, { redirect: "manual" });
    assert.equal(response.status, 200, `${route} should return 200`);

    const html = await response.text();
    assert.equal(
      canonicalFromHtml(html),
      `https://movena.com.au${route}`,
      `${route} canonical`,
    );

    for (const marker of frozenDocumentMarkers.get(route) ?? []) {
      assert.match(
        html,
        new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
        `${route} should render frozen content marker ${marker}`,
      );
    }
  }

  for (const route of routes.filter((path) => path !== "/")) {
    const nonSlash = route.slice(0, -1);
    const response = await fetch(`${origin}${nonSlash}`, {
      redirect: "manual",
    });

    assert.equal(response.status, 308, `${nonSlash} should permanently redirect`);
    assert.equal(
      new URL(response.headers.get("location"), origin).pathname,
      route,
      `${nonSlash} redirect destination`,
    );
  }

  const missing = await fetch(`${origin}/definitely-not-a-route/`, {
    redirect: "manual",
  });
  assert.equal(missing.status, 404);
  const missingHtml = await missing.text();
  assert.match(missingHtml, /That page is not here\./);
  assert.doesNotMatch(
    missingHtml,
    /The gym platform that remembers the training\./,
  );

  const allInternalLinks = new Set();
  for (const route of routes) {
    const html = await (await fetch(`${origin}${route}`)).text();
    for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
      const href = match[1];
      if (href.startsWith("/_next/")) continue;
      allInternalLinks.add(href);
    }
  }

  for (const href of allInternalLinks) {
    const destination = new URL(href, origin);
    destination.hash = "";
    const response = await fetch(destination, { redirect: "manual" });
    assert.ok(
      response.status >= 200 && response.status < 400,
      `${href} returned ${response.status}`,
    );
  }

  const robots = await fetch(`${origin}/robots.txt`);
  assert.equal(robots.status, 200);
  const robotsText = await robots.text();
  assert.match(robotsText, /Content-Signal: search=yes,ai-train=no,use=reference/);
  assert.match(robotsText, /Sitemap: https:\/\/movena\.com\.au\/sitemap\.xml/);

  const sitemap = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  const sitemapXml = await sitemap.text();
  for (const route of routes) {
    assert.match(sitemapXml, new RegExp(`https://movena\\.com\\.au${route}`));
  }
  assert.doesNotMatch(sitemapXml, /product-comparison/);

  process.stdout.write(
    `HTTP contract passed: ${routes.length} routes, ${routes.length - 1} redirects, 404, ${allInternalLinks.size} internal links, robots and sitemap.\n`,
  );
}

try {
  await runContract();
} finally {
  if (server.exitCode === null) {
    server.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => server.once("exit", resolve)),
      delay(5_000),
    ]);
  }
}
