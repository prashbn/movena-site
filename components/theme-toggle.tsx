"use client";

import { useSyncExternalStore } from "react";
import { getSiteTheme, setSiteTheme, subscribeSiteTheme } from "@/lib/site-theme";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeSiteTheme, getSiteTheme, () => "light");
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${nextTheme} theme`;

  return (
    <button
      type="button"
      className="site-theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => setSiteTheme(nextTheme)}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {nextTheme === "dark" ? (
          <path d="M20.6 14A9 9 0 0 1 10 3.4 9 9 0 1 0 20.6 14Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
      <span>{nextTheme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
