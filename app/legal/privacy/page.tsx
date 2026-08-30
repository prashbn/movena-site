import type { Metadata } from "next";

import { DocumentPageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/legal/privacy/");

export const metadata: Metadata = createRouteMetadata(route);

export default function PrivacyPolicyPage() {
  return <DocumentPageShell source={route.source} />;
}
