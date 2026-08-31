import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { AnalyticsConsentManager } from "@/components/analytics-consent";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import { organizationStructuredData } from "@/lib/structured-data";

import "./globals.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.origin}/`),
  title: {
    default: "Movena",
    template: "%s",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f6f4ef",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={siteConfig.language}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={organizationStructuredData} />
        {children}
        <AnalyticsConsentManager />
      </body>
    </html>
  );
}
