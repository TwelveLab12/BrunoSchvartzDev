import { Fragment } from "react";
import { ButtonLink } from "@/components/ui/button";
import { PrintButton } from "@/components/ui/print-button";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1120px] py-[clamp(56px,9vw,120px)]">
      <div className="text-muted mb-[30px] inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.08em] uppercase">
        <span className="bg-accent inline-block size-[7px] rounded-full" />
        {profile.availability}
      </div>
      <h1 className="m-0 max-w-[20ch] font-serif text-[clamp(44px,8.2vw,104px)] leading-[0.98] font-normal tracking-[-0.025em]">
        {profile.headline.before}
        <em className="text-accent">{profile.headline.emphasis}</em>
        {profile.headline.after}
      </h1>
      <ul className="text-muted mt-[clamp(22px,3vw,30px)] mb-0 flex list-none flex-wrap items-baseline gap-x-3.5 gap-y-2 p-0 font-mono text-[13px] tracking-[0.06em] uppercase">
        {profile.proofs.map((proof, i) => (
          <Fragment key={proof.label}>
            {i > 0 ? (
              <li aria-hidden className="bg-rule hidden h-px w-7 self-center sm:block" />
            ) : null}
            <li className="flex items-baseline gap-2">
              <strong className="text-ink font-serif text-[30px] leading-none font-normal tracking-[-0.01em] normal-case">
                {proof.value}
              </strong>
              {proof.label}
            </li>
          </Fragment>
        ))}
      </ul>
      <div className="mt-[clamp(36px,5vw,56px)] grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))] items-end gap-[clamp(28px,4vw,64px)]">
        <p className="text-ink-muted m-0 max-w-[46ch] text-[clamp(16px,1.5vw,18.5px)] leading-relaxed">
          {profile.intro}
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${profile.email}`}>Me contacter</ButtonLink>
          <PrintButton>Imprimer mon CV</PrintButton>
        </div>
      </div>
    </section>
  );
}
