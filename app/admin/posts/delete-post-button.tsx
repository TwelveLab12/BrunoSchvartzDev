"use client";

import { useActionState } from "react";
import { buttonVariants } from "@/components/ui/button";
import type { ContentResult } from "@/lib/github-content";
import { deletePostAction } from "./actions";

export function DeletePostButton({ slug, sha }: { slug: string; sha: string }) {
  const [state, formAction] = useActionState<ContentResult | null, FormData>(
    () => deletePostAction(slug, sha),
    null,
  );

  return (
    <form action={formAction} className="grid gap-2 text-right">
      <button type="submit" className={buttonVariants({ variant: "outline", size: "sm" })}>
        Supprimer
      </button>
      {state && !state.ok && <p className="text-sm text-red-600">{state.message}</p>}
    </form>
  );
}
