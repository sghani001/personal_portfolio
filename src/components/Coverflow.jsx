import React, { useRef, useState } from "react";
import C from "../theme";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const navBtnStyle = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: `1px solid ${C.border}`,
  background: C.surface,
  color: C.primary,
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "border-color 0.2s, color 0.2s",
  flexShrink: 0,
};

export function Coverflow({ items, renderCard, cardWidth = 340, spacing = 260, angle = 30, height = 400, maxVisibleOffset = 2 }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const touchStartX = useRef(null);
  const len = items.length;

  const go = (delta) => setActiveIdx((i) => (i + delta + len) % len);
  const wrappedOffset = (i) => {
    let offset = i - activeIdx;
    if (offset > len / 2) offset -= len;
    if (offset < -len / 2) offset += len;
    return offset;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) go(-1);
    else if (dx < -50) go(1);
    touchStartX.current = null;
  };

  if (len === 0) return null;

  return (
    <div>
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ position: "relative", height, perspective: 1400, outline: "none", overflow: "hidden" }}
      >
        {items.map((item, i) => {
          const offset = wrappedOffset(i);
          const abs = Math.abs(offset);
          const hidden = abs > maxVisibleOffset;
          const isActive = i === activeIdx;
          const rotate = reducedMotion ? 0 : -offset * angle;
          const translateX = offset * spacing;
          const scale = isActive ? 1 : Math.max(0.8, 1 - abs * 0.12);
          return (
            <div
              key={i}
              onClick={() => !isActive && setActiveIdx(i)}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: cardWidth,
                marginLeft: -cardWidth / 2,
                transform: `translateX(${translateX}px) rotateY(${rotate}deg) scale(${scale})`,
                opacity: hidden ? 0 : isActive ? 1 : 0.45,
                zIndex: 100 - abs,
                pointerEvents: hidden ? "none" : "auto",
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
                cursor: isActive ? "default" : "pointer",
              }}
            >
              {renderCard(item, { isActive, offset })}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 24 }}>
        <button onClick={() => go(-1)} aria-label="Previous" style={navBtnStyle}>
          ‹
        </button>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", maxWidth: 280 }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to item ${i + 1}`}
              style={{
                width: i === activeIdx ? 22 : 8,
                height: 8,
                borderRadius: 100,
                border: "none",
                background: i === activeIdx ? C.copper : C.border,
                cursor: "pointer",
                transition: "width 0.25s, background 0.25s",
                padding: 0,
              }}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next" style={navBtnStyle}>
          ›
        </button>
      </div>
    </div>
  );
}
