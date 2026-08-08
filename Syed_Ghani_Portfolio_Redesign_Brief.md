# Portfolio Redesign Brief — Syed M. Ghani
**Prepared for:** Design/dev editor handoff
**Purpose:** Rebuild syedghani.is-a.dev into a client-facing portfolio that wins trust from SaaS founders and hiring managers — local (Lahore/Pakistan), remote (global), and everything in between — while clearly proving deep Ruby on Rails proficiency alongside React.

---

## 1. The Problem With the Current Site

The current build (`sghani001/personal_portfolio`) is a dark, glassmorphic, anime-slash-transition, Spline-3D developer showcase. It's technically impressive and fine for a dev-to-dev audience, but it works against you with the actual buyer:

- **Wrong audience signal.** A hiring manager or founder evaluating "can I trust this person with my product/team" reads neon/glassmorphism/anime motifs as *hobbyist* or *personal project*, not *professional I'd hire or contract*. It competes with your credibility instead of building it.
- **No business framing.** The current site talks about "interactive 3D elements" and aesthetics first. A buyer wants: what have you built, what happened because of it, can you do that for me.
- **No clear CTA.** No obvious next step for someone ready to reach out — whether that's a Lahore HR manager reviewing candidates or a remote founder scouting contractors.
- **Generic visual language.** Even once "professionalized," a lot of dev portfolios default to the same blue-on-dark SaaS look. That makes you blend in exactly where you need to stand out. Section 5 below gives you a genuinely different, still-professional system.

The fix isn't "make it boring" — it's swap developer-flex signals for trust signals: real numbers, complete proof of your Rails and React depth, and a visual identity nobody else in your applicant pool is using.

---

## 2. Target Audience — Three Segments, One Site

This site now needs to work for three overlapping but distinct visitors. Structure content so each can self-serve without you needing three separate sites.

| Segment | Who they are | What they're checking for |
|---|---|---|
| **Lahore/local companies** | HR/technical leads at product studios and software houses (like Devsinc, Xavor, Staunch Global, Infinikorn-type companies) reviewing you as an in-office/hybrid hire | Solid Rails fundamentals, real production experience, culture fit, can start soon, local presence |
| **Remote-first companies & agencies** | Engineering managers at distributed teams hiring full-time remote Rails/React engineers | Proven remote-readiness, timezone overlap (GMT+5 with EU/US), async communication ability, ownership without supervision |
| **SaaS founders / small teams** | Non-technical or lightly-technical founders who need one engineer to build or extend their product | Can this person own something end-to-end with minimal hand-holding; low-risk, high-trust signals; case studies over jargon |

**Practical implication:** the hero and nav should not force a visitor to pick a lane. Instead, the *same* case studies and proof points should read correctly to all three — which they already do, since "sole engineer, zero critical incidents, zero-downtime migration" is exactly what all three audiences care about. Where segments diverge is mainly in secondary signals (see Section 4, About section, and Section 9 on the two CTAs).

---

## 3. Positioning & One-Line Value Prop

Use a single consistent positioning line across hero, LinkedIn, and resume — written to land with all three audiences above, not just remote-focused readers:

> **"Full-stack Ruby on Rails & React engineer who owns production SaaS systems end-to-end — in Lahore or fully remote."**

Supporting line (subhead):
> 2+ years shipping real production software across 6 SaaS products. Sole engineer on CinnaLab PRM, from architecture to CRM integrations to billing migration. Open to on-site/hybrid roles in Lahore and remote roles globally (GMT+5, EU/US overlap).

This explicitly removes the ambiguity that hurts you right now — a local recruiter shouldn't have to guess if you're "remote-only," and a remote hiring manager shouldn't assume you can't work async. Say both, plainly.

---

## 4. Site Structure (Sections, in Order)

