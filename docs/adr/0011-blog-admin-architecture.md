# 0011 — Architecture du blog et de son admin : Markdown en repo Git, auth LinkedIn

**Statut** : Acceptée

## Contexte

[Issue #11](https://github.com/TwelveLab12/BrunoSchvartzDev/issues/11) demande un blog avec une
interface d'admin pour écrire/éditer des articles depuis le site lui-même — pas seulement via un
commit Git fait à la main. C'est une rupture avec l'ADR 0002 (site 100% statique, sans route API,
sans base de données, sans authentification) : une admin d'édition nécessite au minimum un
stockage persistant, une authentification, et au moins une route dynamique pour l'admin. L'issue
interdisait explicitement de commencer le code avant d'avoir tranché ces points.

## Décision

**Stockage** : les articles sont des fichiers Markdown committés dans ce repo Git
(`content/blog/<slug>.md`, un fichier par article, frontmatter YAML pour les métadonnées — `title`,
`date`, `updatedAt`, `tags`, `excerpt`, `status: draft|published` — parsé via **gray-matter**, corps
en Markdown brut). Pas de base de données, pas de CMS headless (Sanity, Contentful, Payload...).
Toutes les alternatives sérieuses ont un palier gratuit compatible avec Vercel Hobby pour le volume
d'un blog mono-auteur — le coût ne départage donc pas les options. Le critère retenu est la
cohérence avec l'esprit déjà établi par `content/profile.ts` (0006) et `docs/*.md` : le contenu vit
dans le repo, versionné, sans vendor supplémentaire. `lib/blog.ts` reprend le pattern de
`lib/docs.ts` (lecture filesystem + génération de routes statiques) avec un frontmatter structuré en
plus, que `docs/` n'a pas besoin d'avoir.

L'édition se fait entièrement depuis `/admin` (textarea + preview live réutilisant le rendu
`react-markdown` déjà utilisé par `/docs`) : l'utilisateur n'interagit jamais avec Git ou GitHub
directement. Le commit vers `main` est fait par le serveur via **@octokit/rest** (API Contents de
GitHub), déclenché par les actions « Publier »/« Enregistrer » de l'admin — un PAT fine-grained
scope `Contents: Read and write` sur ce seul repo, stocké comme variable d'env Vercel
`GITHUB_CONTENT_TOKEN` restreinte à l'environnement Production. Pas de flux PR-par-article : Vercel
déploie déjà `main` automatiquement à chaque push, sans protection de branche à satisfaire.

**Rendu public** : les pages du blog restent statiques, régénérées par le redeploy Vercel déclenché
par le commit de l'admin — exactement le même mécanisme que pour tout autre changement de contenu
aujourd'hui. Aucune plomberie de revalidation (`revalidatePath`/ISR) n'est nécessaire : le
déploiement en cours ne voit de toute façon pas le nouveau fichier avant la fin du build suivant.
Seules les routes `/admin` sont dynamiques.

**Authentification** : NextAuth (Auth.js v5, App Router) avec le provider OAuth LinkedIn, restreint
au seul profil du propriétaire du site — comparaison du `sub` OIDC à une variable d'env
`AUTH_LINKEDIN_ALLOWED_SUB` dans le callback `signIn`, avant toute création de session. Stratégie de
session en JWT, sans adaptateur de base de données. Ce choix est motivé en partie par un objectif
futur (non construit ici) de publication automatique des articles sur LinkedIn : une connexion
LinkedIn pour l'admin donne naturellement accès au token nécessaire plus tard, sans devoir ajouter
un second mécanisme d'auth. Le scope OAuth demandé aujourd'hui (`openid profile email`) n'inclut pas
`w_member_social`, qui appartient à un produit API LinkedIn séparé nécessitant sa propre revue
d'app — à obtenir quand cette fonctionnalité sera réellement construite. Le token LinkedIn n'est pas
conservé dans le cookie de session JWT (risque de dépasser la limite de taille d'un cookie) ; son
stockage durable est laissé à plus tard.

`middleware.ts` protège `/admin/:path*` par redirection si non connecté. Cette admin est le premier
cas réel où le site peut produire un 401/403, ce qui rend la prémisse de l'ADR 0010 (« rien ne peut
les déclencher ») obsolète pour cette zone — une ADR 0012 dédiée documentera la résolution retenue
au moment de la PR qui implémente l'authentification.

**Format** : Markdown, pas de MDX ni d'éditeur WYSIWYG, pour réutiliser tel quel le pipeline
`react-markdown`/`@tailwindcss/typography` déjà en place pour `/docs`.

**Hors périmètre** : l'éclatement de `content/profile.ts` anticipé par l'ADR 0006 n'est pas fait
ici — les articles vivent dans `content/blog/*.md` via un lecteur filesystem dédié, pas dans des
objets TypeScript, donc `profile.ts` n'a pas besoin d'être touché pour ce ticket.

## Conséquences

Nouvelles dépendances : `next-auth` (`@beta`), `@octokit/rest`, `gray-matter` (voir
`docs/dependencies.md`). Nouvelles variables d'env Vercel à créer hors repo : `AUTH_SECRET`,
`AUTH_LINKEDIN_ID`, `AUTH_LINKEDIN_SECRET`, `AUTH_LINKEDIN_ALLOWED_SUB`, `GITHUB_CONTENT_TOKEN`
(Production uniquement) — et une app LinkedIn Developer Portal à enregistrer manuellement, avec un
redirect URL exact par environnement (`https://brunoschvartz.dev/api/auth/callback/linkedin` et
l'équivalent `localhost:3000` pour le dev local ; les previews Vercel en `*.vercel.app` ne peuvent
pas être pré-enregistrées, donc le login LinkedIn n'est testable qu'en local ou en production).

En contrepartie du choix « tout dans le repo Git » : publier un article a la même latence qu'un
déploiement (~60-90s, pas d'écriture instantanée comme avec une base de données), et passe par la
même CI que n'importe quel commit humain — si le build casse, le Deployment Check (0009) garde
l'ancien déploiement en ligne malgré le commit de l'admin, ce qui doit être communiqué clairement
dans l'UI de publication plutôt que de laisser croire que l'article est en ligne dès le commit
envoyé.

Le travail est séquencé en plusieurs PRs distinctes (une par concern) : cette ADR et le scaffolding
de `docs/dependencies.md` d'abord, puis le modèle de contenu (`lib/blog.ts`), puis l'authentification
(avec l'ADR 0012), puis l'éditeur admin, puis les pages publiques et leur intégration SEO
(`sitemap.ts`, métadonnées).
