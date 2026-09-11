"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/error-page";
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
    <ErrorPage
      kicker="Erreur"
      title="Une erreur est survenue"
      titleClassName="text-[clamp(40px,7vw,72px)] leading-[1.05]"
      description="Le contenu n'a pas pu s'afficher correctement. Réessayez, ou revenez à l'accueil."
      actions={
        <>
          <button onClick={reset} className={buttonVariants({ variant: "outline" })}>
            Réessayer
          </button>
          <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
        </>
      }
    />
  );
}
