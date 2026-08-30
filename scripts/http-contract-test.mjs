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
