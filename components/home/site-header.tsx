import { Wordmark } from "@/components/wordmark";
import Image from "next/image";

const links = [
  { href: "#experience", label: "Expérience" },
  { href: "#stack", label: "Stack" },
  { href: "#projet", label: "Projet" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-rule mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-6 border-b pt-7">
      <div className="flex items-center gap-3 pb-[22px]">
        <Image
          src="/portrait.jpg"
          alt="Portrait de Bruno Schvartz"
          width={40}
          height={40}
          priority
          className="border-rule size-10 rounded-full border object-cover"
        />
        <span className="font-serif text-[22px] tracking-[-0.01em]">
          <Wordmark />
        </span>
      </div>
      <nav className="flex gap-[26px] pb-[22px] text-[13.5px] tracking-[0.02em]">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="no-underline">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