1. **Hero**
   - One-line value prop (above) + subhead
   - Two CTAs: "View Projects" (scrolls to case studies) and "Get in Touch"
   - Availability line directly under the CTA row: `Open to: Full-time (Lahore, hybrid/on-site) · Remote (contract or full-time) · Available immediately`
   - Credibility strip under the fold: `6 SaaS Products Shipped · Sole Engineer on a Production PRM Platform · 4 Published Rails Gems · 5,900+ Gem Downloads`
   - No animated 3D hero. A clean static visual or subtle motion (e.g. a terminal/code snippet block, or an abstract geometric pattern using the new accent palette) is enough. Fast load beats flashy.

2. **Proof Strip (metrics row)**
   - `2+ Yrs in Production` / `6 Live SaaS Products` / `1 Solo-Owned Platform` / `4 Rails Gems, 5,900+ Downloads`
   - Fastest trust-builder on the page — keep visible without much scrolling.

3. **Rails Proficiency Showcase** *(new section — this is the fix for "show my Rails depth")*
   Right after the proof strip, before case studies, add a dedicated section proving Rails depth specifically — because your two existing resumes split full-stack vs. frontend, and the current site under-sells the backend/Rails side. This section should NOT be a skills tag-cloud; make it concrete:
   - **Architecture & scale:** multi-tenant Rails architecture, row-level tenancy, background job systems (Sidekiq, Redis, retry/DLQ handling), ActionCable/WebSockets for real-time features without polling
   - **Data & integrations:** bi-directional CRM sync (HubSpot, Salesforce) with conflict resolution and idempotent jobs, QuickBooks Online integration, PostgreSQL query optimization (cite the 40% search-speed win)
   - **Payments & billing infra:** Stripe, Paddle, Chargebee — including a full zero-data-loss Paddle→Chargebee migration
   - **Auth & security:** Devise + Pundit RBAC systems run in production with zero critical incidents; your `rails-guarddog` security scanner gem as direct proof you think about this beyond just "using" it
   - **Open-source Rails contributions:** a live, embedded widget or simple table pulling gem stats (this is a great differentiator — see Section 8)
   - Close this section with a single line: *"Rails isn't a framework I use — it's the one I build tooling for."* (backed by the gems)

4. **Case Studies — ALL Projects, Not Just the Top 3**
   Show the complete picture. Use two tiers so the page stays scannable: **Featured** (full detail cards) and **Additional Projects** (compact cards). This lets Lahore recruiters see breadth while remote/SaaS-founder readers can still skim to the strongest ones.

   **Featured (full case study cards, in this order):**
   - **CinnaLab PRM** — flagship. Sole engineer, 0→production in 8 months. React/Rails architecture, CRM sync, billing migration, RBAC, self-hosted Documenso/Moodle. Give this the most space — screenshots if available, or a clean architecture diagram.
   - **Controllr / Monthend** — real-time fintech data pipeline, GAAP job-costing, QuickBooks integration across 5 live modules with Turbo Streams. Proves financial/compliance-sensitive system experience.
   - **Intercollegiate** — 2,500+ listing job board, 40% faster faceted search via PostgreSQL indexing, geolocation filtering, ActiveAdmin recruiter dashboard. Proves performance/optimization depth at real scale.

   **Additional Projects (compact cards — one paragraph + tech tags each):**
   - **Docyt** — Stripe subscription microservice built from scratch, idempotent webhooks, PCI-aligned handling, reduced billing support escalations.
   - **Bullseye Education** *(from your frontend resume — include if you want full project breadth shown)* — real-time coaching feedback capture and principal/district analytics dashboard for K–12 instructional coaching, deployed across multiple school districts.
   - **Online Exam System** — multi-role exam platform (admin/teacher/student), Devise + Pundit RBAC, full create→approve→sit→grade lifecycle. Good personal-project proof point alongside client work.
   - **Urdu Signify** *(FYP)* — GAN/NLP-powered Urdu-to-Pakistan Sign Language animation system with a web demo interface. Strong differentiator — shows research/ML exposure, not just CRUD apps. Worth keeping visible for both local and global audiences; it's a distinctive story.

   **Format per featured case study** (structure that actually sells — keep consistent):
   - What the product/client needed (1 sentence)
   - What you built (2–3 bullets, technical but readable by a non-engineer)
   - The outcome, in numbers (zero critical incidents, 40% faster, zero data loss, etc.)
   - Tech tags as small pills, not paragraphs

