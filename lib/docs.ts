import fs from "node:fs";
import path from "node:path";

const DOCS_DIR = path.join(process.cwd(), "docs");

const CATEGORY_LABELS: Record<string, string> = {
  adr: "Architecture Decision Records",
};

export type DocMeta = { slug: string[]; title: string; category: string };

function walk(dir: string, base: string[] = []): string[][] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) return walk(path.join(dir, entry.name), [...base, entry.name]);
    if (entry.name.endsWith(".md")) return [[...base, entry.name.replace(/\.md$/, "")]];
    return [];
  });
}

export function getDocSlugs(): string[][] {
  return walk(DOCS_DIR);
}

export function getDocContent(slug: string[]): string {
  return fs.readFileSync(`${path.join(DOCS_DIR, ...slug)}.md`, "utf8");
}

function getDocTitle(slug: string[]): string {
  const heading = getDocContent(slug).match(/^#\s+(.+)$/m);
  return heading?.[1] ?? slug.at(-1) ?? "Documentation";
}

function getCategory(slug: string[]): string {
  const key = slug.length > 1 ? slug[0] : undefined;
  if (!key) return "Notes";
  return CATEGORY_LABELS[key] ?? key;
}

export function getAllDocs(): DocMeta[] {
  return getDocSlugs()
    .map((slug) => ({ slug, title: getDocTitle(slug), category: getCategory(slug) }))
    .sort((a, b) => a.slug.join("/").localeCompare(b.slug.join("/")));
}
