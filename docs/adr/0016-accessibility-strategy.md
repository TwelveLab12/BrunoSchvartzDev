# 0016 — Stratégie accessibilité : lint strict, vérification CI non bloquante, pas de déclaration publique

**Statut** : Acceptée

## Contexte

Le socle a11y du projet se limitait jusqu'ici à ce qu'`eslint-config-next` active par défaut (6
règles `jsx-a11y` en `warn`). Un audit (WCAG 2.2 AA, avec le RGAA 4.1.2 comme grille de lecture —
le site vise le marché français) a montré que l'analyse statique seule ne couvre ni le contraste,
ni l'ordre de focus, ni la sémantique réelle du rendu, et a trouvé plusieurs non-conformités (lien
d'évitement absent, landmarks mal placés, focus perdu dans le menu mobile, listes non sémantiques,
cibles tactiles trop petites...).

## Décision

Trois couches, aucune suffisante seule :

1. **Lint statique** (`eslint.config.mjs`) : le preset `strict` d'`eslint-plugin-jsx-a11y` (33
   règles), en erreur dès l'activation — pas de période de transition en `warn`, le code actuel n'a
   qu'un seul faux positif (`components/ui/button.tsx`, documenté par un commentaire
   `eslint-disable-next-line`). Fait partie de `lint:ci`, donc bloque déjà la mise en production
   (`docs/adr/0009-vercel-deployment-checks.md`).
2. **Vérification sur le rendu en CI** (axe-core + Playwright, job `a11y` séparé — introduit dans
   une PR suivante) : couvre ce que le lint ne voit pas (contraste calculé, focus visible, ordre du
   DOM) sur un échantillon de pages. Délibérément **non rapporté à Vercel** : reste informatif tant
   qu'il n'a pas tourné sans faux positif pendant plusieurs semaines ; le rendre bloquant amenderait
   cette ADR.
3. **Checklist manuelle** (`docs/accessibility.md`, introduite dans une PR suivante) : ce que ni le
   lint ni axe ne peuvent vérifier — clavier seul, lecteur d'écran, zoom, impression. À la charge du
   propriétaire du site, pas automatisable.

Référentiel : WCAG 2.2 AA, avec le RGAA 4.1.2 (aligné WCAG 2.1 ; le RGAA 5, attendu fin 2026,
alignera sur WCAG 2.2) comme grille de lecture pour le marché français visé.

**Explicitement hors périmètre** : pas d'audit RGAA formel (outil Ara de la DINUM ou équivalent) et
pas de déclaration d'accessibilité publiée. Le site n'y est pas soumis légalement (ni organisme
public, ni entreprise de plus de 250 M€ de CA, ni service visé par la directive européenne
Accessibilité de 2025). Publier un niveau de conformité engagerait le nom du propriétaire sur une
affirmation qu'aucun audit formel n'a vérifiée, pour un bénéfice qui ne justifie pas ce risque sur
un site personnel. L'objectif ici est un code réellement plus accessible, pas un document de
conformité.

## Conséquences

Le lint et, une fois en place, la CI protègent contre la régression dès leur introduction ; les
non-conformités déjà identifiées (lien d'évitement, landmarks, focus du menu mobile, listes de
sémantique, cibles tactiles, `prefers-reduced-motion`...) se corrigent ensuite dans des PR dédiées,
une par sujet, étiquetées `accessibility` en plus de leur label de type habituel. Si l'usage du
site dépassait un jour la présentation personnelle actuelle (par exemple facturer des prestations
en ligne), revoir l'exemption légale et la décision de ne pas publier de déclaration.
