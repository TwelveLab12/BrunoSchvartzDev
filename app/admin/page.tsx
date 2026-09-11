import type { Metadata } from "next";
import { auth, signOut } from "@/auth";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await auth();
  const identity = session?.user?.name ?? session?.user?.email ?? "propriétaire du site";

  return (
    <main className="mx-auto flex min-h-dvh max-w-[720px] flex-col items-start justify-center px-6 py-16">
      <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">Admin</p>
      <h1 className="m-0 mt-4 font-serif text-[clamp(40px,7vw,72px)] leading-[1.05] font-normal tracking-[-0.02em]">
        Connecté
      </h1>
      <p className="text-ink-muted mt-6 max-w-[46ch] text-lg leading-relaxed">
        Connecté en tant que {identity}. L&apos;éditeur d&apos;articles arrive dans une prochaine
        itération.
      </p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
        className="mt-8"
      >
        <button type="submit" className={buttonVariants({ variant: "outline" })}>
          Se déconnecter
        </button>
      </form>
    </main>
  );
}
