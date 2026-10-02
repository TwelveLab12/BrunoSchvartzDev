"use client";

import { startTransition, useActionState, useState, type FormEvent, type ReactNode } from "react";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { AdminPost } from "@/lib/github-content";
import { savePostAction } from "./actions";

function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={pending} className={buttonVariants()}>
      {pending ? "Enregistrement..." : children}
    </button>
  );
}

const fieldLabel = "text-muted font-mono text-xs tracking-[0.08em] uppercase";
const fieldInput = "border-ink/55 focus:border-ink rounded-sm border bg-transparent px-3 py-2";
const editorHeight = "h-[28rem] overflow-y-auto resize-none";

const MARKDOWN_HINTS = [
  ["# Titre", "## Sous-titre"],
  ["**gras**", "*italique*"],
  ["[texte](url)", "`code`"],
  ["- liste", "1. liste numérotée"],
  ["> citation", "---"],
];

function MarkdownCheatsheet() {
  return (
    <div className="flex flex-wrap gap-2">
      {MARKDOWN_HINTS.flat().map((hint) => (
        <code
          key={hint}
          className="bg-ink/[0.05] text-ink-muted rounded-sm px-2.5 py-1 font-mono text-[12.5px]"
        >
          {hint}
        </code>
      ))}
    </div>
  );
}

export function PostEditor({ post, className }: { post?: AdminPost; className?: string }) {
  const [body, setBody] = useState(post?.content ?? "");
  const [state, formAction, pending] = useActionState(savePostAction, null);

  // React 19 réinitialise un <form action> à la fin de l'action, même quand elle échoue : titre,
  // tags, extrait, épinglage et surtout le statut (retombé à « Brouillon » sur un article publié)
  // étaient perdus à chaque erreur. On annule donc l'envoi natif et on lance l'action à la main :
  // sans l'envoi par <form action>, pas de réinitialisation (WCAG 3.3.7). `action` reste posé pour
  // qu'un envoi avant l'hydratation passe quand même par l'action et non par un GET.
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  return (
    <form action={formAction} onSubmit={submit} className={cn("grid gap-6", className)}>
      <input type="hidden" name="slug" defaultValue={post?.slug ?? ""} />
      <input type="hidden" name="sha" defaultValue={post?.sha ?? ""} />
      <input type="hidden" name="date" defaultValue={post?.date ?? ""} />

      <label className="grid gap-1.5">
        <span className={fieldLabel}>Titre</span>
        <input name="title" defaultValue={post?.title} required className={fieldInput} />
      </label>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={fieldLabel}>Extrait</span>
          <input name="excerpt" defaultValue={post?.excerpt} className={fieldInput} />
        </label>
        <label className="grid gap-1.5">
          <span className={fieldLabel}>Ordre d&apos;épinglage (vide = non épinglé)</span>
          <input
            name="pinnedOrder"
            type="number"
            min={0}
            step={1}
            defaultValue={post?.pinnedOrder ?? ""}
            className={fieldInput}
          />
        </label>
      </div>

      <div className="grid gap-1.5">
        <span className={fieldLabel}>Aide Markdown</span>
        <MarkdownCheatsheet />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <label className="grid gap-1.5">
          <span className={fieldLabel}>Contenu (Markdown)</span>
          <textarea
            name="content"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            className={cn(fieldInput, editorHeight, "font-mono text-sm")}
          />
        </label>
        <div className="grid gap-1.5">
          <span className={fieldLabel}>Aperçu — lecture seule</span>
          <article
            className={cn(
              "prose prose-neutral prose-headings:font-serif prose-a:text-accent border-ink/10 bg-ink/[0.025] max-w-none rounded-sm border border-dashed px-3 py-2",
              editorHeight,
            )}
          >
            <Markdown>{body}</Markdown>
          </article>
        </div>
      </div>

      {state && !state.ok && (
        <p role="alert" className="text-danger text-sm">
          {state.message}
        </p>
      )}

      <div>
        <SubmitButton pending={pending}>Enregistrer</SubmitButton>
      </div>
    </form>
  );
}
