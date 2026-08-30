"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import type { PublicPath } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

type MarketingHeaderProps = {
  activePath?: PublicPath;
  variant?: "marketing";
};

type DocumentHeaderProps = {
  variant: "document";
};

type SiteHeaderProps = MarketingHeaderProps | DocumentHeaderProps;

const businessLinks = [
  { href: "/platform/", label: "Platform" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/integrations/", label: "Integrations" },
  { href: "/help/", label: "Help" },
] as const;

const memberLinks = [
  { href: "/members/", label: "For members" },
  { href: "/help/", label: "Help" },
] as const;

function Logo() {
  return (
    <Link href="/" className="logomark site-logo">
      <span>Movena</span>
      <span className="dot" aria-hidden="true" />
    </Link>
  );
}

function NavigationLink({
  href,
  label,
  activePath,
  onClick,
}: {
  href: PublicPath;
  label: string;
  activePath?: PublicPath;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={activePath === href ? "page" : undefined}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

export function SiteHeader(props: SiteHeaderProps) {
  const [businessOpen, setBusinessOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const businessMenuId = useId();
  const mobileMenuId = useId();
  const businessMenuRef = useRef<HTMLDivElement>(null);
  const businessButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const activePath = props.variant === "document" ? undefined : props.activePath;

  useEffect(() => {
    if (!businessOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!businessMenuRef.current?.contains(event.target as Node)) {
        setBusinessOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [businessOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    firstMobileLinkRef.current?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    if (!businessOpen && !mobileOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (mobileOpen) {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      } else {
        setBusinessOpen(false);
        businessButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [businessOpen, mobileOpen]);

  if (props.variant === "document") {
    return (
      <header className="nav site-header">
        <div className="wrap nav-row site-header__inner">
          <Logo />
          <div className="site-header__document-actions">
            <Link href="/" className="back site-header__back">
              ← Back to site
            </Link>
            <a
              className="site-header__sign-in"
              href={siteConfig.businessSignInUrl}
            >
              Sign in
            </a>
          </div>
        </div>
      </header>
    );
  }

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="nav site-header">
      <div className="wrap nav-row site-header__inner">
        <Logo />

        <nav className="site-navigation" aria-label="Primary">
          <div className="site-business-menu" ref={businessMenuRef}>
            <button
              ref={businessButtonRef}
              type="button"
              className="site-business-menu__trigger"
              aria-expanded={businessOpen}
              aria-controls={businessMenuId}
              onClick={() => {
                setMobileOpen(false);
                setBusinessOpen((open) => !open);
              }}
            >
              For businesses
              <span aria-hidden="true">⌄</span>
            </button>
            <div
              id={businessMenuId}
              className="site-business-menu__panel"
              hidden={!businessOpen}
            >
              <p>For businesses</p>
              {businessLinks.map((link) => (
                <NavigationLink
                  key={link.href}
                  {...link}
                  activePath={activePath}
                  onClick={() => setBusinessOpen(false)}
                />
              ))}
            </div>
          </div>
          <NavigationLink
            href="/members/"
            label="For members"
            activePath={activePath}
          />
        </nav>

        <div className="site-header__actions">
          <a
            className="site-header__sign-in"
            href={siteConfig.businessSignInUrl}
          >
            Sign in
          </a>
          <a className="site-header__cta" href={siteConfig.contactHref}>
            Talk to us
          </a>
        </div>

        <button
          ref={mobileButtonRef}
          type="button"
          className="site-mobile-menu__trigger"
          aria-expanded={mobileOpen}
          aria-controls={mobileMenuId}
          onClick={() => {
            setBusinessOpen(false);
            setMobileOpen((open) => !open);
          }}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id={mobileMenuId}
        className="site-mobile-menu"
        hidden={!mobileOpen}
      >
        <nav className="wrap site-mobile-menu__inner" aria-label="Mobile">
          <div className="site-mobile-menu__group">
            <p>For businesses</p>
            {businessLinks.map((link, index) => (
              <Link
                key={link.href}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                href={link.href}
                aria-current={activePath === link.href ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="site-mobile-menu__group">
            <p>For members</p>
            {memberLinks.map((link) => (
              <NavigationLink
                key={link.href}
                {...link}
                activePath={activePath}
                onClick={closeMobileMenu}
              />
            ))}
          </div>
          <div className="site-mobile-menu__actions">
            <a href={siteConfig.businessSignInUrl}>Sign in</a>
            <a href={siteConfig.contactHref}>Talk to us</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
