import { getProject, personalProjects, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { OgFrame, OgTitle, ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = personalProjects.ogImageAlt;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Habillage commun (`lib/og.tsx`), avec le nom et les technologies du projet. */
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgImage(
    <OgFrame kicker={`${personalProjects.label} — ${profile.name}`} details={project?.tags ?? []}>
      <OgTitle size={90}>{project?.name ?? personalProjects.label}</OgTitle>
    </OgFrame>,
  );
}
