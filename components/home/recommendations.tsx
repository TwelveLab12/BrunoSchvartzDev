import { Linkedin } from "lucide-react";
import Image from "next/image";
import { SectionLabel } from "@/components/section-label";
import { recommendations } from "@/content/profile";
import { cn } from "@/lib/utils";

export function Recommendations() {
  return (
    <section
      id="recommandations"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(48px,7vw,88px)]"
    >
      <SectionLabel className="mb-[34px]">Recommandations</SectionLabel>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(32px,5vw,56px)]">
        {recommendations.map((rec) => (
          <figure key={rec.name} className="m-0 flex flex-col gap-5">
            <blockquote
              cite={rec.linkedin}
              className="text-ink-soft m-0 flex-1 text-[15px] leading-relaxed"
            >
              {rec.quote.split("\n\n").map((paragraph, i) => (
                <p key={i} className={cn("m-0", i > 0 && "mt-3")}>
                  {paragraph}
                </p>
              ))}
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <Image
                src={rec.avatar}
                alt=""
                width={96}
                height={96}
                className="border-rule size-11 rounded-full border object-cover"
              />
              <div className="text-[13.5px] leading-tight">
                <div className="font-semibold">{rec.name}</div>
                <div className="text-muted">
                  {rec.role} — {rec.company}
                </div>
              </div>
              <a
                href={rec.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Profil LinkedIn de ${rec.name}`}
                className="ml-auto"
              >
                <Linkedin className="size-4" aria-hidden />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
