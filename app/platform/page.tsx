import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { MarketingPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";
import { softwareStructuredData } from "@/lib/structured-data";

const route = routeByPath("/platform/");

export const metadata: Metadata = createRouteMetadata(route);

export default function PlatformPage() {
  return (
    <>
      <JsonLd data={softwareStructuredData} />
      <MarketingPageShell source={route.source} activePath="/platform/" />
    </>
  );
}
