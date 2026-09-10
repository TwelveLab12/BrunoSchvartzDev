import { Wordmark } from "@/components/wordmark";

const links = [
  { href: "#experience", label: "Expérience" },
  { href: "#stack", label: "Stack" },
  { href: "#projet", label: "Projet" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-rule mx-auto flex max-w-[1120px] flex-wrap items-baseline justify-between gap-6 border-b pt-7">
      <div className="pb-[22px] font-serif text-[22px] tracking-[-0.01em]">
        <Wordmark />
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
