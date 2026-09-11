import fs from "node:fs";
import path from "node:path";

const DOCS_DIR = path.join(process.cwd(), "docs");

export type DocMeta = { slug: string; title: string };

export function getDocSlugs(): string[] {
  return fs
    .readdirSync(DOCS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getDocContent(slug: string): string {
  return fs.readFileSync(path.join(DOCS_DIR, `${slug}.md`), "utf8");
}

function getDocTitle(slug: string): string {
  const heading = getDocContent(slug).match(/^#\s+(.+)$/m);
  return heading?.[1] ?? slug;
}

export function getAllDocs(): DocMeta[] {
  return getDocSlugs().map((slug) => ({ slug, title: getDocTitle(slug) }));
}
