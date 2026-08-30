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

export function MarketingPageShell({
  source,
  activePath,
  cta,
}: MarketingPageShellProps) {
  return (
    <>
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader activePath={activePath} cta={cta} />
      <LegacyMain source={source} />
      <SiteFooter marketing />
    </>
  );
}

type DocumentPageShellProps = {
  source: LegacySource;
};

export function DocumentPageShell({ source }: DocumentPageShellProps) {
  return (
    <div className="doc">
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader variant="document" />
      <LegacyMain source={source} />
      <SiteFooter />
    </div>
  );
}
