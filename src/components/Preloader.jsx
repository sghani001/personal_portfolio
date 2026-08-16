import React, { useEffect, useMemo, useRef, useState } from "react";
import { IconForTech } from "./Icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

// ── Timeline ────────────────────────────────────────────────────────────────
// orbit → birth → absorb → blackout → reveal. Roughly 3.2s end to end on a warm
// load, down from ~7s: the orbit was a fixed 3.6s that ran in full even when the
// page was already sitting there ready behind it.
//
// This is a FLOOR, not a fixed duration. The handover gates on `orbitDone && ready`
// (see below), so the orbit actually lasts max(this, time to DOMContentLoaded) —
// a fast connection gets a brief pass, a slow one still gets the full show while
// it waits. Long enough that the shells read as orbiting rather than flashing.
const ORBIT_MIN_MS = 1300;
// The core flaring — the moment it "goes off" and becomes a black hole. Skills
// keep orbiting untouched through this; it's a beat about the core, not them.
const BIRTH_MS = 340;
// Skills start diving at random moments inside this window after birth, rather
// than in shell/index order, so the infall looks like it's coming apart rather
// than counting down.
const DIVE_STAGGER_MS = 380;
// Held once every skill has been swallowed, before the screen goes black — long
// enough to register "it's finished eating" before the cut.
const SETTLE_MS = 120;
// Core and rings vanish, screen goes solid black. No debris outlives this — it's
// what guarantees nothing from the sequence is ever seen on top of the real page.
const BLACKOUT_MS = 170;
// Solid black fades out to reveal the page underneath.
const REVEAL_MS = 420;
// Hard ceiling on waiting for the document, so a pathologically slow parse can
// never strand anyone on the splash. Lowered from 8000: with the gate now on
// DOMContentLoaded rather than `load`, waiting longer than this means something
// is wrong and showing the page is better than showing more animation.
const MAX_WAIT_MS = 3000;

// ── Dive physics ────────────────────────────────────────────────────────────
// A skill breaking from its shell gets a tangential kick (exaggerated relative to
// its slow display-orbit speed — a stylised sling, not a literal continuation of
// it, or the curve is too subtle to read) and is then pulled in by a softened
// inverse-linear force with drag bleeding its angular momentum. Kick, pull and
// drag are tuned numerically against the shell radii this splash actually uses
// (141/230/320px desktop, 66/108/150 mobile), not eyeballed: the pairing below
// gives a visible partial spiral — 0.13 to 0.31 of a turn depending on how far out
// it started — with the slowest dive landing in ~500ms.
//
// Drag is the non-obvious lever. Raising PULL alone made the outer shell *worse*
// (a 900k/1.8 pairing sent it nearly a full 0.83-turn loop, taking 1033ms — longer
// than the gentler setting it replaced), because a faster particle that keeps its
// angular momentum just orbits instead of falling. Drag has to come up with it.
const DIVE_PULL = 1300000;
const DIVE_SOFT = 70;
const DIVE_DRAG = 2.4;
const DIVE_KICK = 1.55;
// Where the final shrink/fade begins, in px of distance from the core — keyed to
// proximity rather than elapsed time, since dive duration now varies per skill.
const DIVE_SHRINK_START = 90;

// Fifteen, and every one resolves to a real brand icon in IconForTech. Names are
// written to match that lookup rather than for display — "Actions" instead of
// "GitHub Actions" because the github branch is tested first and would win.
const SKILLS = [
  "Ruby on Rails", "React", "PostgreSQL", "Redis", "Sidekiq",
  "AWS", "Docker", "Tailwind CSS", "JavaScript", "Stripe",
  "Actions", "Python", "GraphQL", "RSpec", "Hotwire",
];

