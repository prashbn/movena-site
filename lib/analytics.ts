export const analyticsConsentStorageKey =
  "movena-analytics-consent-v1";
export const analyticsConsentOpenEvent = "movena:open-analytics-consent";

export type AnalyticsConsent = "granted" | "denied";

export function analyticsMeasurementId(): string | undefined {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return measurementId && /^G-[A-Z0-9]+$/.test(measurementId)
    ? measurementId
    : undefined;
}

