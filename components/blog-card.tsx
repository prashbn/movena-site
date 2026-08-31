import Image from "next/image";
import Link from "next/link";

import { blogPath, type BlogPost } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPost;
  priority?: boolean;
};

export function BlogCard({ post, priority = false }: BlogCardProps) {
  const href = blogPath(post.slug);

  return (
    <article className="blog-card">
      <Link className="blog-card__image" href={href} tabIndex={-1}>
        <Image
          alt={post.imageAlt}
          height={900}
          priority={priority}
          sizes="(max-width: 760px) calc(100vw - 2.5rem), (max-width: 1040px) 50vw, 33vw"
          src={post.image}
          width={1600}
        />
      </Link>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
        <h2>
          <Link href={href}>{post.title}</Link>
        </h2>
        <p>{post.excerpt}</p>
        <Link className="blog-card__link" href={href}>
          Read article <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
