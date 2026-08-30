import type { ReactNode } from "react";

import type { LegacySource, PublicPath } from "@/lib/routes";

import { LegacyMain } from "@/components/legacy-main";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type MarketingPageShellProps = {
  source: LegacySource;
  activePath?: PublicPath;
};

export function HomePageShell({
  source,
}: Pick<MarketingPageShellProps, "source">) {
  return (
    <div className="site-shell home-page">
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <LegacyMain source={source} />
      <SiteFooter marketing />
    </div>
  );
}

export function MarketingPageShell({
  source,
  activePath,
}: MarketingPageShellProps) {
  return (
    <div className="site-shell marketing-page">
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader activePath={activePath} />
      <LegacyMain source={source} />
      <SiteFooter marketing />
    </div>
  );
}

type CommercialPageShellProps = {
  activePath: "/pricing/" | "/integrations/" | "/app/";
  children: ReactNode;
};

export function CommercialPageShell({
  activePath,
  children,
}: CommercialPageShellProps) {
  return (
    <div className="site-shell commercial-page">
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader activePath={activePath} />
      <main id="main">{children}</main>
      <SiteFooter marketing />
    </div>
  );
}

type DocumentPageShellProps = {
  source: LegacySource;
};

export function DocumentPageShell({ source }: DocumentPageShellProps) {
  return (
    <div className="doc site-shell document-page">
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader variant="document" />
      <LegacyMain source={source} />
      <SiteFooter />
    </div>
  );
}
