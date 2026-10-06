/**
 * Projets personnels : une carte par projet sur la home, une page d'étude de cas sur
 * `/projets/[slug]`. Ajouter un projet = ajouter une entrée à `projects`. Séparé de
 * `profile.ts`, comme l'annonçait docs/adr/0006 — voir docs/adr/0017.
 *
 * Tant que `projects` est vide, ni la section de la home ni son lien de menu ne s'affichent.
 */
export const personalProjects = {
  label: "Projets personnels",
  title: [
    { text: "Du code " },
    { text: "à ouvrir", emphasis: true },
    { text: " : démo en ligne, dépôt public." },
  ],
  lede: "Les projets d'agence restent confidentiels. Ceux-ci sont publics de bout en bout : l'application se teste dans le navigateur, le code et chaque décision se lisent sur GitHub.",
  links: {
    demo: "Voir la démo",
    repository: "Code source",
    caseStudy: "Étude de cas",
    adr: "Décisions d'architecture",
    back: "Projets personnels",
  },
  /** Libellés des chiffres relevés sur le dépôt GitHub du projet (lib/project-stats.ts). */
  figureLabels: { adr: "ADR", pullRequests: "pull requests fusionnées" },
  figuresNote: "Chiffres relevés sur GitHub à chaque mise en ligne du site.",
  galleryLabel: "Aperçu de l'application",
} as const;

export type ProjectSection = {
  title: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export type Screenshot = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  /** Une phrase, pour la carte de la home et la description SEO. */
  tagline: string;
  meta: string;
  tags: readonly string[];
  /** `repository` est l'URL GitHub du dépôt : les chiffres clés en sont déduits au build. */
  links: { demo: string; repository: string; adr: string };
  /** Capture affichée sur la carte et en tête de l'étude de cas (chemin sous `public/`). */
  cover?: Screenshot;
  /** Autres captures, affichées avec leur légende sous l'en-tête de la page détail. */
  gallery?: readonly (Screenshot & { caption: string })[];
  highlights: readonly { label: string; body: string }[];
  sections: readonly ProjectSection[];
};

