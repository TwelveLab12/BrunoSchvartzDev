import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { CAREER_START_YEAR, REACT_START_YEAR, profile, yearsSince } from "@/content/profile";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-instrument-sans",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: "Bruno Schvartz — Développeur front-end React, Lyon",
  description:
    `Développeur front-end React / TypeScript à Lyon. Développeur depuis ${CAREER_START_YEAR}, ` +
    `spécialisé React depuis ${yearsSince(REACT_START_YEAR)} ans, référent technique en agence. ` +
    `Ouvert aux opportunités en CDI.`,
  alternates: {
    canonical: profile.website,
  },
  openGraph: {
    title: "Bruno Schvartz — Développeur front-end React",
    description: "React, TypeScript, Next.js. Lyon — sur site, hybride ou à distance.",
    url: profile.website,
    type: "website",
    locale: "fr_FR",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.website,
  email: profile.email,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lyon",
    addressCountry: "FR",
  },
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="font-sans">
        {/* Premier élément focalisable de chaque page, visible seulement au focus (RGAA 12.7). La
            cible `#contenu` est le <main> de chaque page. */}
        <a
          href="#contenu"
          className="bg-ink text-paper sr-only rounded-sm text-sm font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3"
        >
          Aller au contenu principal
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