// Electron shells. Each is a circle seen almost edge-on (`squash`) and rolled to
// its own angle (`tilt`) — three rings sharing one tilt just nest inside each
// other and read as a dartboard; crossing at different angles is what makes it an
// atom. Radii are widely separated so no two shells ever crowd each other.
//
// The outermost shell is kept close to horizontal (a small tilt, not the ~100° the
// inner ones can afford): a rotated ellipse's on-screen height is
// sqrt((a·sinθ)² + (b·cosθ)²), which for the widest ring swings from ~34% of its
// radius near 0° tilt to ~99% near 90° — a near-vertical outer shell was reaching
// almost its full orbit radius in height and running through the caption below it.
const SHELLS = [
  { count: 5, radius: 0.44, squash: 0.30, tilt: -18, speed: 0.62 },
  { count: 5, radius: 0.72, squash: 0.28, tilt: 36, speed: -0.45 },
  { count: 5, radius: 1.0, squash: 0.36, tilt: 8, speed: 0.33 },
];

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;
const rand = (min, max) => min + Math.random() * (max - min);

// Everything scales off the smaller viewport axis, so the shells stay inside the
// screen on a phone instead of orbiting off the edges. `core` mirrors the .pl-core
// CSS breakpoint exactly — the dive physics needs to know the real absorb radius.
function metricsFor(w, h) {
  const min = Math.min(w, h);
  return {
    outer: min * 0.4,
    chip: Math.max(28, Math.min(46, Math.round(min * 0.072))),
    core: w <= 520 ? 60 : 76,
  };
}

/**
 * First-paint splash. The stack orbits the monogram as electron shells, the core
 * then flares to life as a black hole, and the shells peel off one at a time to
 * spiral into it — a real gravity-plus-drag integration, not an eased straight
 * line, so the infall visibly curves. Once every skill is swallowed the screen
 * cuts to solid black and fades out to reveal the page: nothing from the sequence
 * is still on screen by the time that fade starts, so none of it is ever visible
 * on top of the real content.
 *
 * Positions are integrated per frame rather than expressed as CSS keyframes: a
 * skill has to leave orbit from wherever it happens to be, and its curve into the
 * core depends on where and how fast it was — neither of which a keyframe can know
 * ahead of time.
 */
