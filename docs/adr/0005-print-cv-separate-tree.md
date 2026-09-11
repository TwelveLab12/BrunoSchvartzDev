# 0005 — Feuille CV imprimée comme arbre séparé, activé par media query

**Statut** : Acceptée

## Contexte

Le CV imprimable doit respecter une mise en page A4 stricte (marges en millimètres, filets, une seule page), incompatible avec la mise en page fluide de la page web.

## Décision

Deux arbres React rendus simultanément dans `app/page.tsx` : les sections web (`components/home/*`) et la feuille CV (`components/cv-print.tsx`), affichés en alternance via `hidden` / `print:block` en CSS (`@media print` dans `app/globals.css`), plutôt qu'un composant conditionnel piloté par un état JavaScript.

## Conséquences

L'impression fonctionne sans JavaScript — juste une media query — donc fiable même si l'hydratation React échoue. En échange, le contenu de la feuille CV existe en permanence dans le DOM de la page web (masqué, pas supprimé) : le nom du CV est un `<p>` plutôt qu'un `<h1>`, pour ne garder qu'un seul titre de niveau 1 sur la page (celui du hero).
