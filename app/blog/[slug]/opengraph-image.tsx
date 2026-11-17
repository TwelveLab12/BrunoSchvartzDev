import { ImageResponse } from "next/og";
import { blogLabels, profile } from "@/content/profile";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = blogLabels.ogImageAlt;
/** Seuls les articles publiés ont une image : un brouillon ne doit pas exposer son titre. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** Au-delà, le titre passe sur trois lignes : sa taille baisse pour tenir dans l'image. */
const LONG_TITLE = 60;

/** Même habillage que `app/opengraph-image.tsx` et les études de cas, avec le titre de l'article. */
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getPostBySlug(slug);
  const post = found?.status === "published" ? found : undefined;
  const title = post?.title ?? blogLabels.section;
  const details = post ? [formatDate(post.date), ...post.tags] : [];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#f6f4ef",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#6b675e",
        }}
      >
        {blogLabels.section} — {profile.name}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: title.length > LONG_TITLE ? 62 : 84,
          lineHeight: 1.1,
          color: "#1a1a18",
          maxWidth: 1040,
        }}
      >
        {title}
      </div>
      {details.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 40,
            fontSize: 27,
            color: "#4a4740",
            maxWidth: 1040,
          }}
        >
          {details.map((detail, index) => (
            <div key={detail} style={{ display: "flex", marginRight: 16 }}>
              {index > 0 && <span style={{ marginRight: 16, color: "#b4472a" }}>·</span>}
              <span>{detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>,
    size,
  );
}
