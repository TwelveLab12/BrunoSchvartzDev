import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllDocs, getDocContent, getDocSlugs } from "@/lib/docs";

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getAllDocs().find((d) => d.slug === slug);
  return {
    title: doc?.title ?? "Documentation",
    alternates: { canonical: `/docs/${slug}` },
    robots: { index: false, follow: false },
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getDocSlugs().includes(slug)) notFound();

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16">
      <Link href="/docs" className="text-muted text-sm">
        ← Documentation
      </Link>
      <article className="prose prose-neutral prose-headings:font-serif prose-headings:font-normal prose-a:text-accent mt-8 max-w-none">
        <ReactMarkdown>{getDocContent(slug)}</ReactMarkdown>
      </article>
    </main>
  );
}
