---
title: "Les outils d'abord, l'IA au-dessus : le kit qui tient la qualité de mes projets"
date: "2026-11-14"
updatedAt: "2026-11-14"
tags:
  - ia
  - qualité
  - outillage
  - méthode
excerpt: >-
  Mes projets partent désormais tous du même socle : claude-kit, un plugin
  Claude Code qui installe et maintient leur outillage qualité. Ce qui garantit
  la qualité, ce ne sont pas les consignes données à l'IA, mais des outils qui
  tournent sans elle. Retour sur six semaines d'itérations, sur les limites du
  kit et sur la suite.
status: draft
---

Il y a deux mois, j'expliquais [pourquoi je me forme sérieusement à l'IA](/blog/autoformation-ia),
avec une conviction : on peut aller vite avec un agent de codage sans sacrifier la qualité. Voici
ce que ça donne concrètement aujourd'hui, à travers l'outil qui structure maintenant mes projets :
**claude-kit**.

## D'où vient le kit

Dans [l'étude de cas de dnd-character-manager](/projets/dnd-character-manager), je décrivais deux
socles : un dépôt modèle pour l'outillage, et le `CLAUDE.md` de ce site pour les procédures. Je les
recopiais à la main d'un projet à l'autre, et ils dérivaient : une correction faite dans un projet
n'atteignait jamais les autres.

Fin septembre, je les ai réunis dans un plugin Claude Code.
[claude-kit](https://github.com/TwelveLab12/claude-kit) crée un projet Next.js/TypeScript en me
demandant quels modules installer, ou équipe un projet existant. Surtout, il le **maintient** :
quand le kit évolue, une commande de synchronisation applique la nouvelle version au projet. Né de
ce site et de deux autres projets, il équipe aujourd'hui deux applications.

## Les outils d'abord

Le kit installe des outils que n'importe quelle équipe front connaît :

- **TypeScript** en mode strict, qui refuse le code mal typé avant même qu'il tourne ;
- **ESLint**, avec les règles d'accessibilité `jsx-a11y` en mode strict, et **Prettier** pour le
  formatage ;
- **Husky** et lint-staged, qui contrôlent les fichiers modifiés avant chaque commit ;
- **Vitest** et Testing Library pour les tests unitaires, **Playwright** et axe-core pour les tests
  de bout en bout et d'accessibilité, sur le build de production ;
- une **CI GitHub Actions** qui rejoue tout à chaque push, et qui bloque la mise en production sur
  Vercel si une étape échoue ;
- **Dependabot** pour les mises à jour de dépendances.

Aucun de ces outils ne dépend de l'IA, et c'est un choix écrit dans une décision d'architecture du
kit : une alerte importante doit exister sous une forme qui tourne sans IA (CI, hook, test,
script). Les consignes données à Claude la complètent, elles ne la remplacent pas. Concrètement, si
je ferme Claude Code demain, la CI bloque toujours une pull request qui casse le typecheck.

Le kit s'applique la même règle. Toute sa partie mécanique (copier les fichiers, comparer les
versions, générer la CI) est un script Node déterministe, testé sans Claude, et une règle qu'on ne
peut pas tester en CI n'a pas sa place dans ce script.

## Claude au-dessus

Où est l'IA, alors ? Au-dessus des outils, pas à leur place. Je résume les rôles ainsi : **les
outils jugent, Claude exécute et orchestre, je décide.**

Claude écrit le code, mais il fait aussi tourner la méthode autour. Il ouvre l'issue GitHub avec
son label et la place sur le board, crée la branche, lance les vérifications avant la pull request
puis l'ouvre en la liant à l'issue. Quand le kit change de version, il lit le rapport de
synchronisation et m'explique ce qui change pour le projet. Un agent dédié relit chaque
modification d'interface contre la grille d'accessibilité RGAA, pour ce que les outils
automatiques ne savent pas juger.

Ces couches propres à l'IA me font gagner du temps, mais elles restent un confort : ce qui
garantit la qualité, c'est ce qui tourne en CI. Et une partie du travail reste la mienne : cadrer
le besoin, trancher l'architecture dans des ADR, relire chaque pull request, décider du merge.

## Itérer : sur le kit, puis par l'usage

Le kit a connu treize versions en six semaines, de la 0.1.0 à la 0.11.0. Beaucoup partent d'un
problème rencontré dans un projet. Le tri de ces retours est écrit dans le kit : si un projet a dû
contourner le kit, c'est un bug du kit, à corriger tout de suite ; si le problème est propre au
projet, il y reste, et ne devient candidat pour le kit que lorsqu'un deuxième projet le rencontre.
Cette règle évite de généraliser trop tôt.

Deux exemples montrent ce que seul l'usage révèle.

**Le test de focus.** Le kit fournit un test qui vérifie, à chaque tabulation, que l'élément qui
reçoit le focus clavier est visible. Sa première version passait dès qu'un style changeait : un
anneau de focus à 1,96:1 de contraste passait, bien en dessous des 3:1 demandés par les WCAG. Je
l'ai durci pour qu'il mesure réellement le contraste de l'indicateur (0.8.0). Puis, sur
dnd-character-manager, ce test plus strict a rejeté un bouton conforme : il lisait l'indicateur
dans les coins arrondis, là où le lissage affaiblit le contraste. Il le lit désormais entre les
arrondis (0.11.0). Durcir un contrôle produit aussi des faux positifs, et c'est un vrai projet qui
les fait apparaître.

**La synchronisation.** Les premières versions mettaient un projet à jour en écrasant ses
fichiers. Tant que le projet n'y touchait pas, tout allait bien ; dès qu'il en adaptait un, la mise
à jour suivante effaçait son travail. J'ai suspendu les synchronisations le temps de corriger. La
0.6.0 compare maintenant trois versions de chaque fichier : ce que le kit avait écrit, ce que le
projet en a fait, et ce que le kit propose. Elle n'écrit que ce que le projet n'a pas touché, et
signale le reste au lieu de l'écraser.

En parallèle, un **canary** génère chaque lundi un projet neuf avec tous les modules, sur les
dernières versions de Next.js et des outils, et vérifie qu'il passe toute la CI. Chaque version a
son entrée dans le changelog, qui dit à chaque projet ce qui change pour lui et s'il y a une action
à faire.

## Pourquoi je ne le conseille pas

claude-kit est [public](https://github.com/TwelveLab12/claude-kit), mais je ne le recommande pas
pour un besoin général, et son README le dit.

D'abord, il est en **alpha** : version 0.x, un seul mainteneur, et une version mineure peut encore
demander une action manuelle dans un projet. Une partie du travail de fiabilisation reste ouverte.

Ensuite, il est **taillé pour mes besoins**. Son socle suppose une application Next.js à la racine
du dépôt, et il reflète mes choix : pnpm, Vercel pour le déploiement, un board GitHub Projects,
l'accessibilité lue sur la grille RGAA. Ce mélange du général et du spécifique est identifié : un
chantier prévoit de séparer la mécanique, la méthode, un socle TypeScript sans Next et des profils
de stack ([#40](https://github.com/TwelveLab12/claude-kit/issues/40)). Il attend un projet qui en
ait besoin.

Ce qui se transpose, ce sont les principes, et ils n'ont rien de propre à l'IA : TypeScript
strict, l'analyse statique, une CI qui bloque, une issue par tâche et une pull request par sujet,
des décisions documentées dans des ADR. N'importe quelle équipe peut les appliquer, avec ou sans
agent.

## Les chantiers à venir

**L'écoconception et le poids des pages.** Le kit n'encadre aujourd'hui ni l'un ni l'autre : rien
n'empêche une dépendance lourde ou une image de plusieurs mégaoctets. Le futur module suivra le
modèle de l'accessibilité : un ADR d'abord, avec le RGESN (référentiel général d'écoconception de
services numériques) comme grille de lecture, puis un test Playwright de budget sur le build de
production, page par page : poids transféré, nombre de requêtes, taille du DOM. Une page plus
légère a moins à télécharger et à afficher, donc elle se charge aussi plus vite
([#58](https://github.com/TwelveLab12/claude-kit/issues/58)).

**La sécurité.** Passer le kit en public m'a fait relire son dépôt à la main : l'historique à la
recherche de secrets, les workflows GitHub, des réglages comme la détection de secrets, la
licence. C'est exactement le genre de vérification qu'un module sécurité devrait porter, sous une
forme qui tourne sans IA. Son périmètre n'est pas encore décidé : il sera cadré par un ADR, comme
les autres ([#64](https://github.com/TwelveLab12/claude-kit/issues/64)).

## La suite

Le kit n'est pas fini, et ne le sera probablement jamais : chaque projet qui l'utilise le corrige
un peu, et c'est justement l'intérêt. La qualité ne repose pas sur un prompt bien écrit, mais sur
des outils qui vérifient, une méthode écrite, et une boucle qui corrige l'outillage à chaque défaut
trouvé.

Si cette façon de travailler correspond à ce que vous cherchez pour une équipe front-end, mes
coordonnées sont [juste ici](/#contact).
