import type { Metadata } from "next";

import { HomePageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/");

export const metadata: Metadata = createRouteMetadata(route);

export default function HomePage() {
  return (
    <HomePageShell
      source={route.source}
      cta={{
        label: "Talk to us",
        href: "mailto:info@movena.com.au?subject=Movena%20%E2%80%94%20enquiry",
      }}
    />
  );
}
