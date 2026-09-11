import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { profile } from "@/content/profile";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

function findPublishedPost(slug: string) {
  const post = getPostBySlug(slug);
  return post?.status === "published" ? post : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPublishedPost(slug);
  if (!post) return { title: "Article introuvable" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${profile.website}/blog/${slug}`,
      type: "article",
      locale: "fr_FR",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPublishedPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16">
      <Link href="/blog" className="text-muted text-sm">
        ← Blog
      </Link>
      <header className="mt-8">
        {post.pinnedOrder !== undefined && (
          <p className="text-accent mb-2 font-mono text-xs tracking-[0.08em] uppercase">Épinglé</p>
        )}
        <h1 className="m-0 font-serif text-[clamp(36px,6vw,64px)] leading-[1.02] font-normal tracking-[-0.02em]">
          {post.title}
        </h1>
        <p className="text-muted mt-4 font-mono text-xs tracking-[0.08em] uppercase">{post.date}</p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
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
      </header>
      <article className="prose prose-neutral prose-headings:font-serif prose-a:text-accent mt-10 max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
