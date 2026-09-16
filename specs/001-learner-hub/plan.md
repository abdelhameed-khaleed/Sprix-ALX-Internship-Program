# Implementation Plan: Sprix × ALX Learner Hub

**Branch**: `001-learner-hub` | **Date**: 2026-09-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-learner-hub/spec.md`

## Summary

A statically generated, five-page Next.js site on Vercel. Program, resources and team content live
in typed TypeScript files; the leaderboard is read from a published Google Sheet CSV on the
server with ISR so ALX staff update it without deploying. UI follows the ALX Brand Guidelines
(Poppins, Deep Navy / Twilight Blue hierarchy, official patterns) expressed through a
corporate-modern, Material-influenced component set: elevated cards, bold headlines, generous
whitespace, solid rounded CTAs, alternating text/visual sections.

## Technical Context

**Language/Version**: TypeScript 5.x, Node 22 (local v22.18.0)
**Primary Dependencies**: Next.js 15 (App Router), React 19, Tailwind CSS 4, `next/font` (Poppins), `lucide-react` (minimal icons), `papaparse` (CSV)
**Storage**: None. Content in `src/content/*.ts`; leaderboard from a published Google Sheet CSV
**Testing**: Vitest for pure logic (CSV parsing, ranking, current-week calc); `next build` + ESLint; manual axe DevTools + Lighthouse pass
**Target Platform**: Vercel (Edge CDN, ISR); evergreen mobile & desktop browsers
**Project Type**: Web application (frontend only)
**Performance Goals**: Lighthouse mobile ≥ 90 all categories; LCP < 2.5 s on 4G; JS < 150 KB gz per route
**Constraints**: No auth/DB; no pricing content; WCAG 2.2 AA; 360 px minimum width
**Scale/Scope**: 1 cohort (≈50–150 learners), 5 routes + 404, ~10 components

## Constitution Check

| Principle | How the plan complies | Status |
|-----------|----------------------|--------|
| I. Simplicity | Static Next.js, no backend/auth/DB/CMS; 5 routes, everything ≤ 2 clicks | ✅ |
| II. Brand fidelity | Design tokens = ALX palette only; Poppins via `next/font`; official patterns; "Led by ALX" lockup; orange/teal mapped to Sunflower/Jungle Green | ✅ |
| III. Accessible UX | Semantic HTML, focus-visible rings, contrast-checked token pairs, mobile-first, reduced motion | ✅ |
| IV. Content as data | `src/content/{program,resources,team,site}.ts`; Google Sheet leaderboard | ✅ |
| V. Resilience/perf | SSG + ISR (900 s), safe CSV parsing with fallback empty state | ✅ |
| Privacy | Proposal PDF stays outside the repo; display names only | ✅ |

No violations — Complexity Tracking not required.

## Design System (ALX-aligned)

| Token | Value | Use |
|-------|-------|-----|
| `navy` | `#03134F` | Header/footer bg, headlines, dark hero sections |
| `blue` | `#0452F0` | Primary buttons, links, active nav, focus ring |
| `ink` | `#1C1F2A` | Body text |
| `surface` / `surface-alt` | `#FFFFFF` / `#F8F8F8` | Page bg / alternating sections |
| `sky` / `icy` | `#EBF6FF` / `#C5E5FF` | Card tints, "This week" highlight |
| `green` | `#02B75E` | Accent lines, success, podium #1 marker (never text bg for white) |
| `sun` | `#EAB308` / `jasmine #FDE791` | Leaderboard gold, highlight chips (navy text) |
| `purple` / `lavender` | `#5F3DC4` / `#E9DBFF` | Expert-session tags |

- **Type scale** (Poppins): Display 48/56 Bold · H1 36/44 Bold · H2 28/36 Bold · H3 20/28 SemiBold · Body 16/26 Regular · Small 14/22 · Stat 48 Light.
- **Shape & elevation**: radius 12 px cards, 999 px (pill) or 10 px buttons; Material elevation 1 (rest) → 3 (hover) shadows; 8 px spacing grid; max content width 1200 px.
- **Buttons**: Primary = solid blue, white text; Secondary = navy outline; Tertiary = text link with arrow. Min height 44 px.
- **Patterns**: ALX pattern tiles used as decorative corners in hero and section dividers (`aria-hidden`), never behind body text.
- **Imagery**: flat vector avatars for team fallback; professional photos only if ALX-approved.

## Page Architecture

```
Home (/)
 ├─ Hero: lockup · "6-Week Professional Development Internship" · CTA Explore program · secondary CTA Open ALX LMS
 ├─ What you'll gain (3 elevated cards)
 ├─ Key focus areas (5 icon cards)
 ├─ How it works (text ⇄ visual alternating: LMS · Workshops · Mentorship)
 ├─ Your 6-week journey (horizontal stepper preview → /program)
 ├─ This week's top performers (top 3 → /leaderboard)
 └─ Need help? (community channel CTA → /team)
Program (/program)   : cohort banner · vertical timeline Week 0–6 (accordion cards, current week open)
Resources (/resources): quick links bar (LMS, community) · week chips + type filter · resource cards grid
Leaderboard (/leaderboard): week selector · podium (1–3) · ranked table (4–10) · "how points work" note
Team (/team)          : "Fastest help: community channel" banner · member cards · FAQ (3–5 items)
```

## Leaderboard Data Contract

Published Google Sheet (File → Share → Publish to web → CSV), one tab, header row:

| week | name | points | badge |
|------|------|--------|-------|
| 1 | Mariam A. | 95 | Most consistent |

- Server fetch in `src/lib/leaderboard.ts` with `next: { revalidate: 900 }`.
- Validation: `week` int 1–6, `name` non-empty (trimmed, max 40 chars), `points` numeric; invalid rows dropped.
- Rank = dense ranking by points desc within a week; show top 10.
- Failure (non-200, HTML body, zero valid rows) → `{ status: "unavailable" }` → empty state.

## Project Structure

### Documentation (this feature)

```text
specs/001-learner-hub/
├── spec.md
├── plan.md
└── tasks.md
```

### Source Code (repository root)

```text
website/
├── public/brand/
│   ├── alx-logo.svg
│   ├── sprix-logo.(svg|png)
│   └── patterns/            # copied from Work/ALX branding/Patterns
├── src/
│   ├── app/
│   │   ├── layout.tsx        # fonts, header, footer, metadata
│   │   ├── page.tsx          # Home
│   │   ├── program/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── leaderboard/page.tsx
│   │   ├── team/page.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css       # Tailwind + ALX tokens
│   ├── components/
│   │   ├── layout/ (Header, MobileNav, Footer, Lockup)
│   │   ├── ui/ (Button, Card, Section, Badge, EmptyState)
│   │   ├── program/ (WeekTimeline, WeekCard, JourneyStepper)
│   │   ├── resources/ (ResourceFilters, ResourceCard)
│   │   ├── leaderboard/ (Podium, RankTable, WeekSelect)
│   │   └── team/ (MemberCard, FaqList)
│   ├── content/ (site.ts, program.ts, resources.ts, team.ts)
│   └── lib/ (leaderboard.ts, current-week.ts)
├── tests/ (leaderboard.test.ts, current-week.test.ts)
├── .env.example              # LEADERBOARD_CSV_URL, NEXT_PUBLIC_COHORT_START
└── README.md                 # how to edit content & leaderboard, deploy
```

**Structure Decision**: Single Next.js project inside `Work/Sprix-ALX program/website/`, its own git
repo (`github.com/abdelhameed-khaleed/Sprix-ALX-Internship-Program`), excluded from the vault repo
via `.gitignore`. The proposal PDF lives one level up, so it is never committed or deployed.

## Delegation Strategy

| Work | Owner |
|------|-------|
| Spec, plan, design tokens, content extraction, CSV/ranking logic review, final QA | Claude |
| Scaffolding, components, pages, tests (well-specified tasks) | `agy` · `gemini-3.8-flash-high` |
| Every delegated diff | Reviewed by Claude against constitution → commit → push |

## Deployment

1. Push to GitHub `main`.
2. Import the repo in Vercel (framework auto-detected), set `LEADERBOARD_CSV_URL` and `NEXT_PUBLIC_COHORT_START`.
3. Branches → preview URLs; `main` → production.
