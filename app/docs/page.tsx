import type { Metadata } from "next";
import Link from "next/link";
import { getAllDocs } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation",
  alternates: { canonical: "/docs" },
  robots: { index: false, follow: false },
};

export default function DocsIndexPage() {
  const docs = getAllDocs();
  const categories = [...new Set(docs.map((doc) => doc.category))];

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16">
      <Link href="/" className="text-muted text-sm">
        ← Accueil
      </Link>
      <h1 className="m-0 mt-8 font-serif text-4xl font-normal tracking-[-0.01em]">Documentation</h1>
      <p className="text-muted mt-3">
        Notes techniques sur ce projet — non listées sur la page de présentation.
      </p>
      {categories.map((category) => (
        <section key={category} className="mt-10">
          <h2 className="text-muted font-mono text-xs tracking-[0.1em] uppercase">{category}</h2>
          <ul className="mt-3 space-y-2">
            {docs
              .filter((doc) => doc.category === category)
              .map((doc) => (
                <li key={doc.slug.join("/")}>
                  <Link href={`/docs/${doc.slug.join("/")}`} className="text-lg">
                    {doc.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
