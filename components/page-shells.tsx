import type { LegacySource } from "@/lib/routes";

import { LegacyMain } from "@/components/legacy-main";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type MarketingPageShellProps = {
  source: LegacySource;
  activePath?: "/platform/" | "/members/";
  cta:
    | { label: "Talk to us"; href: string }
    | { label: "Get help"; href: "/help/" };
};

export function HomePageShell({
  source,
  cta,
}: Pick<MarketingPageShellProps, "source" | "cta">) {
  return (
    <div className="site-shell home-page">
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader cta={cta} />
      <LegacyMain source={source} />
      <SiteFooter marketing />
    </div>
  );
}

export function MarketingPageShell({
  source,
  activePath,
  cta,
}: MarketingPageShellProps) {
  return (
    <div className="site-shell marketing-page">
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader activePath={activePath} cta={cta} />
      <LegacyMain source={source} />
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