5. **Open Source — All 4 Gems, Given Real Space**
   Don't bury these in a sidebar. Give each gem its own compact card (name, one-line purpose, version, download count, GitHub + RubyGems links):
   - **rails-guarddog** (v0.1.8) — security scanner: SQLi/XSS/secrets/mass-assignment detection
   - **rails-tenantify** (v0.1.2) — row-level multi-tenancy for Rails 7+, model/controller scoping, Sidekiq propagation
   - **rails-persona** (v0.2.7) — activity-tracking DSL: frequency, recency, inactivity queries
   - **rails-css_unused** (v0.2.1) — CSS optimizer, unused-selector detection across ERB/HAML/Slim/Stimulus
   - Combined downloads badge: **5,900+**
   - This section is one of your strongest global differentiators — very few candidates at your experience level have shipped and maintained multiple published packages. Local recruiters and remote hiring managers both weight this heavily; don't undersell it as a footnote.

6. **How I Work (process section)**
   Every audience segment worries about reliability and communication more than raw skill. Add a short 3–4 step "how engagements work" section, written so it reads correctly for both a full-time hire and a contract engagement:
   - Discovery/interview → scoping & architecture proposal (or onboarding, if full-time) → regular updates (async-friendly, works across GMT+5/EU/US overlap) → shipped, documented, handed off cleanly
   - This section does more to convert a skeptical hiring manager than another skills list.

7. **Tech Stack**
   Grouped, not a wall of tags:
   - **Backend:** Ruby on Rails 5/6/7, PostgreSQL, MySQL, Redis, Sidekiq, ActiveJob, ActionCable, Hotwire (Turbo Drive/Frames/Streams), Stimulus.js, OAuth 2.0, multi-tenant architecture
   - **Frontend:** React.js, JavaScript ES6+, Material UI, TailwindCSS, React Query, Redux Toolkit, React Router v6
   - **Payments & Integrations:** Stripe, Paddle, Chargebee, HubSpot, Salesforce, QuickBooks Online, Moodle LMS, Documenso
   - **Testing & DevOps:** RSpec, Jest, GitHub Actions CI/CD, AWS (IAM, VPC, EC2, RDS, S3, CloudWatch), Docker, Heroku, Linux
   - Keep this visually secondary to case studies and the Rails showcase — skills lists persuade the least on their own, but completeness matters for ATS-adjacent human screening at local companies who do keyword-scan portfolios too.

8. **About / Photo**
   - Professional headshot. 3–4 sentence bio.
   - Explicitly state Lahore base + remote-readiness + GMT+5 with EU/US overlap in one line — this single sentence is what lets both a Lahore recruiter and a Berlin founder self-qualify you instantly.
   - Education: B.Sc. Computer Science, UET Lahore (2020–2024), FYP note.

9. **Contact / CTA (final section, repeated from hero)**
   - Simple contact form (name, email, message, and a dropdown: "I'm hiring for: On-site/Hybrid (Lahore) / Remote Full-Time / Remote Contract" — small addition, but it immediately tells you which pitch to use in your reply)
   - Resume download — offer **both** your full-stack and frontend-focused PDFs as separate buttons ("Download Resume (Full-Stack)" / "Download Resume (Frontend)"), since you're targeting both role types
   - LinkedIn + GitHub icons

---

## 5. Visual Design System — A Distinct, Professional Theme

