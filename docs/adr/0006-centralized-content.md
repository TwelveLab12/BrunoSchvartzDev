# 0006 — Contenu centralisé dans `content/profile.ts`

**Statut** : Acceptée

## Contexte

Le texte (bio, expériences, projets, coordonnées) est réutilisé à plusieurs endroits : page web, feuille CV imprimée, métadonnées SEO (Open Graph, JSON-LD), image de partage générée dynamiquement.

## Décision

Toute donnée textuelle vit dans `content/profile.ts` (objets TypeScript typés, `as const`), jamais codée en dur dans un composant.

## Conséquences

Une seule source de vérité : changer une date, un intitulé ou une coordonnée se fait à un seul endroit et se répercute partout où c'est utilisé. En échange, `content/profile.ts` grossit avec le site et devra sans doute être scindé par domaine (profil, CV, cas d'étude, articles) si le blog s'ajoute.
