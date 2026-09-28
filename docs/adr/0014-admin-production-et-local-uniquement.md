# 0014 — L'admin n'est disponible qu'en production et en local

**Statut** : Acceptée — précise [0011](./0011-blog-admin-architecture.md)

## Contexte

L'ADR 0011 protège `/admin` par une connexion LinkedIn (OAuth) restreinte au propriétaire du site, et
fait écrire les articles dans le dépôt Git par un jeton GitHub. Deux contraintes rendent cette admin
inutilisable sur les previews Vercel :

- LinkedIn exige une redirect URL exacte, enregistrée à l'avance dans l'app LinkedIn. L'URL d'une
  preview (`<projet>-<hash>-<scope>.vercel.app`) change à chaque déploiement : elle ne peut pas être
  enregistrée.
- Le jeton d'écriture (`GITHUB_CONTENT_TOKEN`) peut commiter sur `main`. L'exposer aux previews
  reviendrait à laisser le code de n'importe quelle branche le lire.

Sur une preview, `/admin/login` aboutit donc à `/admin/error` (« Accès refusé »). Ce n'est pas un
oubli de configuration.

## Décision

`/admin` est utilisable en **production** et en **local** (`http://localhost:3000`, dont la redirect
URL est enregistrée dans l'app LinkedIn). Les previews servent à relire le rendu public du site ; elles
n'offrent pas d'admin. Les variables d'authentification et le jeton GitHub ne sont définis ni sur
l'environnement Preview de Vercel, ni ailleurs que dans Production et dans le `.env.local` du
propriétaire.

Pas d'environnement de staging dédié (par exemple un sous-domaine stable lié à une branche). Il
demanderait sa propre redirect URL LinkedIn et une variable pour cibler une branche de contenu autre
que `main` (aujourd'hui fixée dans `lib/github-content.ts`), sinon le staging publierait en production.
C'est disproportionné pour un site à un seul auteur.

## Conséquences

Le comportement de `/admin` sur une preview est attendu. L'admin se teste en local ou directement en
production. Attention : en local, l'admin lit et écrit le vrai dépôt (branche `main`) via l'API GitHub,
donc enregistrer un article depuis `localhost` commite réellement.

La répartition des variables par environnement est consignée dans `.env.example` et le README, pas dans
`/docs`. À réexaminer si le site devait avoir plusieurs auteurs ou un besoin réel d'environnement de
recette.
