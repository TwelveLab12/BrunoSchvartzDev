import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { profile } from "@/content/profile";

/** Pied de page de l'accueil : frère de <main> pour être le repère `contentinfo` de la page. */
export function SiteFooter() {
  return (
    <footer className="border-rule text-muted mx-auto flex max-w-[1120px] flex-wrap justify-between gap-3 border-t pt-5 pb-[clamp(40px,5vw,64px)] font-mono text-[11.5px] tracking-[0.06em] uppercase">
      <span>
        <Wordmark vClassName="text-accent" /> — avec un v, jamais un w
      </span>
      <span>{profile.role} — Lyon</span>
      {/* py-1.5 agrandit la zone cliquable (17 → 29 px), -my-1.5 compense pour ne rien décaler. */}
      <Link href="/docs" className="-my-1.5 py-1.5 no-underline">
        Documentation
      </Link>
    </footer>
  );
}
