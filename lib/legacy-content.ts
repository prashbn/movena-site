import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { LegacySource } from "./routes.ts";

const internalRouteReplacements = new Map([
  ["/platform", "/platform/"],
  ["/members", "/members/"],
  ["/help", "/help/"],
  ["/integrations/kisi", "/integrations/kisi/"],
  ["/legal/privacy", "/legal/privacy/"],
  ["/legal/terms", "/legal/terms/"],
]);

export function extractMainMarkup(document: string, source: string): string {
  const match = document.match(/<main(?:\s[^>]*)?>([\s\S]*?)<\/main>/i);

  if (!match) {
    throw new Error(`Could not find <main> in legacy source: ${source}`);
  }

  return match[1].trim();
}

export function rewriteInternalRouteHrefs(markup: string): string {
  return markup.replace(/href="(\/[^"]*)"/g, (fullMatch, href: string) => {
    const hashIndex = href.indexOf("#");
    const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
    const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
    const canonicalPath = internalRouteReplacements.get(path);

    return canonicalPath
      ? `href="${canonicalPath}${hash}"`
      : fullMatch;
  });
}

export function readLegacyDocument(source: LegacySource): string {
  return readFileSync(
    join(process.cwd(), "content", "legacy", source),
    "utf8",
  );
}

export function readLegacyMainMarkup(source: LegacySource): string {
  return rewriteInternalRouteHrefs(
    extractMainMarkup(readLegacyDocument(source), source),
  );
}

export function readUnmodifiedLegacyMainMarkup(source: LegacySource): string {
  return extractMainMarkup(readLegacyDocument(source), source);
}
