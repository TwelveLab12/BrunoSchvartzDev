import type { Metadata } from "next";
import { ErrorPage } from "@/components/error-page";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Accès refusé",
  robots: { index: false, follow: false },
};

export default function AdminErrorPage() {
  return (
    <ErrorPage
      kicker="Admin"
      title="Accès refusé"
      titleClassName="text-[clamp(40px,7vw,72px)] leading-[1.05]"
      description="La connexion a échoué, ou ce compte n'est pas autorisé à administrer ce site."
      actions={<ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>}
    />
  );
}
