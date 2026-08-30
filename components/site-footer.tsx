import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

type SiteFooterProps = {
  marketing?: boolean;
};

export function SiteFooter({ marketing = false }: SiteFooterProps) {
  return (
    <footer>
      <div className="wrap foot-row">
        <Link href="/" className="logomark" style={{ fontSize: 16 }}>
          Movena<span className="dot" />
        </Link>
        <Link href="/platform/">Platform</Link>
        <Link href="/members/">For members</Link>
        <Link href="/help/">Help</Link>
        <Link href="/legal/privacy/">Privacy</Link>
        <Link href="/legal/terms/">Terms</Link>
        <span className="foot-right">
          {siteConfig.legalName} (ACN {siteConfig.acn})
          {marketing ? " · Made in Australia" : ""}
        </span>
      </div>
    </footer>
  );
}
