"use client";

import { useEffect } from "react";
import { ButtonLink, buttonVariants } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-dvh max-w-[720px] flex-col items-start justify-center px-6 py-16">
      <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">Erreur</p>
      <h1 className="m-0 mt-4 font-serif text-[clamp(40px,7vw,72px)] leading-[1.05] font-normal tracking-[-0.02em]">
        Une erreur est survenue
      </h1>
      <p className="text-ink-muted mt-6 max-w-[46ch] text-lg leading-relaxed">
        Le contenu n&apos;a pas pu s&apos;afficher correctement. Réessayez, ou revenez à
        l&apos;accueil.
      </p>
      <div className="mt-8 flex gap-3">
        <button onClick={reset} className={buttonVariants({ variant: "outline" })}>
          Réessayer
        </button>
        <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
      </div>
    </main>
  );
}
