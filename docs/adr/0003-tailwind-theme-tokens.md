# 0003 — Tailwind CSS v4 avec tokens `@theme`, sans bibliothèque de composants

**Statut** : Acceptée

## Contexte

Le site a une identité visuelle précise (palette, typographies, filets fins) et deux échelles distinctes (web et feuille CV imprimée). Une bibliothèque de composants (MUI, Ant Design…) imposerait son propre système de design, à contourner en permanence.

## Décision

Tailwind CSS v4, configuration entièrement en CSS via `@theme` dans `app/globals.css` (pas de `tailwind.config.js`), sans bibliothèque de composants. Les composants interactifs réutilisables (bouton, variantes) sont écrits à la main dans `components/ui/`, avec `class-variance-authority` pour les variantes.

## Conséquences

Contrôle total du rendu, aucun poids JS runtime lié à une lib de composants. En échange, chaque composant interactif doit être écrit et maintenu soi-même plutôt que réutilisé depuis une lib.
