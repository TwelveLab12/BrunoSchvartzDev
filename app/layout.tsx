import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
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
  title: "Bruno Schvartz — Développeur front-end React, Lyon",
  description:
    "Développeur front-end React / TypeScript à Lyon. Développeur depuis 2008, spécialisé React depuis cinq ans, référent technique en agence. Ouvert aux opportunités en CDI.",
  openGraph: {
    title: "Bruno Schvartz — Développeur front-end React",
    description: "React, TypeScript, Next.js. Lyon — sur site, hybride ou à distance.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
