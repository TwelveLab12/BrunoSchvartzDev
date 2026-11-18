import { profile } from "@/content/profile";
import { OgFrame, ogColors, ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

/** Le nom reprend la signature du site (`Wordmark`) : Instrument Sans semi-gras, « v » accent. */
export default async function OpengraphImage() {
  return renderOgImage(
    <OgFrame kicker={`${profile.role} — ${profile.location}`}>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontFamily: "Instrument Sans",
          fontWeight: 600,
          fontSize: 104,
          letterSpacing: -2,
        }}
      >
        Bruno Sch<span style={{ color: ogColors.accent }}>v</span>artz
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 34,
          color: ogColors.inkMuted,
          maxWidth: 900,
        }}
      >
        {profile.ogTagline}
      </div>
    </OgFrame>,
  );
}
