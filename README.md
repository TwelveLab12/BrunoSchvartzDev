# bruno-schvartz-site

Site de présentation — une seule page pour le moment (`/`).

Stack : Next.js 15 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS 4 · CVA + clsx + tailwind-merge · lucide-react. Qualité : ESLint (`eslint-config-next`), Prettier + `prettier-plugin-tailwindcss`, Husky + lint-staged.

## Démarrer

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Scripts : `pnpm build` · `pnpm start` · `pnpm lint` · `pnpm typecheck` · `pnpm format`.

Husky : `pnpm prepare` puis `chmod +x .husky/pre-commit` (hook déjà écrit, lance lint-staged).

## Structure

```
app/           layout (fonts + metadata), globals.css (design tokens @theme), page.tsx
components/    sections/ (une par bloc de la page) · ui/button.tsx (CVA) · section-label.tsx
content/       profile.ts — tout le contenu éditorial, typé, en un seul endroit
lib/utils.ts   cn()
```

Les couleurs et les polices sont des tokens Tailwind déclarés dans `app/globals.css` (`@theme`) : `bg-paper`, `text-ink`, `text-muted`, `bg-accent`, `font-serif|sans|mono`. Modifier l'accent = une ligne.

## À faire

- `content/profile.ts` → `github` : remplacer l'URL placeholder.

## CV imprimable

Pas de PDF à maintenir : le CV **est** la version imprimée de la page. `components/cv-print.tsx` est masqué à l'écran (`hidden print:block`) et la page l'est à l'impression (`print:hidden`) ; `@media print` dans `globals.css` fixe le format A4. Le CTA « Imprimer mon CV » appelle `window.print()` — l'utilisateur choisit « Enregistrer au format PDF ». Contenu dans `content/profile.ts` (`cv`) : une seule source à mettre à jour.

Tenir sur une page : vérifier l'aperçu d'impression après chaque ajout de contenu.

## Volontairement pas installé

Rien dans cette page n'a besoin de base de données ni de MDX, donc ces dépendances ne sont pas dans le `package.json` (pas de deps mortes). À ajouter le jour où le besoin existe :

```bash
# Shadcn UI + primitives Radix (au besoin, composant par composant)
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add dialog dropdown-menu

# Neon + Drizzle (quand il y aura des données)
pnpm add @neondatabase/serverless drizzle-orm
pnpm add -D drizzle-kit

# Section TIL en MDX
pnpm add @next/mdx @mdx-js/react rehype-pretty-code shiki
```

Non inclus car côté poste de travail, pas côté projet : Node/nvm, pnpm, Git, GitHub CLI, IDE et assistants IA, comptes Vercel/Neon/GitHub.
