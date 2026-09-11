import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[720px] flex-col items-start justify-center px-6 py-16">
      <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">Erreur 404</p>
      <h1 className="m-0 mt-4 font-serif text-[clamp(56px,10vw,120px)] leading-[0.95] font-normal tracking-[-0.02em]">
        Page introuvable
      </h1>
      <p className="text-ink-muted mt-6 max-w-[46ch] text-lg leading-relaxed">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <ButtonLink href="/" className="mt-8">
        Retour à l&apos;accueil
      </ButtonLink>
    </main>
  );
}
