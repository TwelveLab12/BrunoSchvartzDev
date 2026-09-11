# 0001 — Consigner les décisions d'architecture

**Statut** : Acceptée

## Contexte

Le projet évolue par petites itérations, souvent avec l'aide d'un agent IA. Sans trace écrite, le raisonnement derrière un choix (pourquoi pnpm plutôt que npm, pourquoi Tailwind v4 sans bibliothèque de composants) se perd dès que la conversation qui l'a produit disparaît.

## Décision

Consigner les décisions structurantes sous forme d'ADR (Architecture Decision Record), au format standard (Nygard/MADR : Statut, Contexte, Décision, Conséquences), un fichier par décision dans `docs/adr/`, numéroté séquentiellement.

## Conséquences

Chaque changement de cap majeur nécessite une ADR à jour. En échange, le projet reste compréhensible sans relire tout l'historique de commits ou de conversation.
