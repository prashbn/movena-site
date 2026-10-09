import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { LegacySource } from "./routes.ts";
import { siteConfig } from "./site-config.ts";

const internalRouteReplacements = new Map([
  ["/platform", "/platform/"],
  ["/members", "/members/"],
  ["/help", "/help/"],
  ["/help/ai-assistants", "/help/ai-assistants/"],
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
        /Memberships, timetable, billing and check-in\. Plus a training history\s+members keep\./,
        "Memberships, payments, bookings, team management and workout programming. Plus a training history members keep.",
      )
      .replace(
        /<div class="wrap-band" style="margin-top:80px">\s*<figure class="shot shot-wide">\s*<img src="\/assets\/photos\/class-floor-1600\.jpg"[\s\S]*?<\/figure>\s*<\/div>/,
        `<section class="home-community" aria-labelledby="home-community-heading">
  <div class="wrap-band">
    <div class="home-photo-panel">
      <picture class="home-photo-panel__photo">
        <img src="/home-yoga/group-1600.jpg"
             srcset="/home-yoga/group-900.jpg 900w, /home-yoga/group-1600.jpg 1600w"
             sizes="(max-width: 1800px) 100vw, 1720px"
             width="1600" height="900" loading="lazy" decoding="async"
             alt="Four women chatting in a bright studio while holding rolled yoga mats">
      </picture>
      <div class="home-photo-panel__copy">
        <span class="kicker">Hangout</span>
        <h2 id="home-community-heading">A place to train.<br>A place to belong.</h2>
        <p class="sec-lede">Keep your members connected between sessions. Share what’s on, useful advice and stories from your gym—all in Hangout, inside the Movena app.</p>
      </div>
    </div>
  </div>
</section>`,
      )
      .replace(
        /<img src="\/assets\/photos\/pilates-class-1600\.jpg"[\s\S]*?alt="A reformer Pilates class in progress, an instructor moving between the machines">/,
        `<img src="/home-pilates/class-1600.jpg"
           srcset="/home-pilates/class-900.jpg 900w, /home-pilates/class-1600.jpg 1600w"
           sizes="(max-width: 1120px) 100vw, 1720px"
           width="1600" height="900" loading="lazy" decoding="async"
           alt="A group Pilates class extending their arms with straps while kneeling on reformers">`,
      )
      .replace(
        /<div class="wrap-band" style="margin-top:96px">\s*<figure class="shot"[\s\S]*?after-session-1800\.jpg[\s\S]*?<\/figure>\s*<\/div>\s*<div class="close-cta">[\s\S]*?<\/div>\s*<\/div>\s*$/,
        `<section class="home-closing" aria-labelledby="home-closing-heading">
  <div class="wrap-band">
    <div class="home-photo-panel home-closing__panel">
      <picture class="home-photo-panel__photo home-closing__photo">
        <source media="(max-width: 700px)" srcset="/home-closing/member-mobile-900.jpg">
        <img src="/home-closing/member-1800.jpg"
             srcset="/home-closing/member-900.jpg 900w, /home-closing/member-1800.jpg 1800w"
             sizes="(max-width: 1800px) 100vw, 1720px"
             width="1800" height="1200" loading="lazy" decoding="async"
             alt="A woman in blue activewear using her phone on the gym floor">
      </picture>
      <div class="home-photo-panel__copy home-closing__copy">
        <span class="kicker">Built for Australian gyms</span>
        <h2 id="home-closing-heading">Run your gym on Movena.</h2>
        <p>Single sites and multi-location groups. Tell us about yours.</p>
        <a class="btn btn-primary" href="/contact/">Talk to Movena</a>
      </div>
    </div>
  </div>
</section>`,
      )
      .replace(
        /<span class="kicker kicker-plain">Other gym software\? Yeah, nah\.<br>Movena\? Nah, yeah\.<\/span>\s*/,
        "",
      )
      .replace("Stripe billing built in", "Payments built in")
      .replace(
        "Take payments through Stripe, or track them in person.",
        "Card, BECS direct debit and PayTo, or track payments made in person.",
      )
      .replace(
        '<span class="fact">Multi-location from day one</span>\n    <span class="fact">Payments built in</span>\n    <span class="fact">Privacy designed in from day one</span>',
        '<span class="fact">Unlimited members and team</span>\n    <span class="fact">Native iPhone and Android apps</span>\n    <span class="fact">Listed in Kisi’s marketplace</span>',
      )
      .replace(
        '<div class="feat"><h3>Team &amp; locations</h3><p>Set access by role and location.</p></div>',
        '<div class="feat"><h3>Team &amp; locations</h3><p>Set access by role and location.</p></div>\n      <div class="feat"><h3>Accounting exports</h3><p>Xero-ready, QuickBooks-ready and MYOB-ready.</p></div>\n      <div class="feat"><h3>Retail</h3><p>Sell physical merchandise for collection at your gym.</p></div>',
      );
  }

  if (source === "platform/index.html") {
    return markup
      .replace(
        "Nothing to reconcile\n          between tools, because there aren't any other tools.",
        "One record moves with each member, so owners, staff and coaches see the same operation\n          without rebuilding it in spreadsheets.",
      )
      .replace(
        "Online through Stripe, or in person when a member prefers it — the membership is tracked either way.",
        "Offer card, BECS direct debit or PayTo, or record a payment made in person — the membership is tracked either way.",
      )
      .replace(
        "<b>Stripe Connect</b> — payments settle to your own account",
        "<b>Card, BECS and PayTo</b> — choose which methods to offer</li>\n          <li><b>Your Stripe account</b> — online payments settle to the account you control",
      )
      .replace(
        "<b>Failures and disputes</b> — surfaced, not buried in Stripe",
        "<b>Failures and disputes</b> — surfaced clearly in Movena",
      )
      .replace(
        "<li><b>Outstanding</b> — who owes, and how long it's been</li>",
        "<li><b>Outstanding</b> — who owes, and how long it's been</li>\n          <li><b>Accounting exports</b> — Xero-ready, QuickBooks-ready and MYOB-ready</li>",
      )
      .replace(
        "<li><b>Access control</b> — pause or remove access without losing history</li>",
        "<li><b>Member status</b> — pause a membership without losing its history</li>",
      )
      .replace(
        `          <li><b>Straight to the app</b> — no PDFs, no printouts</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<div class="band">`,
        `          <li><b>Straight to the app</b> — no PDFs, no printouts</li>
        </ul>
      </div>
      <div class="cap">
        <h3>Retail</h3>
        <p>Sell physical merchandise without separating the shop from the member experience.</p>
        <ul>
          <li><b>Native shop</b> — set up physical merchandise in Movena</li>
          <li><b>Member purchase</b> — members buy through the Movena app</li>
          <li><b>In-person collection</b> — purchases are collected at your gym</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<div class="band">`,
      );
  }

  return markup;
}

