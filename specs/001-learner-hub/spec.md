# Feature Specification: Sprix × ALX Learner Hub

**Feature Branch**: `001-learner-hub`
**Created**: 2026-09-16
**Status**: Draft
**Input**: User description: "A simple, Vercel-hosted website for the ALX × SPRIX Edutech 6-week
Professional Development Internship Program where learners can find resources, understand the
program structure, contact the team, see a weekly top-performers leaderboard, and land on a
branded landing page. Must follow ALX brand guidelines, ALX patterns, UX best practices, and a
corporate-modern / Material-influenced design language."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the program at a glance (Priority: P1)

A learner who has just been accepted opens the link shared on the community channel. On the
landing page they immediately see what the program is (6-week blended internship by ALX ×
SPRIX Edutech), what they will gain (certificate, mastery project, mentorship), and where to go
next. From there they open the Program page and see the week-by-week journey (Week 0–6) with
the focus area, learning outcome, sessions and deliverable for each week, with the current week
highlighted.

**Why this priority**: This is the core reason the site exists; without it there is no hub.

**Independent Test**: Deploy only the landing page and the Program page; a first-time visitor can
state the program length, the five focus areas and this week's deliverable within 60 seconds.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on mobile, **When** the landing page loads, **Then** the hero shows
   the ALX × SPRIX lockup, program name, a one-line value proposition and a primary CTA
   "Explore the program".
2. **Given** the visitor opens the Program page, **When** today falls inside the cohort dates,
   **Then** the current week is visually marked "This week" and scrolled into view.
3. **Given** the visitor expands a week, **When** the details show, **Then** they see focus area,
   learning outcome, team session, expert session and project/demo deliverable.
4. **Given** today is before the cohort start or after its end, **Then** no week is marked current and
   a "Starts on …" / "Program completed" banner is shown instead.

---

### User Story 2 - Check the weekly leaderboard (Priority: P2)

A learner wants to see whether they made this week's top performers. They open Leaderboard,
see the latest week's top performers (podium for top 3 + ranked list), and can switch to earlier
weeks.

**Why this priority**: Drives weekly engagement and return visits, but the hub is useful without it.

**Independent Test**: With a published Google Sheet containing two weeks of data, the page shows
the latest week by default and lets the user switch to the previous week.

**Acceptance Scenarios**:

1. **Given** the sheet has data for weeks 1–3, **When** the page loads, **Then** week 3 is shown by default.
2. **Given** the ALX team edits the sheet, **When** ≤ 15 minutes pass, **Then** the site reflects the change without a redeploy.
3. **Given** the sheet is unreachable or empty for a week, **Then** a friendly "Leaderboard will be published soon" state is shown and the rest of the page works.
4. **Given** two learners have equal points, **Then** they share the same rank.

---

### User Story 3 - Find resources (Priority: P2)

A learner needs the ALX LMS link, a session recording, a template or the mastery project brief.
They open Resources, filter by week or type, and open the link in one click.

**Why this priority**: High-frequency need during the program; reduces repeated questions to the team.

**Independent Test**: With a resources file of ≥ 10 items, a user can find "Week 2 Problem Research
Brief template" in under 15 seconds using the week filter.

**Acceptance Scenarios**:

1. **Given** the Resources page, **When** a week filter is chosen, **Then** only resources for that week plus "General" are listed.
2. **Given** a resource card, **Then** it shows title, type icon (Link, Video, Document, Template), week tag and a clear action ("Open", "Watch", "Download"); external links open in a new tab and are announced as such.
3. **Given** no resources match, **Then** an empty state suggests clearing the filter.

---

### User Story 4 - Contact the right person (Priority: P3)

A learner has a question and needs to know who to contact and how. They open Team, see each
team member's photo/avatar, role and what to contact them about, plus the preferred channel
(community channel first, email second).

**Why this priority**: Important but low-frequency; the community channel already exists.

**Independent Test**: A learner can identify who to ask about "LMS login issue" vs "mentorship session" from the Team page alone.

**Acceptance Scenarios**:

