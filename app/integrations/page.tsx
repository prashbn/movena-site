import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CommercialPageShell } from "@/components/page-shells";
import { HomeDiscoveryIcon } from "@/components/home-discovery-icon";
import { publicIntegrations } from "@/lib/integrations";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/integrations/");

const memberJourney = [
  { title: "New lead", icon: "team", detail: "Bring website, Facebook and Google enquiries into Movena for your team to follow up." },
  { title: "Membership", icon: "money", detail: "Convert the enquiry to a member, with their plan and Stripe payments in the same platform." },
  { title: "Booking", icon: "day", detail: "Members book eligible sessions in the app. Your team sees the timetable and attendance." },
  { title: "Gym access", icon: "door", detail: "With Kisi connected, eligible memberships and bookings can grant enrolled members door access." },
] as const;

export const metadata: Metadata = createRouteMetadata(route);

export default function IntegrationsPage() {
  return (
    <CommercialPageShell activePath="/integrations/">
      <header className="commercial-hero integrations-hero">
        <div className="commercial-wrap commercial-hero__inner">
          <div>
            <p className="commercial-kicker">Movena</p>
            <h1>Integrations</h1>
            <p className="integrations-hero__lede">Connect the tools your gym relies on. Fewer manual handoffs, more time for your members.</p>
          </div>
        </div>
      </header>
      <section className="integrations-journey" aria-labelledby="integrations-journey-heading">
        <div className="commercial-wrap">
          <h2 id="integrations-journey-heading">From the first enquiry to the gym floor.</h2>
          <p className="integrations-journey__lede">One connected member journey—with your team in control.</p>
          <ol className="integrations-journey__steps">
            {memberJourney.map((step, index) => (
              <li key={step.title}>
                <div className="integrations-journey__step-label"><HomeDiscoveryIcon name={step.icon} /><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className="integrations-journey__note">Availability depends on the connections and settings your gym enables. MYOB uses accounting-ready exports, rather than a direct connection.</p>
        </div>
      </section>
      <section className="integrations-ai" aria-labelledby="integrations-ai-heading">
        <div className="commercial-wrap integrations-ai__inner">
          <div>
            <p className="commercial-kicker">Movena + ChatGPT</p>
            <h2 id="integrations-ai-heading">Ask your gym.<br />Find what needs attention.</h2>
            <p>Explore booking patterns and available capacity through conversation, within your account’s permissions. Less hunting through reports, a clearer place to start.</p>
            <Link className="integration-card__link" href="/help/ai-assistants/#chatgpt">See what you can ask and how to connect <span aria-hidden="true">→</span></Link>
          </div>
          <div className="integrations-ai__examples">
            <p className="commercial-kicker">Questions you can ask</p>
            <ul>
              <li>“How are this week’s sessions booking?”</li>
              <li>“Which upcoming sessions still have places?”</li>
              <li>“How have bookings changed over time?”</li>
            </ul>
            <p className="integrations-ai__boundary">Read-only, permission-based answers—not autonomous changes. Member training and session-health sharing are separate, optional choices for eligible adult members. The Claude connector is enabled in production; its Anthropic directory listing is in review.</p>
          </div>
        </div>
      </section>
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
              <p>
                For 24/7 and unstaffed gyms, this removes the
                reception-managed door list. It does not replace the wider
                security, safety, monitoring and emergency-response setup the
                facility needs.
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
                <div
                  className={`integration-card__brand${
                    "layout" in integration.mark
                      ? ` integration-card__brand--${integration.mark.layout}`
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  {integration.mark.kind === "image" ? (
                    <Image
                      alt=""
                      height={integration.mark.height}
                      src={integration.mark.src}
                      unoptimized
                      width={integration.mark.width}
                    />
                  ) : (
                    <span>{integration.mark.text}</span>
                  )}
                </div>
                <span className="integration-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{integration.name}</h3>
                  {"status" in integration ? (
                    <span className="integration-card__status">
                      {integration.status}
                    </span>
                  ) : null}
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
            owners. Their display identifies compatibility or the stated
            review/availability status and does not imply
            endorsement. Intuit and QuickBooks are trademarks of Intuit Inc.,
            registered in the US and other countries. Movena is not endorsed
            or sponsored by Intuit. MYOB is a registered trademark of MYOB
            Technology Pty Ltd. Apple and iPhone are trademarks of Apple Inc.,
            registered in the U.S. and other countries.
          </p>
        </div>
      </section>
    </CommercialPageShell>
  );
}
