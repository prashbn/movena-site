/**
 * Live pricing (Prash, 2026-10-14).
 *
 * The prices on /pricing/ come from the Movena catalogue, read from the app's
 * public endpoint `GET /api/public/pricing` AT BUILD TIME, instead of the
 * hand-typed strings in `./commercial.ts`. Those strings stay as the FALLBACK
 * (and as the copy: positioning, highlights and comparison rows never come
 * from the app — only money and trial days do).
 *
 * Build time, not request time, on purpose: this site's architecture guard
 * (tests/assets-and-architecture.test.ts) keeps the runtime backend surface to
 * the contact endpoint — no `revalidate`, no request-time data. So a price
 * change in the app reaches the site at the next deploy of this repo, and a
 * build that cannot reach the app ships the committed strings and says so in
 * the build log (`source: "static"`), never a blank or a guess.
 */
import {
  movenaPackages,
  optionalAddOns,
  packageComparisonRows,
  platformAdministrationFee,
} from "./commercial.ts";
import { siteConfig } from "./site-config.ts";

/** Shape served by gym-os `src/lib/services/public-pricing.ts`. */
export interface PublicPricingPayload {
  generatedAt: string;
  gst: "excluded";
  plans: Array<{
    plan: "ONE" | "COLLECTIVE" | "ENTERPRISE" | string;
    displayName: string;
    selfService: boolean;
    unitAmountCents: number | null;
    currency: string | null;
    billingInterval: string | null;
    trialDays: number | null;
    locations: number | null;
    members: null;
  }>;
  addOns: Array<{
    code: string;
    name: string;
    scopeKind: string;
    unitAmountCents: number;
    currency: string;
    billingInterval: string;
  }>;
  platformFee: { bps: number | null };
}

export interface CommercialPackage {
  id: (typeof movenaPackages)[number]["id"];
  name: string;
  price: string;
  /** "30-day free trial" for a new gym, or null when unknown or none. */
  trial: string | null;
  positioning: string;
  highlights: readonly string[];
}

export interface CommercialAddOn {
  name: string;
  price: string;
  detail: string;
}

export interface CommercialPricing {
  source: "live" | "static";
  packages: readonly CommercialPackage[];
  comparisonRows: ReadonlyArray<readonly string[]>;
  addOns: readonly CommercialAddOn[];
  platformFeeLabel: string;
  platformAdministrationFee: string;
}

const PLAN_BY_PACKAGE: Record<CommercialPackage["id"], string> = {
  one: "ONE",
  collective: "COLLECTIVE",
  enterprise: "ENTERPRISE",
};

const ADD_ON_CODE_BY_NAME: Record<string, string> = {
  "Access Control Integration": "ACCESS_CONTROL",
};

function currencySymbol(currency: string): string {
  return currency === "AUD" ? "A$" : `${currency} `;
}

function amount(cents: number): string {
  const whole = cents / 100;
  return Number.isInteger(whole) ? String(whole) : whole.toFixed(2);
}

/** "A$129 / month + GST" — the card string. */
export function formatMonthlyPrice(cents: number, currency: string): string {
  return `${currencySymbol(currency)}${amount(cents)} / month + GST`;
}

/** "A$129/mo + GST" — the comparison-table string. */
export function formatCompactPrice(cents: number, currency: string): string {
  return `${currencySymbol(currency)}${amount(cents)}/mo + GST`;
}

/** "+A$49 / location / month + GST" — the add-on string. */
export function formatAddOnPrice(cents: number, currency: string, scopeKind: string): string {
  const unit = scopeKind === "LOCATION" ? "location" : scopeKind.toLowerCase();
  return `+${currencySymbol(currency)}${amount(cents)} / ${unit} / month + GST`;
}

/** 30 bps → "0.30%". Shown as a percentage only, never a dollar figure. */
export function formatPercent(bps: number): string {
  return `${(bps / 100).toFixed(2)}%`;
}

export function formatTrial(trialDays: number | null): string | null {
  if (trialDays === null || trialDays <= 0) return null;
  return `${trialDays}-day free trial`;
}

