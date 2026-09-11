import type { Metadata } from "next";
import { signIn } from "@/auth";
import { ErrorPage } from "@/components/error-page";
import { buttonVariants, ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Connexion admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <ErrorPage
      kicker="Admin"
      title="Connexion requise"
      titleClassName="text-[clamp(40px,7vw,72px)] leading-[1.05]"
      description="Cette zone est réservée au propriétaire du site."
      actions={
        <>
          <form
            action={async () => {
              "use server";
              await signIn("linkedin", { redirectTo: "/admin" });
            }}
          >
            <button type="submit" className={buttonVariants()}>
              Se connecter avec LinkedIn
            </button>
          </form>
          <ButtonLink href="/" variant="outline">
            Retour à l&apos;accueil
          </ButtonLink>
        </>
      }
    />
  );
}
