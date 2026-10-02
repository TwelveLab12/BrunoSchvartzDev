/**
 * Points de départ des deux durées affichées en Hero/CV (`profile.proofs`) et dans la
 * description SEO (`app/layout.tsx`). Recalculées au build par `yearsSince` ci-dessous — ne
 * jamais remplacer par un nombre d'années tapé en dur, qui se désynchroniserait dès l'année
 * suivante. CPAM Meurthe-et-Moselle (`experience`) pour 2008 ; pivot React chez WEB-ID
 * (« octobre 2021 », `experience`) pour 2021.
 */
export const CAREER_START_YEAR = 2008;
export const REACT_START_YEAR = 2021;

/** Durée en années entières depuis `startYear`, au moment du build (rendu statique — ADR 0002). */
export function yearsSince(startYear: number): number {
  return new Date().getFullYear() - startYear;
}

export const profile = {
  name: "Bruno Schvartz",
  role: "Développeur front-end React",
  location: "Lyon 3e — France",
  availability: "Disponible immédiatement — Lyon, sur site, hybride ou à distance",
  /** Titre du Hero, découpé pour mettre « senior » en valeur. */
  headline: {
    before: "Développeur front-end ",
    emphasis: "senior",
    after: ", React & TypeScript.",
  },
  /** Ligne de preuves affichée entre le titre et l'intro du Hero. Durées recalculées au build. */
  proofs: [
    { value: `${yearsSince(CAREER_START_YEAR)} ans`, label: "de développement web" },
    { value: `${yearsSince(REACT_START_YEAR)} ans`, label: "React / TypeScript" },
  ],
  intro:
    "J'architecture et je maintiens des applications React en production : temps réel, hors ligne, interfaces métier. Seul référent front de mon agence ces dernières années, avec un solide bagage back-end Laravel qui facilite le dialogue avec les équipes API.",
  email: "bruno.schvartz@gmail.com",
  phone: "06 23 80 88 39",
  phoneHref: "tel:+33623808839",
  linkedin: "https://www.linkedin.com/in/bruno-schvartz",
  github: "https://github.com/TwelveLab12",
  repository: "https://github.com/TwelveLab12/BrunoSchvartzDev",
  website: "https://brunoschvartz.dev",
  websiteLabel: "brunoschvartz.dev",
} as const;

/**
 * Section Stack, sur deux niveaux : les technos du quotidien en grand, puis le reste au second
 * plan. Le back-end s'affiche en ligne de texte (`inline`) pour ne pas peser plus lourd que le front.
 */
export const stack = {
  label: "Stack — au quotidien",
  core: ["TypeScript", "React", "Next.js", "TanStack Query", "Zustand", "Tailwind CSS"],
  groups: [
    {
      label: "Front & tests",
      items: ["Inertia.js", "Vite", "React Hook Form", "Cypress", "Playwright"],
    },
    {
      label: "UI & design",
      items: ["SCSS", "MUI", "Ant Design", "Radix UI", "Figma"],
    },
    {
      label: "Back-end & outillage",
      items: ["Laravel", "API REST", "Mercure", "MySQL", "PostgreSQL", "Docker", "GitHub Actions"],
      inline: true,
      note: "Certifié Laravel — 2021",
    },
  ],
} as const;

/** Titre de la section Cas d'étude, découpé pour mettre en valeur les deux contraintes. */
export const caseStudiesTitle = [
  { text: "Deux projets, deux contraintes fortes : le " },
  { text: "temps réel", emphasis: true },
  { text: " et le " },
  { text: "hors ligne", emphasis: true },
  { text: "." },
] as const;

/** Libellés communs aux cas d'étude (points forts et légende des schémas). */
export const caseStudyLabels = {
  challenge: "Enjeu :",
  legendMine: "mon périmètre",
  legendOthers: "hors périmètre",
  /** Nom de la zone qui défile horizontalement sur petit écran (annoncé au focus clavier). */
  scrollRegion: "Schéma d'architecture, défilement horizontal",
} as const;

