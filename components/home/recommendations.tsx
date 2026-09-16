import { Linkedin } from "lucide-react";
import Image from "next/image";
import { SectionLabel } from "@/components/section-label";
import { recommendations } from "@/content/profile";

/** Au-delà de cette longueur, une citation dépasse la troncature à 6 lignes
 * sur la largeur de carte la plus étroite — elle reçoit alors l'affordance
 * « Lire la suite » plutôt qu'un texte simplement tronqué sans accès au reste. */
const LONG_QUOTE_THRESHOLD = 250;

export function Recommendations() {
  return (
    <section
      id="recommandations"
      className="border-rule mx-auto max-w-[1120px] border-t py-[clamp(48px,7vw,88px)]"
    >
      <SectionLabel className="mb-[34px]">Recommandations</SectionLabel>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(24px,3vw,32px)]">
        {recommendations.map((rec) => (
          <figure
            key={rec.name}
            className="border-rule m-0 flex flex-col gap-4 rounded-sm border p-[clamp(24px,3vw,32px)]"
          >
            <span aria-hidden className="text-accent font-serif text-[40px] leading-[0.6]">
              “
            </span>
            <blockquote cite={rec.linkedin} className="m-0 flex-1">
              {rec.quote.length > LONG_QUOTE_THRESHOLD ? (
                <details className="group">
                  <summary className="list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-ink-soft m-0 line-clamp-6 block cursor-pointer text-[15px] leading-relaxed group-open:line-clamp-none">
                      {rec.quote.replace(/\n\n/g, " ")}
                    </span>
                    <span className="text-accent mt-2 inline-block cursor-pointer text-[13px] font-medium">
                      <span className="group-open:hidden">Lire la suite</span>
                      <span className="hidden group-open:inline">Réduire</span>
                    </span>
                  </summary>
                </details>
              ) : (
                <p className="text-ink-soft m-0 text-[15px] leading-relaxed">
                  {rec.quote.replace(/\n\n/g, " ")}
                </p>
              )}
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
