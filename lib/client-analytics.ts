"use client";

import {
  analyticsConsentStorageKey,
  analyticsMeasurementId,
} from "@/lib/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackContactEnquiry() {
  if (!analyticsMeasurementId() || typeof window === "undefined") return;

  try {
    if (
      window.localStorage.getItem(analyticsConsentStorageKey) !== "granted"
    ) {
      return;
    }
  } catch {
    return;
  }

  window.gtag?.("event", "generate_lead", {
    form_name: "website_contact",
  });
}

