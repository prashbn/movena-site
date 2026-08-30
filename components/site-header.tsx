import Link from "next/link";

type MarketingHeaderProps = {
  activePath?: "/platform/" | "/members/";
  cta:
    | { label: "Talk to us"; href: string }
    | { label: "Get help"; href: "/help/" };
  variant?: "marketing";
};

type DocumentHeaderProps = {
  variant: "document";
};

type SiteHeaderProps = MarketingHeaderProps | DocumentHeaderProps;

function Logo() {
  return (
    <Link href="/" className="logomark site-logo">
      <span>Movena</span>
      <span className="dot" aria-hidden="true" />
    </Link>
  );
}

export function SiteHeader(props: SiteHeaderProps) {
  if (props.variant === "document") {
    return (
      <header className="nav site-header">
        <div className="wrap nav-row site-header__inner">
          <Logo />
          <Link href="/" className="back site-header__back">
            ← Back to site
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="nav site-header">
      <div className="wrap nav-row site-header__inner">
        <Logo />
        <nav className="nav-links site-navigation" aria-label="Primary">
          <Link
            href="/platform/"
            aria-current={
              props.activePath === "/platform/" ? "page" : undefined
            }
          >
            Platform
          </Link>
          <Link
            href="/members/"
            aria-current={
              props.activePath === "/members/" ? "page" : undefined
            }
          >
            For members
          </Link>
          <Link href="/help/">Help</Link>
        </nav>
        <a
          className="btn btn-primary btn-sm nav-cta site-header__cta"
          href={props.cta.href}
        >
          {props.cta.label}
        </a>
      </div>
    </header>
  );
}
