import type { Metadata } from "next";
import Link from "next/link";

import {
  OptionalAddOns,
  PackageCards,
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
          </div>
          <Link className="commercial-text-link" href="/product-comparison/">
            Product comparison <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>
      <PackageCards />
      <PlatformFee />
      <OptionalAddOns />
    </CommercialPageShell>
  );
}
