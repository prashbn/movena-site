import type { Metadata } from "next";
import Link from "next/link";

import { CommercialPageShell } from "@/components/page-shells";
import { businessTypes, supportedDisciplines } from "@/lib/businesses";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";

const route = routeByPath("/businesses/");

export const metadata: Metadata = createRouteMetadata(route);

export default function BusinessesPage() {
  return (
    <CommercialPageShell activePath="/businesses/">
      <header className="businesses-hero">
        <div className="commercial-wrap businesses-hero__inner">
          <div className="businesses-hero__copy">
            <p className="commercial-kicker">Who Movena is for</p>
            <h1>Built for how your business trains.</h1>
            <p>
              Movena brings memberships, bookings, payments, check-ins,
              programming and progress together for fitness businesses that
              coach in person.
            </p>
            <div className="businesses-hero__actions">
              <a className="commercial-button" href={siteConfig.contactHref}>
                Talk to Movena
              </a>
              <Link className="businesses-text-link" href="/platform/">
                Explore the platform <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="businesses-hero__statement" aria-label="18 supported disciplines">
            <strong>18</strong>
            <span>disciplines already set up</span>
            <p>One builder. One timetable. One member record.</p>
          </div>
        </div>
      </header>

      <section className="businesses-types" aria-labelledby="business-types-heading">
        <div className="commercial-wrap">
          <div className="businesses-section-heading">
            <p className="commercial-kicker">Business types</p>
            <h2 id="business-types-heading">
              The same foundation, shaped around your operation.
            </h2>
          </div>
          <div className="businesses-grid">
            {businessTypes.map((business, index) => (
              <article className="business-type" key={business.name}>
                <span className="business-type__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{business.name}</h3>
                <p>{business.description}</p>
                <ul aria-label={`${business.name} capabilities`}>
                  {business.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="businesses-disciplines" aria-labelledby="disciplines-heading">
        <div className="commercial-wrap businesses-disciplines__inner">
          <div>
            <p className="commercial-kicker">Your kind of training</p>
            <h2 id="disciplines-heading">Eighteen disciplines. Already set up.</h2>
            <p>
              Programme any of them in the same builder, without changing the
              way your gym works.
            </p>
          </div>
          <ul className="businesses-disciplines__list">
            {supportedDisciplines.map((discipline) => (
              <li key={discipline}>{discipline}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="businesses-cta" aria-labelledby="businesses-cta-heading">
        <div className="commercial-wrap businesses-cta__inner">
          <div>
            <p className="commercial-kicker">For owners</p>
            <h2 id="businesses-cta-heading">Show us how your business runs.</h2>
            <p>
              Tell us about your timetable, memberships and locations. We’ll
              show you where Movena fits.
            </p>
          </div>
          <div className="businesses-cta__actions">
            <a className="commercial-button" href={siteConfig.contactHref}>
              Talk to Movena
            </a>
            <Link href="/pricing/">See pricing</Link>
          </div>
        </div>
      </section>
    </CommercialPageShell>
  );
}
