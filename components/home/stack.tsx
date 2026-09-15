import { SectionLabel } from "@/components/section-label";
import { stackGroups } from "@/content/profile";

export function Stack() {
  return (
    <section
      id="stack"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(44px,6vw,72px)]"
    >
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[clamp(28px,4vw,56px)]">
        {stackGroups.map((group) => (
          <div key={group.label}>
            <SectionLabel>{group.label}</SectionLabel>
            <div className="mt-[18px] flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="bg-ink/[0.05] hover:bg-ink/10 rounded-sm px-3 py-[7px] font-mono text-[13px] transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
            {"note" in group && group.note ? (
              <div className="text-muted mt-[18px] text-[13.5px]">{group.note}</div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
