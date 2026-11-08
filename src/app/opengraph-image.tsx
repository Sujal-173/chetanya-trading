import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px",
        background:
          "linear-gradient(135deg, #061326 0%, #0c2a4c 58%, #07172b 100%)",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#7dc4ff",
          fontSize: 23,
          letterSpacing: 3,
        }}
      >
        chaitanya{" "}
        <span style={{ color: "#ffffff", fontSize: 16, letterSpacing: 2 }}>
          TRADING CONSULTANCY
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
        <div
          style={{
            fontSize: 24,
            color: "#86c5ff",
            letterSpacing: 5,
            marginBottom: 20,
          }}
        >
          TRADING CONSULTANCY
        </div>
        <div style={{ fontSize: 68, lineHeight: 1.07, fontWeight: 700 }}>
          Practical Market Guidance for Disciplined Traders
        </div>
        <div style={{ fontSize: 25, color: "#d4e4f5", marginTop: 28 }}>
          Research-led perspectives. Structured planning. Risk awareness.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#b7c9dc",
          fontSize: 18,
        }}
      >
        <span>{siteConfig.name}</span>
        <span>
          {siteConfig.city}, {siteConfig.region}
        </span>
      </div>
    </div>,
    size,
  );
}
