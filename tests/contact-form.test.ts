import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  BrevoRequestError,
  buildBrevoContactPayload,
  buildBrevoNotificationPayload,
  readBrevoConfiguration,
  submitContactToBrevo,
} from "../lib/brevo-contact.ts";
import {
  contactFieldLimits,
  type ContactSubmission,
  validateContactPayload,
} from "../lib/contact-schema.ts";
import {
  contactErrorMessage,
  contactSuccessMessage,
  processContactSubmission,
} from "../lib/contact-service.ts";
import { readLegacyMainMarkup } from "../lib/legacy-content.ts";

const validPayload = {
  name: "  Prash Test  ",
  businessName: "  Movena Test Gym  ",
  workEmail: "HELLO@example.com",
  locations: "2–3",
  interest: "Movena Collective",
  phone: "+61 400 000 000",
  message: "Tell me more.",
  website: "",
  utmSource: "partner",
  pagePath: "/contact/?utm_source=partner",
  referrer: "https://example.org/article",
} as const;

const validSubmission: ContactSubmission = {
  name: "Prash Test",
  businessName: "Movena Test Gym",
  workEmail: "hello@example.com",
  locations: "2–3",
  interest: "Movena Collective",
  phone: "+61400000000",
  message: "Tell me more.",
  utmSource: "partner",
  pagePath: "/contact/?utm_source=partner",
  referrer: "https://example.org/article",
};

test("a valid contact submission is normalised and delivered once", async () => {
  const delivered: ContactSubmission[] = [];
  const result = await processContactSubmission(validPayload, {
    submit: async (submission) => {
      delivered.push(submission);
    },
  });

  assert.equal(result.status, 200);
  assert.deepEqual(result.body, { ok: true, message: contactSuccessMessage });
  assert.deepEqual(delivered, [validSubmission]);
});

test("required fields, email and locked enums are server validated", async () => {
  let submitCalls = 0;
  const submit = async () => {
    submitCalls += 1;
  };

  const required = await processContactSubmission({}, { submit });
  assert.equal(required.status, 422);
  assert.equal(required.body.ok, false);
  if (!required.body.ok) {
    assert.deepEqual(Object.keys(required.body.fieldErrors || {}).sort(), [
      "businessName",
      "interest",
      "locations",
      "name",
      "workEmail",
    ]);
  }

  const invalid = validateContactPayload({
    ...validPayload,
    workEmail: "not-an-email",
    locations: "12",
    interest: "Arbitrary package",
  });
  assert.equal(invalid.ok, false);
  if (!invalid.ok) {
    assert.ok(invalid.errors.workEmail);
    assert.ok(invalid.errors.locations);
    assert.ok(invalid.errors.interest);
  }
  assert.equal(submitCalls, 0);
});

test("oversized fields and arbitrary recipient injection are rejected", async () => {
  const oversized = validateContactPayload({
    ...validPayload,
    name: "x".repeat(contactFieldLimits.name + 1),
    businessName: "x".repeat(contactFieldLimits.businessName + 1),
    message: "x".repeat(contactFieldLimits.message + 1),
  });
  assert.equal(oversized.ok, false);
  if (!oversized.ok) {
    assert.ok(oversized.errors.name);
    assert.ok(oversized.errors.businessName);
    assert.ok(oversized.errors.message);
  }

  let submitCalls = 0;
  const injected = await processContactSubmission(
    { ...validPayload, recipient: "attacker@example.com" },
    {
      submit: async () => {
        submitCalls += 1;
      },
    },
  );
  assert.equal(injected.status, 422);
  assert.equal(submitCalls, 0);
});

test("honeypot submissions return a quiet success without contacting Brevo", async () => {
  let submitCalls = 0;
  const result = await processContactSubmission(
    { ...validPayload, website: "https://spam.example" },
    {
      submit: async () => {
        submitCalls += 1;
      },
    },
  );

  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.equal(submitCalls, 0);
});

test("Brevo failures are logged through the boundary and mapped safely", async () => {
  const logged: unknown[] = [];
  const result = await processContactSubmission(validPayload, {
    submit: async () => {
      throw new BrevoRequestError("contact", 429);
    },
    onError(error) {
      logged.push(error);
    },
  });

  assert.equal(result.status, 502);
  assert.deepEqual(result.body, { ok: false, message: contactErrorMessage });
  assert.doesNotMatch(JSON.stringify(result.body), /Brevo|429|api-key/i);
  assert.equal(logged.length, 1);
});

