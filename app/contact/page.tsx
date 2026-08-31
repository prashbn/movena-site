import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { CommercialPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

const route = routeByPath("/contact/");

export const metadata: Metadata = createRouteMetadata(route);

export default function ContactPage() {
  return (
    <CommercialPageShell activePath="/contact/">
      <section className="contact-hero" aria-labelledby="contact-heading">
        <div className="commercial-wrap contact-layout">
          <div className="contact-intro">
            <p className="commercial-kicker">Talk to Movena</p>
            <h1 id="contact-heading">Tell us about your gym.</h1>
            <p className="contact-intro__lede">
              A few details are enough. We’ll use them to understand what you
              are building and start the right conversation.
            </p>
            <div className="contact-intro__note">
              <p>Looking for product support?</p>
              <a href={`mailto:${siteConfig.supportEmail}`}>
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </CommercialPageShell>
  );
}
