import { Wordmark } from "@/components/wordmark";
import Image from "next/image";
import Link from "next/link";

const sectionLinks = [
  { href: "#experience", label: "Expérience" },
  { href: "#stack", label: "Stack" },
  { href: "#projet", label: "Projet" },
];

export function SiteHeader() {
  return (
    <header className="border-rule mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-6 border-b pt-7">
      <div className="flex items-center gap-3.5 pb-[22px]">
        <Image
          src="/portrait.jpg"
          alt="Portrait de Bruno Schvartz"
          width={600}
          height={600}
          priority
          className="border-rule size-14 rounded-full border object-cover"
        />
        <span className="font-wordmark text-[32px] font-semibold tracking-[-0.01em]">
          <Wordmark />
        </span>
      </div>
      <nav className="flex items-center gap-[26px] pb-[22px] text-[13.5px] tracking-[0.02em]">
        {sectionLinks.map((l) => (
          <Link key={l.href} href={l.href} className="no-underline">
            {l.label}
          </Link>
        ))}
        <span aria-hidden="true" className="border-rule h-4 w-px border-l" />
        <Link href="/blog" className="no-underline">
          Blog
        </Link>
        <Link href="#contact" className="no-underline">
          Contact
        </Link>
      </nav>
    </header>
  );
}
