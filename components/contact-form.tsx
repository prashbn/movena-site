"use client";

import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  type ContactFieldErrors,
  type ContactFieldName,
  contactFieldLimits,
  contactInterestOptions,
  contactLocationOptions,
  validateContactPayload,
} from "@/lib/contact-schema";

type FormValues = {
  name: string;
  businessName: string;
  workEmail: string;
  locations: string;
  interest: string;
  phone: string;
  message: string;
  website: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  businessName: "",
  workEmail: "",
  locations: "",
  interest: "",
  phone: "",
  message: "",
  website: "",
};

function acquisitionContext() {
  if (typeof window === "undefined") {
    return {};
  }

  const search = new URLSearchParams(window.location.search);
  return {
    utmSource: search.get("utm_source") || undefined,
    utmMedium: search.get("utm_medium") || undefined,
    utmCampaign: search.get("utm_campaign") || undefined,
    utmContent: search.get("utm_content") || undefined,
    pagePath: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || undefined,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function apiMessage(value: unknown): string | undefined {
  return isRecord(value) && typeof value.message === "string"
    ? value.message
    : undefined;
}

function apiFieldErrors(value: unknown): ContactFieldErrors | undefined {
  if (!isRecord(value) || !isRecord(value.fieldErrors)) return undefined;

  const errors: ContactFieldErrors = {};
  for (const field of [
    "name",
    "businessName",
    "workEmail",
    "locations",
    "interest",
    "phone",
    "message",
    "_form",
  ] as const) {
    const message = value.fieldErrors[field];
    if (typeof message === "string") errors[field] = message;
  }
  return errors;
}

function FieldError({
  field,
  errors,
}: {
  field: ContactFieldName;
  errors: ContactFieldErrors;
}) {
  const message = errors[field];
  if (!message) return null;
  return (
    <span className="contact-field__error" id={`${field}-error`}>
      {message}
    </span>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({
      ...current,
      [field]: undefined,
      _form: undefined,
    }));
    if (status === "error") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const payload = { ...values, ...acquisitionContext() };
    const clientValidation = validateContactPayload(payload);
    if (!clientValidation.ok) {
      setFieldErrors(clientValidation.errors);
      setStatus("error");
      setStatusMessage("Check the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as unknown;

      if (response.ok && isRecord(body) && body.ok === true) {
        setStatus("success");
        setStatusMessage(
          apiMessage(body) ||
            "Thanks — we’ve received your enquiry. We’ll be in touch soon.",
        );
        return;
      }

      setFieldErrors(apiFieldErrors(body) || {});
      setStatus("error");
      setStatusMessage(
        apiMessage(body) ||
          "We couldn’t send your enquiry right now. Please try again.",
      );
    } catch {
      setStatus("error");
      setStatusMessage(
        "We couldn’t send your enquiry right now. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="contact-success"
        ref={successRef}
        role="status"
        tabIndex={-1}
      >
        <p className="contact-success__eyebrow">Enquiry received</p>
        <h2>Thanks for getting in touch.</h2>
        <p>{statusMessage}</p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      className="contact-form"
      aria-busy={submitting}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="contact-form__heading">
        <div>
          <p className="contact-form__eyebrow">Your enquiry</p>
          <h2>Start the conversation.</h2>
        </div>
        <p><span aria-hidden="true">*</span> Required</p>
      </div>

      <fieldset disabled={submitting}>
        <div className="contact-form__grid">
          <label className="contact-field" htmlFor="contact-name">
            <span>Name <span aria-hidden="true">*</span></span>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={contactFieldLimits.name}
              required
              value={values.name}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              onChange={(event) => updateField("name", event.target.value)}
            />
            <FieldError field="name" errors={fieldErrors} />
          </label>

          <label className="contact-field" htmlFor="contact-business">
            <span>Gym / business name <span aria-hidden="true">*</span></span>
            <input
              id="contact-business"
              name="businessName"
              type="text"
              autoComplete="organization"
              maxLength={contactFieldLimits.businessName}
              required
              value={values.businessName}
              aria-invalid={Boolean(fieldErrors.businessName)}
              aria-describedby={
                fieldErrors.businessName ? "businessName-error" : undefined
              }
              onChange={(event) =>
                updateField("businessName", event.target.value)
              }
            />
            <FieldError field="businessName" errors={fieldErrors} />
          </label>

          <label className="contact-field" htmlFor="contact-email">
            <span>Work email <span aria-hidden="true">*</span></span>
            <input
              id="contact-email"
              name="workEmail"
              type="email"
              autoComplete="email"
              inputMode="email"
              maxLength={contactFieldLimits.workEmail}
              required
              value={values.workEmail}
              aria-invalid={Boolean(fieldErrors.workEmail)}
              aria-describedby={
                fieldErrors.workEmail ? "workEmail-error" : undefined
              }
              onChange={(event) =>
                updateField("workEmail", event.target.value)
              }
            />
            <FieldError field="workEmail" errors={fieldErrors} />
          </label>

          <label className="contact-field" htmlFor="contact-phone">
            <span>Phone <small>Optional</small></span>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              maxLength={contactFieldLimits.phone}
              value={values.phone}
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              onChange={(event) => updateField("phone", event.target.value)}
            />
            <FieldError field="phone" errors={fieldErrors} />
          </label>

          <label className="contact-field" htmlFor="contact-locations">
            <span>Number of locations <span aria-hidden="true">*</span></span>
            <select
              id="contact-locations"
              name="locations"
              required
              value={values.locations}
              aria-invalid={Boolean(fieldErrors.locations)}
              aria-describedby={
                fieldErrors.locations ? "locations-error" : undefined
              }
              onChange={(event) =>
                updateField("locations", event.target.value)
              }
            >
              <option value="">Select</option>
              {contactLocationOptions.map((option) => (
                <option value={option} key={option}>{option}</option>
              ))}
            </select>
            <FieldError field="locations" errors={fieldErrors} />
          </label>

          <label className="contact-field" htmlFor="contact-interest">
            <span>Interested in <span aria-hidden="true">*</span></span>
            <select
              id="contact-interest"
              name="interest"
              required
              value={values.interest}
              aria-invalid={Boolean(fieldErrors.interest)}
              aria-describedby={
                fieldErrors.interest ? "interest-error" : undefined
              }
              onChange={(event) =>
                updateField("interest", event.target.value)
              }
            >
              <option value="">Select</option>
              {contactInterestOptions.map((option) => (
                <option value={option} key={option}>{option}</option>
              ))}
            </select>
            <FieldError field="interest" errors={fieldErrors} />
          </label>

          <label
            className="contact-field contact-field--wide"
            htmlFor="contact-message"
          >
            <span>Message <small>Optional</small></span>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              maxLength={contactFieldLimits.message}
              value={values.message}
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={
                fieldErrors.message ? "message-error" : undefined
              }
              onChange={(event) => updateField("message", event.target.value)}
            />
            <FieldError field="message" errors={fieldErrors} />
          </label>
        </div>

        <div className="contact-form__honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            value={values.website}
            onChange={(event) => updateField("website", event.target.value)}
          />
        </div>

        {statusMessage ? (
          <p className="contact-form__status" role="alert">
            {statusMessage}
          </p>
        ) : null}

        <div className="contact-form__actions">
          <button type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Talk to Movena"}
          </button>
          <p>
            By submitting this form, you acknowledge Movena’s{" "}
            <a href="/legal/privacy/">Privacy Policy</a>.
          </p>
        </div>
      </fieldset>
    </form>
  );
}
