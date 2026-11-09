import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "brand", "chaitanya-horizontal.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#061629",
          color: "#FFFFFF",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <img src={logoSrc} alt="" width={420} height={140} />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div style={{ fontSize: 70, lineHeight: 1.08, fontWeight: 700, letterSpacing: -1 }}>
            Practical market guidance for disciplined traders.
          </div>
          <div style={{ fontSize: 26, color: "#A9B8CE", marginTop: 26 }}>
            Research-led perspectives. Structured discussion. Risk awareness.
          </div>
        </div>
        <div style={{ display: "flex", height: 4, width: 120, background: "#1595FF" }} />
      </div>
    ),
    size,
  );
}
