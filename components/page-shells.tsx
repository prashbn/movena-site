import type { ReactNode } from "react";

import type { LegacySource, PublicPath } from "@/lib/routes";

import { LegacyMain } from "@/components/legacy-main";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";

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
      <SiteMotion />
      <SiteFooter marketing />
    </div>
  );
}

export function MarketingPageShell({
  source,
  activePath,
}: MarketingPageShellProps) {
  const pageClass = source === "members/index.html" ? " members-page"
    : source === "platform/index.html" ? " platform-page" : "";

  return (
    <div className={`site-shell marketing-page${pageClass}`}>
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader activePath={activePath} />
      <LegacyMain source={source} />
      <SiteMotion />
      <SiteFooter marketing />
    </div>
  );
}

type CommercialPageShellProps = {
  activePath:
    | "/businesses/"
    | "/pricing/"
    | "/integrations/"
    | "/app/"
    | "/contact/"
    | "/blog/"
    | "/faq/";
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
      <SiteMotion />
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
