import { siteConfig } from "@/lib/site-config";

type PlatformMarksProps = {
  className?: string;
};

export function PlatformMarks({ className = "" }: PlatformMarksProps) {
  return (
    <span className={`platform-marks ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        <path d="M16.7 12.8c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-1-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.8 1.3 10.3.9 1.2 1.9 2.6 3.3 2.5 1.3-.1 1.8-.8 3.5-.8 1.6 0 2.1.8 3.5.8 1.5 0 2.4-1.3 3.2-2.5 1-1.4 1.4-2.9 1.4-3-.1 0-3.4-1.3-3.4-4.2ZM14.2 5.6c.7-.9 1.2-2.1 1.1-3.3-1.1 0-2.4.7-3.2 1.6-.7.8-1.3 2-1.2 3.2 1.2.1 2.5-.6 3.3-1.5Z" />
      </svg>
      <svg viewBox="0 0 24 24" role="img">
        <path d="m4.5 3.5 12.2 8.5L4.5 20.5V3.5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="m4.5 3.5 8.2 8.5-8.2 8.5M12.7 12l4-2.8 3.3 2.3c.4.3.4.7 0 1l-3.3 2.3-4-2.8Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
      </svg>
    </span>
  );
}

export function AppStoreActions() {
  return (
    <div className="member-app-store-actions" aria-label="Download Movena">
      <a
        className="member-app-store-action"
        href={siteConfig.memberApp.appStoreUrl}
        aria-label="Download Movena on the App Store"
      >
        <PlatformMarks className="platform-marks--apple" />
        <span>
          <small>Download on the</small>
          <strong>App Store</strong>
        </span>
      </a>
      <a
        className="member-app-store-action"
        href={siteConfig.memberApp.googlePlayUrl}
        aria-label="Get Movena on Google Play"
      >
        <PlatformMarks className="platform-marks--play" />
        <span>
          <small>Get it on</small>
          <strong>Google Play</strong>
        </span>
      </a>
    </div>
  );
}
