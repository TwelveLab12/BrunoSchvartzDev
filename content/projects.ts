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
    adr: "Lire les ADR",
    back: "Projets personnels",
  },
  /** Libellés des chiffres relevés sur le dépôt GitHub du projet (lib/project-stats.ts). */
  figureLabels: { adr: "ADR", pullRequests: "pull requests fusionnées" },
  figuresNote: "Chiffres relevés sur GitHub à chaque mise en ligne du site.",
} as const;

export type ProjectSection = {
  title: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

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
  cover?: { src: string; alt: string; width: number; height: number };
  highlights: readonly { label: string; body: string }[];
  sections: readonly ProjectSection[];
};

export const projects: readonly Project[] = [];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