export const caseStudies = [
  {
    name: "Ninkasi",
    meta: "2022 — 2026",
    summary:
      "Plateforme d'animation pour un réseau de restaurants : blind test en direct, carte des produits, agenda des événements.",
    roles: [
      {
        label: "Mon rôle",
        body: "Les deux applications front React et leur intégration Inertia.",
      },
      {
        label: "Équipe",
        body: "Backoffice Nova et back-end Laravel assurés par le reste de l'équipe.",
      },
    ],
    tags: ["React", "TypeScript", "MUI", "Inertia.js", "Mercure"],
    diagram: {
      kind: "ninkasi",
      description:
        "Le game master pilote la partie via Inertia ; Laravel publie les événements sur le hub Mercure, qui les diffuse en SSE aux joueurs et à la console.",
      nodes: {
        console: { title: "Console game master", sub: "React · MUI" },
        backend: { title: "Laravel · Nova", sub: "back-office, API" },
        hub: { title: "Hub Mercure", sub: "diffusion SSE" },
        players: { title: "App de salle (joueurs)", sub: "React · accès QR code" },
      },
      edges: { actions: "actions", actionsVia: "(Inertia)", publish: "publie", sse: "SSE" },
    },
    highlights: [
      {
        label: "Interface game master",
        challenge:
          "un employé de restaurant, non technique, doit animer une partie en direct sans formation.",
        solution:
          "Console de pilotage connectée au back-office Laravel via Inertia : lancement des manches, contrôle du rythme.",
        result: "Déployée dans le réseau Ninkasi, plus de 20 établissements",
      },
      {
        label: "Temps réel multi-acteurs",
        challenge:
          "garder l'animateur et toutes les équipes synchronisés en direct, sur le réseau d'un restaurant.",
        solution:
          "Diffusion des événements via Mercure (SSE), un protocole conçu pour monter en charge. Accès par QR code seulement, géolocalisé par restaurant et volontairement non référencé.",
        result: "Une vingtaine d'équipes et plus par partie, plusieurs joueurs par équipe",
      },
      {
        label: "Carte produits — écran & PDF",
        challenge:
          "chaque restaurant a sa propre carte, avec ses contraintes et ses choix, gérée par Ninkasi sous Excel et servie par une API maison.",
        solution:
          "Rendu de la carte depuis l'API, par restaurant et par format : version digitale et PDF imprimable, avec des données et une mise en page propres à chaque support, fidèles à la charte.",
        result: "Plus de ressaisie manuelle des cartes, en digital comme en print",
      },
    ],
  },
  {
    name: "Medikiosk",
    meta: "2024 — 2026",
    summary:
      "Borne interactive déployée en pharmacie, qui doit rester pleinement opérationnelle sans connexion réseau.",
    roles: [
      {
        label: "Mon rôle",
        body: "Seul responsable du développement, de la maintenance et des évolutions de la v2.",
      },
    ],
    tags: ["React", "TypeScript", "Next.js", "DexieDB", "Service Worker"],
    diagram: {
      kind: "medikiosk",
      description:
        "L'interface lit ses données dans DexieDB ; une synchronisation descendante depuis l'API a lieu à la connexion de la borne ou sur demande depuis l'administration de la pharmacie ; le service worker sert l'application en cache et gère ses mises à jour.",
      nodes: {
        app: { title: "Interface borne", sub: "Next.js · React" },
        worker: { title: "Service worker", sub: "cache & mises à jour" },
        store: { title: "DexieDB (IndexedDB)", sub: "source de vérité locale" },
        api: { title: "API", sub: "serveur distant" },
        admin: { title: "Admin pharmacie", sub: "déclenche la synchro" },
      },
      edges: { readWrite: "lecture / écriture", sync: "synchro descendante", serves: "sert" },
    },
    highlights: [
      {
        label: "Synchronisation repensée",
        challenge:
          "fonctionner aussi bien hors ligne qu'en ligne. En v1, la synchronisation dans les deux sens, montante et descendante, s'était révélée peu fiable.",
        solution:
          "En v2, mêmes déclencheurs (connexion de la borne, ou manuellement depuis l'administration de la pharmacie), mais une synchronisation descendante uniquement : la borne récupère ses données, puis les sert en local depuis DexieDB (IndexedDB).",
        result: "Une fois synchronisée, la borne fonctionne en totale autonomie",
      },
      {
        label: "Refonte du service worker",
        challenge:
          "des bornes réparties en pharmacie, qui doivent rester à jour sans intervention sur place.",
        solution: "Réécriture complète de la stratégie de cache et du cycle de mise à jour.",
        result: "Mises à jour appliquées automatiquement, sans intervention",
      },
    ],
  },
] as const;

