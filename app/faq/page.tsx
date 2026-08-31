import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { CommercialPageShell } from "@/components/page-shells";
import { faqItems } from "@/lib/faq";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import { faqStructuredData } from "@/lib/structured-data";

const route = routeByPath("/faq/");

export const metadata: Metadata = createRouteMetadata(route);

export default function FaqPage() {
  return (
    <CommercialPageShell activePath="/faq/">
      <JsonLd data={faqStructuredData} />

      <header className="faq-hero">
        <div className="commercial-wrap faq-hero__inner">
          <p className="commercial-kicker">Movena FAQ</p>
          <h1>Questions, answered.</h1>
          <p className="faq-hero__lede">
            Clear answers about contracts, migration, payments, apps, access
            control and your data.
          </p>
        </div>
      </header>

      <section className="faq-index" aria-labelledby="faq-heading">
        <div className="commercial-wrap">
          <h2 id="faq-heading" className="visually-hidden">
            Frequently asked questions
          </h2>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details className="faq-item" key={item.question}>
                <summary>
                  <span className="faq-item__number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-item__question">{item.question}</span>
                  <span className="faq-item__toggle" aria-hidden="true" />
                </summary>
                <div className="faq-item__answer">
                  {item.content.map((section, sectionIndex) =>
                    section.type === "paragraph" ? (
                      <p key={sectionIndex}>
                        {"href" in section ? (
                          <Link href={section.href}>{section.text}</Link>
                        ) : (
                          section.text
                        )}
                      </p>
                    ) : (
                      <ul key={sectionIndex}>
                        {section.items.map((listItem) => (
                          <li key={listItem}>{listItem}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-contact" aria-labelledby="faq-contact-heading">
        <div className="commercial-wrap faq-contact__inner">
          <div>
            <h2 id="faq-contact-heading">Still have a question?</h2>
            <p>Tell us about your gym and we’ll give you a straight answer.</p>
          </div>
          <a href={siteConfig.contactHref}>Talk to Movena</a>
        </div>
      </section>
    </CommercialPageShell>
  );
}
