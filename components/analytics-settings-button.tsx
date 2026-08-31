"use client";

import {
  analyticsConsentOpenEvent,
  analyticsMeasurementId,
} from "@/lib/analytics";

export function AnalyticsSettingsButton() {
  if (!analyticsMeasurementId()) return null;

  return (
    <button
      className="site-footer__settings"
      onClick={() => window.dispatchEvent(new Event(analyticsConsentOpenEvent))}
      type="button"
    >
      Analytics settings
    </button>
  );
}

