# Accessibilité — couverture RGAA et checklist de tests manuels

Ce document complète la stratégie d'accessibilité (`docs/adr/0016-accessibility-strategy.md`, ADR 0016) :
il dit **ce que les outils vérifient, ce qu'ils ne voient pas, et comment tester le reste à la main**,
gratuitement. Ce n'est **pas une déclaration de conformité** : le site n'y est pas soumis et ne
publie aucun niveau (voir l'ADR). « Aucune violation détectée par axe » ne veut pas dire « conforme ».

Référentiel : WCAG 2.2 AA, avec le RGAA 4.1.2 (aligné WCAG 2.1) comme grille de lecture. Les
nouveautés de WCAG 2.2 que le RGAA 4.1.2 ne couvre pas (focus non masqué, taille des cibles…) sont
suivies à part, dans la checklist de `CLAUDE.md`.

## Ce qui est automatisé

| Couche                                                               | Quand                                               | Ce qu'elle voit                                                                                                       | Ce qu'elle ne voit pas                                                                              |
| -------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Lint `jsx-a11y` (preset `strict`)                                    | pré-commit, `vrp lint`, CI (bloquant)               | attributs et rôles ARIA invalides, `alt` manquant, gestionnaires sans clavier, liens vides, `tabindex` positif        | le rendu réel : contraste, ordre de focus, landmarks calculés                                       |
| axe-core sur le site servi (`vrp a11y`, job CI `a11y`, non bloquant) | CI sur chaque PR ; en local après `build` + `start` | noms accessibles, landmarks, ordre des titres, `lang`, cibles, zones défilantes sans clavier, contraste du texte HTML | le texte et les tracés des schémas SVG, le focus réel, le lecteur d'écran, la pertinence des textes |

Pages couvertes par axe : accueil à 1280 px et à 320 px (menu fermé puis ouvert), liste du blog, un
article, l'index de `/docs` et **toutes** les pages de `/docs`, la 404. Le menu mobile ouvert est
testé ; de l'administration, seules `/admin/login` et `/admin/error` le sont (la liste et l'éditeur demandent
une session LinkedIn).

## Couverture RGAA 4.1.2 par thème

