import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { faqAnswerText, faqItems } from "../lib/faq.ts";
import { faqStructuredData } from "../lib/structured-data.ts";

test("the FAQ preserves every supplied commercial and operational fact", () => {
  assert.equal(faqItems.length, 8);

  const faqText = faqItems
    .map((item) => `${item.question} ${faqAnswerText(item)}`)
    .join("\n");

  for (const fact of [
    /month to month/,
    /30 days’ notice/,
    /end of the billing period already paid for/,
    /members, memberships and contact details/,
    /card, BECS direct debit or PayTo/,
    /own Stripe account/,
    /Stripe sets its processing fees and discloses them in your Stripe account/,
    /Movena plan pricing on our pricing page/,
    /native app on the App Store and Google Play/,
    /Kisi hardware and Kisi subscription directly from Kisi/,
    /two suppliers and two bills/,
    /does not specify or recommend hardware/,
    /workouts and programs/,
    /check-ins and logged sessions/,
    /submissions go straight to your Leads page/,
    /hosted in Sydney, Australia/,
    /subject to the Australian Privacy Act/,
    /privacy policy explains how we handle personal information/,
    /export your data at any time/,
  ]) {
    assert.match(faqText, fact);
  }

  assert.doesNotMatch(faqText, /0\.30%/);
});

test("the FAQ is static, accessible and represented in structured data", () => {
  const page = readFileSync("app/faq/page.tsx", "utf8");
  const css = readFileSync("styles/faq.css", "utf8");

  assert.match(page, /<details/);
  assert.match(page, /<summary>/);
  assert.match(page, /faqStructuredData/);
  assert.doesNotMatch(page, /"use client"|useState|onClick/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);

  assert.equal(faqStructuredData["@type"], "FAQPage");
  assert.equal(
    (faqStructuredData.mainEntity as readonly unknown[]).length,
    faqItems.length,
  );
});

test("FAQ navigation is available to businesses and in the footer", () => {
  const header = readFileSync("components/site-header.tsx", "utf8");
  const footer = readFileSync("components/site-footer.tsx", "utf8");

  assert.match(header, /href: "\/faq\/", label: "FAQ"/);
  assert.match(footer, /href="\/faq\/">FAQ/);
});
