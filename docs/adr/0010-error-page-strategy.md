# 0010 — Stratégie de gestion des erreurs : le trio standard Next.js, rien de plus

**Statut** : Acceptée

## Contexte

Le site n'a ni authentification ni route API : rien dans le code ne peut produire un 401, un 403 ou un 500 applicatif. Seuls deux cas sont réellement atteignables : une route qui n'existe pas (404), et une erreur JavaScript inattendue au rendu (React qui plante côté client).

## Décision

Utiliser uniquement les trois conventions de fichiers de l'App Router de Next.js, stylées avec le vocabulaire visuel existant (`ButtonLink`, tokens de couleur, échelle typographique du hero) :

- `app/not-found.tsx` — 404, déclenché par une route inconnue ou un appel explicite à `notFound()` (déjà utilisé dans `app/docs/[...slug]/page.tsx` pour un slug de documentation inexistant).
- `app/error.tsx` — erreur runtime dans une page, avec un bouton « Réessayer » (`reset()`).
- `app/global-error.tsx` — filet de secours si le layout racine lui-même plante ; volontairement minimal et auto-suffisant (pas de police custom, pas de composant complexe), puisqu'il doit rester fonctionnel même si la cause du crash vient d'ailleurs dans l'arbre.

Aucune page 401/403/500 sur-mesure : rien dans le site ne peut les déclencher aujourd'hui, les construire serait du code mort.

## Conséquences

Toute page ou route future ajoutée hérite automatiquement de ces trois filets sans configuration supplémentaire. Si le site gagne un jour une route API ou un formulaire avec traitement serveur (voir ADR 0002), il faudra alors réévaluer si un 500 ou 401 dédié devient pertinent.
