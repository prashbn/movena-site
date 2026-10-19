import assert from "node:assert/strict";
import test from "node:test";
import {
  adMeasurementConsentKey,
  hasAdMeasurementConsent,
  initializeAdMeasurement,
  revokeAdMeasurement,
  trackAdEnquiry,
} from "../lib/ad-measurement.ts";

test("ad measurement requires its own consent, queues early leads and respects withdrawal", () => {
  const values = new Map<string, string>();
  const scripts: { id: string; src: string; async: boolean }[] = [];
  const cookies: string[] = [];
  const fakeWindow: {
    localStorage: { getItem: (key: string) => string | null };
    oaiq?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  } = { localStorage: { getItem: (key) => values.get(key) ?? null } };
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  Object.defineProperty(globalThis, "window", { configurable: true, value: fakeWindow });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {
      getElementById: (id: string) => scripts.find((script) => script.id === id),
      createElement: () => ({ id: "", src: "", async: false }),
      head: { appendChild: (script: typeof scripts[number]) => scripts.push(script) },
      set cookie(value: string) { cookies.push(value); },
    },
  });
  try {
    initializeAdMeasurement();
    trackAdEnquiry();
    assert.equal(scripts.length, 0);
    values.set("movena-analytics-consent-v1", "granted");
    trackAdEnquiry();
    assert.equal(scripts.length, 0, "GA consent must not enable ad measurement");

    values.set(adMeasurementConsentKey, "granted");
    trackAdEnquiry();
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].src, "https://bzrcdn.openai.com/sdk/oaiq.min.js");
    const calls = fakeWindow.oaiq?.q;
    assert.ok(calls);
    assert.deepEqual(calls[0], ["consent", false]);
    assert.deepEqual(calls[1], ["init", { pixelId: "3DetpqnFUUkge9GGFxN1RZ" }]);
    assert.deepEqual(calls[2], ["consent", true]);
    assert.deepEqual(calls[3], ["measure", "lead_created", { type: "customer_action" }]);
    assert.equal(calls.filter((call) => call[0] === "measure").length, 1);
    initializeAdMeasurement();
    assert.equal(scripts.length, 1, "initialization must not insert duplicate SDKs");
    assert.equal(calls.filter((call) => call[0] === "init").length, 1);

    values.set(adMeasurementConsentKey, "denied");
    revokeAdMeasurement();
    const before = calls.length;
    trackAdEnquiry();
    assert.equal(calls.length, before);
    assert.deepEqual(calls.at(-1), ["consent", false]);
    assert.ok(cookies.every((cookie) => cookie.startsWith("__oppref=; Max-Age=0")));

    fakeWindow.localStorage.getItem = () => { throw new Error("storage blocked"); };
    assert.equal(hasAdMeasurementConsent(), false);
    assert.doesNotThrow(trackAdEnquiry);
  } finally {
    if (oldWindow) Object.defineProperty(globalThis, "window", oldWindow);
    else Reflect.deleteProperty(globalThis, "window");
    if (oldDocument) Object.defineProperty(globalThis, "document", oldDocument);
    else Reflect.deleteProperty(globalThis, "document");
  }
});
