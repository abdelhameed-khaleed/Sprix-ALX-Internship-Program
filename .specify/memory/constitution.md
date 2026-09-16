# Sprix × ALX Learner Hub Constitution

## Core Principles

### I. Simplicity First (NON-NEGOTIABLE)
The site is an information hub, not an application. No authentication, no database, no CMS,
no backend beyond what Vercel provides out of the box. Every dependency must justify itself;
if plain HTML/CSS or a built-in Next.js feature does the job, use that. A learner must reach
any piece of information in **≤ 2 clicks** from the landing page.

### II. ALX Brand Fidelity (NON-NEGOTIABLE)
The ALX Brand Guidelines (V2.26) are binding:
- Typeface: **Poppins** only — Bold for headlines/heroes, Regular for body, Light for feature numbers.
- Colour hierarchy: Deep Navy `#03134F` (dominant) → Twilight Blue `#0452F0` (primary action) →
  White `#FFFFFF` / Off-white `#F8F8F8` → Black `#1C1F2A` (text) → accents used sparingly:
  Purple `#5F3DC4`, Jungle Green `#02B75E`, Sunflower `#EAB308`, and the pastel tints
  Icy Blue `#C5E5FF`, Pale Sky `#EBF6FF`, Lavender `#E9DBFF`, Lime `#C4E878`, Jasmine `#FDE791`.
- Logo: never recoloured, rotated, shadowed, outlined, cropped or placed on a gradient; clear
  space = one "x" height on every side; web formats SVG (preferred) or PNG.
- Partnership lockup: "Led by ALX" — ALX logo first (left), SPRIX logo aligned to the ALX logo's centre line,
  optically equal visual weight, separated by the blue "×" mark.
- Decorative graphics come only from the official ALX pattern set (`/public/brand/patterns`).
- Photography (if used): authentic, positive, diverse; duotone only with two ALX-palette colours.
Where the requested "corporate-modern" style conflicts with the guidelines (e.g. orange/teal
accents), **the guidelines win**: orange → Sunflower, teal → Jungle Green.

### III. Accessible & Intuitive UX
- WCAG 2.2 AA: text contrast ≥ 4.5:1 (≥ 3:1 for large text/UI), visible focus rings, full keyboard
  navigation, semantic landmarks, alt text, `prefers-reduced-motion` respected.
- Jungle Green, Sunflower and pastels are never used as a background for white text.
- Mobile-first: learners mainly use phones. Touch targets ≥ 44×44 px; no horizontal scroll at 360 px.
- One primary CTA per section; consistent navigation on every page; current page indicated.

### IV. Content as Data
All program content (weeks, resources, team, FAQs) lives in typed files under `src/content/`,
never hard-coded in components. Non-developers must be able to update copy by editing one file.
The leaderboard is sourced from a published Google Sheet so the ALX team updates it without a deploy.

### V. Resilience & Performance
- Pages are statically generated; the leaderboard uses ISR (revalidate ≤ 15 min).
- If the Google Sheet is unreachable or malformed, the leaderboard shows the last good build
  or a friendly empty state — never a crash.
- Lighthouse (mobile) ≥ 90 for Performance, Accessibility, Best Practices and SEO.

## Content & Privacy Constraints
- Only the program content and weekly cadence from the proposal are published. **Pricing, payment
  terms and commercial scope must never appear on the site or in the public repository.**
- Learners are recent high-school graduates: the leaderboard shows first name + last initial only,
  no emails, phone numbers or IDs.
- Team contact details are limited to what the team explicitly approves for publication.

## Development Workflow
- Spec-kit flow: constitution → spec → plan → tasks → implement.
- Implementation tasks may be delegated to the Antigravity CLI (`agy`, model `gemini-3.8-flash`);
  Claude reviews every diff against this constitution before it is committed.
- Every accepted change is committed with a descriptive message and pushed to GitHub; Vercel
  deploys `main` to production and every other branch to a preview URL.
- Quality gates before merge: `npm run lint`, `npm run build`, unit tests pass, manual keyboard
  and 360 px mobile check.

## Governance
This constitution supersedes other practices for this project. Amendments require updating this
file, bumping the version, and noting the reason in the commit message.

**Version**: 1.0.0 | **Ratified**: 2026-09-16 | **Last Amended**: 2026-09-16
