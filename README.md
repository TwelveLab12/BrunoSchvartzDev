# Bruno Schvartz — portfolio

[![CI](https://github.com/TwelveLab12/BrunoSchvartzDev/actions/workflows/ci.yml/badge.svg)](https://github.com/TwelveLab12/BrunoSchvartzDev/actions/workflows/ci.yml)

Mon site de présentation et mon CV, en ligne sur **[brunoschvartz.dev](https://brunoschvartz.dev)**.

Je suis développeur front-end React / TypeScript. Ce dépôt est aussi un exemple concret de ma façon de travailler : un petit produit, mené comme un vrai projet, avec ses choix documentés.

**English —** My personal site and CV, live at [brunoschvartz.dev](https://brunoschvartz.dev). I'm a front-end developer (React / TypeScript). This repository doubles as a worked example of how I build and run a small product: documented decisions, automated quality gates, accessibility as a requirement. The documentation is in French; the summary below is in both languages.

## Ce que contient le projet / What's inside

- **Un site statique** : pages prérendues, pas de base de données, hébergement Vercel. / _A static site: pre-rendered pages, no database._
- **Un CV imprimable** : pas de PDF à maintenir, il est généré à partir du même contenu que la page web. / _A printable CV built from the same content as the web page, so there is no PDF to keep in sync._
- **Un blog avec espace d'administration** : réservé au propriétaire (connexion LinkedIn), les articles sont des fichiers Markdown commités dans ce dépôt. / _A blog with an owner-only admin; posts are Markdown files committed to this repo._

## Ce que ça démontre / What it shows

- **Simplicité d'exploitation** : le rendu statique garde le coût et la surface d'attaque au minimum. Une seule zone est dynamique, l'administration. / _Static rendering keeps cost and attack surface low; only the admin area is dynamic._
- **Une source de vérité pour le contenu** : le texte du site, du CV et les chiffres affichés viennent d'un seul fichier ou sont calculés au build, jamais recopiés à la main. / _One source of truth for content; derived figures are computed at build time._
- **Accessibilité comme exigence** : cible WCAG 2.2 AA et RGAA, vérifiée par le lint, un contrôle axe-core en CI et une checklist manuelle. / _Accessibility as a requirement: WCAG 2.2 AA / RGAA target, enforced by lint, axe-core in CI and a manual checklist._
- **Qualité automatisée** : TypeScript strict, ESLint, et une CI qui bloque la mise en production tant qu'elle n'est pas verte. / _Strict TypeScript, ESLint, and a CI that gates production deploys._
- **Décisions tracées** : chaque choix structurant a son [ADR](docs/adr) (contexte, décision, conséquences). / _Each structural choice is recorded as an Architecture Decision Record._

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Vercel · GitHub Actions

Le rôle de chaque dépendance est expliqué dans [`docs/dependencies.md`](docs/dependencies.md).

## Pour aller plus loin / Going further

- [`docs/adr/`](docs/adr) — les décisions d'architecture. / _Architecture decisions._
- [`docs/contributing.md`](docs/contributing.md) — lancer le projet en local, structure du code, environnements, déploiement. / _Running locally, code layout, environments, deployment._
- [`CLAUDE.md`](CLAUDE.md) — les conventions de travail suivies sur ce dépôt (issues, branches, PR, accessibilité), utilisées avec Claude Code. / _The working conventions for this repo, used with Claude Code._

## Contact

[LinkedIn](https://www.linkedin.com/in/bruno-schvartz) · [brunoschvartz.dev](https://brunoschvartz.dev) · bruno.schvartz@gmail.com

## Licence / License

Voir [`LICENSE`](LICENSE). / See [`LICENSE`](LICENSE).
