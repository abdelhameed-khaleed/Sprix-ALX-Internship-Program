# Tasks: Sprix × ALX Learner Hub

**Input**: Design documents from `/specs/001-learner-hub/`
**Prerequisites**: plan.md, spec.md

**Progress (2026-09-16)**: Setup and foundation done by Claude: scaffold, tokens, content (7-week structure per the spec amendment), current-week and leaderboard logic with 12 tests, and UI primitives. Layout + Home (T007–T011, T015–T016, T022) and the Program/Resources/Leaderboard/Team pages (T013–T014, T020–T021, T025–T026, T029–T030) are delegated to two parallel agy runs.

**Format**: `[ID] [P?] [Story] [Owner] Description`
- **[P]**: can run in parallel (different files, no dependencies)
- **Owner**: `C` = Claude · `G` = delegated to agy / gemini-3.8-flash-high, reviewed by Claude

## Phase 1: Setup

- [ ] T001 [C] Initialise git in `website/`, add remote `Sprix-ALX-Internship-Program`, add `website/` to the vault `.gitignore`
- [ ] T002 [G] Scaffold Next.js 15 + TypeScript + Tailwind 4 + ESLint (App Router, `src/` dir) in `website/`
- [ ] T003 [P] [G] Add Vitest config and `npm test` script
- [ ] T004 [P] [C] Copy ALX patterns to `public/brand/patterns/`; add ALX logo SVG and SPRIX logo (text fallback until provided)
- [ ] T005 [P] [C] Create `.env.example` and README (editing content, leaderboard sheet, Vercel deploy)

## Phase 2: Foundational (blocks all stories)

- [ ] T006 [C] Define ALX design tokens, type scale, elevation and focus styles in `src/app/globals.css`
- [ ] T007 [G] Load Poppins (300/400/600/700) via `next/font` and base metadata in `src/app/layout.tsx`
- [ ] T008 [P] [G] UI primitives in `src/components/ui/`: Button, Card, Section, Badge, EmptyState
- [ ] T009 [P] [G] Layout in `src/components/layout/`: Lockup, Header (active state), MobileNav (accessible disclosure), Footer
- [ ] T010 [C] Write `src/content/site.ts` (cohort start, LMS URL, community URL) and `src/content/program.ts` (Weeks 0–6 from proposal; no pricing)
- [ ] T011 [G] Branded `src/app/not-found.tsx`

**Checkpoint**: Shell with header/footer, tokens and content files ready.

## Phase 3: User Story 1 — Understand the program (P1) 🎯 MVP

- [ ] T012 [P] [US1] [G] `src/lib/current-week.ts` + `tests/current-week.test.ts` (before start / during / after)
- [ ] T013 [P] [US1] [G] `WeekCard` + `WeekTimeline` (accordion, current week open & marked) in `src/components/program/`
- [ ] T014 [US1] [G] `src/app/program/page.tsx` with cohort banner and timeline
- [ ] T015 [P] [US1] [G] `JourneyStepper` preview component
- [ ] T016 [US1] [G] Home `src/app/page.tsx`: hero, gains, focus areas, how it works, journey preview, help CTA
- [ ] T017 [US1] [C] Review: brand, contrast, 360 px, keyboard → commit & push

## Phase 4: User Story 2 — Weekly leaderboard (P2)

- [ ] T018 [US2] [C] `src/lib/leaderboard.ts` (fetch CSV, validate, dense rank, ISR 900 s, unavailable state)
- [ ] T019 [P] [US2] [G] `tests/leaderboard.test.ts` (valid, ties, bad rows, HTML response, empty)
- [ ] T020 [P] [US2] [G] `Podium`, `RankTable`, `WeekSelect` in `src/components/leaderboard/`
- [ ] T021 [US2] [G] `src/app/leaderboard/page.tsx` (default latest week, `?week=` param, empty state)
- [ ] T022 [US2] [G] Home teaser: top 3 of latest week
- [ ] T023 [US2] [C] Create sample Google Sheet template + review → commit & push

## Phase 5: User Story 3 — Resources (P2)

- [ ] T024 [US3] [C] `src/content/resources.ts` from the list you provide
- [ ] T025 [P] [US3] [G] `ResourceFilters` (week chips + type, synced to URL) and `ResourceCard`
- [ ] T026 [US3] [G] `src/app/resources/page.tsx` with quick-links bar and empty state
- [ ] T027 [US3] [C] Review → commit & push

## Phase 6: User Story 4 — Team contact (P3)

- [ ] T028 [US4] [C] `src/content/team.ts` from details you provide (+ FAQ)
- [ ] T029 [P] [US4] [G] `MemberCard` (photo or flat avatar fallback) and `FaqList`
- [ ] T030 [US4] [G] `src/app/team/page.tsx` with community-channel banner
- [ ] T031 [US4] [C] Review → commit & push

## Phase 7: Polish & Launch

- [ ] T032 [P] [G] Per-page metadata + Open Graph image
- [ ] T033 [C] Accessibility pass (axe) and Lighthouse mobile ≥ 90 on all routes; fix findings
- [ ] T034 [C] Verify no pricing/commercial text in repo (`grep -i "price|\$|payment"`)
- [ ] T035 [C] Vercel import guide + env vars; production smoke test

## Dependencies & Execution Order

- Phase 1 → Phase 2 → US1 (MVP) → US2 / US3 / US4 (independent, any order) → Polish.
- Within a phase, `[P]` tasks are delegated to agy together; Claude reviews each diff before commit.

## Implementation Strategy

1. **MVP**: Phases 1–3 → deploy a Vercel preview → your review.
2. **Increment**: Leaderboard → Resources → Team, each shipped as its own commit/preview.
3. **Launch**: Phase 7, then promote to production.
