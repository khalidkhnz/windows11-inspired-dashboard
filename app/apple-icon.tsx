import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const tile = {
    width: 54,
    height: 54,
    background: "linear-gradient(135deg, #38bdf8, #6366f1)",
    borderRadius: 8,
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 36,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={tile} />
            <div style={tile} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={tile} />
            <div style={tile} />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
