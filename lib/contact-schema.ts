export const contactLocationOptions = ["1", "2–3", "4+"] as const;

export const contactInterestOptions = [
  "Movena One",
  "Movena Collective",
  "Movena Enterprise",
  "Access Control Integration",
  "Branded App",
  "General enquiry",
] as const;

export const contactFieldLimits = {
  name: 120,
  businessName: 160,
  workEmail: 254,
  phone: 30,
  message: 2_000,
  acquisition: 120,
  pagePath: 300,
  referrer: 500,
} as const;

export type ContactLocation = (typeof contactLocationOptions)[number];
export type ContactInterest = (typeof contactInterestOptions)[number];

export type ContactSubmission = {
  name: string;
  businessName: string;
  workEmail: string;
  locations: ContactLocation;
  interest: ContactInterest;
  phone?: string;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  pagePath?: string;
  referrer?: string;
};

export type ContactFieldName =
  | "name"
  | "businessName"
  | "workEmail"
  | "locations"
  | "interest"
  | "phone"
  | "message"
  | "_form";

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export type ContactValidationResult =
  | { ok: true; bot: true }
  | { ok: true; bot: false; data: ContactSubmission }
  | { ok: false; errors: ContactFieldErrors };

const allowedFields = new Set([
  "name",
  "businessName",
  "workEmail",
  "locations",
  "interest",
  "phone",
  "message",
  "website",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "pagePath",
  "referrer",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOption<T extends readonly string[]>(
  options: T,
  value: string,
): value is T[number] {
  return options.includes(value as T[number]);
}

function stringValue(value: unknown): string | null {
  return typeof value === "string" ? value.trim() : null;
}

function compactText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function boundedContext(value: unknown, limit: number): string | undefined {
  const text = stringValue(value);
  if (!text) return undefined;
  return text.slice(0, limit);
}

export function isEmailAddress(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(value);
}

export function validateContactPayload(
  value: unknown,
): ContactValidationResult {
  if (!isRecord(value)) {
    return { ok: false, errors: { _form: "Check the form and try again." } };
  }

  if (typeof value.website === "string" && value.website.trim() !== "") {
    return { ok: true, bot: true };
  }

  const unknownFields = Object.keys(value).filter(
    (field) => !allowedFields.has(field),
  );
  if (unknownFields.length > 0) {
    return { ok: false, errors: { _form: "Check the form and try again." } };
  }

  const errors: ContactFieldErrors = {};
  const name = stringValue(value.name);
  const businessName = stringValue(value.businessName);
  const workEmail = stringValue(value.workEmail);
  const locations = stringValue(value.locations);
  const interest = stringValue(value.interest);
  const phone = stringValue(value.phone);
  const message = stringValue(value.message);

  if (!name) {
    errors.name = "Enter your name.";
  } else if (name.length > contactFieldLimits.name) {
    errors.name = "Keep your name under 120 characters.";
  }

  if (!businessName) {
    errors.businessName = "Enter your gym or business name.";
  } else if (businessName.length > contactFieldLimits.businessName) {
    errors.businessName = "Keep the business name under 160 characters.";
  }

  if (!workEmail) {
    errors.workEmail = "Enter your work email.";
  } else if (
    workEmail.length > contactFieldLimits.workEmail ||
    !isEmailAddress(workEmail)
  ) {
    errors.workEmail = "Enter a valid work email.";
  }

  if (!locations) {
    errors.locations = "Select the number of locations.";
  } else if (!isOption(contactLocationOptions, locations)) {
    errors.locations = "Select a listed location range.";
  }

  if (!interest) {
    errors.interest = "Select what you are interested in.";
  } else if (!isOption(contactInterestOptions, interest)) {
    errors.interest = "Select a listed area of interest.";
  }

  let normalisedPhone: string | undefined;
  if (phone) {
    if (phone.length > contactFieldLimits.phone) {
      errors.phone = "Enter a shorter phone number.";
    } else {
      normalisedPhone = phone.replace(/[\s().-]/g, "");
      if (!/^\+?\d{6,20}$/u.test(normalisedPhone)) {
        errors.phone = "Enter a valid phone number.";
      }
    }
  }

  if (message && message.length > contactFieldLimits.message) {
    errors.message = "Keep your message under 2,000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const pagePathValue = boundedContext(value.pagePath, contactFieldLimits.pagePath);
  const pagePath = pagePathValue?.startsWith("/")
    ? pagePathValue
    : undefined;
  const referrerValue = boundedContext(
    value.referrer,
    contactFieldLimits.referrer,
  );
  let referrer: string | undefined;
  if (referrerValue) {
    try {
      const url = new URL(referrerValue);
      if (url.protocol === "https:" || url.protocol === "http:") {
        referrer = url.toString();
      }
    } catch {
      referrer = undefined;
    }
  }

  return {
    ok: true,
    bot: false,
    data: {
      name: compactText(name as string),
      businessName: compactText(businessName as string),
      workEmail: (workEmail as string).toLowerCase(),
      locations: locations as ContactLocation,
      interest: interest as ContactInterest,
      ...(normalisedPhone ? { phone: normalisedPhone } : {}),
      ...(message ? { message } : {}),
      ...(boundedContext(value.utmSource, contactFieldLimits.acquisition)
        ? {
            utmSource: boundedContext(
              value.utmSource,
              contactFieldLimits.acquisition,
            ),
          }
        : {}),
      ...(boundedContext(value.utmMedium, contactFieldLimits.acquisition)
        ? {
            utmMedium: boundedContext(
              value.utmMedium,
              contactFieldLimits.acquisition,
            ),
          }
        : {}),
      ...(boundedContext(value.utmCampaign, contactFieldLimits.acquisition)
        ? {
            utmCampaign: boundedContext(
              value.utmCampaign,
              contactFieldLimits.acquisition,
            ),
          }
        : {}),
      ...(boundedContext(value.utmContent, contactFieldLimits.acquisition)
        ? {
            utmContent: boundedContext(
              value.utmContent,
              contactFieldLimits.acquisition,
            ),
          }
        : {}),
      ...(pagePath ? { pagePath } : {}),
      ...(referrer ? { referrer } : {}),
    },
  };
}
