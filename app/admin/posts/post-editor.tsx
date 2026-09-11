"use client";

import { useActionState, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { AdminPost } from "@/lib/github-content";
import { savePostAction } from "./actions";

function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonVariants()}>
      {pending ? "Enregistrement..." : children}
    </button>
  );
}

const fieldLabel = "text-muted font-mono text-xs tracking-[0.08em] uppercase";
const fieldInput =
  "border-ink/20 focus:border-ink rounded-sm border bg-transparent px-3 py-2 outline-none";

export function PostEditor({ post, className }: { post?: AdminPost; className?: string }) {
  const [body, setBody] = useState(post?.content ?? "");
  const [state, formAction] = useActionState(savePostAction, null);

  return (
    <form action={formAction} className={cn("grid gap-6", className)}>
      <input type="hidden" name="slug" defaultValue={post?.slug ?? ""} />
      <input type="hidden" name="sha" defaultValue={post?.sha ?? ""} />
      <input type="hidden" name="date" defaultValue={post?.date ?? ""} />

      <label className="grid gap-1.5">
        <span className={fieldLabel}>Titre</span>
        <input name="title" defaultValue={post?.title} required className={fieldInput} />
      </label>

      <div className="grid grid-cols-2 gap-6">
        <label className="grid gap-1.5">
          <span className={fieldLabel}>Tags (séparés par des virgules)</span>
          <input name="tags" defaultValue={post?.tags.join(", ")} className={fieldInput} />
        </label>
        <label className="grid gap-1.5">
          <span className={fieldLabel}>Statut</span>
          <select name="status" defaultValue={post?.status ?? "draft"} className={fieldInput}>
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className={fieldLabel}>Extrait</span>
        <input name="excerpt" defaultValue={post?.excerpt} className={fieldInput} />
      </label>

      <div className="grid grid-cols-2 gap-6">
        <label className="grid gap-1.5">
          <span className={fieldLabel}>Contenu (Markdown)</span>
          <textarea
            name="content"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            rows={20}
            className={cn(fieldInput, "font-mono text-sm")}
          />
        </label>
        <div className="grid gap-1.5">
          <span className={fieldLabel}>Aperçu</span>
          <article className="prose prose-neutral prose-headings:font-serif prose-a:text-accent border-ink/20 max-w-none rounded-sm border px-3 py-2">
            <ReactMarkdown>{body}</ReactMarkdown>
          </article>
        </div>
      </div>

      {state && !state.ok && <p className="text-sm text-red-600">{state.message}</p>}

      <div>
        <SubmitButton>Enregistrer</SubmitButton>
      </div>
    </form>
  );
}