1. **Given** the Team page, **Then** each card shows name, role, "Contact me about…" and at least one contact action.
2. **Given** a contact action, **When** activated, **Then** it opens the correct `mailto:` / channel URL.
3. **Given** the page, **Then** a top banner points to the community channel as the fastest route for general questions.

---

### Edge Cases

- Google Sheet returns HTML (unpublished) instead of CSV → treated as unavailable, empty state shown.
- Sheet rows with missing name or non-numeric points → row skipped, others rendered.
- Cohort dates not yet configured → no "current week" highlighting, no crash.
- Very long names → truncated with ellipsis, full name in `title`.
- JavaScript disabled → all content except filters is still readable (server-rendered).
- SPRIX logo file missing → text wordmark fallback.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST have five routes: `/` (Home), `/program`, `/resources`, `/leaderboard`, `/team`, plus a branded 404.
- **FR-002**: A persistent header MUST show the ALX × SPRIX lockup and navigation to all routes, collapsing into an accessible menu below 768 px, and indicate the current page.
- **FR-003**: Home MUST include: hero with primary CTA, "What you'll gain" (certificate, mastery project, mentorship & expert sessions), five Key Focus Areas, "How it works" (online self-paced on ALX LMS / in-person workshops / mentorship), a 6-week timeline preview, a leaderboard teaser (top 3 of latest week), and a footer.
- **FR-004**: Program MUST render Weeks 0–6 from `src/content/program.ts` with: week number, focus area/course code, learning outcome, team session, expert session, project/demo deliverable.
- **FR-005**: Program MUST compute the current week from a configurable cohort start date.
- **FR-006**: Resources MUST be filterable by week (All, General, Week 0–6) and by type, with filter state reflected in the URL query.
- **FR-007**: Leaderboard MUST read a published Google Sheet CSV (URL in env var `LEADERBOARD_CSV_URL`), revalidate at most every 15 minutes, default to the latest week, and allow selecting earlier weeks.
- **FR-008**: Leaderboard MUST display only display names (first name + last initial), rank, points and optional highlight badge.
- **FR-009**: Team MUST render members from `src/content/team.ts` with name, role, responsibility, avatar (photo or flat vector fallback) and contact links.
- **FR-010**: The site MUST NOT contain any pricing, payment terms or commercial information from the proposal.
- **FR-011**: All pages MUST meet the constitution's accessibility, brand and performance rules.
- **FR-012**: Each page MUST have a unique title, meta description and Open Graph image using the ALX × SPRIX lockup.

### Key Entities

- **Week**: number (0–6), title, courseCode (e.g. "PF-1"), learningOutcome, teamSession, expertSession, deliverable, format (in-person / blended).
- **Resource**: id, title, description, type (link | video | document | template), week (0–6 | "general"), url, isExternal.
- **TeamMember**: name, role, responsibility ("Contact me about…"), avatar, email?, channelUrl?.
- **LeaderboardEntry**: week, name, points, badge? (rank derived).
- **CohortConfig**: startDate, communityChannelUrl, lmsUrl.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can find this week's deliverable in ≤ 2 clicks / ≤ 30 seconds.
- **SC-002**: Lighthouse mobile scores ≥ 90 on all four categories for every route.
- **SC-003**: 0 critical/serious axe accessibility violations on every route.
- **SC-004**: ALX team can update the leaderboard with no code change, visible on site within 15 minutes.
- **SC-005**: Non-developers can update resources/team by editing a single content file.
- **SC-006**: Layout renders correctly from 360 px to 1440 px wide with no horizontal scroll.

## Assumptions

- The site is in **English** for v1; copy is kept in content files so an Arabic/RTL version can be added later.
- No login: all content is public to anyone with the link; nothing confidential is published.
- The ALX team provides: SPRIX logo, team details, resources list, cohort start date, community channel URL, and a published Google Sheet for the leaderboard.
- The official ALX logo (SVG) is obtained from ALX brand assets / alxafrica.com.
- Hosting on Vercel's free/hobby or team plan; default `*.vercel.app` domain unless a custom domain is supplied.
- One cohort at a time; multi-cohort support is out of scope for v1.
