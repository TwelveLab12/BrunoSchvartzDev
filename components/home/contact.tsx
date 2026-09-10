import { SectionLabel } from "@/components/section-label";
import { Wordmark } from "@/components/wordmark";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-rule mx-auto max-w-[1120px] border-t pt-[clamp(64px,9vw,120px)] pb-[clamp(40px,5vw,64px)]"
    >
      <h2 className="m-0 max-w-[24ch] font-serif text-[clamp(34px,5.6vw,68px)] leading-[1.02] font-normal tracking-[-0.02em]">
        Un poste front-end React à pourvoir ? Parlons-en.
      </h2>
      <div className="mt-[clamp(36px,5vw,56px)] grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-[clamp(24px,4vw,56px)] gap-y-6">
        <div>
          <SectionLabel as="h3" className="mb-2.5">
            E-mail
          </SectionLabel>
          <a href={`mailto:${profile.email}`} className="text-base">
            {profile.email}
          </a>
        </div>
        <div>
          <SectionLabel as="h3" className="mb-2.5">
            Téléphone
          </SectionLabel>
          <a href={profile.phoneHref} className="text-base">
            {profile.phone}
          </a>
        </div>
        <div>
          <SectionLabel as="h3" className="mb-2.5">
            En ligne
          </SectionLabel>
          <div className="flex flex-col gap-[7px] text-base">
            <a href={profile.website}>{profile.websiteLabel}</a>
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={profile.github}>GitHub</a>
          </div>
        </div>
        <div>
          <SectionLabel as="h3" className="mb-2.5">
            Basé à
          </SectionLabel>
          <div className="text-base">{profile.location}</div>
        </div>
      </div>
      <div className="border-rule text-muted mt-[clamp(56px,8vw,96px)] flex flex-wrap justify-between gap-3 border-t pt-5 font-mono text-[11.5px] tracking-[0.06em] uppercase">
        <span>
          <Wordmark vClassName="text-accent" /> — avec un v, jamais un w
        </span>
        <span>{profile.role} — Lyon</span>
      </div>
    </section>
  );
}