| Thème                    | Automatique                                         | Lecture du code                                                                                                              | Test manuel                                                                                                                                                               | Sur ce site                                                                                                   |
| ------------------------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1. Images                | `alt-text` (lint), axe `image-alt`                  | portrait informatif avec `alt`, avatars décoratifs en `alt=""`, icônes `aria-hidden`, schémas en `role="img"` + `aria-label` | pertinence des alternatives (1.3), description des schémas lue au lecteur d'écran                                                                                         | applicable                                                                                                    |
| 2. Cadres                | —                                                   | aucun `iframe`                                                                                                               | —                                                                                                                                                                         | non applicable (à revoir si un embed apparaît)                                                                |
| 3. Couleurs              | axe `color-contrast` (sauf SVG)                     | tokens de `app/globals.css` calculés                                                                                         | 3.1 (information par la couleur seule), contrastes au survol et au focus, texte des schémas                                                                               | applicable                                                                                                    |
| 4. Multimédia            | —                                                   | aucun audio ni vidéo                                                                                                         | —                                                                                                                                                                         | non applicable                                                                                                |
| 5. Tableaux              | axe (en-têtes de cellules)                          | un tableau Markdown dans la documentation, rendu avec `<th>` par `components/markdown.tsx`                                   | en-têtes de colonnes annoncés au lecteur d'écran                                                                                                                          | applicable (`/docs` seulement)                                                                                |
| 6. Liens                 | `anchor-is-valid` (lint), axe `link-name`           | intitulés explicites, liens à icône seule nommés                                                                             | intitulés compris hors contexte (liste des liens du lecteur d'écran) ; liens `target="_blank"` des profils LinkedIn sans mention de la nouvelle fenêtre : à arbitrer      | applicable                                                                                                    |
| 7. Scripts               | règles de gestionnaires (lint), axe `aria-*`        | menu mobile (`aria-expanded`, Échap, focus rendu au bouton), bouton d'impression, zones défilantes focalisables              | menu et schémas au clavier et au lecteur d'écran                                                                                                                          | applicable (peu de JavaScript)                                                                                |
| 8. Éléments obligatoires | axe `html-has-lang`, `document-title`, `valid-lang` | `lang="fr"`, un titre par route                                                                                              | pertinence des titres (8.6), validité HTML (8.2, validateur du W3C) ; changements de langue (8.7) : quelques intitulés de poste en anglais, sans `lang="en"` : à arbitrer | applicable                                                                                                    |
| 9. Structuration         | axe `heading-order`, `landmark-*`, `list`           | plan des titres, repères `banner` / `main` / `contentinfo`, listes réelles (tags, parcours, stack)                           | plan des titres et repères navigués au lecteur d'écran                                                                                                                    | applicable                                                                                                    |
| 10. Présentation         | axe `target-size`                                   | focus global visible, `prefers-reduced-motion`, cibles ≥ 24 px                                                               | zoom 200 % texte seul (10.4), reflow à 320 px (10.11), espacement du texte (10.12), focus visible partout (10.7)                                                          | applicable                                                                                                    |
| 11. Formulaires          | axe `label`                                         | aucun formulaire public (le contact est un lien `mailto:`)                                                                   | l'éditeur d'administration (labels, erreurs annoncées, focus)                                                                                                             | public : non applicable ; administration : applicable, corrigée sur un banc d'essai, jamais auditée connectée |
| 12. Navigation           | axe `bypass`, `skip-link`, `landmark-unique`        | lien d'évitement, navigations nommées                                                                                        | ordre de tabulation (12.8), pièges au clavier (12.9) ; deux systèmes de navigation (12.1) : à arbitrer                                                                    | applicable                                                                                                    |
| 13. Consultation         | —                                                   | aucune ouverture de fenêtre sans action, aucun contenu en mouvement, aucun geste complexe                                    | orientation de l'écran (13.9)                                                                                                                                             | applicable ; le CV passe par l'impression du navigateur, pas de fichier à télécharger                         |

Les mentions « à arbitrer » ne sont pas des défauts confirmés : ce sont des points où la lecture du
RGAA laisse une marge, à trancher en connaissance de cause (par exemple en testant au lecteur d'écran
la prononciation des intitulés en anglais).

## Checklist de tests manuels

À faire au fil des évolutions, à son rythme, sans date limite — surtout après un changement de
structure, de navigation ou de composant interactif. Environ deux heures pour tout passer une fois.

Outils gratuits utilisés : [NVDA](https://www.nvaccess.org/) (lecteur d'écran, Windows), Firefox et
Chrome avec leurs outils de développement, [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
(ou le sélecteur de couleur des DevTools), le [validateur HTML du W3C](https://validator.w3.org/).

### 1. Clavier seul (souris débranchée)

Parcourir la page avec Tab, Maj+Tab, Entrée, Espace, Échap et les flèches.

- Le premier Tab affiche « Aller au contenu principal » ; Entrée amène dans le contenu.
- Le focus est visible à chaque étape, jamais caché derrière l'en-tête collant (testé en priorité sous
  Safari, où `scroll-padding` agit moins bien sur le focus).
- L'ordre de tabulation suit l'ordre visuel ; aucun piège dont on ne peut sortir.
- Menu mobile (sous le point de rupture `xl`) : Entrée ou Espace ouvre ; Tab entre dans le panneau ;
  **Échap ferme et rend le focus au bouton « Menu »** ; après un lien du menu, le Tab suivant entre
  dans la section visée.
- Schémas des cas d'étude, blocs de code et tableaux de `/docs` : Tab atteint chaque zone, les
  flèches la font défiler.

### 2. Zoom 200 % et 400 %, reflow

- Zoom navigateur à 200 % puis 400 % (400 % ≈ 320 px de large) : pas de défilement horizontal de la
  **page**, rien de masqué ni de superposé. Les schémas, tableaux et blocs de code défilent dans leur
  propre zone : c'est voulu.
- Firefox, « Zoom texte seul », puis taille de police par défaut doublée : le texte reste lisible et
  rien ne se chevauche.
- Espacement du texte (bookmarklet « Text Spacing », ou styles utilisateur) : aucune perte de contenu.

### 3. Lecteur d'écran (NVDA, avec Firefox ou Chrome)

- Liste des titres (touche H / `NVDA+F7`) : plan cohérent, du `h1` aux `h3`/`h4`.
- Repères (touche D) : bannière, navigation « Navigation principale », contenu principal, pied de page.
- Bouton « Menu » : annoncé avec son état (réduit / développé), nom stable.
- Tags, parcours, stack : annoncés comme des listes (« liste de N éléments »).
- Schémas : la description (`aria-label`) est lue et décrit bien les relations entre les blocs.
- Tableau de `/docs/blog-content-format` : les en-têtes de colonnes sont annoncés cellule par cellule.
- Intitulés de poste en anglais : la prononciation est-elle gênante ? (voir « à arbitrer »).

### 4. Contraste

À mesurer, car axe ne le voit pas partout :

- États de survol et de focus (lien au survol : accent `#b4472a` sur le papier, 4,93:1).
- Le texte et les contours des **schémas** (axe ne les mesure pas) : texte ≥ 4,5:1, contours ≥ 3:1. Les
  valeurs mesurées sont notées dans le commentaire de `components/home/case-study-diagram.tsx`, à
  recalculer si l'on touche à leurs opacités ou à leurs couleurs.
- Tout nouveau token ou toute nouvelle paire de couleurs : texte ≥ 4,5:1, texte large et éléments
  d'interface ≥ 3:1.

### 5. Impression du CV

`Ctrl+P`, ou DevTools → Rendering → « Emulate CSS media type: print ».

- Une seule page A4 ; seule la feuille CV est imprimée, pas la page web.
- Les petits textes (7,6 à 8 pt) restent lisibles : le gris secondaire est à 5,63:1 sur blanc.
- Si le résultat est envoyé en PDF à un recruteur : le passer au vérificateur gratuit PAC
  (PDF Accessibility Checker) pour contrôler que le PDF est balisé.

### 6. Mouvement réduit

DevTools → Rendering → « Emulate CSS media feature `prefers-reduced-motion` » → `reduce`. Un clic sur un
lien d'ancre doit sauter à la destination, sans défilement animé.

### 7. HTML

Passer le HTML rendu d'une page (« Afficher le code source ») dans le validateur du W3C (RGAA 8.2).

## Ce que les outils ne voient pas

- Le **texte et les tracés des schémas SVG** : axe laisse leur contraste « à vérifier » (fond
  indéterminé) : il se calcule à la main.
- Le focus réel, l'ordre de tabulation et l'usage au lecteur d'écran : seuls les tests manuels ci-dessus
  les couvrent.
- La pertinence des textes (intitulés de liens, alternatives, titres de pages).
- L'usage tactile réel sur mobile.

## Écarts ouverts

- **Administration** : la liste et l'éditeur n'ont jamais été audités connectés (session LinkedIn) et ne
  sont pas couverts par axe. Reflow à 320 px, champs, focus et messages d'erreur ont été corrigés et
  mesurés sur un banc d'essai de l'éditeur rendu hors connexion ; à repasser à la main une fois connecté
  (clavier, lecteur d'écran).

## Tenir ce document à jour

- Toute évolution d'interface suit la checklist de `CLAUDE.md` (section « Accessibility checklist »).
- Quand un écart ouvert est corrigé, le retirer d'ici ; quand un test manuel révèle un défaut, en faire
  une issue (types `bug` ou `enhancement` + label `accessibility`) et l'ajouter ici tant qu'elle est ouverte.
- À revoir à la publication du RGAA 5 (attendue fin 2026), qui alignera le référentiel sur WCAG 2.2.