Blue-accent dark-mode developer sites are the default everywhere — Linear, Vercel, Stripe, and every clone of them. To stand out while staying credible to a business audience, use a **warm ink & copper** system instead: deep ink/graphite base (still feels "serious engineering," not garish) paired with a warm copper/amber accent (feels crafted, confident, and distinctly not "generic SaaS template"). This also happens to read well to a South Asian business audience without leaning on any cliché "cultural" motifs — it's simply a premium, editorial palette.

### Dark theme (default)
| Role | Color | Hex |
|---|---|---|
| Background | Deep ink, warm-toned (not pure black/navy) | `#161311` |
| Surface / cards | Raised warm charcoal | `#211D1A` |
| Border/divider | Low-contrast warm gray | `#332E29` |
| Primary text | Warm off-white | `#F3EFEA` |
| Secondary text | Muted warm gray | `#A69C92` |
| **Accent (primary)** | Burnished copper | `#D97B3F` |
| Accent (secondary, sparingly) | Deep amber for stat highlights | `#E8A54B` |
| Success/metric highlight | Muted sage green (used only for outcome numbers) | `#8FAE7F` |

### Light theme
| Role | Color | Hex |
|---|---|---|
| Background | Warm off-white (not stark white) | `#FBF8F5` |
| Surface / cards | White with warm undertone | `#FFFFFF` |
| Border/divider | Warm light gray | `#E7E0D8` |
| Primary text | Deep ink (matches dark bg, brand consistency) | `#211D1A` |
| Secondary text | Warm slate | `#6B6259` |
| **Accent (primary)** | Deeper copper for light-mode contrast | `#B85C24` |
| Accent (secondary) | Deep teal-green, used sparingly as a counterpoint to copper | `#3D6B57` |

**Rules for the editor:**
- Copper/amber is the ONE accent that drives CTAs, links, and stat numbers. Do not add blue back in anywhere — that's the exact sameness this palette is meant to avoid.
- The sage-green / teal-green is a strict accent-of-an-accent: use it only for "outcome" numbers (zero incidents, +40%, etc.) so positive results visually pop against the warm copper brand color. Never use it for CTAs or nav.
- No gradients-as-decoration, no neon glow/shadow effects, no glassmorphism blur panels. These read as "template" to a business audience regardless of color choice.
- Dark/light toggle should persist (localStorage) and default to system preference.

### Typography
- **Headings:** A confident geometric-humanist sans with some personality — *Fraunces* (for a serif display option that reads "premium/editorial") paired with *Inter* for a fully sans option. Recommend: **Space Grotesk** for headings (distinctive, not overused like Inter alone) + **Inter** for body — this pairing alone differentiates you from 90% of dev portfolios that use Inter everywhere.
- **Body:** Inter, 16–18px, 1.6 line-height.
- **Monospace accents** (tech tags, stat labels, gem version numbers): *JetBrains Mono* or *IBM Plex Mono* — the one place a "developer" typographic signal is appropriate.
- Scale: large confident hero heading (48–64px desktop), clear section headers (28–32px), body 16–18px.

### Layout & Motion
- Max content width ~1100–1200px, centered, generous side padding on mobile.
- Section spacing: large (96–120px between major sections) — this alone makes a site feel premium.
- Motion: subtle fade-up on scroll for cards (150–250ms, no bounce/elastic easing). No auto-playing animations. No 3D scenes.
- Case study and gem cards: consistent card component, hover = slight lift + copper border highlight, nothing more.

---

## 6. Content/Copy Rules for the Editor

- Every case study bullet should follow **"[Outcome], by [what you built]"** — this pattern is already how your resumes are written (e.g. "Cut search response time by 40%... by redesigning multi-dimensional faceted search"). Reuse it site-wide; it's your strongest asset.
- Never write a bullet that only describes what you did without the result. Result first, mechanism second.
- Keep case study copy skimmable — a hiring manager reading on their phone should get the gist in 10 seconds per card.
- Avoid dev-only jargon in headlines (e.g. "ActionCable-powered WebSocket notifications" is fine as a supporting detail, not a headline — headline should say "real-time notifications with zero downtime").
- For the gem cards, write purpose in plain language first, technical detail second — a non-technical founder should understand *why it matters* even if they don't know what SQLi/XSS mean.

