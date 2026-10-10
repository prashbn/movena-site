export type SiteTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "movena-site-theme";
const THEME_EVENT = "movena-site-theme-change";

export function resolveSiteTheme(value: string | null): SiteTheme {
  return value === "dark" ? "dark" : "light";
}

// Run before paint. Only an explicit saved choice overrides the light default.
// Storage may be unavailable in private/restricted browser contexts.
export const THEME_INIT_SCRIPT = `(function(){var theme="light";try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")theme="dark";}catch(e){}document.documentElement.dataset.theme=theme;var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==="dark"?"#0b1018":"#ffffff";})();`;

export function getSiteTheme(): SiteTheme {
  return resolveSiteTheme(document.documentElement.dataset.theme ?? null);
}

function applySiteTheme(theme: SiteTheme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? "#0b1018" : "#ffffff";
}

export function setSiteTheme(theme: SiteTheme) {
  applySiteTheme(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The current tab still switches even when persistence is blocked.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeSiteTheme(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    applySiteTheme(resolveSiteTheme(event.newValue));
    onChange();
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