function rewriteHomeAccessProof(
  markup: string,
  source: LegacySource,
): string {
  if (source !== "index.html") return markup;

  const accessProof = `<section class="home-access" aria-labelledby="home-access-heading">
  <div class="wrap home-access__inner">
    <div class="home-access__brand">
      <img src="/assets/integrations/kisi-logo.png" width="228" height="228" loading="lazy" decoding="async" alt="Kisi">
      <span>Movena is listed in Kisi’s integration marketplace</span>
    </div>
    <div class="home-access__copy">
      <span class="kicker">24/7 access</span>
      <h2 id="home-access-heading">Memberships and bookings, carried through to the door.</h2>
      <p>Movena can grant enrolled members access from an eligible active membership or booking. When that entitlement ends, access ends without reception maintaining a separate door list.</p>
      <p class="home-access__boundary">Movena manages eligibility. Kisi remains authoritative for doors, hardware and opening schedules. You purchase Kisi hardware and its subscription directly from Kisi.</p>
      <div class="home-access__actions">
        <a class="btn btn-primary" href="/integrations/kisi/">See Movena + Kisi</a>
        <a class="link-arrow" href="https://www.getkisi.com/integrations/movena" rel="noopener noreferrer" target="_blank">View the Kisi listing <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>`;

  return markup.replace(
    '<section id="disciplines">',
    `${accessProof}\n\n<section id="disciplines">`,
  );
}