---

## 7. Technical Requirements (free-cost stack)

- **Framework:** React + Vite (keeps your existing skillset) or Next.js if the editor wants built-in SEO/static generation — both free to host.
- **Styling:** Tailwind CSS, themed via config tokens matching Section 5's palette exactly (define as CSS variables so dark/light swap is a single toggle, not duplicated styles).
- **Hosting:** Vercel or Netlify free tier — more reliable and faster than GitHub Pages for a business-facing site, both support custom domains + HTTPS. Keep `syedghani.is-a.dev`, just repoint DNS.
- **Contact form:** Formspree or Web3Forms (free tier, no backend needed), with the "hiring for" dropdown from Section 4.9 wired into the submission.
- **Resume downloads:** Host both PDF versions (full-stack + frontend) as direct download links.
- **Analytics:** Free tier via Vercel/Netlify built-in analytics, or self-hosted Umami/free Google Analytics if you want more detail on which segment (local vs remote) is visiting more.
- **Performance target:** Lighthouse 90+ on mobile. Drop Spline entirely — meaningful load-time cost for near-zero trust-building value with any of the three target audiences.
- **SEO basics:** proper `<title>`/meta description, OpenGraph image (branded card using the new copper/ink palette, not a screenshot), sitemap, and make sure "Ruby on Rails Developer Lahore" and "Remote Rails React Engineer" type phrases appear naturally in copy/meta — this matters for local recruiter searches too, not just remote job boards.

---

## 8. Optional Differentiator: Live Gem Stats

Since you already planned a Rails API backend (Render) to serve live gem download stats (per your earlier architecture notes), this is worth prioritizing now — a live-updating "5,900+ downloads" counter or per-gem download chart is a small technical flourish that proves backend skill *on the portfolio itself*, which is a rare and effective trick. If time/budget is tight, a manually-updated static number is an acceptable fallback — don't let this block shipping the rest of the site.

---

## 9. What to Cut From the Current Site

- Spline 3D interactive scene (load-time cost, wrong signal for all three audiences)
- Anime character slash-transition animations
- Heavy glassmorphism/neon glow effects
- Generic "About the Project" framing — the site should read as "about Syed the engineer," not "about this codebase"

## 10. What to Keep

- Dark mode as default (still expected by a technical audience) — restrained per the new copper/ink palette, with a working light-mode toggle
- The `is-a.dev` custom domain
- React as the core framework
- All existing project substance — the redesign is about presentation, hierarchy, and completeness (showing ALL projects and gems), not needing new material

---

## 11. Deliverables Checklist for the Editor

- [ ] Hero section with dual-audience value prop, dual CTA, and explicit availability line (Lahore + remote)
- [ ] Metrics/proof strip
- [ ] Rails Proficiency Showcase section (new — see Section 4.3)
- [ ] 3 featured case study cards (CinnaLab, Controllr/Monthend, Intercollegiate) + compact cards for Docyt, Bullseye Education, Online Exam System, Urdu Signify
- [ ] All 4 gem cards with live or static download stats
- [ ] "How I Work" process section
- [ ] Grouped tech stack section
- [ ] About section with headshot and explicit Lahore/remote/GMT+5 line
- [ ] Contact form (with hiring-type dropdown) + both resume downloads + social links
- [ ] Light/dark theme toggle using the copper/ink palette in Section 5
- [ ] Mobile-responsive, Lighthouse 90+, deployed on Vercel/Netlify free tier with custom domain connected
- [ ] OpenGraph image using the new brand palette

---

*This brief is meant to be handed directly to a designer or developer. Case study copy, headshot, resume PDFs, and gem stats should be supplied alongside it.*