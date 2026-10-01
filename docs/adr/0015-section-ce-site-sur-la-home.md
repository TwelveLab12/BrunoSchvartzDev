# 0015 — Section « Ce site » sur la home, avec lien mis en avant vers /docs

**Statut** : Acceptée — prolonge [0013](./0013-lien-docs-discret-depuis-le-footer.md)

## Contexte

[0013](./0013-lien-docs-discret-depuis-le-footer.md) n'autorisait vers `/docs` qu'un lien texte
« sobre et sans mise en avant » dans le footer, le header et le hero restant sans lien. Sa mise à
jour du 2026-09-21 assume déjà `/docs` comme une vitrine publique et curatée.

Le site vise d'abord des recruteurs pour des postes de développeur front-end senior. Sa propre
construction (contenu centralisé, CV imprimable rendu depuis la même source, rendu statique, blog
sans CMS, CI qui conditionne la mise en production, décisions documentées) est une preuve technique
vérifiable — mais rien ne la montrait sur la home. Pour un recruteur technique, les ADR publiés sont
justement un des contenus les plus parlants.

## Décision

Une section « Ce site » (`components/home/site-case.tsx`, texte dans `content/profile.ts`) est
ajoutée dans le corps de la home, entre Recommandations et Contact, avec une entrée dans le menu.
Elle présente le site comme un cas d'étude en points factuels, chacun vérifiable dans le dépôt
public, et propose deux boutons : « Lire les décisions d'architecture » vers `/docs` (bouton
principal) et « Voir le code sur GitHub » vers le dépôt.

Le nombre d'ADR affiché est calculé au build depuis `docs/adr/` (`getAdrCount()` dans
`lib/docs.ts`), pour ne jamais se désynchroniser du dossier.

Inchangé : le header et le hero restent sans lien direct vers `/docs` ; les pages `/docs` restent
`noindex, nofollow` et hors `sitemap.xml` (0007) ; le lien discret du footer (0013) est conservé.

## Conséquences

`/docs` devient découvrable depuis le corps de la home, avec une mise en avant assumée, ce qui
remplace la restriction « sans mise en avant » de 0013 pour cette section. Le contenu de `/docs`
devient donc éditorialement exposé : il doit rester soigné et sans configuration opérationnelle,
comme déjà prévu par la mise à jour de 0013 et par
[0014](./0014-admin-production-et-local-uniquement.md).