function rewriteHomeAppShowcase(
  markup: string,
  source: LegacySource,
): string {
  if (source !== "index.html") return markup;

  const appShowcase = `<section id="members" class="home-app-showcase" aria-labelledby="home-app-heading">
  <div class="wrap-band">
    <div class="home-app-showcase__panel">
      <div class="home-app-showcase__intro">
        <span class="kicker">Movena member app</span>
        <h2 id="home-app-heading">An app worth opening.</h2>
        <div class="home-app-showcase__copy">
          <p>Members book sessions, follow the workout and see progress and milestones build in one native app.</p>
          <div class="home-app-showcase__actions">
            <a class="btn btn-primary" href="/members/">See the member experience</a>
            <a class="link-arrow" href="/app/">Get the app <span aria-hidden="true">→</span></a>
          </div>
          <div class="home-app-showcase__download">
            <img src="/assets/app/movena-app-page-qr.png" width="420" height="420" loading="lazy" decoding="async" alt="QR code for movena.com.au/app/">
            <p><strong>Available for iPhone and Android.</strong><span>Scan to open movena.com.au/app/</span></p>
          </div>
        </div>
      </div>
      <div class="home-app-showcase__stage" aria-label="Movena member app screens">
        <figure class="home-app-showcase__screen home-app-showcase__screen--session">
          <img src="/home-app/session-detail.jpg" width="589" height="1280" loading="lazy" decoding="async" alt="Movena personal training session detail with a programmed workout and booking action">
        </figure>
        <figure class="home-app-showcase__screen home-app-showcase__screen--progress">
          <img src="/home-app/movement-progress.jpg" width="589" height="1280" loading="lazy" decoding="async" alt="Movena movement progress showing a personal best and training history">
        </figure>
      </div>
    </div>
  </div>
</section>`;

  return markup.replace(/<section id="members">[\s\S]*?<\/section>/, "").replace(
    '<span class="sec-num mono">06</span>', '<span class="sec-num mono">05</span>',
  ).replace(
    '<section id="loop">',
    `${appShowcase}\n\n<section id="loop">`,
  );
}

