import Link from "next/link";

import { AnalyticsSettingsButton } from "@/components/analytics-settings-button";
import { PlatformMarks } from "@/components/app-store-actions";
import { siteConfig } from "@/lib/site-config";

type SiteFooterProps = {
  marketing?: boolean;
};

export function SiteFooter({ marketing = false }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="wrap foot-row site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="logomark site-logo site-footer__logo">
            <span>Movena</span>
            <span className="dot" aria-hidden="true" />
          </Link>
          <p>The gym platform that remembers the training.</p>
          <Link className="site-footer__app" href="/app/">
            Get the app <PlatformMarks />
          </Link>
        </div>
        <nav className="site-footer__navigation" aria-label="Footer">
          <div className="site-footer__column">
            <p>For business</p>
            <Link href="/platform/">Platform</Link>
            <Link href="/businesses/">Who it’s for</Link>
            <Link href="/pricing/">Pricing</Link>
            <Link href="/integrations/">Integrations</Link>
            <Link href={siteConfig.contactHref}>Talk to Movena</Link>
            <a href={siteConfig.businessSignInUrl}>Sign in</a>
          </div>
          <div className="site-footer__column">
            <p>For members</p>
            <Link href="/members/">Member experience</Link>
            <Link href="/app/">Download the app</Link>
            <Link href="/help/">Help</Link>
          </div>
          <div className="site-footer__column">
            <p>Movena</p>
            <Link href="/faq/">FAQ</Link>
            <Link href="/blog/">Blog</Link>
          </div>
          <div className="site-footer__column">
            <p>Legal</p>
            <Link href="/legal/privacy/">Privacy</Link>
            <Link href="/legal/terms/">Terms</Link>
            <AnalyticsSettingsButton />
          </div>
        </nav>
      </div>
      <div className="wrap site-footer__meta">
        <span className="foot-right">
          {siteConfig.legalName} (ACN {siteConfig.acn})
          {marketing ? " · Made in Australia" : ""}
        </span>
        <span>© {new Date().getFullYear()} Movena</span>
      </div>
    </footer>
  );
}
