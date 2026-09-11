"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { savePost, deletePost, type ContentResult } from "@/lib/github-content";
import type { PostStatus } from "@/lib/blog";

const DIACRITICS_RANGE = String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036f);
const DIACRITICS_PATTERN = new RegExp(`[${DIACRITICS_RANGE}]`, "g");

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_PATTERN, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function savePostAction(
  _prev: ContentResult | null,
  formData: FormData,
): Promise<ContentResult> {
  const session = await auth();
  if (!session) return { ok: false, message: "Non authentifié." };

  const title = String(formData.get("title") ?? "").trim();
  const providedSlug = String(formData.get("slug") ?? "").trim();
  const slug = providedSlug || slugify(title);
  const sha = String(formData.get("sha") ?? "") || undefined;
  const date = String(formData.get("date") ?? "") || new Date().toISOString().slice(0, 10);
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const status: PostStatus = formData.get("status") === "published" ? "published" : "draft";
  const content = String(formData.get("content") ?? "");

  if (!title || !content || !slug) {
    return { ok: false, message: "Titre et contenu sont requis." };
  }

  const result = await savePost({ slug, sha, title, date, tags, excerpt, status, content });
  if (result.ok) redirect("/admin");
  return result;
}

export async function deletePostAction(slug: string, sha: string): Promise<ContentResult> {
  const session = await auth();
  if (!session) return { ok: false, message: "Non authentifié." };

  const result = await deletePost(slug, sha);
  if (result.ok) redirect("/admin");
  return result;
}
