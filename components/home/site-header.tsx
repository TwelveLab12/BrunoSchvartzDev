import { MobileNav } from "@/components/home/mobile-nav";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import Image from "next/image";
import Link from "next/link";

// Dans l'ordre des sections de la page. Affichés en ligne à partir de xl seulement : en dessous,
// ils ne tiennent plus à côté de la marque et passent dans le menu burger.
const links = [
  { href: "#stack", label: "Stack" },
  { href: "#projet", label: "Cas d'étude" },
  { href: "#experience", label: "Parcours" },
  { href: "#recommandations", label: "Recommandations" },
  { href: "#ce-site", label: "Ce site" },
  { href: "/blog", label: "Blog" },
];

const contact = { href: "#contact", label: "Me contacter" };

export function SiteHeader() {
  return (
    // Pleine largeur (annule le padding du conteneur de la page) pour que le fond couvre les marges
    // une fois collé.
    <header className="bg-paper/90 sticky top-0 z-20 -mx-[clamp(20px,5vw,72px)] px-[clamp(20px,5vw,72px)] backdrop-blur-sm">
      <div className="border-rule mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-3 border-b py-4 sm:gap-x-6">
        <div className="flex items-center gap-3.5">
          <Image
            src="/portrait.jpg"
            alt="Portrait de Bruno Schvartz"
            width={600}
            height={600}
            priority
            className="border-rule size-12 rounded-full border object-cover sm:size-14"
          />
          <span className="font-wordmark text-[26px] font-semibold tracking-[-0.01em] sm:text-[32px]">
            <Wordmark />
          </span>
        </div>
        <div className="ml-auto hidden items-center gap-[26px] sm:flex">
          <nav
            aria-label="Navigation principale"
            className="hidden gap-[26px] text-[13.5px] tracking-[0.02em] xl:flex"
          >
            {links.map((l) => (
              // py-2 : zone cliquable de 36 px (le texte seul ne fait que 20 px) ; l'en-tête est
              // déjà plus haut (portrait de 56 px), la mise en page ne bouge pas.
              <Link key={l.href} href={l.href} className="py-2 no-underline">
                {l.label}
              </Link>
            ))}
          </nav>
          <ButtonLink href={contact.href} size="sm">
            {contact.label}
          </ButtonLink>
        </div>
        {/* Enfant direct du conteneur flex-wrap : son panneau occupe une ligne entière. */}
        <MobileNav links={[...links, contact]} />
      </div>
    </header>
  );
}
