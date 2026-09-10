import { SectionLabel } from "@/components/section-label";
import { caseStudies, caseStudiesNote } from "@/content/profile";
import { cn } from "@/lib/utils";

export function CaseStudies() {
  return (
    <section
      id="projet"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(56px,8vw,104px)]"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <SectionLabel>Cas d&apos;étude</SectionLabel>
        <p className="text-muted m-0 max-w-[52ch] text-sm leading-relaxed">{caseStudiesNote}</p>
      </div>
      {caseStudies.map((study, i) => (
        <div
          key={study.name}
          className={cn(
            "grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(32px,5vw,72px)]",
            i === 0
              ? "mt-[26px]"
              : "border-rule-soft mt-[clamp(44px,6vw,72px)] border-t pt-[clamp(36px,5vw,56px)]",
          )}
        >
          <div>
            <h2 className="m-0 font-serif text-[clamp(32px,4.4vw,54px)] leading-[1.05] font-normal tracking-[-0.02em]">
              {study.name}
            </h2>
            <p className="text-ink-muted mt-[18px] mb-0 max-w-[44ch] text-[15.5px] leading-[1.65]">
              {study.summary}
            </p>
            {"scope" in study && study.scope ? (
              <p className="text-muted mt-3.5 mb-0 max-w-[44ch] text-[14.5px] leading-relaxed">
                {study.scope}
              </p>
            ) : null}
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
          <div className="grid content-start gap-[26px]">
            {study.highlights.map((h, hi) => (
              <div
                key={h.label}
                className={cn(
                  "pt-4",
                  hi === 0 ? "border-accent border-t-2" : "border-ink/[0.16] border-t",
                )}
              >
                <SectionLabel className="tracking-[0.08em]">{h.label}</SectionLabel>
                <p className="text-ink-soft mt-[9px] mb-0 text-[15.5px] leading-relaxed">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
