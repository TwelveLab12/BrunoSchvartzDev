import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes sur le développement front-end React et TypeScript.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16">
      <Link href="/" className="text-muted text-sm">
        ← Accueil
      </Link>
      <h1 className="m-0 mt-8 font-serif text-[clamp(44px,8vw,88px)] leading-[0.98] font-normal tracking-[-0.02em]">
        Blog
      </h1>

      {posts.length === 0 && <p className="text-muted mt-10">Aucun article pour l&apos;instant.</p>}

      <ul className="divide-ink/10 mt-12 divide-y">
        {posts.map((post) => (
          <li key={post.slug} className="py-6">
            {post.pinnedOrder !== undefined && (
              <p className="text-accent mb-1.5 font-mono text-xs tracking-[0.08em] uppercase">
                Épinglé
              </p>
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="font-serif text-2xl font-normal tracking-[-0.01em] no-underline"
            >
              {post.title}
            </Link>
            <p className="text-muted mt-2 font-mono text-xs tracking-[0.06em] uppercase">
              {post.date}
            </p>
            {post.excerpt && <p className="text-ink-muted mt-2">{post.excerpt}</p>}
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-ink/[0.05] rounded-sm px-3 py-[7px] font-mono text-[13px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
