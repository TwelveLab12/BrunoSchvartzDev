import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { ReactElement, ReactNode } from "react";

/** Format commun des images d'aperçu (Open Graph) : home, études de cas, articles. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Tokens de `app/globals.css`, repris en dur : ImageResponse ne lit pas le CSS du site. */
export const ogColors = {
  paper: "#f6f4ef",
  ink: "#1a1a18",
  inkMuted: "#4a4740",
  muted: "#6b675e",
  accent: "#b4472a",
} as const;

type OgFonts = NonNullable<NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"]>;

/**
 * Polices du site (`app/layout.tsx`), lues au build dans les paquets `@fontsource` : ImageResponse
 * n'accepte que ttf, otf et woff (pas woff2), et `next/font` ne fournit pas de fichier. Sans elles,
 * `next/og` retombe sur Geist, dont le rendu espace irrégulièrement les mots (#160).
 */
async function loadFonts(): Promise<OgFonts> {
  const file = (pkg: string, name: string) =>
    readFile(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", name));
  const [serif, sans, mono, wordmark] = await Promise.all([
    file("instrument-serif", "instrument-serif-latin-400-normal.woff"),
    file("ibm-plex-sans", "ibm-plex-sans-latin-400-normal.woff"),
    file("ibm-plex-mono", "ibm-plex-mono-latin-400-normal.woff"),
    file("instrument-sans", "instrument-sans-latin-600-normal.woff"),
  ]);
  return [
    { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
    { name: "IBM Plex Sans", data: sans, weight: 400, style: "normal" },
    { name: "IBM Plex Mono", data: mono, weight: 400, style: "normal" },
    { name: "Instrument Sans", data: wordmark, weight: 600, style: "normal" },
  ];
}

/**
 * Limite connue (#160) : après un mot qui contient un couple fortement créné (« L' », « To », « Va »),
 * le moteur de `next/og` laisse un espace trop large, quelle que soit la police.
 */
export async function renderOgImage(element: ReactElement) {
  return new ImageResponse(element, { ...ogSize, fonts: await loadFonts() });
}

/**
 * Habillage commun : fond papier, ligne de contexte en mono (comme `SectionLabel`), contenu propre à
 * chaque image, puis une ligne de détails séparés par des points accent.
 */
export function OgFrame({
  kicker,
  details = [],
  children,
}: {
  kicker: string;
  details?: readonly string[];
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: ogColors.paper,
        color: ogColors.ink,
        fontFamily: "IBM Plex Sans",
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "IBM Plex Mono",
          fontSize: 26,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: ogColors.muted,
        }}
      >
        {kicker}
      </div>
      {children}
      {details.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 40,
            fontSize: 28,
            color: ogColors.inkMuted,
            maxWidth: 1040,
          }}
        >
          {details.map((detail, index) => (
            <div key={detail} style={{ display: "flex", marginRight: 16 }}>
              {index > 0 && <span style={{ marginRight: 16, color: ogColors.accent }}>·</span>}
              <span>{detail}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Titre en Instrument Serif, comme les titres du site. */
export function OgTitle({ size, children }: { size: number; children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        marginTop: 24,
        fontFamily: "Instrument Serif",
        fontSize: size,
        lineHeight: 1.04,
        maxWidth: 1040,
      }}
    >
      {children}
    </div>
  );
}
