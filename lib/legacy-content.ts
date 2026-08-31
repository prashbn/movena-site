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
  ["/contact", "/contact/"],
]);

const salesContactSources = new Set<LegacySource>([
  "index.html",
  "platform/index.html",
]);

function rewriteHomepagePublicCopy(
  markup: string,
  source: LegacySource,
): string {
  if (source !== "index.html") return markup;

  return markup
    .replace(
      /<span class="kicker kicker-plain">Other gym software\? Yeah, nah\.<br>Movena\? Nah, yeah\.<\/span>\s*/,
      "",
    )
    .replace("Stripe billing built in", "Payments built in");
}

export function rewriteSalesContactHrefs(
  markup: string,
  source: LegacySource,
): string {
  let rewritten = markup;

  if (salesContactSources.has(source)) {
    rewritten = rewritten.replace(
      /href="mailto:info@movena\.com\.au\?subject=Movena%20%E2%80%94%20(?:enquiry|walkthrough)"/g,
      'href="/contact/"',
    );
    rewritten = rewritten.replace(
      /(<a class="btn btn-primary" href="\/contact\/">)info@movena\.com\.au(<\/a>)/g,
      "$1Talk to Movena$2",
    );
  }

  if (source === "integrations/kisi/index.html") {
    rewritten = rewritten.replace(
      /New to Movena\? Say hello at <a href="mailto:info@movena\.com\.au">info@movena\.com\.au<\/a>\./,
      'New to Movena? <a href="/contact/">Talk to Movena</a>.',
    );
  }

  return rewritten;
}

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
    rewriteHomepagePublicCopy(
      rewriteSalesContactHrefs(
        extractMainMarkup(readLegacyDocument(source), source),
        source,
      ),
      source,
    ),
  );
}

export function readUnmodifiedLegacyMainMarkup(source: LegacySource): string {
  return extractMainMarkup(readLegacyDocument(source), source);
}
