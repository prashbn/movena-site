import type { Metadata } from "next";
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
        </div>
      </section>
    </CommercialPageShell>
  );
}
