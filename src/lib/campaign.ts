"use client";

const STORAGE_KEY = "chaitanya-campaign-v1";
const TRACKED = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/** Remember where the visit came from. Runs once per browser session. */
export function captureCampaign(): void {
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const parts = TRACKED.flatMap((key) => {
      const value = params.get(key)?.slice(0, 60);
      return value ? [`${key}=${value}`] : [];
    });
    if (params.has("gclid")) parts.push("gclid=present");
    if (params.has("fbclid")) parts.push("fbclid=present");

    let label = parts.join("; ");
    if (!label && document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        if (referrer.host !== window.location.host) label = `Referral: ${referrer.host}`;
      } catch {
        // ignore malformed referrers
      }
    }
    window.sessionStorage.setItem(STORAGE_KEY, label || "Direct");
  } catch {
    // Storage can be blocked; enquiries are then recorded as "Direct".
  }
}

export function readCampaign(): string {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) || "Direct";
  } catch {
    return "Direct";
  }
}
