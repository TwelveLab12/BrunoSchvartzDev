import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shell partagé par app/not-found.tsx, app/error.tsx, et les interstitiels
 * d'accès à /admin (app/admin/login, app/admin/error) — même forme kicker/
 * titre/description/actions, tailles de titre différentes selon le contexte.
 * Volontairement PAS utilisé par app/global-error.tsx : celui-ci doit rester
 * fonctionnel même si un composant partagé est la cause du crash du layout
 * racine (voir docs/adr/0010-error-page-strategy.md).
 */
export function ErrorPage({
  kicker,
  title,
  titleClassName,
  description,
  actions,
}: {
  kicker: string;
  title: string;
  titleClassName?: string;
  description: string;
  actions: ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[720px] flex-col items-start justify-center px-6 py-16">
      <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">{kicker}</p>
      <h1 className={cn("m-0 mt-4 font-serif font-normal tracking-[-0.02em]", titleClassName)}>
        {title}
      </h1>
      <p className="text-ink-muted mt-6 max-w-[46ch] text-lg leading-relaxed">{description}</p>
      <div className="mt-8 flex gap-3">{actions}</div>
    </main>
  );
}
