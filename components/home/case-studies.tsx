import { CaseStudyDiagram } from "@/components/home/case-study-diagram";
import { SectionLabel } from "@/components/section-label";
import { caseStudies, caseStudiesTitle, caseStudyLabels } from "@/content/profile";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  return (
    <section
      id="projet"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(56px,8vw,104px)]"
    >
      <SectionLabel as="p" className="m-0">
        Cas d&apos;étude
      </SectionLabel>
      <h2 className="mt-3 mb-0 max-w-[26ch] font-serif text-[clamp(30px,3.6vw,44px)] leading-[1.08] font-normal tracking-[-0.02em]">
        {caseStudiesTitle.map((part) =>
          "emphasis" in part ? (
            <em key={part.text} className="text-accent">
              {part.text}
            </em>
          ) : (
            part.text
          ),
        )}
      </h2>
      {caseStudies.map((study, i) => (
        <article
          key={study.name}
          className={i === 0 ? "mt-[clamp(40px,5vw,64px)]" : "mt-[clamp(56px,7vw,96px)]"}
        >
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[clamp(32px,5vw,72px)]">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="m-0 font-serif text-[clamp(32px,4.4vw,54px)] leading-[1.05] font-normal tracking-[-0.02em]">
                  {study.name}
                </h3>
                <span className="text-muted font-mono text-[13px] whitespace-nowrap">
                  {study.meta}
                </span>
              </div>
              <p className="text-ink-muted mt-[18px] mb-0 max-w-[46ch] text-[15.5px] leading-[1.65]">
                {study.summary}
              </p>
              <dl className="mt-5 mb-0 grid max-w-[48ch] grid-cols-[auto_1fr] gap-x-3.5 gap-y-1.5 text-[14.5px] leading-[1.55]">
                {study.roles.map((role) => (
                  <div key={role.label} className="contents">
                    <dt className="text-accent font-mono text-[11px] leading-[1.9] tracking-[0.08em] uppercase">
                      {role.label}
                    </dt>
                    <dd className="text-ink-soft m-0">{role.body}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-[22px] flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-ink/20 rounded-sm border px-[11px] py-1.5 font-mono text-[12.5px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <CaseStudyDiagram diagram={study.diagram} />
          </div>
          <div className="mt-[clamp(32px,4vw,48px)] grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(20px,3vw,40px)]">
            {study.highlights.map((h, hi) => (
              <div
                key={h.label}
                className={cn(
                  "pt-4",
                  hi === 0 ? "border-accent border-t-2" : "border-rule border-t",
                )}
              >
                <SectionLabel as="h4" className="m-0 tracking-[0.08em]">
                  {h.label}
                </SectionLabel>
                <p className="text-muted mt-2.5 mb-0 text-[15px] leading-relaxed">
                  {caseStudyLabels.challenge} {h.challenge}
                </p>
                <p className="text-ink-soft mt-2.5 mb-0 text-[15px] leading-relaxed">
                  {h.solution}
                </p>
                <p className="text-accent mt-2.5 mb-0 font-mono text-[13px] leading-normal font-medium">
                  <span aria-hidden>→ </span>
                  {h.result}
                </p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
