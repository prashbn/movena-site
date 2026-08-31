import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog-card";
import { JsonLd } from "@/components/json-ld";
import { CommercialPageShell } from "@/components/page-shells";
import {
  blogPath,
  blogPostBySlug,
  blogPosts,
  type BlogPost,
} from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import { articleStructuredData } from "@/lib/structured-data";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug(slug);

  if (!post) return {};

  const metadata = createPageMetadata({
    path: blogPath(post.slug),
    title: `${post.title} — Movena`,
    description: post.description,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.published,
      authors: ["Movena"],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

function ArticleBody({ post }: { post: BlogPost }) {
  return (
    <div className="blog-article-layout">
      <div className="blog-prose">
        {post.introduction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <aside className="blog-safety-note" aria-label="Important information">
          <strong>Important</strong>
          <p>{post.safetyNote}</p>
        </aside>

        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <aside className="blog-sources" aria-labelledby="article-sources">
        <h2 id="article-sources">Sources</h2>
        <p>
          Claims and safety guidance in this article were checked against these
          primary sources.
        </p>
        <ol>
          {post.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} rel="external">
                {source.label}
              </a>
              <span>{source.publisher}</span>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = blogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = blogPosts.filter(
    (candidate) => candidate.slug !== post.slug,
  );

  return (
    <CommercialPageShell activePath="/blog/">
      <JsonLd data={articleStructuredData(post)} />
      <article className="blog-article">
        <header className="blog-article__header commercial-wrap">
          <Link className="blog-article__back" href="/blog/">
            ← All articles
          </Link>
          <div className="blog-article__meta">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>By Movena</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.published}>{post.publishedLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>

        <figure className="blog-article__media commercial-wrap">
          <Image
            alt={post.imageAlt}
            height={900}
            priority
            sizes="(max-width: 1180px) 100vw, 1180px"
            src={post.image}
            width={1600}
          />
        </figure>

        <div className="commercial-wrap">
          <ArticleBody post={post} />
        </div>
      </article>

      <section className="blog-related" aria-labelledby="related-articles">
        <div className="commercial-wrap">
          <div className="blog-section-heading">
            <p className="commercial-kicker">Keep reading</p>
            <h2 id="related-articles">Related articles</h2>
          </div>
          <div className="blog-grid blog-grid--related">
            {relatedPosts.map((related) => (
              <BlogCard key={related.slug} post={related} />
            ))}
          </div>
        </div>
      </section>
    </CommercialPageShell>
  );
}
