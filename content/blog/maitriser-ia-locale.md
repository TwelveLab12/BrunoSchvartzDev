---
title: "Maîtriser l'IA en local : un parcours d'initiation en 7 niveaux"
date: "2026-09-21"
updatedAt: "2026-09-21"
tags:
  - ia
  - llm
  - lm-studio
  - autoformation
  - écologie
excerpt: >-
  Un parcours ludique, pas à pas, pour comprendre et faire tourner une IA sur
  son propre ordinateur, avec LM Studio, et mesurer son impact réel.
status: draft
---

Ce parcours prolonge [ma démarche d'autoformation à l'IA](/blog/autoformation-ia). Utiliser une IA en ligne, tout le monde sait faire. La faire tourner **sur son propre ordinateur**, la comprendre, la régler, mesurer ce qu'elle consomme : voilà un excellent moyen de la maîtriser vraiment.

Il est conçu comme un petit jeu : des niveaux courts, une mission par niveau et une condition de victoire claire. Pas de prérequis technique, seulement de la curiosité.

## Les règles du jeu

- **Un seul niveau à la fois.** On passe au suivant seulement après la victoire.
- **Des sessions courtes**, de 15 minutes à 1 heure selon le niveau, deux ou trois par semaine. Le parcours tient en environ quatre semaines.
- **Un carnet de bord** (un simple fichier texte) : à la fin de chaque niveau, notez une phrase sur ce que vous avez appris et une surprise.
- **L'erreur fait partie du jeu.** Tout est gratuit, réversible et sans enjeu.

## Ce qu'il vous faut

