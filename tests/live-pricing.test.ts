import assert from "node:assert/strict";
import test from "node:test";

import {
  applyLivePricing,
  formatAddOnPrice,
  formatCompactPrice,
  formatMonthlyPrice,
  formatPercent,
  formatTrial,
  resolveCommercialPricing,
  staticCommercialPricing,
  type PublicPricingPayload,
} from "../lib/live-pricing.ts";
import { movenaPackages, packageComparisonRows } from "../lib/commercial.ts";

const payload: PublicPricingPayload = {
  generatedAt: "2026-10-14T12:00:00.000Z",
  gst: "excluded",
  plans: [
    { plan: "ONE", displayName: "Movena One", selfService: true, unitAmountCents: 12900, currency: "AUD", billingInterval: "MONTH", trialDays: 30, locations: 1, members: null },
    { plan: "COLLECTIVE", displayName: "Movena Collective", selfService: true, unitAmountCents: 34900, currency: "AUD", billingInterval: "MONTH", trialDays: 15, locations: 3, members: null },
    { plan: "ENTERPRISE", displayName: "Movena Enterprise", selfService: false, unitAmountCents: null, currency: null, billingInterval: null, trialDays: null, locations: null, members: null },
  ],
  addOns: [
    { code: "ACCESS_CONTROL", name: "Movena Kisi integration", scopeKind: "LOCATION", unitAmountCents: 4900, currency: "AUD", billingInterval: "MONTH" },
  ],
  platformFee: { bps: 30 },
};

test("formats money the way the page has always printed it", () => {
  assert.equal(formatMonthlyPrice(12900, "AUD"), "A$129 / month + GST");
  assert.equal(formatMonthlyPrice(12950, "AUD"), "A$129.50 / month + GST");
  assert.equal(formatCompactPrice(34900, "AUD"), "A$349/mo + GST");
  assert.equal(formatAddOnPrice(4900, "AUD", "LOCATION"), "+A$49 / location / month + GST");
  assert.equal(formatPercent(30), "0.30%");
  assert.equal(formatTrial(30), "30-day free trial");
  assert.equal(formatTrial(0), null);
  assert.equal(formatTrial(null), null);
});

test("the live catalogue at today's prices prints exactly the committed strings", () => {
  const live = applyLivePricing(payload);
  assert.equal(live.source, "live");
  assert.deepEqual(
    live.packages.map(({ name, price }) => [name, price]),
    movenaPackages.map(({ name, price }) => [name, price]),
  );
  assert.deepEqual(live.comparisonRows, packageComparisonRows);
  assert.equal(live.addOns[0].price, "+A$49 / location / month + GST");
  assert.equal(live.platformFeeLabel, "0.30%");
  assert.equal(
    live.platformAdministrationFee,
    "Plus a 0.30% platform administration fee on applicable Movena-processed payments.",
  );
});

test("a price change in the catalogue reaches every place the page prints it", () => {
  const changed = structuredClone(payload);
  changed.plans[0].unitAmountCents = 13900;
  changed.platformFee.bps = 25;
  const live = applyLivePricing(changed);
  assert.equal(live.packages[0].price, "A$139 / month + GST");
  assert.deepEqual(live.comparisonRows[0], ["Price", "A$139/mo + GST", "A$349/mo + GST", "Custom"]);
  assert.equal(live.platformFeeLabel, "0.25%");
  // Copy never comes from the app.
  assert.deepEqual(live.packages[0].highlights, movenaPackages[0].highlights);
  assert.equal(live.packages[0].positioning, movenaPackages[0].positioning);
});

test("the offer: trial days per plan become a card line; none means no line", () => {
  const live = applyLivePricing(payload);
  assert.deepEqual(live.packages.map((p) => p.trial), ["30-day free trial", "15-day free trial", null]);
  const noTrial = structuredClone(payload);
  noTrial.plans[1].trialDays = 0;
  assert.equal(applyLivePricing(noTrial).packages[1].trial, null);
});

test("a plan the site sells with no sellable price is refused, so the caller falls back", () => {
  const broken = structuredClone(payload);
  broken.plans[1].unitAmountCents = null;
  assert.throws(() => applyLivePricing(broken), /no sellable price/);
  assert.throws(() => applyLivePricing({ nope: true }), /unexpected shape/);
});

async function withFetch<T>(stub: (url: string) => Promise<Response>, run: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = stub as unknown as typeof fetch;
  try {
    return await run();
  } finally {
    globalThis.fetch = original;
  }
}

test("resolveCommercialPricing: live when the app answers, committed strings on any failure", async () => {
  const seen: string[] = [];
  const live = await withFetch(
    async (url) => {
      seen.push(url);
      return new Response(JSON.stringify(payload), { status: 200 });
    },
    () => resolveCommercialPricing({ MOVENA_APP_ORIGIN: "https://app.example.test/" }),
  );
  assert.equal(live.source, "live");
  assert.deepEqual(seen, ["https://app.example.test/api/public/pricing"]);

  const badStatus = await withFetch(
    async () => new Response("nope", { status: 503 }),
    () => resolveCommercialPricing({}),
  );
  assert.equal(badStatus.source, "static");

  const unreachable = await withFetch(
    async () => {
      throw new Error("ECONNREFUSED");
    },
    () => resolveCommercialPricing({}),
  );
  assert.equal(unreachable.source, "static");

  let called = false;
  const pinned = await withFetch(
    async () => {
      called = true;
      return new Response("{}", { status: 200 });
    },
    () => resolveCommercialPricing({ MOVENA_LIVE_PRICING: "off" }),
  );
  assert.equal(pinned.source, "static");
  assert.equal(called, false);
});

test("the fallback is the committed model, unchanged", () => {
  const s = staticCommercialPricing();
  assert.deepEqual(
    s.packages.map(({ name, price, trial }) => [name, price, trial]),
    movenaPackages.map(({ name, price }) => [name, price, null]),
  );
  assert.deepEqual(s.comparisonRows, packageComparisonRows);
});
