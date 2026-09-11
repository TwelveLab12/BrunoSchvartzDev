import type { Metadata } from "next";
import { ErrorPage } from "@/components/error-page";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <ErrorPage
      kicker="Erreur 404"
      title="Page introuvable"
      titleClassName="text-[clamp(56px,10vw,120px)] leading-[0.95]"
      description="Cette page n'existe pas ou a été déplacée."
      actions={<ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>}
    />
  );
}
