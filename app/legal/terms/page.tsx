import type { Metadata } from "next";

import { DocumentPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/legal/terms/");

export const metadata: Metadata = createRouteMetadata(route);

export default function TermsOfServicePage() {
  return <DocumentPageShell source={route.source} />;
}
