# Développer sur ce projet

Guide technique : lancer le site en local, repérer où vit chaque chose, comprendre les environnements et le déploiement. Pour la présentation du projet, voir le [README](https://github.com/TwelveLab12/BrunoSchvartzDev#readme).

## Démarrer

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Scripts : `pnpm build` · `pnpm start` · `pnpm lint` · `pnpm lint:ci` · `pnpm typecheck` · `pnpm format` · `pnpm a11y`.

Avant chaque commit, `typecheck`, `lint` et `build` doivent passer sans erreur. Les conventions de travail complètes sont dans `CLAUDE.md`.

## Structure

```
app/           routes (page, layout, CV imprimé via @media print, admin/, blog/, docs/, pages d'erreur)
components/    home/ (sections de la page) · ui/ (primitives réutilisables : Button, PrintButton)
content/       profile.ts — tout le contenu éditorial, typé, en un seul endroit · blog/ — articles Markdown
docs/          documentation du projet (dependencies.md, adr/, ce guide) — aussi servie en ligne sur /docs
lib/           utilitaires (blog, docs, cn())
```

Les couleurs et les polices sont des tokens Tailwind déclarés dans `app/globals.css` (`@theme`) : `bg-paper`, `text-ink`, `text-muted`, `bg-accent`, `font-serif|sans|mono|wordmark`. Modifier l'accent = une ligne.

## Documentation

- `dependencies.md` — ce que fait chaque librairie et pourquoi elle est utilisée ici.
- `adr/` — décisions d'architecture (format Statut/Contexte/Décision/Conséquences), numérotées.
- Tout est aussi consultable en ligne sur `/docs` (`noindex`, hors sitemap, lien discret dans le pied de la home — voir `adr/0013-lien-docs-discret-depuis-le-footer.md`).

## CV imprimable

Pas de PDF à maintenir : le CV **est** la version imprimée de la page. `components/cv-print.tsx` est masqué à l'écran (`hidden print:block`) et la page l'est à l'impression (`print:hidden`) ; `@media print` dans `globals.css` fixe le format A4. Le CTA « Imprimer mon CV » appelle `window.print()` — l'utilisateur choisit « Enregistrer au format PDF ». Contenu dans `content/profile.ts` (`cv`) : une seule source à mettre à jour.

Tenir sur une page : vérifier l'aperçu d'impression après chaque ajout de contenu.

## Déploiement

Vercel, déploiement automatique sur push vers `main`. La promotion en production est bloquée tant que la CI (`.github/workflows/ci.yml`) n'est pas verte (Deployment Check Vercel, voir `adr/0009-vercel-deployment-checks.md`).

## Environnements

- **Production** (Vercel, branche `main`) : site public et `/admin`. Les variables d'`.env.example` y sont toutes définies.
- **Preview** (une URL par déploiement de PR) : site public uniquement. `/admin` n'y fonctionne pas et affiche « Accès refusé » : c'est attendu, pas un oubli de configuration (voir `adr/0014-admin-production-et-local-uniquement.md`).
- **Local** (`pnpm dev`, `.env.local` copié depuis `.env.example`) : `/admin` fonctionne une fois les variables renseignées. Attention : enregistrer un article commite réellement sur `main` via l'API GitHub.

Le tableau variable × environnement est en tête d'`.env.example`. Les valeurs ne vont jamais dans le dépôt ni dans `/docs`.
