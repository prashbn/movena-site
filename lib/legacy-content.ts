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

function rewritePublicMarketingCopy(
  markup: string,
  source: LegacySource,
): string {
  if (source === "index.html") {
    return markup
      .replace(
        /<span class="kicker kicker-plain">Other gym software\? Yeah, nah\.<br>Movena\? Nah, yeah\.<\/span>\s*/,
        "",
      )
      .replace("Stripe billing built in", "Payments built in")
      .replace(
        "Take payments through Stripe, or track them in person.",
        "Take payments online, or track them in person.",
      );
  }

  if (source === "platform/index.html") {
    return markup
      .replace(
        "Online through Stripe, or in person when a member prefers it — the membership is tracked either way.",
        "Online or in person, the membership is tracked either way.",
      )
      .replace(
        "<b>Stripe Connect</b> — payments settle to your own account",
        "<b>Online payments</b> — payments settle to your own account",
      )
      .replace(
        "<b>Failures and disputes</b> — surfaced, not buried in Stripe",
        "<b>Failures and disputes</b> — surfaced clearly in Movena",
      );
  }

  return markup;
}

function memberScreenMarkup({
  className,
  src,
  alt,
  eager = false,
}: {
  className: string;
  src: string;
  alt: string;
  eager?: boolean;
}): string {
  const loading = eager
    ? 'loading="eager" fetchpriority="high"'
    : 'loading="lazy"';

  return `<figure class="member-screen ${className}">
          <img src="${src}"
               width="1320" height="2868" ${loading} decoding="async"
               alt="${alt}">
        </figure>`;
}

function rewriteMemberProductImagery(
  markup: string,
  source: LegacySource,
): string {
  if (source !== "members/index.html") return markup;

  const legacyPhone = '<div class="phone app-dark">';
  let rewritten = markup.replace(
    legacyPhone,
    `${memberScreenMarkup({
      className: "member-screen--home",
      src: "/assets/members/movena-member-home.png",
      alt: "The Movena member app home screen showing an upcoming session, training streak and recent progress",
      eager: true,
    })}
        <div class="phone app-dark member-legacy-phone" aria-hidden="true">`,
  );

  rewritten = rewritten.replace(
    legacyPhone,
    `${memberScreenMarkup({
      className: "member-screen--movements",
      src: "/assets/members/movena-member-movements.png",
      alt: "The Movena member app progress screen showing movement history and a back squat result",
    })}
        <div class="phone app-dark member-legacy-phone" aria-hidden="true">`,
  );

  const photoPair = /<div class="shot-pair">\s*<figure class="shot shot-portrait">[\s\S]*?<\/figure>\s*<figure class="shot shot-portrait">[\s\S]*?<\/figure>\s*<\/div>/;

  rewritten = rewritten.replace(
    photoPair,
    `<div class="member-screen-grid">
      ${memberScreenMarkup({
        className: "member-screen--book",
        src: "/assets/members/movena-member-book.png",
        alt: "The Movena member app booking screen showing available classes and personal training sessions",
      })}
      ${memberScreenMarkup({
        className: "member-screen--session",
        src: "/assets/members/movena-member-session-detail.png",
        alt: "The Movena member app session detail screen showing a personal training workout",
      })}
    </div>`,
  );

  const coachingPhoto = /<div class="wrap-band" style="margin-top:80px">\s*<figure class="shot shot-feature">[\s\S]*?coaching-1254w\.jpg[\s\S]*?<\/figure>\s*<\/div>/;

  return rewritten.replace(coachingPhoto, "");
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
    rewriteMemberProductImagery(
      rewritePublicMarketingCopy(
        rewriteSalesContactHrefs(
          extractMainMarkup(readLegacyDocument(source), source),
          source,
        ),
        source,
      ),
      source,
    ),
  );
}

export function readUnmodifiedLegacyMainMarkup(source: LegacySource): string {
  return extractMainMarkup(readLegacyDocument(source), source);
}
