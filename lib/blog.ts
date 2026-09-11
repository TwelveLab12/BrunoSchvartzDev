import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostStatus = "draft" | "published";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  updatedAt: string;
  tags: string[];
  excerpt: string;
  status: PostStatus;
  pinnedOrder?: number;
};

export type Post = PostMeta & { content: string };

function readPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    date: data.date,
    updatedAt: data.updatedAt ?? data.date,
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? "",
    status: data.status ?? "draft",
    pinnedOrder: typeof data.pinnedOrder === "number" ? data.pinnedOrder : undefined,
    content,
  };
}

export function comparePosts(a: PostMeta, b: PostMeta): number {
  if (a.pinnedOrder !== undefined && b.pinnedOrder !== undefined) {
    return a.pinnedOrder - b.pinnedOrder;
  }
  if (a.pinnedOrder !== undefined) return -1;
  if (b.pinnedOrder !== undefined) return 1;
  return b.date.localeCompare(a.date);
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | undefined {
  try {
    return readPost(slug);
  } catch {
    return undefined;
  }
}

export function getAllPosts({ includeDrafts = false } = {}): Post[] {
  return getPostSlugs()
    .map(readPost)
    .filter((post) => includeDrafts || post.status === "published")
    .sort(comparePosts);
}