export const projects: readonly Project[] = [
  {
    slug: "dnd-character-manager",
    name: "Gestionnaire de personnage D&D",
    tagline:
      "Fiches de personnage Donjons & Dragons 5e portées en application : un moteur de règles métier qui calcule la fiche au lieu de la stocker, utilisable hors ligne à la table de jeu.",
    meta: "Depuis septembre 2026",
    tags: ["Next.js 16", "React 19", "TypeScript strict", "Zustand", "Zod", "Vitest", "PWA"],
    links: {
      demo: "https://dnd.brunoschvartz.dev/?demo=1",
      repository: "https://github.com/TwelveLab12/dnd-character-manager",
      adr: "https://github.com/TwelveLab12/dnd-character-manager/blob/main/docs/architecture.md",
    },
    cover: {
      src: "/projects/dnd-character-manager/liste-personnages.webp",
      alt: "Liste de quatre personnages de niveau 3 (clerc, barbare, moine et druide), chacun avec sa classe d'armure, ses points de vie et un bouton Jouer.",
      width: 570,
      height: 356,
    },
    gallery: [
      {
        src: "/projects/dnd-character-manager/hud-combat.webp",
        alt: "Fiche en mode jeu : bouclier de classe d'armure 18, anneau de 23 points de vie, initiative, vitesse, emplacements de sorts et Canalisation divine.",
        width: 508,
        height: 769,
        caption:
          "Le mode jeu : classe d'armure, points de vie, initiative, ressources de classe et armes prêtes, tout se lit d'un coup d'œil.",
      },
      {
        src: "/projects/dnd-character-manager/caracteristiques.webp",
        alt: "Onglet Caractéristiques : six caractéristiques avec leurs modificateurs, le bonus de maîtrise et la liste des compétences.",
        width: 511,
        height: 736,
        caption:
          "Les caractéristiques et les compétences, avec des modificateurs calculés à partir des scores et de la maîtrise.",
      },
      {
        src: "/projects/dnd-character-manager/attaque-guidee.webp",
        alt: "Panneau du marteau de guerre : une attaque de 10 au toucher et 4 dégâts contondants, détaillés dé par dé et bonus par bonus.",
        width: 446,
        height: 332,
        caption:
          "L'attaque guidée : le jet, le total et le détail du calcul, avec « Pourquoi ? » pour voir d'où vient chaque bonus.",
      },
    ],
    highlights: [
      {
        label: "Moteur de règles",
        body: "Classe d'armure, attaques, sauvegardes, points de vie, emplacements de sorts : tout ce qui se déduit des règles est calculé par des fonctions pures, jamais saisi.",
      },
      {
        label: "Données versionnées",
        body: "Stockage local derrière un repository pattern, avec des migrations de format qui font évoluer les données des joueurs sans rien perdre.",
      },
      {
        label: "Décisions tracées",
        body: "Chaque choix structurant fait l'objet d'un ADR ; chaque évolution passe par une pull request et une CI verte.",
      },
    ],
    sections: [
      {
        title: "Le besoin",
        paragraphs: [
          "Les fiches de personnage de ma table de jeu vivaient dans un tableur Google Sheets. Pratique pour noter, beaucoup moins pour appliquer des règles qui dépendent à la fois de la classe, du niveau et de l'équipement, et peu lisible sur un téléphone en pleine partie.",
          "L'objectif : une application que chaque joueur ouvre sur son téléphone pendant la partie, qui applique les règles à sa place et fonctionne même sans réseau.",
        ],
      },
      {
        title: "Un moteur de règles plutôt qu'un formulaire",
        paragraphs: [
          "Le principe directeur : toute valeur dérivable des paramètres du personnage est calculée, jamais stockée. Seuls les choix du joueur et sa consommation de ressources sont persistés.",
        ],
        points: [
          "Registres déclaratifs de classes, sous-classes, races et dons : ajouter une option revient à ajouter une entrée, pas à modifier l'interface.",
          "Fonctions pures et testées pour la classe d'armure, les attaques d'armes, les sauvegardes, l'initiative, les points de vie maximums et les emplacements de sorts.",
          "Chaque règle appliquée automatiquement est listée en clair dans la fiche, pour que le joueur comprenne d'où vient chaque chiffre.",
        ],
      },
      {
        title: "Persistance et évolution des données",
        paragraphs: [
          "Pas de back-end dans cette première version : les données vivent dans le navigateur, derrière un repository pattern qui permettra de brancher une API sans toucher aux écrans.",
        ],
        points: [
          "Formats de stockage versionnés, avec une migration à chaque évolution du modèle : les fiches existantes sont converties au chargement, jamais perdues.",
          "Import et export JSON validés par Zod, avec un aperçu ligne par ligne (nouveau, mise à jour, identique, invalide) avant d'écrire quoi que ce soit.",
          "Service worker pour un usage hors ligne, et application installable sur mobile.",
        ],
      },
      {
        title: "Une interface pensée pour la table de jeu",
        paragraphs: [
          "Deux modes distincts : la configuration, où l'on construit le personnage, et le jeu, où l'on ne fait que consulter et consommer. En mode jeu, un HUD de combat reste visible en permanence : classe d'armure, points de vie, ressources de classe.",
          "Viennent ensuite les mécaniques de partie : attaque guidée pas à pas, jets contre la mort, épuisement, repos courts et longs, forme sauvage du druide, historique des actions et journal de session.",
        ],
      },
      {
        title: "Qualité et méthode",
        paragraphs: [
          "Le projet part d'un socle que j'ai formalisé dans un dépôt modèle : TypeScript strict, ESLint, Prettier, hooks de pré-commit, Vitest et Testing Library, et une CI qui enchaîne typecheck, lint, tests et build à chaque push.",
          "Je développe avec un agent IA (Claude Code). Mon rôle : cadrer le besoin, trancher l'architecture, rédiger les ADR, relire chaque pull request et tenir le niveau d'exigence. Les tests, la CI et les ADR rendent ce travail vérifiable par n'importe qui.",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
