# 0009 — La CI GitHub Actions bloque la promotion en production sur Vercel

**Statut** : Acceptée

## Contexte

Par défaut, Vercel construit et promeut un déploiement de production sur `brunoschvartz.dev` à chaque push sur `main`, indépendamment du résultat du workflow CI (`.github/workflows/ci.yml`). Un commit qui casse le typecheck, le lint ou le build pourrait donc théoriquement finir en ligne si le déploiement Vercel réussissait quand même sur un état incohérent, ou si la CI échouait après coup sans que personne ne s'en rende compte.

## Décision

Le job `build` de `.github/workflows/ci.yml` rapporte son statut à Vercel via `vercel/repository-dispatch/actions/status@v1`, sous le nom `Vercel - bruno_schvartz_dev: ci`. Ce nom est enregistré côté Vercel dans _Settings → Deployment Checks_, ce qui bloque l'alias du domaine de production tant que ce check n'est pas vert. Le job déclare `permissions: statuses: write`, requis pour que l'action puisse écrire un commit status (non accordé par défaut par `GITHUB_TOKEN`).

## Conséquences

Un déploiement de production existe toujours en tant que build, mais n'est aliasé sur `brunoschvartz.dev` qu'après confirmation que typecheck, lint et build sont passés sur le commit correspondant — évite qu'un état cassé remplace silencieusement le site en ligne. En échange, la configuration du check lui-même (le nom à sélectionner dans les réglages Vercel) vit dans le dashboard Vercel, pas dans ce dépôt : si le nom du job ou le libellé passé à `name:` change dans `ci.yml`, il faut penser à mettre à jour la sélection côté Vercel en conséquence.

**Contrainte constatée le 18/11/2026 (#163)** : le workflow de `ci.yml` ne doit contenir qu'un seul job. À la fin du job, l'action liste les jobs du run et juge le premier, sans comparer son nom (`set-commit-status.ts` de vercel/repository-dispatch). Du 02/10/2026 (#103, job `a11y` ajouté au même workflow) au 18/11/2026, la porte a donc rapporté l'état du job `a11y` au lieu de celui du build ; elle a laissé passer en production un commit dont le build avait échoué. Tout autre contrôle vit dans son propre workflow (`a11y.yml`). Défaut connu en amont : vercel/repository-dispatch#15, ouvert depuis le 12/02/2026 ; la contrainte pourra être levée quand il sera corrigé.
