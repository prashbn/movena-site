"use client";

import {
  analyticsConsentOpenEvent,
} from "@/lib/analytics";

export function AnalyticsSettingsButton() {
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
