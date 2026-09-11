import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { profile } from "@/content/profile";
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
    "Développeur front-end React / TypeScript à Lyon. Développeur depuis 2008, spécialisé React depuis cinq ans, référent technique en agence. Ouvert aux opportunités en CDI.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
