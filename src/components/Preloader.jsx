import React, { useEffect, useMemo, useRef, useState } from "react";
import C from "../theme";
import { IconForTech, getTechColor } from "./Icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

// Tight stagger and a short flight: the blocks are meant to streak in, not glide.
// FLIGHT/STEP is how many are in the air at once — around fourteen, so the infall
// is a continuous stream rather than a trickle of one block at a time.
const STEP_MS = 24;
const FLIGHT_MS = 340;

// Every skill on the CV that resolves to a real brand icon in IconForTech. Names are
// written to match that lookup rather than for display — "Actions" instead of
// "GitHub Actions" because the github branch is tested first and would win, and no
// ".js" suffixes because the javascript branch is tested before node/stimulus.
const SKILLS = [
  "Ruby on Rails", "React", "PostgreSQL", "Redis", "Sidekiq", "AWS",
  "Docker", "Tailwind CSS", "JavaScript", "TypeScript", "Stripe", "Actions",
  "Heroku", "Python", "Django", "Vite", "Redux", "Material UI",
  "RSpec", "Hotwire", "Stimulus", "HubSpot", "Salesforce", "QuickBooks",
  "Devise", "Pundit", "GraphQL", "Node", "HTML", "CSS",
  "Jest", "Ruby", "Paddle", "Chargebee", "Moodle", "ActionCable",
];

// Last block launches at (n-1)×STEP and is absorbed FLIGHT later, then the finished
// block holds for a beat so it registers as one solid object before it detonates.
const ASSEMBLE_MS = (SKILLS.length - 1) * STEP_MS + FLIGHT_MS + 240;
// Long enough for the slowest fragments to clear the frame.
const BURST_MS = 1000;
// A hard ceiling so a stalled font or image can never trap someone on the splash.
const MAX_VISIBLE_MS = 4000;

const TAU = Math.PI * 2;
const rand = (min, max) => min + Math.random() * (max - min);

/**
 * First-paint splash. Every skill on the CV is a block; they streak in from random
 * bearings, merge into a single gold block, and that block detonates — scattering
 * the very same blocks back out at random speeds and spins to uncover the page.
 *
 * The app renders underneath the whole time, so the blast uncovers a layout that is
 * already settled rather than one still assembling itself in front of the viewer.
 */
export function Preloader({ onDone }) {
  const reducedMotion = usePrefersReducedMotion();

  // "build" → "burst". The handover waits on both the animation and the document,
  // so a slow load extends the build rather than cutting it off, and a fast one
  // still shows the whole sequence.
  const [phase, setPhase] = useState("build");
  const [assembled, setAssembled] = useState(false);
  const [ready, setReady] = useState(false);

  // Rolled once per load, so no two visits get the same blast. Each block carries
  // both vectors: where it flies in from, and where it is thrown on detonation —
  // independent bearings, so a block does not simply retrace its entry.
  const blocks = useMemo(
    () => {
      // Distances are measured in half-diagonals of the viewport, not pixels: on a
      // laptop a fixed 700px launch starts just off-screen, but on a phone it starts
      // three screens away and the block is invisible for most of its flight.
      const reach = Math.hypot(window.innerWidth, window.innerHeight) / 2;
      return SKILLS.map((name) => {
        const inAngle = rand(0, TAU);
        const inDist = reach * rand(0.85, 1.45);
        const outAngle = rand(0, TAU);
        const outDist = reach * rand(0.5, 1.6);
        return {
          name,
          color: getTechColor(name),
          fx: Math.cos(inAngle) * inDist,
          fy: Math.sin(inAngle) * inDist,
          frot: rand(-220, 220),
          sx: Math.cos(outAngle) * outDist,
          sy: Math.sin(outAngle) * outDist,
          srot: rand(-540, 540),
          // Random duration over a random distance is what gives random speeds.
          sdur: rand(480, 1000),
        };
      });
    },
    []
  );

  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), reducedMotion ? 0 : ASSEMBLE_MS);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  useEffect(() => {
    const markReady = () => setReady(true);
    const ceiling = setTimeout(markReady, MAX_VISIBLE_MS);
    if (document.readyState === "complete") markReady();
    else window.addEventListener("load", markReady, { once: true });
    return () => {
      clearTimeout(ceiling);
      window.removeEventListener("load", markReady);
    };
  }, []);

  // Deliberately does NOT depend on `phase`: setting it here would re-run this
  // effect, and the cleanup would cancel the very timers it had just scheduled —
  // leaving the splash frozen mid-sequence. The ref makes the handover fire once.
  const handedOver = useRef(false);
  useEffect(() => {
    if (!assembled || !ready || handedOver.current) return;
    handedOver.current = true;
    if (reducedMotion) {
      onDone();
      return;
    }
    setPhase("burst");
    const toDone = setTimeout(onDone, BURST_MS);
    return () => clearTimeout(toDone);
  }, [assembled, ready, reducedMotion, onDone]);

  // The page behind is fully laid out; without this it can be scrolled around
  // underneath the splash, and lands somewhere unexpected on reveal.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div className={`preloader is-${phase}`} role="status" aria-live="polite">
      <span className="pl-flash" aria-hidden="true" />
      <div className="preloader-inner">
        <div className="pl-forge">
          {/* What everything merges into. Steps up in size once per block absorbed,
              so it visibly accumulates the stack rather than just sitting there. */}
          <div
            className="pl-core"
            style={{
              background: `linear-gradient(135deg, ${C.copper}, ${C.copperDeep})`,
              color: C.onGold,
              "--grow-delay": `${FLIGHT_MS - STEP_MS}ms`,
              "--grow-dur": `${SKILLS.length * STEP_MS}ms`,
              "--grow-steps": SKILLS.length,
            }}
          >
            SG
          </div>
          {blocks.map((b, i) => (
            <div
              key={b.name}
              className="pl-shard"
              title={b.name}
              style={{
                "--fx": `${Math.round(b.fx)}px`,
                "--fy": `${Math.round(b.fy)}px`,
                "--frot": `${Math.round(b.frot)}deg`,
                "--sx": `${Math.round(b.sx)}px`,
                "--sy": `${Math.round(b.sy)}px`,
                "--srot": `${Math.round(b.srot)}deg`,
                "--sdur": `${Math.round(b.sdur)}ms`,
                "--d": `${i * STEP_MS}ms`,
                "--flight": `${FLIGHT_MS}ms`,
                background: `${b.color}1f`,
                borderColor: `${b.color}59`,
              }}
            >
              <IconForTech name={b.name} size={22} />
            </div>
          ))}
        </div>
        <p className="preloader-name">Syed M. Ghani</p>
        <p className="preloader-role">Assembling the stack</p>
        <span className="sr-only">Loading portfolio</span>
      </div>
    </div>
  );
}
