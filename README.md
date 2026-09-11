# bruno-schvartz-site

Site de présentation personnel, déployé sur [brunoschvartz.dev](https://brunoschvartz.dev) (Vercel, domaine chez Cloudflare). Entièrement statique — pas de base de données, pas d'authentification, pas de route API.

Stack : Next.js 15 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS 4 · CVA + clsx + tailwind-merge · lucide-react. Qualité : ESLint (`eslint-config-next`), Prettier + `prettier-plugin-tailwindcss`, Husky + lint-staged, CI GitHub Actions. Détail de chaque dépendance : [`docs/dependencies.md`](docs/dependencies.md).

## Démarrer

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Scripts : `pnpm build` · `pnpm start` · `pnpm lint` · `pnpm lint:ci` · `pnpm typecheck` · `pnpm format`.

## Structure

```
app/           routes (page, layout, CV imprimé via @media print, docs/, not-found, error, global-error)
components/    home/ (sections de la page) · ui/ (primitives réutilisables : Button, PrintButton)
content/       profile.ts — tout le contenu éditorial, typé, en un seul endroit
docs/          documentation du projet (dependencies.md, adr/) — aussi servie en ligne sur /docs
lib/utils.ts   cn()
```

Les couleurs et les polices sont des tokens Tailwind déclarés dans `app/globals.css` (`@theme`) : `bg-paper`, `text-ink`, `text-muted`, `bg-accent`, `font-serif|sans|mono|wordmark`. Modifier l'accent = une ligne.

## Documentation

- [`docs/dependencies.md`](docs/dependencies.md) — ce que fait chaque librairie et pourquoi elle est utilisée ici.
- [`docs/adr/`](docs/adr) — décisions d'architecture (format Statut/Contexte/Décision/Conséquences), numérotées.
- Les deux sont aussi consultables en ligne sur `/docs` (non indexé, non lié depuis la page de présentation).
- [`CLAUDE.md`](CLAUDE.md) — conventions de travail pour Claude Code sur ce repo.

## CV imprimable

Pas de PDF à maintenir : le CV **est** la version imprimée de la page. `components/cv-print.tsx` est masqué à l'écran (`hidden print:block`) et la page l'est à l'impression (`print:hidden`) ; `@media print` dans `globals.css` fixe le format A4. Le CTA « Imprimer mon CV » appelle `window.print()` — l'utilisateur choisit « Enregistrer au format PDF ». Contenu dans `content/profile.ts` (`cv`) : une seule source à mettre à jour.

Tenir sur une page : vérifier l'aperçu d'impression après chaque ajout de contenu.

## Déploiement

Vercel, déploiement automatique sur push vers `main`. La promotion en production est bloquée tant que la CI (`.github/workflows/ci.yml`) n'est pas verte (Deployment Check Vercel, voir `docs/adr/0009-vercel-deployment-checks.md`).

## Volontairement pas installé

Rien dans cette page n'a besoin de base de données, donc ces dépendances ne sont pas dans le `package.json` (pas de deps mortes). Le blog avec édition depuis le site (suivi dans le GitHub Project) en aura besoin le jour où il sera implémenté :

```bash
# Shadcn UI + primitives Radix (au besoin, composant par composant)
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add dialog dropdown-menu

# Neon + Drizzle (quand il y aura des données)
pnpm add @neondatabase/serverless drizzle-orm
pnpm add -D drizzle-kit
```

Non inclus car côté poste de travail, pas côté projet : Node/nvm, pnpm, Git, GitHub CLI, IDE et assistants IA, comptes Vercel/Neon/GitHub.
