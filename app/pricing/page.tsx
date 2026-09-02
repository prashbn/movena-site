import type { Metadata } from "next";

import {
  CommercialCta,
  OptionalAddOns,
  PackageCards,
  PackageComparison,
  PaymentOperations,
  PlatformFee,
} from "@/components/commercial-pricing";
import { CommercialPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/pricing/");

export const metadata: Metadata = createRouteMetadata(route);

export default function PricingPage() {
  return (
    <CommercialPageShell activePath="/pricing/">
      <header className="commercial-hero">
        <div className="commercial-wrap commercial-hero__inner">
          <div>
            <p className="commercial-kicker">Movena</p>
            <h1>Pricing</h1>
            <p className="commercial-hero__lede">
              Unlimited members. Unlimited team. Choose by locations and
              capabilities—not by member count or seats.
            </p>
          </div>
        </div>
      </header>
      <PaymentOperations />
      <PackageCards />
      <PlatformFee />
      <PackageComparison />
      <OptionalAddOns />
      <CommercialCta />
    </CommercialPageShell>
  );
}
