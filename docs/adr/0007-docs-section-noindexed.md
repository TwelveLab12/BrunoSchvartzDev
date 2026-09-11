# 0007 — Documentation exposée sur le site, non indexée

**Statut** : Acceptée

## Contexte

Envie de rendre la documentation technique consultable directement en ligne, pas seulement dans le dépôt Git, sans la faire apparaître sur la page de présentation ni dans les résultats de recherche — ce n'est pas le contenu que doit voir un recruteur qui arrive sur le site.

## Décision

Section `/docs` (voir `app/docs/`), générée automatiquement depuis les fichiers Markdown du dossier `docs/` (y compris ses sous-dossiers, comme `docs/adr/`). Chaque page est exclue du `sitemap.xml` et marquée `noindex, nofollow`. Aucun lien vers `/docs` depuis le header, le hero ou le footer.

## Conséquences

La documentation reste accessible par lien direct sans polluer le référencement du profil ni son propos éditorial. En échange, elle n'est pas découvrable depuis la page d'accueil : il faut connaître l'URL `/docs` ou la retrouver via le dépôt GitHub.
