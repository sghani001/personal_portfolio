import React from "react";
import C, { alpha } from "../theme";
import { IconForTech } from "./Icons";

const PALETTES = [
  ["#3a2f1d", "#1a1410"],
  ["#1d2e3a", "#10161a"],
  ["#2e1d3a", "#16101a"],
  ["#1d3a2e", "#101a16"],
  ["#3a1d2e", "#1a1016"],
  ["#2b2b1d", "#161610"],
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function AutoProjectImage({ name, tech }) {
  const palette = PALETTES[hashString(name) % PALETTES.length];
  const primaryTech = tech && tech[0];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: `linear-gradient(150deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {primaryTech && (
        <div style={{ position: "absolute", opacity: 0.18, transform: "scale(3.4)" }}>
          <IconForTech name={primaryTech} size={64} colored />
        </div>
      )}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "6px 14px",
          borderRadius: 100,
          background: "rgba(0,0,0,0.35)",
          border: `1px solid ${alpha(C.copper, "30")}`,
          fontSize: 11,
          fontFamily: "'JetBrains Mono',monospace",
          color: "#e8e8e8",
          textAlign: "center",
          maxWidth: "88%",
        }}
      >
        {name}
      </div>
    </div>
  );
}
