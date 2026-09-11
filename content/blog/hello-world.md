---
title: 'Hello, world'
date: '2026-09-11'
updatedAt: '2026-09-11'
tags:
  - meta
excerpt: >-
  Premier article de test, validant la chaîne de lecture content/blog →
  lib/blog.ts.
status: published
---

Ceci est un article de test pour valider `lib/blog.ts` de bout en bout : lecture du frontmatter,
extraction du corps Markdown, filtrage par statut. Il reste en `draft` et ne sera donc jamais
retourné par `getAllPosts()` sans `includeDrafts: true` — il n'a pas vocation à être publié tel
quel, seulement à prouver que le modèle de contenu fonctionne avant de construire l'éditeur admin
(PR suivante) par-dessus.
