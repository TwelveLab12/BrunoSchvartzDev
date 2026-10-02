"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        // Sans cela, le panneau disparaît avec le lien focalisé et le focus retombe sur <body>.
        buttonRef.current?.focus();
      }
    }
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="contents xl:hidden">
      {/* Nom constant : `aria-expanded` porte seul l'état (ouvert/fermé), inutile de le répéter. */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Menu"
        className="-mr-2 flex size-11 items-center justify-center max-sm:ml-auto"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>
      {/* Toujours dans le DOM, masqué par `hidden` : l'id visé par `aria-controls` doit exister
          même menu fermé. */}
      <nav
        id="mobile-nav-panel"
        aria-label="Navigation principale"
        hidden={!open}
        className="border-rule mt-4 flex w-full basis-full flex-col border-t pt-2 text-[15px] tracking-[0.02em]"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="border-rule-soft border-b py-3 no-underline last:border-b-0"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
