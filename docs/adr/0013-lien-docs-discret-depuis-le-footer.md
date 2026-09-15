# 0013 — Lien discret vers /docs depuis le footer de la home

**Statut** : Acceptée — amende [0007](./0007-docs-section-noindexed.md)

## Contexte

ADR 0007 interdisait tout lien vers `/docs` depuis le header, le hero ou le footer de la home, pour
ne pas exposer cette section technique à un recruteur qui découvre le site. Avec le recul, cette
absence totale de lien rend `/docs` injoignable sans connaître l'URL ou passer par le dépôt GitHub,
ce qui est plus restrictif que nécessaire : un lien discret n'attire pas l'attention d'un recruteur
pressé, mais reste utile pour un visiteur plus technique (un autre développeur, un recruteur tech).

## Décision

Un lien texte simple vers `/docs`, sobre et sans mise en avant, est ajouté dans la barre de pied de
la section Contact de la home (`components/home/contact.tsx`), au même niveau visuel que la mention
du rôle/de la localisation déjà présente à cet endroit. Le header et le hero restent sans aucun lien
vers `/docs`, conformément à 0007. Le reste de 0007 est inchangé : `/docs` demeure exclue du
`sitemap.xml` et marquée `noindex, nofollow`.

## Conséquences

`/docs` devient découvrable depuis la home sans être mise en avant — un visiteur doit dérouler la
page jusqu'au footer pour la trouver. Le référencement et le propos éditorial de la home restent
protégés comme prévu par 0007.
