import {
  type ContactSubmission,
  isEmailAddress,
} from "./contact-schema.ts";

const brevoApiOrigin = "https://api.brevo.com/v3";

export type BrevoConfiguration = {
  apiKey: string;
  senderEmail: string;
  notificationEmail: string;
  contactListId?: number;
};

export class BrevoConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BrevoConfigurationError";
  }
}

export class BrevoRequestError extends Error {
  readonly stage: "contact" | "notification" | "acknowledgement";
  readonly status: number;

  constructor(
    stage: "contact" | "notification" | "acknowledgement",
    status: number,
  ) {
    super(`Brevo ${stage} request failed`);
    this.name = "BrevoRequestError";
    this.stage = stage;
    this.status = status;
  }
}

type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Pick<Response, "ok" | "status">>;

function requiredEnvironmentValue(
  environment: Record<string, string | undefined>,
  name: "BREVO_API_KEY" | "BREVO_SENDER_EMAIL" | "BREVO_NOTIFICATION_EMAIL",
): string {
  const value = environment[name]?.trim();
  if (!value) {
    throw new BrevoConfigurationError(`${name} is not configured`);
  }
  return value;
}

export function readBrevoConfiguration(
  environment: Record<string, string | undefined> = process.env,
): BrevoConfiguration {
  const apiKey = requiredEnvironmentValue(environment, "BREVO_API_KEY");
  const senderEmail = requiredEnvironmentValue(
    environment,
    "BREVO_SENDER_EMAIL",
  );
  const notificationEmail = requiredEnvironmentValue(
    environment,
    "BREVO_NOTIFICATION_EMAIL",
  );

  if (!isEmailAddress(senderEmail) || !isEmailAddress(notificationEmail)) {
    throw new BrevoConfigurationError(
      "Brevo sender and notification addresses must be valid email addresses",
    );
  }

  const listValue = environment.BREVO_CONTACT_LIST_ID?.trim();
  let contactListId: number | undefined;
  if (listValue) {
    contactListId = Number(listValue);
    if (!Number.isSafeInteger(contactListId) || contactListId <= 0) {
      throw new BrevoConfigurationError(
        "BREVO_CONTACT_LIST_ID must be a positive integer",
      );
    }
  }

  return {
    apiKey,
    senderEmail,
    notificationEmail,
    ...(contactListId ? { contactListId } : {}),
  };
}

export function buildBrevoContactPayload(
  submission: ContactSubmission,
  configuration: BrevoConfiguration,
) {
  return {
    email: submission.workEmail,
    attributes: {
      FIRSTNAME: submission.name,
    },
    updateEnabled: true,
    ...(configuration.contactListId
      ? { listIds: [configuration.contactListId] }
      : {}),
  };
}

function line(label: string, value: string | undefined): string {
  return `${label}: ${value || "—"}`;
}

export function buildBrevoNotificationPayload(
  submission: ContactSubmission,
  configuration: BrevoConfiguration,
  submittedAt = new Date(),
) {
  const textContent = [
    "New Movena website enquiry",
    "",
    line("Name", submission.name),
    line("Gym / business", submission.businessName),
    line("Work email", submission.workEmail),
    line("Phone", submission.phone),
    line("Number of locations", submission.locations),
    line("Interested in", submission.interest),
    line("Message", submission.message),
    "",
    line("Source", "Movena website"),
    line("Submitted", submittedAt.toISOString()),
    line("Page", submission.pagePath),
    line("Referrer", submission.referrer),
    line("UTM source", submission.utmSource),
    line("UTM medium", submission.utmMedium),
    line("UTM campaign", submission.utmCampaign),
    line("UTM content", submission.utmContent),
    line("Marketing consent", "Not collected"),
  ].join("\n");

  return {
    sender: {
      name: "Movena",
      email: configuration.senderEmail,
    },
    to: [{ email: configuration.notificationEmail }],
    replyTo: {
      name: submission.name,
      email: submission.workEmail,
    },
    subject: `New Movena website enquiry — ${submission.interest}`,
    textContent,
  };
}

export function buildBrevoAcknowledgementPayload(
  submission: ContactSubmission,
  configuration: BrevoConfiguration,
) {
  const textContent = [
    `Hi ${submission.name},`,
    "",
    "Thanks for getting in touch with Movena.",
    "",
    `We’ve received your enquiry about ${submission.interest}. Someone from Movena will be in touch soon.`,
    "",
    "If you’d like to add anything, reply to this email.",
    "",
    "Movena",
    "https://movena.com.au/",
  ].join("\n");

  return {
    sender: {
      name: "Movena",
      email: configuration.senderEmail,
    },
    to: [{ email: submission.workEmail, name: submission.name }],
    replyTo: {
      name: "Movena",
      email: configuration.notificationEmail,
    },
    subject: "We’ve received your Movena enquiry",
    textContent,
  };
}

async function postToBrevo(
  path: "/contacts" | "/smtp/email",
  body: unknown,
  configuration: BrevoConfiguration,
  stage: "contact" | "notification" | "acknowledgement",
  fetchImpl: FetchLike,
): Promise<void> {
  let response: Pick<Response, "ok" | "status">;
  try {
    response = await fetchImpl(`${brevoApiOrigin}${path}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": configuration.apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new BrevoRequestError(stage, 0);
  }

  if (!response.ok) {
    throw new BrevoRequestError(stage, response.status);
  }
}

export async function submitContactToBrevo(
  submission: ContactSubmission,
  configuration: BrevoConfiguration,
  fetchImpl: FetchLike = fetch,
): Promise<
  | { acknowledgementSent: true }
  | {
      acknowledgementSent: false;
      acknowledgementError: BrevoRequestError;
    }
> {
  await postToBrevo(
    "/contacts",
    buildBrevoContactPayload(submission, configuration),
    configuration,
    "contact",
    fetchImpl,
  );
  await postToBrevo(
    "/smtp/email",
    buildBrevoNotificationPayload(submission, configuration),
    configuration,
    "notification",
    fetchImpl,
  );

  try {
    await postToBrevo(
      "/smtp/email",
      buildBrevoAcknowledgementPayload(submission, configuration),
      configuration,
      "acknowledgement",
      fetchImpl,
    );
    return { acknowledgementSent: true };
  } catch (error) {
    if (
      error instanceof BrevoRequestError &&
      error.stage === "acknowledgement"
    ) {
      return {
        acknowledgementSent: false,
        acknowledgementError: error,
      };
    }
    throw error;
  }
}
