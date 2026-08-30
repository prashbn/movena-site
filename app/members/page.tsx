import type { Metadata } from "next";

import { MarketingPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/members/");

export const metadata: Metadata = createRouteMetadata(route);

export default function MembersPage() {
  return (
    <MarketingPageShell
      source={route.source}
      activePath="/members/"
      cta={{ label: "Get help", href: "/help/" }}
    />
  );
}
