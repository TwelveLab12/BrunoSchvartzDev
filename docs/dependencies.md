# Dépendances du projet

Ce document liste les librairies déclarées dans `package.json` : ce qu'elles font, et pourquoi elles sont utilisées ici précisément (pas juste leur description générique).

## Framework

- **next** — Le framework lui-même : App Router, rendu statique (`app/page.tsx` est entièrement prérendu), optimisation d'images (`next/image`, utilisé pour le portrait dans le header) et de polices (`next/font/google`), et les conventions de fichiers pour le SEO (`app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, l'API `Metadata` dans `app/layout.tsx`).
- **react** / **react-dom** — Dépendances requises par Next.js ; la librairie UI sous-jacente.

## Style

- **tailwindcss** — Utilitaire CSS utilisé pour la quasi-totalité du style du site, ainsi que le système de tokens (`@theme` dans `app/globals.css` : couleurs, polices, échelle typographique dédiée à la feuille CV imprimée).
- **@tailwindcss/postcss** — Plugin PostCSS qui compile Tailwind v4 (remplace l'ancien `tailwind.config.js` des versions précédentes de Tailwind).
- **postcss** — Moteur de transformation CSS requis pour faire tourner le plugin ci-dessus (`postcss.config.mjs`).

## Utilitaires UI

- **class-variance-authority** — Gère les variantes de className de façon typée. Utilisé dans `components/ui/button.tsx` pour définir les variantes `solid`/`outline` et les tailles `md`/`sm` du bouton sans empiler des conditions manuelles.
- **clsx** — Concatène des classNames conditionnellement. Utilisé dans `lib/utils.ts` comme brique de base du helper `cn()`.
- **tailwind-merge** — Résout les classes Tailwind en conflit (ex. deux `px-*` différents) en gardant la dernière plutôt que de les empiler bêtement. Combiné à `clsx` dans `cn()`, ça permet à n'importe quel composant (ex. `SectionLabel`) d'accepter un prop `className` qui surcharge proprement ses classes par défaut.
- **lucide-react** — Bibliothèque d'icônes. Utilisée pour l'icône d'impression dans `components/ui/print-button.tsx`.

## Qualité de code & outillage

- **typescript** — Typage statique sur l'ensemble du code.
- **eslint** — Linter.
- **eslint-config-next** — Le ruleset ESLint officiel de Next.js (règles Core Web Vitals, hooks React, etc.), consommé via `eslint.config.mjs`.
- **@eslint/eslintrc** — Couche de compatibilité permettant d'utiliser `eslint-config-next` (encore fourni au format `.eslintrc` classique) dans la config plate (`eslint.config.mjs`) d'ESLint 9+.
- **prettier** — Formateur de code.
- **prettier-plugin-tailwindcss** — Trie automatiquement les classes Tailwind dans un ordre canonique à l'intérieur des `className`, pour que les diffs restent lisibles et cohérents peu importe qui édite un composant.
- **husky** — Gère le hook Git `pre-commit` (`.husky/pre-commit`) qui déclenche `lint-staged` avant chaque commit.
- **lint-staged** — N'exécute prettier/eslint que sur les fichiers réellement stagés d'un commit (config dans le champ `lint-staged` de `package.json`) — c'est ce qui a reformaté automatiquement les fichiers à chaque commit de ce projet.
- **@types/node**, **@types/react**, **@types/react-dom** — Définitions de types TypeScript pour Node.js, React et ReactDOM, aucune de ces trois librairies ne fournissant ses propres types.
