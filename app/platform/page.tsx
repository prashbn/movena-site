import type { Metadata } from "next";

import { MarketingPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/platform/");

export const metadata: Metadata = createRouteMetadata(route);

export default function PlatformPage() {
  return (
    <MarketingPageShell
      source={route.source}
      activePath="/platform/"
      cta={{
        label: "Talk to us",
        href: "mailto:info@movena.com.au?subject=Movena%20%E2%80%94%20enquiry",
      }}
    />
  );
}
