import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { HomePageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";
import { softwareStructuredData, websiteStructuredData } from "@/lib/structured-data";

const route = routeByPath("/");

export const metadata: Metadata = createRouteMetadata(route);

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteStructuredData} />
      <JsonLd data={softwareStructuredData} />
      <HomePageShell source={route.source} />
    </>
  );
}
