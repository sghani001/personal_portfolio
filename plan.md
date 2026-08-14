# Hero Redesign + Motion Polish — Portfolio

## What actually shipped

The original plan (below, kept for history) called for a WebGL gem scene in the hero. Mid-implementation the user clarified the real ask: **a centered profile photo at the very top of the site with floating/orbiting motion around it**, not an abstract 3D object. The WebGL work was discarded and this is what was built instead.

### Hero (`src/components/sections/HeroSection.jsx`)
- Redesigned from a two-column (text left / stats right) layout to a single centered column.
- New `OrbitingPhoto` component: circular profile photo (`resumeData.photo`), gently floats up/down (framer-motion, infinite loop), with two counter-rotating dashed/dotted orbit rings and three small orbiting particles around it — all skipped when `prefers-reduced-motion` is set.
- Headline, typewriter line, CTAs, availability chip, credibility strip, and stat cards now stack centered below the photo, each staggered in via `FadeUp`.

### Bug found & fixed along the way
All sections actually import `FadeUp`/`Card`/`Section` from the monolithic `src/components/UI.jsx` — **not** from the separate `src/components/ui/{FadeUp,Card,Section}.jsx` files, which turned out to be pre-existing orphaned dead code (never imported anywhere). That dead directory, plus the dead `src/hooks/useInView.js` and `src/hooks/useSectionInView.js` it depended on, was deleted. All real motion/tilt work landed in the live `src/components/UI.jsx` instead.

### Motion/3D touches added site-wide
- `FadeUp` (in `UI.jsx`) rewritten with framer-motion (`whileInView` + subtle `rotateX` tilt-in entrance via `transformPerspective`), same external API so no call sites changed.
- `useTilt3D` hook (`src/hooks/useTilt3D.js`) — pointermove-driven perspective tilt, gated by `usePointerFine` + `usePrefersReducedMotion`.
- `Card` (in `UI.jsx`) gained an opt-in `tilt3D` prop merging the tilt transform with its existing hover lift; enabled on the Card usages in CaseStudies, Gems, Projects, Process, RailsShowcase, Experience, and Testimonials sections.
- `CursorSpotlight` (`src/components/CursorSpotlight.jsx`) — fixed, pointer-events-none radial glow following the cursor, mounted once in `App.jsx`, disabled on touch/reduced-motion.

### Dependencies
Kept: `framer-motion`. Installed then **removed**: `three`, `@react-three/fiber`, `@react-three/drei` (unused once the WebGL gem scene was dropped).

### Verified
`npm run dev` — no console errors, photo renders circular/centered, theme toggle (dark/light) works, mobile viewport (375px) has no horizontal overflow and photo scales down via `clamp()`. `npm run build` succeeds (434.5 kB / 142.2 kB gzip main bundle).

---

## Original plan (superseded, kept for reference)

The initial approved plan built a WebGL hero centerpiece (`@react-three/fiber` gem + wireframe card + instanced shards) plus the same FadeUp/tilt/spotlight work described above. That 3D scene (`src/components/three/HeroGem.jsx`, `Hero3DBackground.jsx`) was deleted after the user clarified they wanted the profile photo, not an abstract object, as the hero centerpiece.

---

## Round 2 — six more 3D/motion features (2026-08-14)

User asked for more 3D additions; picked six from a suggestion list. All CSS/framer-motion based, no WebGL.

