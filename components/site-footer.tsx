import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

type SiteFooterProps = {
  marketing?: boolean;
};

export function SiteFooter({ marketing = false }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="wrap foot-row site-footer__inner">
        <Link href="/" className="logomark site-logo site-footer__logo">
          <span>Movena</span>
          <span className="dot" aria-hidden="true" />
        </Link>
        <nav className="site-footer__navigation" aria-label="Footer">
          <Link href="/platform/">Platform</Link>
          <Link href="/businesses/">Who it’s for</Link>
          <Link href="/pricing/">Pricing</Link>
          <Link href="/integrations/">Integrations</Link>
          <Link href="/faq/">FAQ</Link>
          <Link href="/blog/">Blog</Link>
          <Link href="/members/">For members</Link>
          <Link href="/app/">Download the app</Link>
          <Link href="/help/">Help</Link>
          <Link href={siteConfig.contactHref}>Talk to Movena</Link>
          <a href={siteConfig.businessSignInUrl}>Sign in</a>
          <Link href="/legal/privacy/">Privacy</Link>
          <Link href="/legal/terms/">Terms</Link>
        </nav>
        <span className="foot-right">
          {siteConfig.legalName} (ACN {siteConfig.acn})
          {marketing ? " · Made in Australia" : ""}
        </span>
      </div>
    </footer>
  );
}
