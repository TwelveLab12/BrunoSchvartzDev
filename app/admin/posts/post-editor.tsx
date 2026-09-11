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

      <div className="grid grid-cols-2 gap-6">
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

      <div className="grid grid-cols-2 items-start gap-6">
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
