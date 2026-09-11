# 0009 — La CI GitHub Actions bloque la promotion en production sur Vercel

**Statut** : Acceptée

## Contexte

Par défaut, Vercel construit et promeut un déploiement de production sur `brunoschvartz.dev` à chaque push sur `main`, indépendamment du résultat du workflow CI (`.github/workflows/ci.yml`). Un commit qui casse le typecheck, le lint ou le build pourrait donc théoriquement finir en ligne si le déploiement Vercel réussissait quand même sur un état incohérent, ou si la CI échouait après coup sans que personne ne s'en rende compte.

## Décision

Le job `build` de `.github/workflows/ci.yml` rapporte son statut à Vercel via `vercel/repository-dispatch/actions/status@v1`, sous le nom `Vercel - bruno_schvartz_dev: ci`. Ce nom est enregistré côté Vercel dans _Settings → Deployment Checks_, ce qui bloque l'alias du domaine de production tant que ce check n'est pas vert. Le job déclare `permissions: statuses: write`, requis pour que l'action puisse écrire un commit status (non accordé par défaut par `GITHUB_TOKEN`).

## Conséquences

Un déploiement de production existe toujours en tant que build, mais n'est aliasé sur `brunoschvartz.dev` qu'après confirmation que typecheck, lint et build sont passés sur le commit correspondant — évite qu'un état cassé remplace silencieusement le site en ligne. En échange, la configuration du check lui-même (le nom à sélectionner dans les réglages Vercel) vit dans le dashboard Vercel, pas dans ce dépôt : si le nom du job ou le libellé passé à `name:` change dans `ci.yml`, il faut penser à mettre à jour la sélection côté Vercel en conséquence.
