import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Page not found — Movena",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <>
      <a className="visually-hidden" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <div className="hero">
          <div className="wrap">
            <span className="kicker">404</span>
            <h1>That page is not here.</h1>
            <p className="lede">
              The address may have changed, or the page may no longer exist.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href="/">
                Back to Movena
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter marketing />
    </>
  );
}
