# Format des fichiers Markdown du blog

Chaque article du blog est un fichier `content/blog/<slug>.md`, lu par `lib/blog.ts` côté public
(rendu statique de `/blog` et `/blog/[slug]`) et par `lib/github-content.ts` côté admin (lecture
live via l'API GitHub pour `/admin`). Voir `docs/adr/0011-blog-admin-architecture.md` pour la
décision d'architecture derrière ce choix (Markdown versionné dans le repo, pas de base de
données).

## Nom de fichier = slug

Le nom du fichier (sans l'extension `.md`) est l'identifiant de l'article, utilisé dans son URL
publique (`/blog/<slug>`) et dans l'admin (`/admin/posts/<slug>`). Renommer le fichier change
donc son URL.

## Frontmatter

Chaque fichier commence par un bloc YAML (délimité par `---`), parsé par **gray-matter** :

```yaml
---
title: "Titre de l'article"
date: "2026-09-11"
updatedAt: "2026-09-11"
tags: ["ia", "autoformation"]
excerpt: "Résumé affiché dans la liste des articles et dans les métadonnées OG."
status: "draft"
pinnedOrder: 1
---
Le corps de l'article, en Markdown, après le second `---`.
```

| Champ         | Type                     | Obligatoire | Détail                                                                                                                                                                                                                                                                    |
| ------------- | ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`                 | oui         | Titre affiché partout (liste, article, metadata `<title>`).                                                                                                                                                                                                               |
| `date`        | `string` (`YYYY-MM-DD`)  | oui         | Date de publication. Sert aussi de tri (`getAllPosts()` trie par date décroissante).                                                                                                                                                                                      |
| `updatedAt`   | `string` (`YYYY-MM-DD`)  | non         | Mise à jour par l'admin à chaque enregistrement ; retombe sur `date` si absent.                                                                                                                                                                                           |
| `tags`        | `string[]`               | non         | Vide par défaut. Affichés en badges sur `/blog` et `/blog/[slug]` (voir issue #23).                                                                                                                                                                                       |
| `excerpt`     | `string`                 | non         | Vide par défaut. Utilisé comme description sur la liste et dans les métadonnées Open Graph.                                                                                                                                                                               |
| `status`      | `"draft" \| "published"` | non         | `draft` par défaut si absent. Seuls les articles `published` sont rendus publiquement et inclus dans `app/sitemap.ts` — un brouillon reste en 404 sur son URL publique même si le fichier existe déjà.                                                                    |
| `pinnedOrder` | `number`                 | non         | Absent par défaut (non épinglé). Les articles portant ce champ s'affichent toujours en premier sur `/blog`, triés par `pinnedOrder` croissant ; le reste suit par date décroissante comme d'habitude. Un badge « Épinglé » s'affiche alors sur `/blog` et `/blog/[slug]`. |

## Pièges courants

- **Dates entre guillemets.** `date: 2026-09-21` sans guillemets est lu par YAML comme un objet
  `Date`, pas comme une chaîne : le tri et l'affichage attendent une chaîne `YYYY-MM-DD`. Toujours
  écrire `date: "2026-09-21"` (idem pour `updatedAt`).
- **Le résumé s'appelle `excerpt`.** Un champ `description` est ignoré : la liste `/blog` et les
  métadonnées Open Graph ne lisent que `excerpt`.
- **Pas de `# Titre` dans le corps.** La page article affiche déjà `title` en `<h1>` ; commencer le
  corps directement par du texte ou un `##`.
- **Tags en minuscules**, sans variante d'écriture d'un article à l'autre (`autoformation`, pas
  `auto-formation`), pour rester cohérent avec les badges déjà affichés.

`date`, `updatedAt` et `tags` sont aussi exposés dans les métadonnées Open Graph de l'article
(`article:published_time`, `article:modified_time`, `article:tag`).

Le corps du fichier (tout ce qui suit le frontmatter) est du Markdown brut, rendu via
`react-markdown` — le même pipeline que `docs/` (ce fichier inclus), sans
`dangerouslySetInnerHTML`.

## Différence avec `docs/`

`docs/*.md` (ces pages-ci) n'a pas de frontmatter : son titre est extrait du premier `# titre` du
fichier par une regex (`lib/docs.ts`). Ça suffit pour de la documentation libre, mais un article
de blog a besoin de champs structurés (`status`, `tags`, `date`) qu'une regex ne peut pas fournir
de façon fiable — d'où le frontmatter YAML dédié pour `content/blog/`.
