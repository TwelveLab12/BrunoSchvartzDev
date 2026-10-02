import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { GithubIcon, LinkedinIcon } from "@/components/social-icons";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-rule mx-auto max-w-[1120px] border-t pt-[clamp(64px,9vw,120px)] pb-[clamp(56px,8vw,96px)]"
    >
      <h2 className="m-0 max-w-[24ch] font-serif text-[clamp(34px,5.6vw,68px)] leading-[1.02] font-normal tracking-[-0.02em]">
        Un poste front-end React à pourvoir ? Parlons-en.
      </h2>
      <div className="mt-[clamp(36px,5vw,56px)] grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-[clamp(24px,4vw,56px)] gap-y-6">
        <div>
          <SectionLabel as="h3" className="mb-2.5">
            E-mail
          </SectionLabel>
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-base">
            <Mail className="size-4" aria-hidden />
            {profile.email}
          </a>
        </div>
        <div>
          <SectionLabel as="h3" className="mb-2.5">
            Téléphone
          </SectionLabel>
          <a href={profile.phoneHref} className="flex items-center gap-2 text-base">
            <Phone className="size-4" aria-hidden />
            {profile.phone}
          </a>
        </div>
        <div>
          <SectionLabel as="h3" className="mb-2.5">
            En ligne
          </SectionLabel>
          <div className="flex flex-col gap-[7px] text-base">
            <a href={profile.website} className="flex items-center gap-2">
              <Globe className="size-4" aria-hidden />
              {profile.websiteLabel}
            </a>
            <a href={profile.linkedin} className="flex items-center gap-2">
              <LinkedinIcon className="size-4" aria-hidden />
              LinkedIn
            </a>
            <a href={profile.github} className="flex items-center gap-2">
              <GithubIcon className="size-4" aria-hidden />
              GitHub
            </a>
          </div>
        </div>
        <div>
          <SectionLabel as="h3" className="mb-2.5">
            Basé à
          </SectionLabel>
          <div className="flex items-center gap-2 text-base">
            <MapPin className="size-4" aria-hidden />
            {profile.location}
          </div>
        </div>
      </div>
    </section>
  );
}
