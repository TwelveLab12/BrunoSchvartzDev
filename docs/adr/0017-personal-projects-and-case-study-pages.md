# 0017 — Section « Projets personnels » et pages d'étude de cas

**Statut** : Acceptée — applique la scission annoncée par [0006](./0006-centralized-content.md)

## Contexte

La section « Cas d'étude » présente deux projets d'agence (Ninkasi, Medikiosk). Ils sont
confidentiels : ni démo, ni code, ni lien. Les projets personnels ont l'inverse à offrir : une
application testable dans le navigateur, un dépôt public et des ADR. C'est la preuve la plus
directe pour un recruteur technique. D'autres projets suivront, et l'emplacement doit donc
accueillir plusieurs entrées sans réorganiser la home à chaque ajout.

Une étude de cas complète (besoin, choix techniques, persistance, qualité, méthode) est trop longue
pour la home, qui doit rester lisible en quelques secondes.

## Décision

- **Une section home « Projets personnels »** (`components/home/projects.tsx`, ancre
  `#projets-perso`), placée juste après « Cas d'étude » et présente dans le menu. Elle affiche une
  carte par projet : nom, période, accroche, tags, chiffres clés, points forts, et les boutons
  « Voir la démo », « Étude de cas » et « Code source ». Les liens s'ouvrent dans le même onglet,
  comme ceux de « Ce site ».
- **Une page statique par projet** sur `/projets/[slug]`, avec `generateStaticParams`, des
  métadonnées et une URL canonique. Elle déroule l'étude de cas en sections et ajoute un lien vers
  les ADR du projet. Les pages figurent dans `sitemap.xml`.
- **Le contenu vit dans `content/projects.ts`**, premier fichier issu de la scission de
  `content/profile.ts` prévue par 0006. Il est typé (`Project`), et ajouter un projet revient à
  ajouter une entrée au tableau `projects`.
- **Rien ne s'affiche sans projet** : tant que `projects` est vide, la section, son lien de menu et
  les pages détail sont absents.
- **Les chiffres clés ne sont pas saisis.** Ils sont lus au build sur le dépôt GitHub du projet
  (`lib/project-stats.ts` : nombre d'ADR dans `docs/adr/` et de pull requests fusionnées), comme le
  veut la règle des faits dérivés du `CLAUDE.md`. Si GitHub ne répond pas, par exemple faute de
  débit, le chiffre concerné disparaît : le site se construit quand même.
- La capture d'écran (`cover`) est optionnelle. La carte et la page s'affichent sans elle.

## Conséquences

- Le CV imprimé n'est pas modifié : ses « Projets choisis » restent des projets professionnels.
- Un build qui ne peut pas joindre GitHub publie des cartes sans chiffres, jusqu'au prochain
  déploiement. Un jeton de lecture (`GITHUB_CONTENT_TOKEN`, quand il est disponible) relève la
  limite de débit.
- Le nombre de tests d'un projet n'est pas affiché : il ne se déduit pas de l'API GitHub.
- La section et la page respectent la liste de contrôle d'accessibilité du `CLAUDE.md` (ADR 0016) :
  une liste pour les tags, une liste de définitions pour les chiffres, des niveaux de titres sans
  saut et `<main id="contenu">` sur la page détail.
