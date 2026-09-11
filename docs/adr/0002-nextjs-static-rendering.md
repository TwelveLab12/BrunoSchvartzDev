# 0002 — Next.js App Router, rendu 100% statique

**Statut** : Acceptée

## Contexte

Le site est une page de présentation à contenu fixe (profil, expériences, cas d'étude, CV imprimable), sans donnée dynamique ni interaction serveur.

## Décision

Next.js (App Router), avec l'ensemble des routes pré-rendues statiquement au build (`○ Static` dans la sortie de `next build`) : aucune route API, aucun accès base de données.

## Conséquences

Hébergement trivial et rapide (CDN, zéro cold start, coût nul sur le plan Vercel Hobby). En contrepartie, toute fonctionnalité future nécessitant du contenu dynamique (formulaire de contact avec envoi serveur, CMS) demandera d'introduire une route serveur — ce n'est pas fait aujourd'hui.
