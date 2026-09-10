export const profile = {
  name: "Bruno Schvartz",
  role: "Développeur front-end React",
  location: "Lyon 3e — France",
  availability: "Disponible immédiatement — Lyon, sur site, hybride ou à distance",
  intro:
    "Développeur professionnel depuis 2008 : d'abord PHP, puis Laravel à partir de 2016. Depuis cinq ans, entièrement tourné vers le front — React et TypeScript. En agence, j'ai été seul responsable du développement et de la maintenance d'un parc applicatif complet, de l'architecture front à l'API Laravel qui l'alimente. L'agence a cessé son activité : je suis disponible immédiatement.",
  email: "bruno.schvartz@gmail.com",
  phone: "06 23 80 88 39",
  phoneHref: "tel:+33623808839",
  linkedin: "https://www.linkedin.com/in/bruno-schvartz",
  github: "https://github.com/TwelveLab12",
  website: "https://brunoschvartz.dev",
  websiteLabel: "brunoschvartz.dev",
} as const;

export const stackGroups = [
  {
    label: "01 — Front-end",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Inertia.js",
      "Zustand",
      "TanStack Query",
      "Vite",
      "React Hook Form",
      "Cypress",
      "Playwright",
    ],
  },
  {
    label: "02 — Style & UI",
    items: ["Tailwind", "SCSS", "MUI", "Ant Design", "Radix UI", "Figma"],
  },
  {
    label: "03 — Back & workflow",
    items: [
      "Laravel",
      "API REST",
      "Mercure",
      "MySQL",
      "PostgreSQL",
      "Docker",
      "Git",
      "ESLint",
      "Prettier",
      "GitHub Actions",
      "PHPUnit",
      "PHPStan",
      "Larastan",
      "Sanctum",
      "JWT",
      "Laravel Resources",
    ],
    note: "Certifié Laravel — 2021",
  },
] as const;

/** Note affichée à côté du libellé « Cas d'étude » : la page n'en montre que deux. */
export const caseStudiesNote =
  "Deux projets détaillés — le parc applicatif en comptait bien davantage.";

export const caseStudies = [
  {
    name: "Ninkasi",
    meta: "2022 — 2026",
    summary:
      "Plateforme d'animation pour un réseau de restaurants : blind test en direct, carte des produits, agenda des événements. Trois briques — backoffice Nova, couche Laravel/Inertia, et deux applications front.",
    scope:
      "Mon périmètre : les deux applications front React et leur intégration Inertia. Backoffice Nova et développement back-end assurés par le reste de l'équipe.",
    tags: ["React", "TypeScript", "MUI", "Inertia.js", "Mercure", "Laravel"],
    highlights: [
      {
        label: "Interface game master",
        body: "Console permettant à un employé de piloter un blind test en direct, connectée au backoffice Laravel via Inertia.",
      },
      {
        label: "Temps réel multi-acteurs",
        body: "Blind test synchronisé entre les joueurs en salle et le game master via Mercure. Application accessible uniquement par QR code, géolocalisée par restaurant et volontairement non référencée.",
      },
      {
        label: "Carte produits — écran & PDF",
        body: "Rendu dynamique de la carte depuis l'API, en version mobile et en PDF imprimable — mise en page fidèle à des contraintes graphiques fortes.",
      },
    ],
  },
  {
    name: "Medikiosk",
    meta: "2024 — 2026",
    summary:
      "Application de borne interactive en environnement médical, devant rester pleinement opérationnelle sans connexion réseau. React + Vite.",
    tags: ["React", "TypeScript", "Vite", "DexieDB", "Service Worker"],
    highlights: [
      {
        label: "Synchronisation locale",
        body: "Couche de persistance sur DexieDB (IndexedDB) garantissant la cohérence et la reprise des données en mode déconnecté.",
      },
      {
        label: "Refonte du service worker",
        body: "Réécriture complète de la stratégie de cache et du cycle de mise à jour, pour un fonctionnement fiable de la borne sur le long terme.",
      },
    ],
  },
] as const;

