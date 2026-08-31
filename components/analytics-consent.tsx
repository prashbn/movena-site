"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  type AnalyticsConsent,
  analyticsConsentOpenEvent,
  analyticsConsentStorageKey,
  analyticsMeasurementId,
} from "@/lib/analytics";

type ConsentState = AnalyticsConsent | "unset" | "loading";

declare global {
  interface Window {
    [key: `ga-disable-${string}`]: boolean;
  }
}

function storedConsent(): ConsentState {
  try {
    const value = window.localStorage.getItem(analyticsConsentStorageKey);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

function removeGoogleAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || (name !== "_ga" && !name.startsWith("_ga_"))) continue;

    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.movena.com.au; SameSite=Lax`;
  }
}

export function AnalyticsConsentManager() {
  const measurementId = analyticsMeasurementId();
  const [consent, setConsent] = useState<ConsentState>("loading");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!measurementId) return;

    const initialConsent = storedConsent();
    window[`ga-disable-${measurementId}`] = initialConsent !== "granted";
    const initialisationFrame = window.requestAnimationFrame(() => {
      setConsent(initialConsent);
    });

    function openPreferences() {
      setPreferencesOpen(true);
    }

    window.addEventListener(analyticsConsentOpenEvent, openPreferences);
    return () => {
      window.cancelAnimationFrame(initialisationFrame);
      window.removeEventListener(analyticsConsentOpenEvent, openPreferences);
    };
  }, [measurementId]);

  useEffect(() => {
    if (consent === "unset" || preferencesOpen) {
      panelRef.current?.focus();
    }
  }, [consent, preferencesOpen]);

  if (!measurementId) return null;

  const panelOpen = consent === "unset" || preferencesOpen;

  function rememberConsent(nextConsent: AnalyticsConsent) {
    try {
      window.localStorage.setItem(
        analyticsConsentStorageKey,
        nextConsent,
      );
    } catch {
      // The current page can still respect the choice when storage is blocked.
    }
  }

  function allowAnalytics() {
    rememberConsent("granted");
    window[`ga-disable-${measurementId}`] = false;
    setConsent("granted");
    setPreferencesOpen(false);
  }

  function declineAnalytics() {
    const analyticsWasLoaded = consent === "granted";
    rememberConsent("denied");
    window[`ga-disable-${measurementId}`] = true;
    removeGoogleAnalyticsCookies();
    setConsent("denied");
    setPreferencesOpen(false);

    if (analyticsWasLoaded) {
      window.location.reload();
    }
  }

  return (
    <>
      {consent === "granted" ? (
        <GoogleAnalytics gaId={measurementId} />
      ) : null}

      {panelOpen ? (
        <section
          aria-label="Analytics preferences"
          className="analytics-consent"
          ref={panelRef}
          role="dialog"
          tabIndex={-1}
        >
          <div className="analytics-consent__copy">
            <p className="analytics-consent__eyebrow">Your privacy</p>
            <h2>Help us improve the Movena website?</h2>
            <p>
              If you allow it, Google Analytics will show us which pages are
              useful. We do not send your contact-form details, and analytics
              stays off until you choose.
            </p>
            <Link href="/legal/privacy/">Read our privacy policy</Link>
          </div>
          <div className="analytics-consent__actions">
            <button
              className="analytics-consent__allow"
              onClick={allowAnalytics}
              type="button"
            >
              Allow analytics
            </button>
            <button
              className="analytics-consent__decline"
              onClick={declineAnalytics}
              type="button"
            >
              {consent === "granted" ? "Turn off analytics" : "Not now"}
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
