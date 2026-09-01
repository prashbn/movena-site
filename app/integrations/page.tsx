import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CommercialPageShell } from "@/components/page-shells";
import { publicIntegrations } from "@/lib/integrations";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/integrations/");

export const metadata: Metadata = createRouteMetadata(route);

export default function IntegrationsPage() {
  return (
    <CommercialPageShell activePath="/integrations/">
      <header className="commercial-hero integrations-hero">
        <div className="commercial-wrap commercial-hero__inner">
          <div>
            <p className="commercial-kicker">Movena</p>
            <h1>Integrations</h1>
          </div>
        </div>
      </header>
      <section
        className="integrations-partner"
        aria-labelledby="kisi-partner-heading"
      >
        <div className="commercial-wrap">
          <article className="integrations-partner__card">
            <div className="integrations-partner__brand" aria-hidden="true">
              <Image
                alt=""
                height={228}
                src="/assets/integrations/kisi-logo.png"
                unoptimized
                width={228}
              />
              <span>Listed in Kisi’s integration marketplace</span>
            </div>
            <div className="integrations-partner__copy">
              <p className="commercial-kicker">Kisi integration partner</p>
              <h2 id="kisi-partner-heading">
                Membership and booking rules, carried through to the door.
              </h2>
              <p>
                Movena is listed in Kisi’s integration marketplace. Enrolled
                members can receive door access from their membership or an
                eligible booking, while Kisi remains authoritative for doors,
                hardware and opening schedules.
              </p>
              <div className="integrations-partner__actions">
                <a
                  href="https://www.getkisi.com/integrations/movena"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View Movena on Kisi <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://docs.kisi.io/marketplace/fitness/movena/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Read the setup guide <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section
        className="integrations-section"
        aria-labelledby="integrations-heading"
      >
        <div className="commercial-wrap">
          <h2 id="integrations-heading" className="visually-hidden">
            Movena integrations
          </h2>
          <div className="integrations-grid">
            {publicIntegrations.map((integration, index) => (
              <article className="integration-card" key={integration.name}>
                <div className="integration-card__brand" aria-hidden="true">
                  {integration.mark.kind === "image" ? (
                    <Image
                      alt=""
                      height={integration.mark.height}
                      src={integration.mark.src}
                      unoptimized
                      width={integration.mark.width}
                    />
                  ) : (
                    <span>{integration.mark.label}</span>
                  )}
                </div>
                <span className="integration-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{integration.name}</h3>
                  {"description" in integration ? (
                    <p>{integration.description}</p>
                  ) : null}
                </div>
                {"href" in integration ? (
                  <Link className="integration-card__link" href={integration.href}>
                    View integration <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
          <p className="integrations-trademarks">
            Third-party product names and marks belong to their respective
            owners. Their display identifies compatibility and does not imply
            endorsement.
          </p>
        </div>
      </section>
    </CommercialPageShell>
  );
}
