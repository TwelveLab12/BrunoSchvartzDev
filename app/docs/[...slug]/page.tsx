import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllDocs, getDocContent, getDocSlugs } from "@/lib/docs";

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

function findDoc(slug: string[]) {
  return getAllDocs().find((d) => d.slug.join("/") === slug.join("/"));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = findDoc(slug);
  return {
    title: doc?.title ?? "Documentation",
    alternates: { canonical: `/docs/${slug.join("/")}` },
    robots: { index: false, follow: false },
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const doc = findDoc(slug);
  if (!doc) notFound();

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16">
      <nav className="text-muted flex items-center gap-1.5 text-sm" aria-label="Fil d'Ariane">
        <Link href="/">Accueil</Link>
        <span aria-hidden="true">/</span>
        <Link href="/docs">Documentation</Link>
      </nav>
      <article className="prose prose-neutral prose-headings:font-serif prose-headings:font-normal prose-a:text-accent mt-8 max-w-none">
        <ReactMarkdown>{getDocContent(slug)}</ReactMarkdown>
      </article>
    </main>
  );
}
