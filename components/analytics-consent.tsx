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
import {
  adMeasurementConsentKey,
  initializeAdMeasurement,
  revokeAdMeasurement,
} from "@/lib/ad-measurement";

type ConsentState = AnalyticsConsent | "unset" | "loading";

declare global {
  interface Window {
    [key: `ga-disable-${string}`]: boolean;
  }
}

function storedConsent(key = analyticsConsentStorageKey): ConsentState {
  try {
    const value = window.localStorage.getItem(key);
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
  const [adConsent, setAdConsent] = useState<ConsentState>("loading");
  const [allowAnalyticsChoice, setAllowAnalyticsChoice] = useState(false);
  const [allowAdsChoice, setAllowAdsChoice] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initialConsent = storedConsent();
    const initialAdConsent = storedConsent(adMeasurementConsentKey);
    if (measurementId) {
      window[`ga-disable-${measurementId}`] = initialConsent !== "granted";
    }
    if (initialAdConsent === "granted") initializeAdMeasurement();
    const initialisationFrame = window.requestAnimationFrame(() => {
      setConsent(initialConsent);
      setAdConsent(initialAdConsent);
      setAllowAnalyticsChoice(initialConsent === "granted");
      setAllowAdsChoice(initialAdConsent === "granted");
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
    if (consent === "unset" || adConsent === "unset" || preferencesOpen) {
      panelRef.current?.focus();
    }
  }, [consent, adConsent, preferencesOpen]);

  const panelOpen = consent === "unset" || adConsent === "unset" || preferencesOpen;

  function rememberConsent(key: string, nextConsent: AnalyticsConsent) {
    try {
      window.localStorage.setItem(
        key,
        nextConsent,
      );
    } catch {
      // The current page can still respect the choice when storage is blocked.
    }
  }

  function saveChoices(analyticsAllowed: boolean, adsAllowed: boolean) {
    const reloadNeeded =
      (consent === "granted" && !analyticsAllowed) ||
      (adConsent === "granted" && !adsAllowed);
    const nextAnalytics = analyticsAllowed ? "granted" : "denied";
    const nextAds = adsAllowed ? "granted" : "denied";
    rememberConsent(analyticsConsentStorageKey, nextAnalytics);
    rememberConsent(adMeasurementConsentKey, nextAds);
    if (measurementId) window[`ga-disable-${measurementId}`] = !analyticsAllowed;
    if (!analyticsAllowed) removeGoogleAnalyticsCookies();
    if (adsAllowed) initializeAdMeasurement();
    else revokeAdMeasurement();
    setConsent(nextAnalytics);
    setAdConsent(nextAds);
    setAllowAnalyticsChoice(analyticsAllowed);
    setAllowAdsChoice(adsAllowed);
    setPreferencesOpen(false);

    if (reloadNeeded) {
      window.location.reload();
    }
  }

  return (
    <>
      {consent === "granted" && measurementId ? (
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
            <h2>Choose your privacy settings</h2>
            <p>
              Optional measurement stays off until you choose. You can change
              these choices through Analytics settings in the footer.
            </p>
            {measurementId ? (
              <label className="analytics-consent__choice">
                <input type="checkbox" checked={allowAnalyticsChoice}
                  onChange={(event) => setAllowAnalyticsChoice(event.target.checked)} />
                <span><strong>Allow analytics</strong> — Google Analytics helps us
                  understand website use. We do not send your enquiry details to Google.</span>
              </label>
            ) : null}
            <label className="analytics-consent__choice">
              <input type="checkbox" checked={allowAdsChoice}
                onChange={(event) => setAllowAdsChoice(event.target.checked)} />
              <span><strong>Allow ad measurement</strong> — OpenAI measures whether
                ChatGPT ads lead to enquiries using a click identifier and cookies.
                Its pixel may detect and hash supported contact details in your
                browser for matching. Raw contact details are not sent through
                this matching feature.</span>
            </label>
            <Link href="/legal/privacy/">Read our privacy policy</Link>
          </div>
          <div className="analytics-consent__actions">
            <button
              className="analytics-consent__allow"
              onClick={() => saveChoices(allowAnalyticsChoice, allowAdsChoice)}
              type="button"
            >
              Save choices
            </button>
            <button
              className="analytics-consent__decline"
              onClick={() => saveChoices(false, false)}
              type="button"
            >
              Reject optional
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