export function staticCommercialPricing(): CommercialPricing {
  return {
    source: "static",
    packages: movenaPackages.map((p) => ({ ...p, trial: null })),
    comparisonRows: packageComparisonRows,
    addOns: optionalAddOns.map((a) => ({ ...a })),
    platformFeeLabel: "0.30%",
    platformAdministrationFee,
  };
}

function isPayload(value: unknown): value is PublicPricingPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<PublicPricingPayload>;
  return Array.isArray(v.plans) && Array.isArray(v.addOns) && typeof v.platformFee === "object" && v.platformFee !== null;
}

/**
 * Pure: the catalogue payload → what the page prints. Throws when a plan the
 * site sells has no price, so the caller falls back to the committed strings
 * rather than printing a blank or a guess.
 */
export function applyLivePricing(payload: unknown): CommercialPricing {
  if (!isPayload(payload)) throw new Error("pricing payload has an unexpected shape");
  const fallback = staticCommercialPricing();

  const packages: CommercialPackage[] = fallback.packages.map((pkg) => {
    const plan = payload.plans.find((p) => p.plan === PLAN_BY_PACKAGE[pkg.id]);
    if (!plan) throw new Error(`pricing payload is missing plan ${PLAN_BY_PACKAGE[pkg.id]}`);
    if (!plan.selfService) return { ...pkg, price: "Custom", trial: null };
    if (plan.unitAmountCents === null || plan.currency === null) {
      throw new Error(`plan ${plan.plan} has no sellable price`);
    }
    return {
      ...pkg,
      name: plan.displayName || pkg.name,
      price: formatMonthlyPrice(plan.unitAmountCents, plan.currency),
      trial: formatTrial(plan.trialDays),
    };
  });

  const compact = (id: CommercialPackage["id"]) => {
    const plan = payload.plans.find((p) => p.plan === PLAN_BY_PACKAGE[id])!;
    return plan.selfService && plan.unitAmountCents !== null && plan.currency !== null
      ? formatCompactPrice(plan.unitAmountCents, plan.currency)
      : "Custom";
  };
  const comparisonRows = fallback.comparisonRows.map((row) =>
    row[0] === "Price" ? ["Price", compact("one"), compact("collective"), compact("enterprise")] : row,
  );

  const addOns: CommercialAddOn[] = fallback.addOns.map((addOn) => {
    const code = ADD_ON_CODE_BY_NAME[addOn.name];
    const live = code ? payload.addOns.find((a) => a.code === code) : undefined;
    return live ? { ...addOn, price: formatAddOnPrice(live.unitAmountCents, live.currency, live.scopeKind) } : addOn;
  });

  const bps = payload.platformFee.bps;
  const platformFeeLabel = bps === null ? fallback.platformFeeLabel : formatPercent(bps);

  return {
    source: "live",
    packages,
    comparisonRows,
    addOns,
    platformFeeLabel,
    platformAdministrationFee: `Plus a ${platformFeeLabel} platform administration fee on applicable Movena-processed payments.`,
  };
}

/**
 * Reads the app's public pricing once per build (`force-cache`); falls back to
 * the committed strings on any failure. `MOVENA_APP_ORIGIN` overrides the app
 * (UAT, local); `MOVENA_LIVE_PRICING=off` pins the static strings.
 */
export async function resolveCommercialPricing(
  env: Record<string, string | undefined> = process.env,
): Promise<CommercialPricing> {
  if (env.MOVENA_LIVE_PRICING?.trim().toLowerCase() === "off") return staticCommercialPricing();
  const origin = (env.MOVENA_APP_ORIGIN?.trim() || siteConfig.appOrigin).replace(/\/+$/, "");
  try {
    // A literal `fetch(` on purpose: the architecture guard counts fetch call
    // sites by that token, and this module is on its allowlist.
    const res = await fetch(`${origin}/api/public/pricing`, {
      headers: { accept: "application/json" },
      cache: "force-cache",
    });
    if (!res.ok) throw new Error(`pricing endpoint answered ${res.status}`);
    return applyLivePricing(await res.json());
  } catch (error) {
    console.warn(
      `[pricing] showing committed prices: ${error instanceof Error ? error.message : String(error)}`,
    );
    return staticCommercialPricing();
  }
}
