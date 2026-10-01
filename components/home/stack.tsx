import { Check } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { stack } from "@/content/profile";

export function Stack() {
  return (
    <section
      id="stack"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(44px,6vw,72px)]"
    >
      <SectionLabel className="m-0">{stack.label}</SectionLabel>
      <ul className="mt-[18px] mb-0 flex list-none flex-wrap items-baseline gap-y-1.5 p-0 font-serif text-[clamp(30px,3.8vw,46px)] leading-[1.15] tracking-[-0.015em]">
        {stack.core.map((item) => (
          <li
            key={item}
            className="after:text-accent after:mx-[0.35em] after:content-['·'] last:after:content-none"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="border-rule mt-[clamp(36px,4.5vw,52px)] grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-[clamp(28px,4vw,56px)] gap-y-7 border-t pt-[22px]">
        {stack.groups.map((group) => (
          <div key={group.label}>
            <SectionLabel as="h3" className="m-0">
              {group.label}
            </SectionLabel>
            {"inline" in group ? (
              <ul className="text-ink-muted mt-4 mb-0 flex list-none flex-wrap p-0 font-mono text-[13px] leading-[1.9]">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="after:text-muted whitespace-nowrap after:mx-[0.5em] after:content-['·'] last:after:content-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-4 mb-0 flex list-none flex-wrap gap-2 p-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="bg-ink/[0.05] rounded-sm px-[11px] py-1.5 font-mono text-[12.5px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {"note" in group ? (
              <p className="text-accent mt-3 mb-0 inline-flex items-center gap-1.5 font-mono text-xs font-medium">
                <Check className="size-3.5" aria-hidden />
                {group.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
