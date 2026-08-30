import type { Metadata } from "next";
import Link from "next/link";

import {
  OptionalAddOns,
  PackageComparison,
  PlatformFee,
} from "@/components/commercial-pricing";
import { CommercialPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/product-comparison/");

export const metadata: Metadata = createRouteMetadata(route);

export default function ProductComparisonPage() {
  return (
    <CommercialPageShell activePath="/product-comparison/">
      <header className="commercial-hero">
        <div className="commercial-wrap commercial-hero__inner">
          <div>
            <p className="commercial-kicker">Movena packages</p>
            <h1>Product comparison</h1>
          </div>
          <Link className="commercial-text-link" href="/pricing/">
            Pricing <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>
      <PackageComparison />
      <PlatformFee />
      <OptionalAddOns />
    </CommercialPageShell>
  );
}
