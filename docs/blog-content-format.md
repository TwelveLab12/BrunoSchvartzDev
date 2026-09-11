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
---
Le corps de l'article, en Markdown, après le second `---`.
```

| Champ       | Type                     | Obligatoire | Détail                                                                                                                                                                                                 |
| ----------- | ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`     | `string`                 | oui         | Titre affiché partout (liste, article, metadata `<title>`).                                                                                                                                            |
| `date`      | `string` (`YYYY-MM-DD`)  | oui         | Date de publication. Sert aussi de tri (`getAllPosts()` trie par date décroissante).                                                                                                                   |
| `updatedAt` | `string` (`YYYY-MM-DD`)  | non         | Mise à jour par l'admin à chaque enregistrement ; retombe sur `date` si absent.                                                                                                                        |
| `tags`      | `string[]`               | non         | Vide par défaut. Affichés en badges sur `/blog` et `/blog/[slug]` (voir issue #23).                                                                                                                    |
| `excerpt`   | `string`                 | non         | Vide par défaut. Utilisé comme description sur la liste et dans les métadonnées Open Graph.                                                                                                            |
| `status`    | `"draft" \| "published"` | non         | `draft` par défaut si absent. Seuls les articles `published` sont rendus publiquement et inclus dans `app/sitemap.ts` — un brouillon reste en 404 sur son URL publique même si le fichier existe déjà. |

Le corps du fichier (tout ce qui suit le frontmatter) est du Markdown brut, rendu via
`react-markdown` — le même pipeline que `docs/` (ce fichier inclus), sans
`dangerouslySetInnerHTML`.

## Différence avec `docs/`

`docs/*.md` (ces pages-ci) n'a pas de frontmatter : son titre est extrait du premier `# titre` du
fichier par une regex (`lib/docs.ts`). Ça suffit pour de la documentation libre, mais un article
de blog a besoin de champs structurés (`status`, `tags`, `date`) qu'une regex ne peut pas fournir
de façon fiable — d'où le frontmatter YAML dédié pour `content/blog/`.
