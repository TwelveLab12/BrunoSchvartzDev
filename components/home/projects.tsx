import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SectionLabel } from "@/components/section-label";
import { GithubIcon } from "@/components/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { personalProjects, projects } from "@/content/projects";
import { getProjectFigures } from "@/lib/project-stats";
import { cn } from "@/lib/utils";

export async function Projects() {
  if (projects.length === 0) return null;

  const figures = await Promise.all(projects.map(getProjectFigures));

  return (
    <section
      id="projets-perso"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(56px,8vw,104px)]"
    >
      <SectionLabel as="p" className="m-0">
        {personalProjects.label}
      </SectionLabel>
      <div className="mt-3 grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))] items-end gap-x-[clamp(32px,5vw,72px)] gap-y-5">
        <h2 className="m-0 max-w-[22ch] font-serif text-[clamp(30px,3.6vw,44px)] leading-[1.08] font-normal tracking-[-0.02em]">
          {personalProjects.title.map((part) =>
            "emphasis" in part ? (
              <em key={part.text} className="text-accent">
                {part.text}
              </em>
            ) : (
              part.text
            ),
          )}
        </h2>
        <p className="text-ink-muted m-0 max-w-[48ch] text-[15.5px] leading-[1.65]">
          {personalProjects.lede}
        </p>
      </div>

      {projects.map((project, i) => (
        <article
          key={project.slug}
          aria-labelledby={`projet-${project.slug}`}
          className={cn(
            "border-rule border-t pt-[clamp(28px,3.5vw,40px)]",
            i === 0 ? "mt-[clamp(36px,4.5vw,56px)]" : "mt-[clamp(56px,7vw,96px)]",
          )}
        >
          {/* Rangée du haut : texte et image se font face, à hauteur voisine. */}
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(32px,5vw,72px)]">
            <div className="self-center">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3
                  id={`projet-${project.slug}`}
                  className="m-0 font-serif text-[clamp(28px,3.4vw,40px)] leading-[1.08] font-normal tracking-[-0.02em]"
                >
                  {project.name}
                </h3>
                <span className="text-muted font-mono text-[13px] whitespace-nowrap">
                  {project.meta}
                </span>
              </div>
              <p className="text-ink-muted mt-[18px] mb-0 max-w-[48ch] text-[15.5px] leading-[1.65]">
                {project.tagline}
              </p>
              <ul className="mt-[22px] mb-0 flex list-none flex-wrap gap-2 p-0">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-ink/20 rounded-sm border px-[11px] py-1.5 font-mono text-[12.5px]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-[clamp(28px,3.5vw,36px)] flex flex-wrap gap-3">
                <ButtonLink href={project.links.demo}>
                  {personalProjects.links.demo}
                  <ArrowUpRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href={`/projets/${project.slug}`} variant="outline">
                  {personalProjects.links.caseStudy}
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href={project.links.repository} variant="outline">
                  <GithubIcon className="size-4" aria-hidden />
                  {personalProjects.links.repository}
                </ButtonLink>
              </div>
            </div>

            {project.cover ? (
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(min-width: 1120px) 520px, 100vw"
                className="border-rule h-auto w-full self-center rounded-sm border"
              />
            ) : null}
          </div>

          {/* Rangée du bas : chiffres et points forts partagent la largeur en colonnes égales. */}
          <div className="mt-[clamp(32px,4vw,48px)] grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-x-[clamp(24px,3vw,40px)] gap-y-8">
            {(figures[i] ?? []).length > 0 ? (
              <dl className="m-0 grid grid-cols-2 gap-4">
                {(figures[i] ?? []).map((figure) => (
                  // dt avant dd (ordre requis dans un <dl>), la valeur passe au-dessus visuellement.
                  <div
                    key={figure.label}
                    className="border-accent flex flex-col-reverse justify-end gap-2 border-t-2 pt-3"
                  >
                    <dt className="text-muted font-mono text-[11.5px] tracking-[0.06em] uppercase">
                      {figure.label}
                    </dt>
                    <dd className="m-0 font-serif text-[clamp(28px,3.2vw,38px)] leading-none">
                      {figure.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {project.highlights.map((h) => (
              <div key={h.label} className="border-rule border-t pt-3">
                <SectionLabel as="h4" className="m-0 tracking-[0.08em]">
                  {h.label}
                </SectionLabel>
                <p className="text-ink-soft mt-[9px] mb-0 text-[15.5px] leading-relaxed">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