- Un ordinateur récent. Le plus confortable est une carte graphique avec 8 à 16 Go de mémoire vidéo (VRAM), ou un Mac Apple Silicon avec au moins 16 Go de mémoire. Sans cela, vous pourrez tout de même essayer de petits modèles, plus lentement.
- **[LM Studio](https://lmstudio.ai/)**, un logiciel gratuit pour télécharger et utiliser des modèles d'IA en local. Choisissez l'application « LM Studio » classique : « Bionic », proposé à côté, est une application distincte, orientée agents, que l'on verra en bonus.
- Environ 20 à 40 Go d'espace disque pour les modèles.

> Le domaine évolue vite. Les noms de modèles cités ci-dessous sont des exemples : vérifiez dans le catalogue de LM Studio ce qui est disponible au moment où vous suivez ce parcours, et consultez la licence de chaque modèle.

## Les niveaux

### Niveau 0 : Le déclic _(15 min, sans installation)_

**Mission :** comprendre ce qu'est un modèle de langage. Il prédit le mot suivant, à partir de _tokens_, avec des _paramètres_ qui encodent ce qu'il a appris et un _contexte_ qui est sa mémoire de travail.

**Victoire :** vous savez l'expliquer en trois phrases à un proche.

### Niveau 1 : Votre première IA locale _(40 min)_

**Mission :** installer LM Studio, télécharger un petit modèle (par exemple un modèle de 4 milliards de paramètres) et lui poser trois questions.

**Victoire :** vous **coupez votre connexion Internet** et l'IA répond toujours. Elle est bien chez vous.

### Niveau 2 : Grand, petit, comprimé _(40 min)_

**Mission :** poser la même question à un petit modèle, puis à un modèle plus grand (autour de 14 milliards de paramètres). Ouvrir le gestionnaire de tâches (Windows) ou le Moniteur d'activité (Mac) pour voir la mémoire se remplir. Découvrir la **quantification**, qui compresse un modèle pour qu'il tienne en mémoire (Q4, Q8…).

**Victoire :** vous savez dire pourquoi un modèle tient dans votre machine et un autre non.

### Niveau 3 : Les boutons magiques _(45 min)_

**Mission :** jouer avec la **température** (créativité), la **longueur de contexte** et le **message système** (les consignes de fond). Lancer la même consigne à température 0 puis à température élevée et comparer.

**Victoire :** vous prédisez l'effet d'un réglage avant de le tester.

### Niveau 4 : L'art de demander _(45 min)_

**Mission :** transformer un prompt vague en prompt précis, avec un rôle, un contexte, un format attendu et un exemple. Faire des avant/après sur une vraie tâche de votre quotidien.

**Victoire :** vous avez trois prompts « recettes » réutilisables dans votre carnet.

### Niveau 5 : Le laboratoire écolo _(1 h)_

**Mission :** mesurer la puissance consommée pendant une génération. Sur une carte NVIDIA, la commande suivante affiche la puissance chaque seconde :

```bash
nvidia-smi --query-gpu=power.draw --format=csv -l 1
```

Sur un Mac Apple Silicon, `sudo powermetrics --samplers cpu_power,gpu_power -i 1000` joue le même rôle.

Calculez ensuite l'énergie d'une réponse : `Wh = watts moyens × durée en secondes ÷ 3600`. Comparez plusieurs modèles, puis, sur une carte NVIDIA, refaites la mesure en limitant la puissance à environ 70 % (`nvidia-smi -pl`, avec des droits administrateur).

> Ces commandes ne mesurent que la carte graphique (ou la puce), pas le reste de la machine : processeur, ventilation, alimentation. Vos chiffres sont donc un plancher. Une prise avec wattmètre donne la consommation complète.

**Victoire :** vous obtenez votre propre tableau de mesures : tokens par seconde, watts et Wh par réponse.

### Niveau 6 : Piéger l'IA _(45 min)_

**Mission :** essayer un modèle de raisonnement, avec un effort de réflexion faible puis élevé (si le modèle propose ce réglage), et chercher ses failles : fausses citations, calculs erronés, assurance mal placée.

**Victoire :** vous avez trouvé au moins deux « hallucinations » et vous savez les repérer.

### Boss final : le duel local contre cloud _(1 h)_

**Mission :** choisir cinq vraies tâches de votre quotidien, les confier à votre modèle local et à un assistant en ligne, puis comparer la qualité et le temps. Notez aussi, pour chaque tâche, ce qu'elle contient de sensible : c'est souvent la confidentialité qui tranche.

Côté énergie, vous avez mesuré le local au niveau 5. Celle du cloud ne se mesure pas de chez soi : elle ne peut qu'être estimée à partir de chiffres publiés par les fournisseurs.

**Victoire :** vous rédigez votre règle d'usage personnelle : ce que vous confiez au local, ce que vous confiez au cloud, et pourquoi.

## Bonus

- Utiliser le serveur local de LM Studio depuis un petit script.
- Faire dialoguer l'IA avec vos propres documents.
- Découvrir les agents (par exemple avec LM Studio Bionic) et comprendre pourquoi ils consomment davantage qu'un simple chat.

## Un mot sur l'impact écologique

Le local n'est pas automatiquement plus écologique que le cloud, et l'inverse n'est pas acquis non plus. Un centre de données mutualise et optimise ses machines. Votre ordinateur consomme aussi à vide, et la mesure du niveau 5 n'en voit qu'une partie.

Ce qui est sûr : plus un modèle est gros, plus chaque réponse coûte en énergie. Le vrai levier est de choisir le plus petit modèle qui fait le travail, et de ne pas laisser un gros modèle chargé pour rien. Le niveau 5 vous permet de le vérifier par vous-même, chiffres à l'appui.

## Conclusion

À la fin du parcours, vous saurez installer, régler, mesurer et évaluer une IA locale, et surtout décider quand elle est le bon outil. C'est cela, maîtriser l'IA de façon professionnelle : comprendre ce que l'on utilise.

Bon jeu !

Si cette démarche — comprendre, mesurer, documenter — correspond à ce que vous cherchez pour une équipe front-end, mes coordonnées sont [juste ici](/#contact).
