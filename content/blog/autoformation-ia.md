---
title: 'L''opportunité que je me donne : une autoformation sérieuse à l''IA'
date: '2026-09-11'
updatedAt: '2026-09-11'
tags:
  - ia
  - autoformation
  - carrière
  - qualité
excerpt: >-
  La fermeture de mon agence ferme une page, mais elle m'ouvre aussi un temps
  rare : celui de me former en profondeur à l'IA professionnelle, et de tester
  de nouvelles briques techniques avec la même exigence de qualité que sur mes
  projets clients.
status: published
---

Mon agence a cessé son activité. Je suis développeur front-end depuis 2008, React/TypeScript
depuis cinq ans, et j'étais devenu l'unique référent technique front après le départ de mes deux
collègues — jusqu'à ce que la structure s'arrête. Je suis disponible immédiatement, et je
cherche un poste. Mais avant de se précipiter, ce moment est aussi une occasion rare : du temps
dégagé, sans sprint ni ticket client, pour investir sérieusement dans une compétence que je
n'avais jusqu'ici pratiquée qu'en pointillé.

Cette compétence, c'est la maîtrise professionnelle de l'IA — pas son usage superficiel, mais une
expertise réelle, au même niveau d'exigence que celui que je mets dans mon métier de développeur.

## Pourquoi l'IA, et pas "juste" une techno de plus

Une nouvelle librairie front s'apprend en quelques jours et se périme en quelques années. L'IA est
différente : elle change déjà la façon dont le code se produit, se relit, se documente. Rester à
un usage de surface — copier-coller des réponses d'un chatbot — revient à ne pas vraiment la
maîtriser. Mon objectif est d'en devenir un utilisateur expert, capable de l'intégrer à un vrai
flux de travail professionnel, avec la même rigueur que sur n'importe quel projet client.

## Le plan de formation

Plutôt qu'une liste de lectures, je préfère structurer cette autoformation autour de cas d'usage
concrets — et j'ai la chance d'avoir déjà un terrain d'expérimentation réel : le développement de
ce blog (pour commencer j'ai déjà pas mal d'autres idées de petit projet), avec l'aide de Claude Code, m'a servi de premier exercice grandeur réelle.

**1. Travailler avec un agent de codage, pas seulement lui parler.** Plan mode pour trancher une
architecture avant d'écrire une ligne de code, sous-agents pour explorer ou challenger une
conception, mémoire persistante d'une session à l'autre, outils connectés (GitHub, Vercel, CI).
C'est exactement ce qui vient de se passer ici : avant de coder l'admin de ce blog, on a d'abord
comparé CMS headless, base de données et stockage Git — posé et documenté dans l'ADR 0011 — *puis*
seulement construit. Apprendre à utiliser ces outils sérieusement, pas en mode gadget.

**2. Le développement assisté par IA avec une vraie discipline de qualité.** C'est le point sur
lequel je veux être intraitable, parce que c'est aussi ce qui différencie un usage amateur d'un
usage professionnel : une décision d'architecture se documente (ADR pour les curieux, toute la documentation du projet est accessible ici: [brunoschvartz.dev/docs](https://brunoschvartz.dev/docs)), un changement reste
typecheck/lint/build clean avant tout commit, une PR traite un seul sujet, la documentation suit
le code plutôt que de prendre du retard. Sur ce blog : 5 PRs séparées (architecture, modèle de
contenu, authentification, éditeur, pages publiques), une CI qui bloque la mise en prod si un
check échoue, deux ADR écrites en cours de route. Rien d'exceptionnel en soi — c'est juste la même
rigueur qu'un projet client, appliquée avec l'IA comme collaborateur plutôt que comme simple
générateur de texte.

**3. Comprendre les protocoles qui connectent les agents aux outils.** MCP (Model Context
Protocol) en particulier : c'est littéralement ce qui a permis à l'agent de consulter les
déploiements Vercel ou d'interagir avec GitHub pendant qu'on construisait ce blog. Comprendre ce
qui se passe sous le capot plutôt que de rester utilisateur passif d'une intégration.

**4. Construire des fonctionnalités IA, pas seulement les consommer.** Function calling, sorties
structurées, RAG, évaluation de la qualité d'une réponse générée — le sujet naturel à creuser
ensuite pour un développeur React/Next.js est le **Vercel AI SDK** : il permet d'intégrer ces
capacités directement dans mes propres applications, dans un stack que je maîtrise déjà.

**5. Garder l'esprit critique.** Savoir quand un résultat généré doit être vérifié, challengé,
ou rejeté. Le choix du stockage Git plutôt qu'une base de données pour ce blog, par exemple,
n'était pas la suggestion par défaut — c'est une décision qu'on a comparée et tranchée ensemble,
sur la base du contexte réel du projet (site perso, usage unique, coût nul souhaité). L'IA
propose, mais la décision reste humaine.

## Le terrain de jeu technique

En parallèle de l'IA elle-même, je veux profiter de ce temps pour tester en profondeur des
briques que je n'ai utilisées qu'en surface ou jamais :

- **shadcn/ui, Radix UI, Tailwind** — ce site utilise déjà Tailwind et un pattern de variantes
  typées (`class-variance-authority`) très proche de l'esprit shadcn/ui. L'étape naturelle est de
  pousser ça plus loin sur un vrai projet d'admin ou de dashboard.
- **Zod** — la validation des données reste aujourd'hui assez artisanale dans l'éditeur
  d'articles de ce blog (`app/admin/posts/actions.ts`) : un excellent premier terrain d'essai
  concret pour une validation typée de bout en bout.
- **Supabase, Neon** — déjà évalués en amont de ce blog comme alternatives possibles au stockage
  Git (voir l'ADR 0011), mais jamais mis en œuvre pour de vrai. L'occasion de les pratiquer sur
  un prochain projet où une vraie base de données a du sens.

Quelques pistes supplémentaires que je veux explorer, dans la continuité directe de ces choix :

- **Drizzle** ou **Prisma** — l'ORM typé qui complète naturellement Supabase/Neon et s'articule
  bien avec Zod.
- **Vercel AI SDK** — déjà mentionné plus haut, le pont naturel entre mon stack React/Next.js et
  la construction de vraies fonctionnalités IA.
- **Serveurs MCP personnalisés** — écrire mon propre serveur MCP serait un excellent exercice
  pratique pour comprendre ce protocole de l'intérieur plutôt qu'en spectateur.

## Une démarche, pas juste une liste de technos

Ce qui compte pour moi n'est pas de cocher une liste de librairies, mais de prouver — à moi-même
d'abord, à un futur employeur ensuite — qu'on peut aller vite avec l'IA sans sacrifier la qualité :
des décisions documentées, un code qui passe les mêmes vérifications qu'en entreprise, une
discipline de commits et de revue. Ce blog, sa propre construction, et les articles qui vont
suivre, sont la preuve par l'exemple de cette démarche.

La suite : un article plus technique sur l'ADR 0011 elle-même, et sans doute un autre sur mes
premiers pas avec le Vercel AI SDK.
