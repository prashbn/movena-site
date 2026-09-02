import type { Metadata } from "next";

import { BlogCard } from "@/components/blog-card";
import { JsonLd } from "@/components/json-ld";
import { CommercialPageShell } from "@/components/page-shells";
import { blogPosts } from "@/lib/blog";
import { createRouteMetadata } from "@/lib/metadata";
import { routeByPath } from "@/lib/routes";
import { blogStructuredData } from "@/lib/structured-data";

const route = routeByPath("/blog/");

export const metadata: Metadata = createRouteMetadata(route);

export default function BlogPage() {
  const latestFirst = [...blogPosts].sort((left, right) =>
    right.published.localeCompare(left.published),
  );

  return (
    <CommercialPageShell activePath="/blog/">
      <JsonLd data={blogStructuredData} />
      <header className="blog-hero">
        <div className="commercial-wrap blog-hero__inner">
          <p className="commercial-kicker">The Movena Journal</p>
          <h1>Useful notes for people who run gyms—and train in them.</h1>
          <p className="blog-hero__lede">
            Practical, carefully sourced articles about gym operations,
            payments, retention, movement and performance—written to help,
            not to fill a keyword calendar.
          </p>
        </div>
      </header>

      <section className="blog-index" aria-labelledby="latest-articles">
        <div className="commercial-wrap">
          <div className="blog-section-heading">
            <p className="commercial-kicker">Start here</p>
            <h2 id="latest-articles">Latest articles</h2>
          </div>
          <div className="blog-grid">
            {latestFirst.map((post, index) => (
              <BlogCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="blog-editorial" aria-labelledby="editorial-standard">
        <div className="commercial-wrap blog-editorial__inner">
          <div>
            <p className="commercial-kicker">Our standard</p>
            <h2 id="editorial-standard">Useful before searchable.</h2>
          </div>
          <div className="blog-editorial__copy">
            <p>
              Operational, health and performance topics deserve more care
              than a catchy headline. We use plain language, distinguish
              shipped capabilities from roadmap ideas, and link to primary
              sources for claims that can change.
            </p>
            <p>
              Movena articles provide general education—not legal, financial,
              medical, psychological or personalised nutrition advice.
            </p>
          </div>
        </div>
      </section>
    </CommercialPageShell>
  );
}
