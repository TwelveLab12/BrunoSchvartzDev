import { SectionLabel } from "@/components/section-label";
import { experience } from "@/content/profile";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(48px,7vw,88px)]"
    >
      <SectionLabel className="mb-[34px]">Parcours</SectionLabel>
      <div className="grid">
        {experience.map((job) => (
          <div
            key={job.company}
            className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-[clamp(24px,4vw,56px)] gap-y-3 py-7"
          >
            <div>
              <div className="text-lg font-semibold tracking-[-0.005em]">{job.company}</div>
              <div className="text-muted mt-1 text-[14.5px]">{job.role}</div>
            </div>
            <div className="text-muted font-mono text-[13px]">{job.period}</div>
            <p className="text-ink-muted m-0 text-[15px] leading-relaxed">{job.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