test("Brevo configuration is explicit and contains no invented values", () => {
  assert.throws(() => readBrevoConfiguration({}), /BREVO_API_KEY/);
  assert.throws(
    () =>
      readBrevoConfiguration({
        BREVO_API_KEY: "secret",
        BREVO_SENDER_EMAIL: "sender@example.com",
        BREVO_NOTIFICATION_EMAIL: "notify@example.com",
        BREVO_CONTACT_LIST_ID: "not-a-number",
      }),
    /positive integer/,
  );

  assert.deepEqual(
    readBrevoConfiguration({
      BREVO_API_KEY: "secret",
      BREVO_SENDER_EMAIL: "sender@example.com",
      BREVO_NOTIFICATION_EMAIL: "notify@example.com",
      BREVO_CONTACT_LIST_ID: "42",
    }),
    {
      apiKey: "secret",
      senderEmail: "sender@example.com",
      notificationEmail: "notify@example.com",
      contactListId: 42,
    },
  );
});

test("Brevo receives a bounded contact update then a fixed-recipient notification", async () => {
  const configuration = {
    apiKey: "test-key",
    senderEmail: "verified@example.com",
    notificationEmail: "movena@example.com",
    contactListId: 42,
  };
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const fetchMock = async (
    input: string | URL | Request,
    init?: RequestInit,
  ) => {
    calls.push({ url: String(input), init });
    return { ok: true, status: 201 };
  };

  await submitContactToBrevo(validSubmission, configuration, fetchMock);

  assert.equal(calls.length, 2);
  assert.equal(calls[0]?.url, "https://api.brevo.com/v3/contacts");
  assert.equal(calls[1]?.url, "https://api.brevo.com/v3/smtp/email");
  assert.deepEqual(JSON.parse(String(calls[0]?.init?.body)), {
    email: "hello@example.com",
    attributes: { FIRSTNAME: "Prash Test" },
    updateEnabled: true,
    listIds: [42],
  });

  const notification = JSON.parse(String(calls[1]?.init?.body));
  assert.deepEqual(notification.to, [{ email: "movena@example.com" }]);
  assert.deepEqual(notification.replyTo, {
    name: "Prash Test",
    email: "hello@example.com",
  });
  assert.match(notification.textContent, /Gym \/ business: Movena Test Gym/);
  assert.match(notification.textContent, /Marketing consent: Not collected/);
  assert.doesNotMatch(String(calls[0]?.init?.body), /message|recipient/i);

  assert.deepEqual(
    buildBrevoContactPayload(validSubmission, configuration),
    JSON.parse(String(calls[0]?.init?.body)),
  );
  assert.equal(
    buildBrevoNotificationPayload(
      validSubmission,
      configuration,
      new Date("2026-08-31T00:00:00.000Z"),
    ).to[0]?.email,
    "movena@example.com",
  );
});

test("the client form exposes complete loading, validation, success and error states", () => {
  const component = readFileSync("components/contact-form.tsx", "utf8");
  const css = readFileSync("styles/contact.css", "utf8");
  const route = readFileSync("app/api/contact/route.ts", "utf8");

  for (const field of [
    "name",
    "businessName",
    "workEmail",
    "locations",
    "interest",
    "phone",
    "message",
    "website",
  ]) {
    assert.match(component, new RegExp(`name=\\"${field}\\"`));
  }

  assert.match(component, /fetch\("\/api\/contact\/"/);
  assert.match(component, /status === "submitting"/);
  assert.match(component, /disabled=\{submitting\}/);
  assert.match(component, /if \(status === "submitting"\) return/);
  assert.match(component, /role="status"/);
  assert.match(component, /role="alert"/);
  assert.match(component, /Privacy Policy/);
  assert.match(css, /@media \(max-width: 600px\)/);
  assert.match(css, /:focus-visible/);

  assert.match(route, /maximumBodyBytes/);
  assert.match(route, /hasAllowedOrigin/);
  assert.match(route, /checkContactRateLimit/);
  assert.match(route, /runtime = "nodejs"/);
  assert.doesNotMatch(component, /BREVO_|api\.brevo\.com|api-key/);
});

test("primary legacy sales links use the form while operational email remains", () => {
  const homepage = readLegacyMainMarkup("index.html");
  const platform = readLegacyMainMarkup("platform/index.html");
  const kisi = readLegacyMainMarkup("integrations/kisi/index.html");
  const privacy = readLegacyMainMarkup("legal/privacy/index.html");

  assert.doesNotMatch(homepage, /mailto:info@movena\.com\.au\?subject=/);
  assert.doesNotMatch(platform, /mailto:info@movena\.com\.au\?subject=/);
  assert.match(homepage, /href="\/contact\/">Book a walkthrough<\/a>/);
  assert.match(homepage, /href="\/contact\/">Talk to Movena<\/a>/);
  assert.match(platform, /href="\/contact\/">Book a walkthrough<\/a>/);
  assert.match(kisi, /href="\/contact\/">Talk to Movena<\/a>/);
  assert.match(kisi, /mailto:support@movena\.com\.au/);
  assert.match(privacy, /mailto:info@movena\.com\.au/);
});