function rewriteHomeRetentionBadges(
  markup: string,
  source: LegacySource,
): string {
  if (source !== "index.html") return markup;

  const badgeGallery = `<div class="badge-collection">
        <span class="badge-collection__label">Milestones</span>
        <div class="ladder-row ladder-row--milestones">
          <figure><img src="/assets/badges/retention-milestone-005.png" width="512" height="512" loading="lazy" decoding="async" alt="5 classes milestone badge"></figure>
          <figure><img src="/assets/badges/retention-milestone-025.png" width="512" height="512" loading="lazy" decoding="async" alt="25 classes milestone badge"></figure>
          <figure><img src="/assets/badges/retention-milestone-050.png" width="512" height="512" loading="lazy" decoding="async" alt="50 classes milestone badge"></figure>
          <figure><img src="/assets/badges/retention-milestone-100.png" width="512" height="512" loading="lazy" decoding="async" alt="100 classes milestone badge"></figure>
          <figure><img src="/assets/badges/retention-milestone-150.png" width="512" height="512" loading="lazy" decoding="async" alt="150 classes milestone badge"></figure>
          <figure><img src="/assets/badges/retention-milestone-200.png" width="512" height="512" loading="lazy" decoding="async" alt="200 classes milestone badge"></figure>
          <figure><img src="/assets/badges/retention-milestone-500.png" width="512" height="481" loading="lazy" decoding="async" alt="500 classes milestone badge"></figure>
        </div>
      </div>
      <div class="badge-collection">
        <span class="badge-collection__label">Challenges</span>
        <div class="ladder-row ladder-row--challenges">
          <figure><img src="/assets/badges/retention-challenge-weekly.png" width="512" height="512" loading="lazy" decoding="async" alt="Weekly challenge badge"></figure>
          <figure><img src="/assets/badges/retention-challenge-monthly.png" width="512" height="512" loading="lazy" decoding="async" alt="Monthly challenge badge"></figure>
          <figure><img src="/assets/badges/retention-challenge-complete.png" width="512" height="512" loading="lazy" decoding="async" alt="Completed challenge badge"></figure>
          <figure><img src="/assets/badges/retention-challenge-winner.png" width="512" height="512" loading="lazy" decoding="async" alt="Challenge winner badge"></figure>
        </div>
      </div>`;

  return markup.replace(
    /<div class="ladder-row">[\s\S]*?<\/div>(\s*<p>Attendance milestones)/,
    `${badgeGallery}$1`,
  );
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
    `<div class="member-screen-stack" role="group" aria-label="Home in light and dark mode">
        ${memberScreenMarkup({
          className: "member-screen--home",
          src: "/members-screens/1.8.0/home.png",
          alt: "The Movena member app home screen showing an upcoming session, a personal best and recent training activity",
          eager: true,
        })}
        ${memberScreenMarkup({
          className: "member-screen--home-dark",
          src: "/members-screens/1.8.0/home-dark.png",
          alt: "The same Movena member app home screen in dark mode",
          eager: true,
        })}
        </div>
        <div class="phone app-dark member-legacy-phone" aria-hidden="true">`,
  );

  rewritten = rewritten.replace(
    legacyPhone,
    `<div class="member-screen-stack" role="group" aria-label="Progress in light and dark mode">
        ${memberScreenMarkup({
          className: "member-screen--movements-light",
          src: "/members-screens/1.8.0/progress.png",
          alt: "The Movena member app progress screen in light mode showing a barbell bench press result and movement history",
        })}
        ${memberScreenMarkup({
          className: "member-screen--movements",
          src: "/members-screens/1.8.0/progress-dark.png",
          alt: "The Movena member app progress screen showing a barbell bench press result and movement history",
        })}
        </div>
        <div class="phone app-dark member-legacy-phone" aria-hidden="true">`,
  );

  const photoPair = /<div class="shot-pair">\s*<figure class="shot shot-portrait">[\s\S]*?<\/figure>\s*<figure class="shot shot-portrait">[\s\S]*?<\/figure>\s*<\/div>/;

  rewritten = rewritten.replace(
    photoPair,
    `<div class="member-screen-grid">
      ${memberScreenMarkup({
        className: "member-screen--book",
        src: "/members-screens/1.8.0/book.png",
        alt: "The Movena member app booking screen showing available classes and personal training sessions",
      })}
      ${memberScreenMarkup({
        className: "member-screen--session",
        src: "/members-screens/1.8.0/workout-dark.png",
        alt: "The Movena member app workout screen showing the day's movements, sets and repetitions",
      })}
    </div>`,
  );

  const coachingPhoto = /<div class="wrap-band" style="margin-top:80px">\s*<figure class="shot shot-feature">[\s\S]*?coaching-1254w\.jpg[\s\S]*?<\/figure>\s*<\/div>/;

  const communityAndShop = `<section class="members-hangout" aria-labelledby="members-hangout-heading">
    <div class="wrap">
      <div class="sec-kicker"><span class="sec-num mono">04</span><span class="kicker">Hangout</span></div>
      <h2 id="members-hangout-heading">A place to train. A place to belong.</h2>
      <p class="sec-lede">Stay connected between sessions. Find what’s on, useful advice and stories from your gym—all in Hangout, inside the Movena app.</p>
      <div class="member-screen-grid">
        <div class="member-screen-feature">
          <h3>What’s on</h3>
          <p>Updates and stories from around your gym.</p>
          ${memberScreenMarkup({
            className: "member-screen--hangout-whats-on",
            src: "/members-screens/1.8.0/hangout-whats-on.png",
            alt: "The Movena Hangout What's On screen showing gym updates and a featured article",
          })}
        </div>
        <div class="member-screen-feature">
          <h3>Know How</h3>
          <p>Useful articles and videos, with pinned advice easy to find.</p>
          ${memberScreenMarkup({
            className: "member-screen--hangout-know-how",
            src: "/members-screens/1.8.0/hangout-know-how.png",
            alt: "The Movena Hangout Know How screen showing a pinned article and videos to explore",
          })}
        </div>
      </div>
    </div>
  </section>

  <section class="members-shop" aria-labelledby="members-shop-heading">
    <div class="wrap">
      <div class="sec-kicker"><span class="sec-num mono">05</span><span class="kicker">The shop</span></div>
      <div class="split">
        <div>
          ${memberScreenMarkup({
            className: "member-screen--shop",
            src: "/members-screens/1.8.0/shop-dark.png",
            alt: "The Movena member app Shop screen showing gym merchandise, products and an orders link",
          })}
        </div>
        <div>
          <h2 id="members-shop-heading">Your gym’s shop. In your pocket.</h2>
          <p class="sec-lede">Browse merchandise and products from your gym, and find your orders in the same app you use to book and train.</p>
        </div>
      </div>
    </div>
  </section>`;

  return rewritten
    .replace(coachingPhoto, "")
    .replace(
      '<div class="band">\n  <section>\n    <div class="wrap">\n      <div class="sec-kicker"><span class="sec-num mono">04</span><span class="kicker">Yours</span></div>',
      `${communityAndShop}\n\n<div class="band">\n  <section>\n    <div class="wrap">\n      <div class="sec-kicker"><span class="sec-num mono">06</span><span class="kicker">Yours</span></div>`,
    )
    .replace(
      /<img src="\/assets\/photos\/training-1000\.jpg"[\s\S]*?alt="A member mid-lunge holding dumbbells on the gym floor">/,
      `<img src="/members-photos/phone-progress-1000.jpg"
               srcset="/members-photos/phone-progress-560.jpg 560w, /members-photos/phone-progress-1000.jpg 1000w"
               sizes="(max-width: 900px) 100vw, 500px"
               width="1000" height="1250" loading="lazy" decoding="async"
               alt="A woman crouched beside her gym bag, smiling while using her phone">`,
    )
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
        rewriteHomeAppShowcase(
          rewriteHomeAccessProof(
            rewritePublicMarketingCopy(
              rewriteHomeRetentionBadges(
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
