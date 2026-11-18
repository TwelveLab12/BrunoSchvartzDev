import { blogLabels, profile } from "@/content/profile";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { OgFrame, OgTitle, ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { formatDate } from "@/lib/utils";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = blogLabels.ogImageAlt;
/** Seuls les articles publiés ont une image : un brouillon ne doit pas exposer son titre. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** Au-delà, le titre passe sur trois lignes : sa taille baisse pour tenir dans l'image. */
const LONG_TITLE = 60;

/** Habillage commun (`lib/og.tsx`), avec le titre, la date et les tags de l'article. */
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getPostBySlug(slug);
  const post = found?.status === "published" ? found : undefined;
  const title = post?.title ?? blogLabels.section;

  return renderOgImage(
    <OgFrame
      kicker={`${blogLabels.section} — ${profile.name}`}
      details={post ? [formatDate(post.date), ...post.tags] : []}
    >
      <OgTitle size={title.length > LONG_TITLE ? 80 : 100}>{title}</OgTitle>
    </OgFrame>,
  );
}
