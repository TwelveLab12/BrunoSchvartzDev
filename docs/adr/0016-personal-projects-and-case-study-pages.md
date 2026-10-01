# 0016 — Section « Projets personnels » et pages d'étude de cas

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
  carte par projet : nom, période, accroche, tags, trois chiffres clés, points forts, et les boutons
  « Voir la démo », « Étude de cas » et « Code source ».
- **Une page statique par projet** sur `/projets/[slug]`, avec `generateStaticParams`, des
  métadonnées et une URL canonique. Elle déroule l'étude de cas en sections et ajoute un lien vers
  les ADR du projet. Les pages figurent dans `sitemap.xml`.
- **Le contenu vit dans `content/projects.ts`**, premier fichier issu de la scission de
  `content/profile.ts` prévue par 0006. Il est typé (`Project`), et ajouter un projet revient à
  ajouter une entrée au tableau `projects`.
- Les chiffres d'un projet externe (ADR, tests, PR) ne peuvent pas être calculés au build comme
  `getAdrCount()` (0015) : ils sont saisis, et la page affiche la date de leur relevé.
- La capture d'écran (`cover`) est optionnelle. La carte et la page s'affichent sans elle.

## Conséquences

- Le CV imprimé n'est pas modifié : ses « Projets choisis » restent des projets professionnels.
- Mettre à jour les chiffres d'un projet demande une modification de `content/projects.ts`, avec
  la date de relevé correspondante.
- Le lien « Voir la démo » du gestionnaire D&D pointe vers `/?demo=1`, qui charge des personnages
  d'exemple dans un navigateur vierge (ADR 0072 de ce dépôt-là).