export const experience = [
  {
    company: "WEB-ID — Lyon",
    role: "Développeur React / Laravel",
    period: "2018 — 2026",
    body: "Pivot vers React en octobre 2021 au sein d'une équipe front de trois développeurs (un lead, un junior, moi). Après deux départs, seul référent technique sur la partie front jusqu'à la fermeture de l'agence.",
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

export const recommendations = [
  {
    name: "Philippe Pelissier",
    role: "CEO",
    company: "WEB-ID",
    quote:
      "J'ai eu le plaisir de travailler avec Bruno chez WEB-ID et j'ai rapidement apprécié son sérieux et sa fiabilité.\n\nBruno est quelqu'un de discret, consciencieux et surtout sur qui on peut compter. Il est réactif, toujours disponible pour aider ses collègues et cherche systématiquement à trouver des solutions plutôt qu'à chercher des excuses. C'est également quelqu'un qui entretient de très bonnes relations avec les clients, qui apprécient particulièrement son professionnalisme et son écoute.\n\nBref, un vrai « mec bien » avec qui il est agréable de travailler, et que je n'hésiterais pas à recommander à une équipe qui cherche quelqu'un de fiable, impliqué et humain.",
    avatar: "/recommendations/philippe-pelissier.jpg",
    linkedin: "https://www.linkedin.com/in/philippepelissier/",
  },
  {
    name: "Léo Tiollier",
    role: "Software Engineer",
    company: "WEB-ID",
    quote:
      "J'ai eu le plaisir de travailler avec Bruno et je le recommande sans hésitation. Sérieux, à l'écoute et toujours disponible pour aider, il apporte une véritable valeur à toute équipe. Nos sessions de pair programming ont été particulièrement agréables et efficaces : nous avancions ensemble avec fluidité et sans difficulté. Un collaborateur de confiance, que je recommande vivement.",
    avatar: "/recommendations/leo-tiollier.jpg",
    linkedin: "https://www.linkedin.com/in/ltiollier/",
  },
  {
    name: "Gabriel Pillet",
    role: "Dev Fullstack — Qualité & Accessibilité Numérique",
    company: "WEB-ID",
    quote:
      "Bruno est un super dev fullstack Laravel / React, polyvalent, couteau suisse, il répond vite et bien à tous les problèmes avec sérieux. Hyper efficace (et super sympa).",
    avatar: "/recommendations/gabriel-pillet.jpg",
    linkedin: "https://www.linkedin.com/in/gabrielpillet/",
  },
  {
    name: "Elise Liegeois",
    role: "Développeuse PHP",
    company: "WEB-ID",
    quote:
      "J'ai travaillé avec Bruno chez WEB-ID, sur des sujets front alors que je suis plutôt back. Il a su m'accompagner avec pédagogie jusqu'à ce que je sois autonome sur un projet, sans jamais se contenter de le faire à ma place.\n\nCompétent, disponible et clair dans ses explications, je recommande Bruno à toute équipe recherchant quelqu'un de fiable et impliqué.",
    avatar: "/recommendations/elise-liegeois.jpg",
    linkedin: "https://www.linkedin.com/in/elise-liegeois-277879100/",
  },
  {
    name: "Ludovic Jourdain",
    role: "Product Manager & Product Designer",
    company: "WEB-ID",
    quote:
      "J'ai eu le grand plaisir de collaborer avec Bruno sur plusieurs projets, y compris en tant que manager. Développeur Front/React investi et consciencieux, il a mené à bien des projets de toutes envergures, au sein d'équipes de tailles variées, avec une véritable autonomie. Le tout dans un état d'esprit constamment constructif et positif. Je le recommande sans la moindre hésitation !",
    avatar: "/recommendations/ludovic-jourdain.jpg",
    linkedin: "https://www.linkedin.com/in/ludovicjourdain/",
  },
] as const;

/**
 * Section « Ce site » : le site présenté comme un cas d'étude technique.
 * Dans les textes, `…` est rendu en code. Le nombre d'ADR est calculé au build (lib/docs.ts).
 */
export const siteCase = {
  label: "Ce site",
  title: [
    { text: "Ce site est aussi un " },
    { text: "cas d'étude", emphasis: true },
    { text: "." },
  ],
  lede: "Conçu et maintenu comme un projet client : décisions documentées, qualité vérifiée avant chaque mise en production, code public. Tout ce qui suit est vérifiable dans le dépôt.",
  stack: ["Next.js 16", "React 19", "TypeScript 6", "Tailwind CSS v4", "Vercel"],
  points: [
    {
      label: "Contenu",
      title: "Une seule source, deux rendus.",
      body: "Tous les textes vivent dans `content/profile.ts`. La page web et le CV imprimable A4 sont deux arbres React alimentés par les mêmes données ; l'impression bascule par media query, sans JavaScript.",
    },
    {
      label: "Rendu",
      title: "Statique par défaut.",
      body: "Toutes les pages publiques sont pré-rendues au build. Seules les routes d'administration du blog sont dynamiques.",
    },
    {
      label: "Blog",
      title: "Sans base de données ni CMS.",
      body: "Les articles sont des fichiers Markdown versionnés dans le dépôt. L'admin, protégée par connexion LinkedIn, les publie en committant via l'API GitHub.",
    },
    {
      label: "Qualité",
      title: "Rien ne part en production sans CI verte.",
      body: "Typecheck, lint strict et build tournent à chaque push ; le résultat bloque la promotion en production sur Vercel. Prettier et ESLint s'exécutent aussi avant chaque commit.",
    },
    {
      label: "Décisions",
      /** Titre précédé du nombre d'ADR, calculé au build. */
      withAdrCount: true,
      title: "décisions d'architecture documentées.",
      body: "Chaque choix structurant fait l'objet d'un ADR (contexte, décision, conséquences), publié en ligne, y compris quand une décision en remplace une autre.",
    },
    {
      label: "Méthode",
      title: "Une issue, une branche, une PR.",
      body: "Chaque évolution part d'une issue suivie sur un tableau de projet, et passe par une pull request, CI comprise, avant d'arriver sur `main`.",
    },
  ],
  docsLink: "Lire les décisions d'architecture",
  repositoryLink: "Voir le code sur GitHub",
} as const;

/** Contenu de la feuille CV imprimée (voir components/cv-print.tsx). Une page A4. */
export const cv = {
  /** Titre sous le nom, découpé pour mettre « senior » en valeur. */
  headline: {
    before: "Développeur front-end ",
    emphasis: "senior",
    after: " · React & TypeScript",
  },
  contact: [
    { label: "Lyon, France" },
    { label: profile.phone, href: profile.phoneHref },
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: "linkedin.com/in/bruno-schvartz", href: profile.linkedin },
    { label: profile.websiteLabel, href: profile.website },
  ],
  /** Ligne de preuves : mêmes chiffres que le Hero du site. */
  proofs: profile.proofs,
  availability: "Disponible immédiatement · CDI",
  labels: {
    profil: "Profil",
    jobs: "Expérience",
    projects: "Projets choisis",
    stack: "Stack",
    education: "Formation",
    languages: "Langues",
  },
  profil:
    "J'architecture et je maintiens des applications React en production : temps réel, hors ligne, interfaces métier. Seul référent technique front de mon agence ces dernières années, avec un solide bagage back-end PHP / Laravel depuis 2008 qui facilite le dialogue avec les équipes API. Je recherche un CDI à Lyon : sur site, hybride ou à distance.",
  jobs: [
    {
      title: "Développeur front-end React — WEB-ID",
      meta: "2018 — 2026",
      body: "React / TypeScript sur l'ensemble des projets clients à partir d'octobre 2021. Équipe front passée de trois développeurs à un seul après deux départs : seul référent technique sur la partie front. Architectures Laravel et API REST jusqu'en 2021.",
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
  projects: [
    {
      title: "Ninkasi",
      meta: "React · TypeScript · MUI · Inertia · Mercure",
      body: "Plateforme d'animation pour un réseau de restaurants : console de pilotage de blind test en direct, application de salle par QR code synchronisée en temps réel via Mercure, cartes produits rendues depuis l'API en digital et en PDF.",
      result: "Déployée dans plus de 20 établissements du réseau",
    },
    {
      title: "Medikiosk",
      meta: "Next.js · React · TypeScript · DexieDB",
      body: "Borne interactive en pharmacie, opérationnelle hors connexion. v2 développée et maintenue seul : synchronisation descendante vers DexieDB (IndexedDB), refonte complète du service worker.",
      result: "Autonome une fois synchronisée, mises à jour sans intervention",
    },
  ],
  /** Rangée Stack : les technos du quotidien (mêmes que la section Stack du site), puis le reste. */
  stack: {
    core: stack.core,
    groups: [
      {
        label: "Front & UI",
        value:
          "Inertia.js, Vite, React Hook Form, Cypress, Playwright, SCSS, MUI, Ant Design, Radix UI, Figma",
      },
      {
        label: "Back-end",
        value: "Laravel (API REST), Mercure, PostgreSQL, MySQL, Docker, GitHub Actions",
      },
    ],
  },
  education: [
    { title: "Certification Laravel", meta: "2021" },
    { title: "Développeur web, AFPA Pompey (Bac+2)", meta: "2008" },
  ],
  languages: "Français, natif · Anglais technique : documentation et échanges écrits.",
  signature: "— avec un v, jamais un w",
} as const;
