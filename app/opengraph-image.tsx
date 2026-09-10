import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#f6f4ef",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#6b675e",
        }}
      >
        {profile.role} — {profile.location}
      </div>
      <div style={{ display: "flex", marginTop: 24, fontSize: 96, color: "#1a1a18" }}>
        Bruno Sch<span style={{ color: "#b4472a" }}>v</span>artz
      </div>
      <div
        style={{ display: "flex", marginTop: 32, fontSize: 32, color: "#4a4740", maxWidth: 900 }}
      >
        Développeur front-end React, référent technique.
      </div>
    </div>,
    size,
  );
}
