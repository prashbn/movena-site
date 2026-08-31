import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { LegacySource } from "./routes.ts";
import { siteConfig } from "./site-config.ts";

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
      .replace(
        /\s*<p class="hero-note">Now onboarding a limited number of Australian gyms\.<\/p>/,
        "",
      )
      .replace(
        '<span class="kicker">Closed beta</span>',
        '<span class="kicker">Built for Australian gyms</span>',
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
        "Nothing to reconcile\n          between tools, because there aren't any other tools.",
        "One record moves with each member, so owners, staff and coaches see the same operation\n          without rebuilding it in spreadsheets.",
      )
      .replace(
        '<span class="kicker">Closed beta</span>',
        '<span class="kicker">See Movena in action</span>',
      )
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

function rewritePlatformProductProof(
  markup: string,
  source: LegacySource,
): string {
  if (source !== "platform/index.html") return markup;

  const productProof = `<section class="platform-proof" aria-labelledby="platform-proof-heading">
  <div class="wrap">
    <div class="platform-proof__intro">
      <div>
        <span class="kicker">Inside Movena</span>
        <h2 id="platform-proof-heading">Know what changed. Know what to do next.</h2>
      </div>
      <p>Revenue, billing, programming and the training floor stay connected, so the numbers lead back to the work your team can act on.</p>
    </div>

    <article class="platform-proof__feature">
      <div class="platform-proof__copy">
        <span class="platform-proof__label mono">Financials</span>
        <h3>Turn payment data into the next decision.</h3>
        <p>See what was collected, what will settle next, and where revenue is moving without assembling another report.</p>
        <ul>
          <li>Collections, fees and next payout</li>
          <li>MRR movement and revenue churn</li>
          <li>Failed payments and aged receivables</li>
        </ul>
      </div>
      <figure class="platform-product-window">
        <div class="platform-product-window__bar" aria-hidden="true">
          <span></span><span></span><span></span>
          <b>Movena Financials</b>
        </div>
        <img src="/product-screenshots/movena-financials.png"
             width="3350" height="1776" loading="lazy" decoding="async"
             alt="Movena Financials showing collected revenue, fees, the next payout and a six-month revenue chart">
        <figcaption>Collections, payouts and operating indicators in one workspace.</figcaption>
      </figure>
    </article>

    <div class="platform-proof__grid">
      <article class="platform-proof__card">
        <figure class="platform-product-window">
          <div class="platform-product-window__bar" aria-hidden="true">
            <span></span><span></span><span></span>
            <b>Program Library</b>
          </div>
          <img src="/product-screenshots/movena-program-builder.png"
               width="3352" height="1922" loading="lazy" decoding="async"
               alt="Movena Program Library showing a versioned twelve-week strength program with four training days">
        </figure>
        <div>
          <span class="platform-proof__label mono">Programming</span>
          <h3>Build it once. Coach it through the app.</h3>
          <p>Create reusable, versioned programs and enrol members without sending another PDF.</p>
        </div>
      </article>

      <article class="platform-proof__card">
        <figure class="platform-product-window">
          <div class="platform-product-window__bar" aria-hidden="true">
            <span></span><span></span><span></span>
            <b>Exercise Library</b>
          </div>
          <img src="/product-screenshots/movena-exercise-library.png"
               width="3348" height="1902" loading="lazy" decoding="async"
               alt="Movena Exercise Library showing movement filters and a searchable exercise catalogue">
        </figure>
        <div>
          <span class="platform-proof__label mono">Training catalogue</span>
          <h3>Thousands of movements, ready to use.</h3>
          <p>Start with a deep exercise library, then keep your own coaching detail alongside it.</p>
        </div>
      </article>
    </div>

    <p class="platform-proof__note">Product screens shown with demonstration data.</p>
  </div>
</section>`;

  return markup.replace(
    '<div class="close-cta">',
    `${productProof}\n\n<div class="close-cta">`,
  );
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

  const googlePlayHref = siteConfig.memberApp.googlePlayUrl.replaceAll(
    "&",
    "&amp;",
  );
  const memberStoreActions = `<div class="members-store-availability">
          <p>Available for iPhone and Android.</p>
          <div class="members-store-actions" aria-label="Download Movena">
            <a href="${siteConfig.memberApp.appStoreUrl}" aria-label="Download Movena on the App Store">
              <span>Download on the</span>
              App Store
            </a>
            <a href="${googlePlayHref}" aria-label="Get Movena on Google Play">
              <span>Get it on</span>
              Google Play
            </a>
          </div>
        </div>`;

  const ownerCallToAction = `<section class="members-owner-cta" aria-labelledby="members-owner-heading">
    <div class="wrap members-owner-cta__inner">
      <div>
        <span class="kicker">For gym owners</span>
        <h2 id="members-owner-heading">Run the experience behind the app.</h2>
        <p>Keep memberships, bookings, payments, check-ins, programming and progress connected in one place.</p>
      </div>
      <div class="members-owner-cta__actions">
        <a class="btn btn-primary" href="/businesses/">See who Movena is for</a>
        <a class="link-arrow" href="/contact/">Talk to Movena <span>→</span></a>
      </div>
    </div>
  </section>`;

  let rewritten = markup.replace(
    /(<p class="hero-note">[\s\S]*?<\/p>)/,
    `$1\n        ${memberStoreActions}`,
  );

  const legacyPhone = '<div class="phone app-dark">';
  rewritten = rewritten.replace(
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

  return rewritten
    .replace(coachingPhoto, "")
    .replace('<div class="close-cta">', `${ownerCallToAction}\n\n<div class="close-cta">`);
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
    rewritePlatformProductProof(
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
      source,
    ),
  );
}

export function readUnmodifiedLegacyMainMarkup(source: LegacySource): string {
  return extractMainMarkup(readLegacyDocument(source), source);
}
