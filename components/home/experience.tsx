import { SectionLabel } from "@/components/section-label";
import { experience } from "@/content/profile";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(48px,7vw,88px)]"
    >
      <SectionLabel className="mb-[34px]">Parcours</SectionLabel>
      <ul className="m-0 grid list-none p-0">
        {experience.map((job) => (
          <li
            key={job.company}
            className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-[clamp(24px,4vw,56px)] gap-y-3 py-7"
          >
            <div>
              {/* h3 sous le h2 « Parcours » : une entrée par employeur dans le plan de la page. */}
              <h3 className="m-0 text-lg font-semibold tracking-[-0.005em]">{job.company}</h3>
              <p className="text-muted m-0 mt-1 text-[14.5px]">{job.role}</p>
            </div>
            <p className="text-muted m-0 font-mono text-[13px]">{job.period}</p>
            <p className="text-ink-muted m-0 text-[15px] leading-relaxed">{job.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
