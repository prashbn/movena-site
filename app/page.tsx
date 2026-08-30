import type { Metadata } from "next";

import { HomePageShell } from "@/components/page-shells";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";

const route = routeByPath("/");

export const metadata: Metadata = createRouteMetadata(route);

export default function HomePage() {
  return <HomePageShell source={route.source} />;
}