export const experience = [
  {
    company: "WEB-ID — Lyon",
    role: "Développeur React / Laravel",
    period: "2018 — 2026",
    body: "Pivot vers React en octobre 2021 au sein d'une équipe de trois, puis rôle de référent technique unique sur l'ensemble du parc applicatif jusqu'à la fermeture de l'agence.",
  },
  {
    company: "BrandBirds — Lyon",
    role: "Senior Web Application Developer",
    period: "2017 — 2018",
    body: "Back-office Laravel et API REST alimentant les applications mobiles BrandBirds et BrandBirdsBiz.",
  },
  {
    company: "CPAM Meurthe-et-Moselle",
    role: "Développeur web",
    period: "2008 — 2016",
    body: "Conception et déploiement d'outils métiers pour les agents. Stage de fin d'études transformé en CDI, huit ans sur le poste.",
  },
] as const;

/** Contenu de la feuille CV imprimée (voir components/cv-print.tsx). Une page A4. */
export const cv = {
  headline: "Développeur front-end React · TypeScript",
  contact: [
    "Lyon, France",
    "06 23 80 88 39",
    "bruno.schvartz@gmail.com",
    "linkedin.com/in/bruno-schvartz",
    "brunoschvartz.dev",
  ],
  profil:
    "Développeur depuis 2008 — PHP, puis Laravel à partir de 2016 — et spécialisé React / TypeScript depuis cinq ans. Référent technique unique d'un parc applicatif en agence, de l'architecture front à l'API Laravel. Disponible immédiatement suite à la fermeture de l'agence ; recherche un CDI à Lyon : sur site, hybride ou à distance.",
  jobs: [
    {
      title: "Développeur front-end React — WEB-ID",
      meta: "2018 — 2026",
      body: "React / TypeScript sur l'ensemble des projets clients à partir d'octobre 2021. Passé d'une équipe de trois à référent technique unique : responsabilité totale du développement et de la maintenance du parc applicatif. Architectures Laravel et API REST jusqu'en 2021.",
    },
    {
      title: "Senior Web Application Developer — BrandBirds",
      meta: "2017 — 2018",
      body: "Back-office Laravel et API REST des applications mobiles BrandBirds et BrandBirdsBiz.",
    },
    {
      title: "Développeur web — CPAM Meurthe-et-Moselle",
      meta: "2008 — 2016",
      body: "Outils métiers pour les agents de la caisse (PHP/Laravel, back-office et API). Stage de fin d'études devenu CDI, huit ans sur le poste.",
    },
  ],
  projectsNote: "Sélection — détail complet sur demande.",
  projects: [
    {
      title: "Ninkasi",
      meta: "React · TypeScript · MUI · Inertia · Mercure",
      body: "Plateforme d'animation pour un réseau de restaurants : console de pilotage de blind test en direct et application de salle accessible par QR code, synchronisation temps réel via Mercure, carte produits rendue depuis l'API en mobile et en PDF imprimable.",
    },
    {
      title: "Medikiosk",
      meta: "React · TypeScript · Vite · DexieDB",
      body: "Borne interactive fonctionnant hors connexion : persistance et cohérence des données en local sur DexieDB (IndexedDB), refonte complète du service worker.",
    },
  ],
  skills: [
    {
      label: "Front",
      value: "React, Next.js, TypeScript, Inertia.js, Zustand, TanStack Query, Vite",
    },
    { label: "UI", value: "Tailwind CSS, SCSS, MUI, Ant Design, intégration Figma" },
    {
      label: "Back & outils",
      value: "Laravel (API REST), Mercure, PostgreSQL, MySQL, Docker, Git",
    },
  ],
  education: [
    { title: "Certification Laravel", meta: "2021" },
    { title: "Développeur web, AFPA Pompey (Bac+2)", meta: "2008" },
  ],
  languages: "Français, natif · Anglais technique : documentation et échanges écrits courants.",
} as const;
