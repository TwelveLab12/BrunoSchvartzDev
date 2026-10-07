import { ImageResponse } from "next/og";
import { getProject, personalProjects, projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Étude de cas — projet personnel de Bruno Schvartz";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Même habillage que `app/opengraph-image.tsx`, avec le nom et les technologies du projet. */
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

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
        {personalProjects.label} — {profile.name}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 84,
          lineHeight: 1.05,
          color: "#1a1a18",
        }}
      >
        {project?.name ?? personalProjects.label}
      </div>
      {project && (
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
          {project.tags.map((tag, index) => (
            <div key={tag} style={{ display: "flex", marginRight: 16 }}>
              {index > 0 && <span style={{ marginRight: 16, color: "#b4472a" }}>·</span>}
              <span>{tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>,
    size,
  );
}
