import {
  type ContactFieldErrors,
  type ContactSubmission,
  validateContactPayload,
} from "./contact-schema.ts";

export const contactSuccessMessage =
  "Thanks — we’ve received your enquiry. We’ll be in touch soon.";
export const contactErrorMessage =
  "We couldn’t send your enquiry right now. Please try again.";

type ContactResponseBody =
  | { ok: true; message: string }
  | {
      ok: false;
      message: string;
      fieldErrors?: ContactFieldErrors;
    };

export type ContactProcessingResult = {
  status: number;
  body: ContactResponseBody;
};

type ContactProcessingOptions = {
  submit: (submission: ContactSubmission) => Promise<void>;
  onError?: (error: unknown) => void;
};

export async function processContactSubmission(
  payload: unknown,
  { submit, onError }: ContactProcessingOptions,
): Promise<ContactProcessingResult> {
  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return {
      status: 422,
      body: {
        ok: false,
        message: "Check the highlighted fields and try again.",
        fieldErrors: validation.errors,
      },
    };
  }

  if (validation.bot) {
    return {
      status: 200,
      body: { ok: true, message: contactSuccessMessage },
    };
  }

  try {
    await submit(validation.data);
    return {
      status: 200,
      body: { ok: true, message: contactSuccessMessage },
    };
  } catch (error) {
    onError?.(error);
    return {
      status: 502,
      body: { ok: false, message: contactErrorMessage },
    };
  }
}
