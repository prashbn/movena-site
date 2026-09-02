import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { blogPath, blogPostBySlug, blogPosts } from "../lib/blog.ts";

const allowedSourceHosts = new Set([
  "docs.kisi.io",
  "docs.stripe.com",
  "movena.com.au",
  "www.ais.gov.au",
  "www.getkisi.com",
  "www.health.gov.au",
  "www.healthdirect.gov.au",
  "www.oaic.gov.au",
  "hyrox.com",
]);

test("the blog publishes distinct, static member and owner articles", () => {
  assert.deepEqual(
    blogPosts.map((post) => post.slug),
    [
      "movement-and-mental-health",
      "strength-training-for-everyday-movement",
      "how-to-fuel-for-hyrox",
      "running-a-24-7-gym-without-reception",
      "australian-gym-software-migration-checklist",
      "card-becs-payto-for-gym-memberships",
      "notice-member-drift-before-cancellation",
      "questions-before-choosing-gym-software",
    ],
  );

  assert.equal(new Set(blogPosts.map((post) => post.slug)).size, 8);
  assert.equal(blogPostBySlug("missing-article"), undefined);

  for (const post of blogPosts) {
    assert.equal(blogPostBySlug(post.slug), post);
    assert.equal(blogPath(post.slug), `/blog/${post.slug}/`);
    assert.match(post.published, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(post.readingTime, /^\d+ minute read$/);
    assert.ok(post.introduction.length >= 2);
    assert.ok(post.sections.length >= 4);
    assert.ok(post.sources.length >= 2);
    assert.match(post.safetyNote, /General information only/);

    for (const source of post.sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, "https:");
      assert.ok(
        allowedSourceHosts.has(url.hostname),
        `${post.slug} uses an unapproved source host: ${url.hostname}`,
      );
    }
  }
});

test("owner articles keep product and supplier boundaries explicit", () => {
  const access = blogPostBySlug("running-a-24-7-gym-without-reception");
  const payments = blogPostBySlug("card-becs-payto-for-gym-memberships");
  const buyingGuide = blogPostBySlug(
    "questions-before-choosing-gym-software",
  );

  assert.ok(access);
  assert.ok(payments);
  assert.ok(buyingGuide);
  assert.match(JSON.stringify(access), /Kisi remains authoritative/);
  assert.match(JSON.stringify(access), /does not replace/);
  assert.match(JSON.stringify(payments), /own Stripe account/);
  assert.match(JSON.stringify(payments), /delayed-notification method/);
  assert.match(JSON.stringify(buyingGuide), /roadmap items/);
  assert.doesNotMatch(JSON.stringify(blogPosts), /free trial|automated journeys/i);
});

test("health and performance articles carry explicit safety boundaries", () => {
  const mentalHealth = blogPostBySlug("movement-and-mental-health");
  const strength = blogPostBySlug("strength-training-for-everyday-movement");
  const hyrox = blogPostBySlug("how-to-fuel-for-hyrox");

  assert.ok(mentalHealth);
  assert.ok(strength);
  assert.ok(hyrox);

  assert.match(mentalHealth.safetyNote, /not a substitute for mental-health care/i);
  assert.match(JSON.stringify(mentalHealth.sections), /13 11 14/);
  assert.match(strength.safetyNote, /not an individual exercise prescription/i);
  assert.match(hyrox.safetyNote, /not personalised sports-nutrition or medical advice/i);
  assert.match(JSON.stringify(hyrox.sections), /food-first/i);
});

test("blog routes provide static generation, metadata, structured data and responsive layouts", () => {
  const indexPage = readFileSync("app/blog/page.tsx", "utf8");
  const articlePage = readFileSync("app/blog/[slug]/page.tsx", "utf8");
  const sitemap = readFileSync("app/sitemap.ts", "utf8");
  const header = readFileSync("components/site-header.tsx", "utf8");
  const footer = readFileSync("components/site-footer.tsx", "utf8");
  const css = readFileSync("styles/blog.css", "utf8");

  assert.match(indexPage, /blogStructuredData/);
  assert.match(articlePage, /generateStaticParams/);
  assert.match(articlePage, /dynamicParams = false/);
  assert.match(articlePage, /generateMetadata/);
  assert.match(articlePage, /articleStructuredData/);
  assert.match(articlePage, /By Movena/);
  assert.match(articlePage, /rel="external"/);
  assert.match(sitemap, /blogPosts/);
  assert.match(sitemap, /lastModified/);
  assert.match(header, /href: "\/blog\/", label: "Blog"/);
  assert.match(footer, /href="\/blog\/">Blog/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(max-width: 620px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(indexPage + articlePage, /fetch\s*\(|use client|CMS/i);
});