1. **Flip cards** (`src/components/FlipCard.jsx`) — reusable 3D flip (hover on pointer-fine devices, tap on touch), applied to `ProjectsSection`, `GemsSection`, and `CaseStudiesSection`'s additional-projects grid. Front shows the story, back reveals tech stack + a CTA link.
2. **Odometer stat counters** (`src/hooks/useCountUp.js`, `src/components/StatNumber.jsx`) — parses the numeric prefix of stat strings (e.g. "6,133+"), animates count-up once scrolled into view via framer-motion's `useInView`, keeps animating smoothly toward new values on live updates (gem download polling), respects reduced motion. Applied to Hero stat cards and `MetricsSection`.
3. **Scroll parallax** (`src/hooks/useScrollParallax.js`) — Hero's background blob layer lags behind scroll; About section's profile photo drifts independently of its text column while scrolling through.
4. **Rotating skill orbit** — decorative ring of 10 tech icons slowly orbiting (counter-rotated to stay upright) above the existing grouped skill-pill list in `SkillsSection`; the functional expandable pill list is untouched.
5. **Isometric GitHub heatmap** — `GitHubSection` (previously imported in `App.jsx` but never rendered — now mounted after `TechStackSection`) contribution-calendar cells get `translateZ` proportional to commit intensity inside a `perspective + rotateX`-tilted grid, giving a genuine extruded/isometric look; falls back to flat cells under reduced motion.
6. **Testimonials 3D coverflow** — replaced the static 2-column grid with an absolutely-positioned carousel: center card frontal/full-size, neighbors rotated via `rotateY` and scaled down by offset, with prev/next buttons, dot indicators, keyboard arrow support, and touch swipe.

### Bug found & fixed
The coverflow's side cards are absolutely positioned and translate far outside the 340px card width — the container was missing `overflow: hidden`, which would have caused horizontal page scroll on narrow viewports. Fixed by adding `overflow: hidden` to the carousel container.

### Cleanup
Removed now-dead CSS (`.testimonials-grid`, `.testimonial-card` and related classes) left over from the old static-grid testimonials markup, since nothing renders those classes anymore.

### Verified
No console errors on a clean load; production build succeeds (479 modules, 459 kB / 149.8 kB gzip); structural DOM checks confirm the heatmap's 3D tilt, flip-card back faces (`backface-visibility: hidden`), coverflow's `rotateY` on side cards, and the skill orbit ring are all present; theme toggle still works. Note: this session's browser preview pane wasn't compositing/scrolling reliably (a tooling limitation, confirmed via failed screenshots and non-updating `window.innerWidth`/`scrollY` after resize/scroll calls) — scroll-triggered animations (count-up, parallax, scroll-reveal) were verified by code/DOM inspection rather than visually.
# Futuristic Redesign — Hero, Whole-Page Language, Projects, LeetCode Proxy

## Context

The user shared a reference image (a Dribbble/Framer portfolio hero) and said the current site "is not modern enough." The reference's distinctive elements: a full-bleed, tightly-cropped portrait photo dominating the frame (not a small framed circle); a giant, oversized ghost/outline wordmark of the person's name bleeding off the top edge as the dominant typographic element; small "floating widget" cards overlaid on the photo (a project-preview chip, a "Let's Talk" contact chip); a subtle crosshair/plus-mark grid texture across the background; and very sparse body copy — the visuals carry the page, not paragraphs. The reference's actual color palette (saturated red/purple) will NOT be adopted — it would fight the site's established gold/copper "Rails gem" brand used throughout (badges, "Gem Downloads," etc.); the same structural technique will be rebuilt using the site's existing gold/copper/dark palette instead.

