import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import {
  BrevoRequestError,
  readBrevoConfiguration,
  submitContactToBrevo,
} from "@/lib/brevo-contact";
import {
  checkContactRateLimit,
  contactRequestIdentifier,
} from "@/lib/contact-rate-limit";
import {
  contactErrorMessage,
  processContactSubmission,
} from "@/lib/contact-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maximumBodyBytes = 12_000;

function jsonError(status: number, message: string, headers?: HeadersInit) {
  return NextResponse.json(
    { ok: false, message },
    { status, headers },
  );
}

function hasAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",", 1)[0];
  const host = forwardedHost?.trim() || request.headers.get("host");
  const forwardedProtocol = request.headers
    .get("x-forwarded-proto")
    ?.split(",", 1)[0]
    ?.trim();
  const protocol = forwardedProtocol || request.nextUrl.protocol.slice(0, -1);
  if (!host || !protocol) return false;

  try {
    return new URL(origin).origin === `${protocol}://${host}`;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!hasAllowedOrigin(request)) {
    return jsonError(403, contactErrorMessage);
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return jsonError(415, contactErrorMessage);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > maximumBodyBytes) {
    return jsonError(413, contactErrorMessage);
  }

  const bodyText = await request.text();
  if (new TextEncoder().encode(bodyText).byteLength > maximumBodyBytes) {
    return jsonError(413, contactErrorMessage);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(bodyText) as unknown;
  } catch {
    return jsonError(400, contactErrorMessage);
  }

  const identifier = contactRequestIdentifier(
    request.headers.get("x-forwarded-for"),
    request.headers.get("x-real-ip"),
  );
  const rateLimit = checkContactRateLimit(identifier);
  if (!rateLimit.allowed) {
    return jsonError(429, contactErrorMessage, {
      "retry-after": String(rateLimit.retryAfterSeconds),
    });
  }

  const requestId = randomUUID();
  const result = await processContactSubmission(payload, {
    submit: async (submission) => {
      const configuration = readBrevoConfiguration();
      const delivery = await submitContactToBrevo(submission, configuration);
      if (!delivery.acknowledgementSent) {
        console.error("contact_acknowledgement_failed", {
          requestId,
          stage: delivery.acknowledgementError.stage,
          status: delivery.acknowledgementError.status,
        });
      }
    },
    onError(error) {
      if (error instanceof BrevoRequestError) {
        console.error("contact_submission_failed", {
          requestId,
          stage: error.stage,
          status: error.status,
        });
        return;
      }

      console.error("contact_submission_failed", {
        requestId,
        stage: "configuration_or_transport",
      });
    },
  });

  return NextResponse.json(result.body, { status: result.status });
}