export function Preloader({ onDone }) {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState("orbit");
  const [metrics, setMetrics] = useState(() => metricsFor(window.innerWidth, window.innerHeight));

  // The loop needs the current metrics, but must not depend on the state: it is set
  // from inside the resize handler, so listing it as a dependency would make every
  // resize tear down and restart the simulation from t0.
  const metricsRef = useRef(metrics);
  metricsRef.current = metrics;

  const coreRef = useRef(null);
  const shardRefs = useRef([]);
  const pctRef = useRef(null);
  const allAbsorbedRef = useRef(null);
  // Timestamp the absorb phase opened. The physics loop reads this to know when
  // skills may start leaving orbit, so the simulation follows the choreography
  // rather than running a parallel clock that can drift out of step with it.
  const diveStartRef = useRef(0);
  const [orbitDone, setOrbitDone] = useState(false);
  const [ready, setReady] = useState(false);

  // Deliberately a plain timer, not something the rAF physics loop sets: this has
  // to resolve even if rAF never gets a frame (this project's dev pane has, this
  // session, gone stretches without compositing at all — see project memory). If
  // this gate depended on the physics loop instead, a stalled compositor would
  // leave the splash orbiting forever with the real site never revealed.
  useEffect(() => {
    const t = setTimeout(() => setOrbitDone(true), reducedMotion ? 0 : ORBIT_MIN_MS);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  // Shell assignment and starting angles are rolled once, so a reload gives a
  // different arrangement but a re-render does not reshuffle mid-flight.
  const seeds = useMemo(() => {
    const out = [];
    let i = 0;
    SHELLS.forEach((shell, s) => {
      for (let k = 0; k < shell.count && i < SKILLS.length; k++, i++) {
        out.push({
          name: SKILLS[i],
          shell: s,
          // Evenly spaced around the ring, then nudged, so they are distributed but
          // not mechanically regular.
          angle: (k / shell.count) * TAU + rand(-0.3, 0.3),
          speed: shell.speed * rand(0.92, 1.1),
          diveAt: rand(0, DIVE_STAGGER_MS),
          spin: rand(-40, 40),
        });
      }
    });
    return out;
  }, []);

  useEffect(() => {
    if (reducedMotion) return; // orbitDone is handled by the plain timer above
    const core = coreRef.current;
    const els = shardRefs.current.filter(Boolean);
    if (!core || els.length === 0) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      setMetrics(metricsFor(width, height));
    };
    resize();
    window.addEventListener("resize", resize);

    const parts = els.map((el, i) => ({
      el,
      ...seeds[i],
      x: 0,
      y: 0,
      rot: 0,
      state: "orbit",
      vx: 0,
      vy: 0,
    }));

    let absorbed = 0;
    let settledAt = 0;
    let raf = 0;
    let running = true;
    const t0 = performance.now();
    let last = t0;

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const t = now - t0;
      const { outer, core: coreSize } = metricsRef.current;
      const coreR = coreSize / 2;
      // Set by the choreography when the absorb phase opens, rather than derived
      // from this loop's own clock. The orbit's length is adaptive (it waits on
      // `load`), so a locally-computed "dive at ORBIT+BIRTH" would fire on its own
      // schedule and skills would start falling while the phase machine was still
      // holding on the orbit.
      const diveFrom = diveStartRef.current;

      parts.forEach((p) => {
        if (p.state === "absorbed") return;

        let depth = 0;

        if (p.state === "orbit") {
          if (diveFrom && now >= diveFrom + p.diveAt) {
            // Breaking from the shell: capture the tangent direction of the orbit
            // at this exact point (the derivative of the position formula below)
            // so the handoff has no snap, then exaggerate it into a kick — the
            // display orbit is slow on purpose for readability, but a straight
            // continuation of that speed barely curves at all before gravity
            // dominates. The kick, plus the pull/drag below, is what turns this
            // into a real decaying spiral instead of a straight fall.
            const shell = SHELLS[p.shell];
            const a = p.angle + (t / 1000) * p.speed;
            const rx = outer * shell.radius;
            const ry = rx * shell.squash;
            const c = Math.cos(shell.tilt * DEG);
            const s = Math.sin(shell.tilt * DEG);
            const dxda = -Math.sin(a) * rx;
            const dyda = Math.cos(a) * ry;
            let tx = dxda * c - dyda * s;
            let ty = dxda * s + dyda * c;
            const tlen = Math.hypot(tx, ty) || 1;
            tx /= tlen;
            ty /= tlen;
            const r0 = Math.hypot(p.x, p.y);
            const kick = r0 * DIVE_KICK * Math.sign(p.speed || 1);
            p.vx = tx * kick;
            p.vy = ty * kick;
            p.state = "diving";
          } else {
            const shell = SHELLS[p.shell];
            const a = p.angle + (t / 1000) * p.speed;
            const rx = outer * shell.radius;
            const ry = rx * shell.squash;
            const lx = Math.cos(a) * rx;
            const ly = Math.sin(a) * ry;
            const c = Math.cos(shell.tilt * DEG);
            const s = Math.sin(shell.tilt * DEG);
            p.x = lx * c - ly * s;
            p.y = lx * s + ly * c;
            // Front half of the ring vs back half. Drives size, brightness and
            // stacking, which is the whole reason it reads as 3D rather than flat.
            depth = Math.sin(a);
            p.rot += p.spin * dt;
          }
        }

        if (p.state === "diving") {
          const r = Math.hypot(p.x, p.y) || 1;
          if (r < coreR) {
            p.state = "absorbed";
            p.el.style.opacity = "0";
            absorbed += 1;
            const grown = 0.7 + 0.3 * (absorbed / parts.length);
            core.style.transform = `scale(${grown.toFixed(3)})`;
            if (absorbed === parts.length) settledAt = now;
            return;
          }
          const accel = DIVE_PULL / (r + DIVE_SOFT);
          p.vx += (-p.x / r) * accel * dt;
          p.vy += (-p.y / r) * accel * dt;
          const drag = Math.exp(-DIVE_DRAG * dt);
          p.vx *= drag;
          p.vy *= drag;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += p.spin * 3 * dt;

          // Shrinks and dims as it nears the horizon, keyed to distance rather than
          // elapsed time — dive duration varies per skill now, proximity doesn't.
          const closeness = Math.max(0, Math.min(1, (DIVE_SHRINK_START - r) / (DIVE_SHRINK_START - coreR)));
          const shrink = 1 - 0.75 * closeness;
          const fade = 1 - Math.max(0, (closeness - 0.55) / 0.45);
          p.el.style.opacity = fade.toFixed(3);
          p.el.style.zIndex = "3";
          p.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${p.rot.toFixed(1)}deg) scale(${shrink.toFixed(3)})`;
        } else {
          // Still orbiting. Nearer to the viewer: bigger, brighter, drawn over the core.
          const near = (depth + 1) / 2;
          p.el.style.opacity = (0.5 + near * 0.5).toFixed(3);
          p.el.style.zIndex = depth > 0 ? "3" : "1";
          p.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${p.rot.toFixed(1)}deg) scale(${(0.78 + near * 0.34).toFixed(3)})`;
        }

      });

      // Progress: orbit carries most of the bar, birth ticks it a little further,
      // absorption finishes it. Written straight to the node — running this
      // through React state would re-render the whole splash sixty times a second.
      if (pctRef.current) {
        // Capped at 70 during the orbit rather than run off its own clock: the
        // orbit can last arbitrarily long while waiting on `load`, and a bar that
        // marched to 100% and sat there would be lying about being finished.
        let pct;
        if (!diveFrom) pct = Math.min(70, (t / ORBIT_MIN_MS) * 70);
        else pct = 78 + (absorbed / parts.length) * 22;
        pctRef.current.textContent = `${Math.min(100, Math.round(pct))}%`;
      }

      if (settledAt && now - settledAt > SETTLE_MS) {
        // Every skill is in — nothing left to animate.
        running = false;
        allAbsorbedRef.current?.();
        return;
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, seeds]);

  // Gated on DOMContentLoaded, not `load`. `load` waits for every subresource —
  // every project screenshot, every below-the-fold image — so on a cold visit it
  // can fire many seconds after the page is perfectly presentable, and the splash
  // would sit there the whole time. (Locally the two are indistinguishable, 789ms
  // vs 794ms, because everything is cached and same-host — which is exactly why
  // this is worth being deliberate about rather than trusting a local reading.)
  // What the splash is actually covering is the initial render, and that is done
  // at DOMContentLoaded.
  useEffect(() => {
    const markReady = () => setReady(true);
    const ceiling = setTimeout(markReady, MAX_WAIT_MS);
    if (document.readyState !== "loading") markReady();
    else document.addEventListener("DOMContentLoaded", markReady, { once: true });
    return () => {
      clearTimeout(ceiling);
      document.removeEventListener("DOMContentLoaded", markReady);
    };
  }, []);

  // Deliberately does NOT depend on `phase`: setting it inside this effect would
  // re-run it, and the cleanup would cancel timers it had just scheduled — leaving
  // the splash frozen mid-sequence. The ref makes the handover fire once; the rest
  // of the choreography runs as a plain async sequence inside it, bridging the
  // fixed-timing cosmetic phases (birth/blackout/reveal) with the variable-length
  // physics phase (absorption) via allAbsorbedRef.
  const handedOver = useRef(false);
  useEffect(() => {
    if (!orbitDone || !ready || handedOver.current) return;
    handedOver.current = true;
    if (reducedMotion) {
      onDone();
      return;
    }

    let cancelled = false;
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (async () => {
      setPhase("birth");
      await wait(BIRTH_MS);
      if (cancelled) return;

      diveStartRef.current = performance.now();
      setPhase("absorb");
      // Raced against a ceiling, not awaited outright: this promise only resolves
      // from inside the rAF physics loop, and rAF does not run at all on a
      // stalled/backgrounded compositor. Worst realistic case is one stagger
      // window plus one outer-shell dive plus the settle beat (≈380+500+120ms);
      // the ceiling gives that roughly 2× headroom so a genuinely stuck loop can't
      // leave the real site permanently hidden behind the splash.
      await Promise.race([
        new Promise((resolve) => { allAbsorbedRef.current = resolve; }),
        wait(2200),
      ]);
      if (cancelled) return;

      setPhase("blackout");
      await wait(BLACKOUT_MS);
      if (cancelled) return;

      setPhase("reveal");
      await wait(REVEAL_MS);
      if (cancelled) return;

      onDone();
    })();

    return () => {
      cancelled = true;
    };
  }, [orbitDone, ready, reducedMotion, onDone]);

  // The page behind is fully laid out; without this it can be scrolled around
  // underneath the splash, and lands somewhere unexpected on reveal.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const { outer, chip } = metrics;
  const span = Math.ceil(outer * 2 + chip + 8);

  return (
    <div className={`preloader is-${phase}`} role="status" aria-live="polite">
      <span className="pl-flash" aria-hidden="true" />
      <div className="preloader-inner">
        <div className="pl-forge">
          {/* The shells themselves. Static geometry, so an SVG rather than a redraw
              every frame — and it cannot be scrubbed away by the trail canvas's fade. */}
          <svg
            className="pl-shells"
            width={span}
            height={span}
            viewBox={`${-span / 2} ${-span / 2} ${span} ${span}`}
            aria-hidden="true"
          >
            {SHELLS.map((s, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="0"
                rx={outer * s.radius}
                ry={outer * s.radius * s.squash}
                transform={`rotate(${s.tilt})`}
              />
            ))}
          </svg>
          {/* Gargantua. .pl-core stays an unstyled box of the exact size the dive
              physics expects; every visual layer is a child that overflows it. */}
          <div ref={coreRef} className="pl-core">
            <span className="pl-bh-glow" aria-hidden="true" />
            {/* Far halves, then the horizon, then the near halves — the ordering
                is what makes each ring wrap the sphere instead of sitting wholly
                in front of or behind it. */}
            <span className="pl-bh-ring pl-bh-ring--h is-far" aria-hidden="true"><i /></span>
            <span className="pl-bh-ring pl-bh-ring--v is-far" aria-hidden="true"><i /></span>
            <span className="pl-bh-eh" aria-hidden="true" />
            <span className="pl-bh-ring pl-bh-ring--h is-near" aria-hidden="true"><i /></span>
            <span className="pl-bh-ring pl-bh-ring--v is-near" aria-hidden="true"><i /></span>
            <p className="pl-bh-label">SG</p>
          </div>
          {seeds.map((s, i) => (
            <div
              key={s.name}
              ref={(el) => (shardRefs.current[i] = el)}
              className="pl-shard"
              title={s.name}
              style={{ width: chip, height: chip }}
            >
              <IconForTech name={s.name} size={Math.round(chip * 0.48)} colorOverride="var(--pl-icon)" />
            </div>
          ))}
        </div>
      </div>
      {/* Parked at the foot of the screen rather than under the mark: the outer shell
          reaches ~40% of the viewport, so a caption sitting below the core is inside
          the orbit and the blocks fly straight through the text. */}
      <div className="pl-caption">
        <p className="preloader-name">Syed M. Ghani</p>
        <p className="preloader-role">
          Assembling the stack <span ref={pctRef} className="pl-pct">0%</span>
        </p>
        <span className="sr-only">Loading portfolio</span>
      </div>
    </div>
  );
}
