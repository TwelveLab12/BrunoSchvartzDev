# 0004 — pnpm comme gestionnaire de paquets

**Statut** : Acceptée

## Contexte

Besoin d'installations reproductibles et rapides, dans un environnement de développement (WSL) où plusieurs projets JavaScript coexistent et partagent souvent les mêmes dépendances.

## Décision

pnpm, avec la version figée dans le champ `packageManager` de `package.json`, et `pnpm-workspace.yaml` pour approuver explicitement les scripts de build des dépendances natives (ex. `unrs-resolver`) qu'un gestionnaire de paquets bloque par défaut pour des raisons de sécurité.

## Conséquences

Installation plus rapide et déterministe qu'avec npm/yarn, grâce à un store de paquets partagé entre projets sur la machine. En échange, `node_modules` repose sur des liens symboliques : l'éditeur doit être réellement connecté à l'environnement WSL (Remote-WSL) pour les résoudre correctement, sous peine de faux positifs TypeScript/ESLint.
