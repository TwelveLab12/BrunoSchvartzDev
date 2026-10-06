import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/section-label";
import { GithubIcon } from "@/components/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { getProject, personalProjects, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { getProjectFigures } from "@/lib/project-stats";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projet introuvable" };

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projets/${slug}` },
    openGraph: {
      title: project.name,
      description: project.tagline,
      url: `${profile.website}/projets/${slug}`,
      type: "article",
      locale: "fr_FR",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const figures = await getProjectFigures(project);

  return (
    <main id="contenu" className="mx-auto max-w-[760px] px-6 py-16">
      <Link href="/#projets-perso" className="text-muted -my-2 inline-block py-2 text-sm">
        ← {personalProjects.links.back}
      </Link>

      <header className="mt-8">
        <p className="text-muted m-0 font-mono text-xs tracking-[0.08em] uppercase">
          {project.meta}
        </p>
        <h1 className="mt-3 mb-0 font-serif text-[clamp(36px,6vw,60px)] leading-[1.04] font-normal tracking-[-0.02em]">
          {project.name}
        </h1>
        <p className="text-ink-muted mt-5 mb-0 text-[17px] leading-[1.6]">{project.tagline}</p>
        <ul className="mt-6 mb-0 flex list-none flex-wrap gap-2 p-0">
          {project.tags.map((tag) => (
            <li key={tag} className="bg-ink/[0.05] rounded-sm px-3 py-[7px] font-mono text-[13px]">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={project.links.demo}>
            {personalProjects.links.demo}
            <ArrowUpRight className="size-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href={project.links.repository} variant="outline">
            <GithubIcon className="size-4" aria-hidden />
            {personalProjects.links.repository}
          </ButtonLink>
          <ButtonLink href={project.links.adr} variant="outline">
            {personalProjects.links.adr}
            <ArrowUpRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </header>

      {project.cover ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(min-width: 760px) 712px, 100vw"
          priority
          className="border-rule mt-12 w-full rounded-sm border"
        />
      ) : null}

      {figures.length > 0 ? (
        <>
          <dl className="mt-12 mb-0 grid grid-cols-3 gap-4">
            {figures.map((figure) => (
              // dt avant dd (ordre requis dans un <dl>), la valeur passe au-dessus visuellement.
              <div
                key={figure.label}
                className="border-accent flex flex-col-reverse gap-2 border-t-2 pt-3"
              >
                <dt className="text-muted font-mono text-[11.5px] tracking-[0.06em] uppercase">
                  {figure.label}
                </dt>
                <dd className="m-0 font-serif text-[clamp(30px,4vw,44px)] leading-none">
                  {figure.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-muted mt-3 mb-0 text-xs">{personalProjects.figuresNote}</p>
        </>
      ) : null}

      {project.sections.map((section) => (
        <section key={section.title} className="border-rule mt-12 border-t pt-8">
          <SectionLabel className="m-0 tracking-[0.08em]">{section.title}</SectionLabel>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-ink-soft mt-4 mb-0 text-[16.5px] leading-[1.7]">
              {paragraph}
            </p>
          ))}
          {section.points ? (
            <ul className="text-ink-soft mt-4 mb-0 grid gap-2.5 pl-5 text-[16.5px] leading-[1.65]">
              {section.points.map((point) => (
                <li key={point} className="marker:text-accent">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </main>
  );
}