The user also wants this pushed across the **whole page**, not just the hero, and wants project cards rebuilt: small cards in a single row with **real screenshots** of the live project URLs (not Unsplash placeholders), full details moved into a modal instead of being crammed into the card. Finally, the user has their own deployed LeetCode proxy (`leetcode-proxy-2.vercel.app`) to fix broken LeetCode stats — verified live via curl (POST `/api/leetcode` with a GraphQL `{query, variables}` body returns `200` with real GraphQL response shape, matching this repo's own unused `api/leetcode.js`).

**Important constraint discovered:** this portfolio deploys via `gh-pages` to a static domain (`syedghani.is-a.dev`), **not Vercel** — so this repo's own `api/leetcode.js` can never run in production (no serverless functions on GitHub Pages). That's exactly why the user stood up a separate Vercel project for the proxy. `useLeetCodeStats` must call that external deployed proxy directly, not a relative `/api/leetcode` path.

## Part 1 — Hero rebuild (`src/components/sections/HeroSection.jsx`)

Full replacement of the current centered-photo/orbit hero (that treatment is superseded, not extended):

- **Layout**: full-bleed two-zone hero. Right side (majority width on desktop, full-bleed on mobile): large rectangular photo panel (`resumeData.photo`), `object-fit: cover`, bleeding to the section's edges — not circular, not small.
- **Photo tinting**: an overlay div on top of the `<img>` using a gold/copper gradient with `mix-blend-mode: color` (or `overlay`) plus a subtle vignette, so the photo reads as integrated with the palette rather than a plain cutout — mirrors the reference's duotone treatment but in the site's own gold instead of orange.
- **3D tilt**: reuse the existing `useTilt3D` hook (`src/hooks/useTilt3D.js`, already built and used by `Card`) on the photo panel — mouse-move perspective tilt. Gated by the same `usePointerFine`/`usePrefersReducedMotion` checks already inside that hook.
- **Giant background wordmark**: an oversized, heavy-weight, low-opacity outline/tint text of the surname ("GHANI"), bleeding off the top edge behind the headline — pure CSS (`font-size: clamp(...)`, huge, `-webkit-text-stroke` or low-opacity fill), no new assets.
- **Copy**: trim the current headline/paragraph block down to a short 1–2 line tagline (keep `resumeData` content but display less of it up front — the rest already lives in About/Contact). Keep the typewriter role line — it's a nice detail worth preserving.
- **Floating widget cards** (both small, dark glass, rounded, `position: absolute` over the photo, subtle float via `framer-motion`):
  - A "project preview" chip (thumbnail + name, e.g. CinnaLab) that scroll-links to `#case-studies`.
  - A "Let's Talk" contact chip (small avatar-style dot + name/role + arrow) that scroll-links to `#contact` — this becomes the hero's primary CTA, replacing one of the two current buttons; keep "View Projects" as a simpler secondary link.
- **Crosshair grid texture**: small "+" marks at a few fixed grid intersections across the background — a tiny reusable inline SVG or CSS pattern (see Part 2, shared).
- **Drop**: the old `OrbitingPhoto` component, the hero's own `heroStats` row (redundant with `MetricsSection` immediately below, and was making the hero ~2 viewports tall) — remove the now-unused `heroStats` export from `src/data/sectionsData.js` if nothing else references it.
- Keep: the existing background parallax layer/blobs as a subtler secondary layer behind the new tinted photo (still using `useScrollParallax`), availability badge, credibility strip (restyled smaller/corner-positioned like the reference's "©2026" detail).

## Part 2 — Whole-page visual language (shared, so it scales without a bespoke redesign per section)

- **Section watermark**: add an optional giant faint background word behind each section's title, implemented **once** in the shared `Section` component (`src/components/UI.jsx`) so it automatically applies everywhere `Section` is used (Skills, Process, TechStack, Experience, Testimonials, About, Contact, RailsShowcase, Gems) — e.g. a `watermark` prop defaulting to an uppercased short form of `title`, absolutely positioned, huge, low-opacity, `pointer-events: none`.
- **Crosshair/plus grid texture**: extract into a small reusable CSS class (e.g. `.crosshair-grid` in `src/index.css`) — a few small "+" glyphs via `background-image` (SVG data-URI) repeated at a large tile size, very low opacity, gold-tinted. Apply to the Hero background and, subtly, to a couple of tinted section backgrounds (Gems, Skills, Contact) for cohesion. Cheap, no new components.
- Everything already built this session (tilt cards, flip cards, count-up stats, scroll parallax, skill orbit, isometric-style GitHub heatmap, testimonials coverflow) **stays** — this is additive polish on top, not a rebuild of those.

## Part 3 — Projects unification (small cards + modal + real screenshots)

**New: `src/utils/screenshot.js`** — `getScreenshotUrl(url)` returning a `https://api.microlink.io/?url=...&screenshot=true&meta=false&embed=screenshot.url` string (verified working via curl: returns `image/png`, `access-control-allow-origin: *`, cacheable). Used at render time, not baked into `resumeData.js`, so it stays a pure derived value from each project's existing real `url` field.

**New: `src/components/ProjectModal.jsx`** — generalizes the existing `TestimonialModal` pattern (`src/components/sections/TestimonialsSection.jsx`: fixed overlay, Escape-to-close, click-outside-to-close, close button) into a reusable modal that renders: larger screenshot, name (+ "Flagship" badge if `proj.flagship`), `problem` (if present, italic quote style — matches current `CaseStudiesSection` styling), `metrics` checklist (if present), `tech` pills, and a "Visit site" (or "View on GitHub" when no live `url`) link button. Conditionally renders sections based on what the passed project object actually has, so one component serves both case-study-shaped and personal-project-shaped data.

**New: small-card row pattern** (used in both sections) — horizontal flex row, `overflowX: auto`, `scrollSnapType: "x mandatory"`, each card `flexShrink: 0`, ~220px wide, `scrollSnapAlign: "start"`: real screenshot (via `getScreenshotUrl`, `onError` fallback to the existing gradient-placeholder pattern already used for the profile photo), name overlaid at the bottom via the existing gradient-scrim pattern already present in the codebase, tiny role/tag line. `onClick` opens `ProjectModal` with that project's data. Light `useTilt3D` on hover for consistency with the rest of the site's card language.

**`CaseStudiesSection.jsx`**: merge the current "Featured" (3, always-expanded) + "Additional" (2, flip-card) split into one list of all 5 case-study projects, rendered as the new small-card row + modal. Removes the old always-expanded big-card block and the `FlipCard` usage in this file (flip cards stay in `GemsSection` — untouched, not part of this ask).

**`ProjectsSection.jsx`**: same small-card-row + modal treatment for the 3 personal projects (no live URL for these — screenshot the GitHub repo URL instead, still real rather than a stock photo; modal's action button becomes "View on GitHub").

## Part 4 — LeetCode proxy fix (`src/hooks/useLeetCodeStats.js`)

Reorder the fallback chain: (1) the user's deployed proxy `https://leetcode-proxy-2.vercel.app/api/leetcode` (verified live, same GraphQL contract as this repo's own `api/leetcode.js`) as primary — replacing the relative `/api/leetcode` path, which can never resolve on this repo's actual GitHub Pages deployment; (2) `alfa-leetcode-api.onrender.com` as first fallback (unchanged); (3) add a final hardcoded-stats fallback so the UI never shows "unavailable" — reuse the exact numbers already sitting unused in `src/components/LeetCodeBadge.jsx`'s `FALLBACK_STATS` (that whole component is dead code, never rendered — just lift the constant, don't wire the component in). Delete `src/components/LeetCodeBadge.jsx` afterward since nothing will reference it (confirmed only self-referencing match currently).

## Verification

- `npm run dev` via the Browser pane; if screenshots/scroll don't composite (known flaky this session — see memory), fall back to `javascript_tool` DOM/computed-style checks and `read_network_requests` (confirm microlink.io requests return `image/png`, confirm the LeetCode proxy call hits `leetcode-proxy-2.vercel.app` and returns real stats or at least the hardcoded fallback renders).
- Toggle dark/light theme; check the new watermark/crosshair textures and tinted hero photo don't wreck contrast in light mode (reuse `C.secondary`/existing theme-aware tokens, avoid repeating the low-contrast-gold-text mistake from earlier this session).
- Resize to mobile width; confirm the hero's full-bleed photo and the small-card horizontal rows don't cause page-level horizontal overflow (the card rows should scroll internally via `overflowX:auto`, not spill the page).
- `npm run build` — confirm it still succeeds and check bundle size sanity.

### Verified (2026-08-14)

Found and fixed a pre-existing syntax error in `src/utils/resumeData.js` (missing comma after a newly-added testimonial entry) that was crashing the dev server and build entirely, unrelated to this rounds edits. Confirmed via DOM inspection: all 8 project cards (5 case studies + 3 personal) load real screenshots (`complete:true`, `naturalWidth:2560`) via the microlink.io API; hero renders the giant "GHANI" wordmark (204.8px), full-bleed tilted photo panel, and floating widget cards with no horizontal overflow; LeetCode stats render real numbers (35 solved, rank #3,174,284) via the fallback chain; section watermarks render correctly in both themes (0.035 opacity); clicking a project card opens ProjectModal with full case-study content and closes cleanly. `npm run build` succeeds (481 modules, 456.8 kB / 150 kB gzip).
