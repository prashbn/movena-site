import { createHash } from "node:crypto";

const windowMilliseconds = 10 * 60 * 1_000;
const maximumSubmissions = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const entries = new Map<string, RateLimitEntry>();

export type ContactRateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export function contactRequestIdentifier(
  forwardedFor: string | null,
  realIp: string | null,
): string {
  const address = forwardedFor?.split(",", 1)[0]?.trim() || realIp || "unknown";
  return createHash("sha256").update(address).digest("hex");
}

export function checkContactRateLimit(
  identifier: string,
  now = Date.now(),
): ContactRateLimitResult {
  const current = entries.get(identifier);

  if (!current || current.resetAt <= now) {
    entries.set(identifier, {
      count: 1,
      resetAt: now + windowMilliseconds,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= maximumSubmissions) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
