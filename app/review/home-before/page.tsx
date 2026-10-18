import type { Metadata } from "next";
import { HomePageShell } from "@/components/page-shells";

export const metadata: Metadata = {
  title: "Preserved homepage — Movena review",
  robots: { index: false, follow: false },
};

export default function PreservedHomeReview() {
  return <HomePageShell source="index.html" preserved />;
}
