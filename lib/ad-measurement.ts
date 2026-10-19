export const adMeasurementConsentKey = "movena-ad-measurement-consent-v1";
export const openAiPixelId = "3DetpqnFUUkge9GGFxN1RZ";

type PixelCall = (...args: unknown[]) => void;
type QueuedPixelCall = PixelCall & { q: unknown[][] };

declare global {
  interface Window {
    oaiq?: PixelCall;
  }
}

let initialized = false;

export function hasAdMeasurementConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(adMeasurementConsentKey) === "granted";
  } catch {
    return false;
  }
}

export function initializeAdMeasurement(): void {
  if (!hasAdMeasurementConsent()) return;
  if (!window.oaiq) {
    const queued: QueuedPixelCall = Object.assign(
      (...args: unknown[]) => { queued.q.push(args); },
      { q: [] as unknown[][] },
    );
    window.oaiq = queued;
  }
  // Consent is set explicitly before initialization; never inherit SDK defaults.
  if (!initialized) {
    window.oaiq("consent", false);
    window.oaiq("init", { pixelId: openAiPixelId });
    initialized = true;
  }
  window.oaiq("consent", true);
  if (!document.getElementById("movena-openai-measurement")) {
    const script = document.createElement("script");
    script.id = "movena-openai-measurement";
    script.async = true;
    script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
    document.head.appendChild(script);
  }
}

export function revokeAdMeasurement(): void {
  if (typeof window === "undefined") return;
  window.oaiq?.("consent", false);
  for (const domain of ["", "; Domain=.movena.com.au"]) {
    document.cookie = `__oppref=; Max-Age=0; Path=/; SameSite=Lax${domain}`;
  }
}

export function trackAdEnquiry(): void {
  if (!hasAdMeasurementConsent()) return;
  try {
    // Install the queue synchronously, so an early submission isn't lost.
    initializeAdMeasurement();
    window.oaiq?.("measure", "lead_created", { type: "customer_action" });
  } catch {
    // Measurement must never turn a successful enquiry into a form error.
  }
}
