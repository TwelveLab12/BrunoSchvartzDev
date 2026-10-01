import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { ButtonLink } from "@/components/ui/button";
import { profile, siteCase } from "@/content/profile";
import { getAdrCount } from "@/lib/docs";
import { cn } from "@/lib/utils";

/** Rend les segments `entre backticks` en <code>. */
function WithCode({ text }: { text: string }) {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="bg-ink/[0.06] rounded-sm px-[5px] py-px font-mono text-[13px]">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

export function SiteCase() {
  const adrCount = getAdrCount();

  return (
    <section
      id="ce-site"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(56px,8vw,104px)]"
    >
      <SectionLabel as="p" className="m-0">
        {siteCase.label}
      </SectionLabel>
      <div className="mt-3 grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))] items-end gap-x-[clamp(32px,5vw,72px)] gap-y-5">
        <h2 className="m-0 max-w-[22ch] font-serif text-[clamp(30px,3.6vw,44px)] leading-[1.08] font-normal tracking-[-0.02em]">
          {siteCase.title.map((part) =>
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
          {siteCase.lede}
        </p>
      </div>
      <ul className="mt-[clamp(28px,3.5vw,40px)] mb-0 flex list-none flex-wrap gap-2 p-0">
        {siteCase.stack.map((item) => (
          <li key={item} className="bg-ink/[0.05] rounded-sm px-3 py-[7px] font-mono text-[13px]">
            {item}
          </li>
        ))}
      </ul>
      <ol className="mt-[clamp(36px,4.5vw,56px)] mb-0 grid list-none [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-[clamp(28px,4vw,56px)] gap-y-[clamp(28px,3.5vw,44px)] p-0">
        {siteCase.points.map((point, i) => (
          <li
            key={point.label}
            className={cn("pt-4", i === 0 ? "border-accent border-t-2" : "border-rule border-t")}
          >
            <SectionLabel as="h3" className="m-0 flex gap-2.5 tracking-[0.08em]">
              <span aria-hidden className="text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {point.label}
            </SectionLabel>
            <p className="mt-2.5 mb-0 text-[17px] leading-[1.35] font-semibold tracking-[-0.005em]">
              {"withAdrCount" in point ? `${adrCount} ${point.title}` : point.title}
            </p>
            <p className="text-ink-muted mt-2 mb-0 text-[15px] leading-relaxed">
              <WithCode text={point.body} />
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-[clamp(36px,4.5vw,56px)] flex flex-wrap gap-3">
        <ButtonLink href="/docs">
          {siteCase.docsLink}
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href={profile.repository} variant="outline">
          {siteCase.repositoryLink}
          <ArrowUpRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    </section>
  );
}
