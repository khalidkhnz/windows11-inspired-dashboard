import { ImageResponse } from "next/og";
import { owner } from "@/lib/portfolio";

export const alt = `${owner.name} — ${owner.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const tile = {
    width: 20,
    height: 20,
    background: "linear-gradient(135deg, #38bdf8, #6366f1)",
    borderRadius: 4,
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(ellipse at top left, rgba(56,189,248,0.25), transparent 60%), radial-gradient(ellipse at bottom right, rgba(99,102,241,0.25), transparent 60%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", gap: 4 }}>
              <div style={tile} />
              <div style={tile} />
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <div style={tile} />
              <div style={tile} />
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#a1a1aa" }}>
            {owner.siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
            {owner.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              marginTop: 8,
              lineHeight: 1.05,
            }}
          >
            {owner.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#d4d4d8",
              marginTop: 24,
              maxWidth: 900,
              lineHeight: 1.25,
            }}
          >
            {owner.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 20,
            color: "#a1a1aa",
          }}
        >
          {["Next.js", "TypeScript", "Tailwind"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
