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

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="m-0 font-serif text-4xl font-normal tracking-[-0.01em]">Documentation</h1>
      <p className="text-muted mt-3">
        Notes techniques sur ce projet — non listées sur la page de présentation.
      </p>
      <ul className="mt-8 space-y-2">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/docs/${doc.slug}`} className="text-lg">
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
