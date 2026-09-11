import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import { comparePosts, type PostMeta, type PostStatus } from "@/lib/blog";

const OWNER = "TwelveLab12";
const REPO = "BrunoSchvartzDev";
const BRANCH = "main";
const BLOG_DIR = "content/blog";

export type AdminPost = PostMeta & { content: string; sha: string };

export type SavePostInput = {
  slug: string;
  sha?: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  status: PostStatus;
  pinnedOrder?: number;
  content: string;
};

export type ContentResult = { ok: true } | { ok: false; message: string };

/**
 * Seule Production peut écrire dans le repo : GITHUB_CONTENT_TOKEN est une
 * variable d'env restreinte à cet environnement sur Vercel (voir l'ADR
 * 0011). En local (pas de VERCEL_ENV), l'écriture reste autorisée pour
 * pouvoir tester l'admin avant déploiement.
 */
function canWrite(): boolean {
  return !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";
}

function getOctokit(): Octokit {
  const auth = process.env.GITHUB_CONTENT_TOKEN;
  if (!auth) throw new Error("GITHUB_CONTENT_TOKEN n'est pas configuré.");
  return new Octokit({ auth });
}

function isStatus(error: unknown, status: number): boolean {
  return (
    typeof error === "object" && error !== null && "status" in error && error.status === status
  );
}

function decode(content: string): string {
  return Buffer.from(content, "base64").toString("utf8");
}

function parse(slug: string, raw: string, sha: string): AdminPost {
  const { data, content } = matter(raw);
  return {
    slug,
    sha,
    title: data.title ?? slug,
    date: data.date ?? "",
    updatedAt: data.updatedAt ?? data.date ?? "",
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? "",
    status: data.status ?? "draft",
    pinnedOrder: typeof data.pinnedOrder === "number" ? data.pinnedOrder : undefined,
    content,
  };
}

export async function listAdminPosts(): Promise<PostMeta[]> {
  const octokit = getOctokit();
  const { data } = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: BLOG_DIR,
    ref: BRANCH,
  });
  if (!Array.isArray(data)) throw new Error(`${BLOG_DIR} devrait être un dossier.`);

  const files = data.filter((entry) => entry.type === "file" && entry.name.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const { data: fileData } = await octokit.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: file.path,
        ref: BRANCH,
      });
      if (Array.isArray(fileData) || fileData.type !== "file") {
        throw new Error(`Impossible de lire ${file.path}.`);
      }
      const slug = file.name.replace(/\.md$/, "");
      return parse(slug, decode(fileData.content), fileData.sha);
    }),
  );

  return posts.sort(comparePosts);
}

export async function getAdminPost(slug: string): Promise<AdminPost | undefined> {
  const octokit = getOctokit();
  try {
    const { data } = await octokit.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: `${BLOG_DIR}/${slug}.md`,
      ref: BRANCH,
    });
    if (Array.isArray(data) || data.type !== "file") return undefined;
    return parse(slug, decode(data.content), data.sha);
  } catch (error) {
    if (isStatus(error, 404)) return undefined;
    throw error;
  }
}

export async function savePost(input: SavePostInput): Promise<ContentResult> {
  if (!canWrite()) {
    return { ok: false, message: "Écriture désactivée hors production — ceci est un aperçu." };
  }

  const octokit = getOctokit();
  const file = matter.stringify(input.content, {
    title: input.title,
    date: input.date,
    updatedAt: new Date().toISOString().slice(0, 10),
    tags: input.tags,
    excerpt: input.excerpt,
    status: input.status,
    ...(input.pinnedOrder !== undefined ? { pinnedOrder: input.pinnedOrder } : {}),
  });

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path: `${BLOG_DIR}/${input.slug}.md`,
      branch: BRANCH,
      message: `blog: ${input.sha ? "modifier" : "publier"} « ${input.title} »`,
      content: Buffer.from(file, "utf8").toString("base64"),
      sha: input.sha,
    });
    return { ok: true };
  } catch (error) {
    if (isStatus(error, 409)) {
      return {
        ok: false,
        message:
          "Cet article a changé depuis son chargement — recharge la page et réapplique tes modifications.",
      };
    }
    if (isStatus(error, 422) && !input.sha) {
      return { ok: false, message: "Un article existe déjà avec ce slug — choisis-en un autre." };
    }
    return { ok: false, message: error instanceof Error ? error.message : "Erreur inconnue." };
  }
}

export async function deletePost(slug: string, sha: string): Promise<ContentResult> {
  if (!canWrite()) {
    return { ok: false, message: "Écriture désactivée hors production — ceci est un aperçu." };
  }

  const octokit = getOctokit();
  try {
    await octokit.repos.deleteFile({
      owner: OWNER,
      repo: REPO,
      path: `${BLOG_DIR}/${slug}.md`,
      branch: BRANCH,
      message: `blog: supprimer « ${slug} »`,
      sha,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Erreur inconnue." };
  }
}
