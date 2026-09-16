# ALX × SPRIX Learner Hub

Website for the 7-week ALX × SPRIX Edutech Professional Skills Program. Learners use it to see the
program structure, their weekly rhythm, resources, the weekly top performers and who to contact.

Built with Next.js 15, Tailwind CSS 4 and TypeScript, and hosted on Vercel. It follows the ALX Brand Guidelines V2.26.

## Updating content (no coding needed)

All copy lives in `src/content/`. Edit a file, commit and push, and Vercel redeploys automatically.

| What | File |
|------|------|
| Program name, tagline, cohort start date, weekly schedule, completion requirements | `src/content/site.ts` |
| Week-by-week plan (dates, titles, outcomes, expert sessions, deliverables) | `src/content/program.ts` |
| Resources (links, platforms, templates) | `src/content/resources.ts` |
| Team members and FAQ | `src/content/team.ts` |

## Updating the leaderboard

The leaderboard reads a Google Sheet, so it updates without a redeploy.

1. Create a Google Sheet with this header row: `week, name, points, badge`
   (see `docs/leaderboard-template.csv`). Use **first name + last initial** only, e.g. `Mariam A.`.
2. **File → Share → Publish to web**: choose the sheet tab and **Comma-separated values (.csv)**, then copy the link.
3. In Vercel go to **Project → Settings → Environment Variables** and set `LEADERBOARD_CSV_URL` to that link. Redeploy once.
4. From then on, edits to the sheet appear on the site within about 15 minutes.

Rows with a missing name, a non-numeric score or a week outside 1–7 are skipped. Tied points share a rank.

## Local development

```bash
npm install
cp .env.example .env.local   # optional: add LEADERBOARD_CSV_URL
npm run dev                  # http://localhost:3000
npm test                     # unit tests
npm run lint && npm run build
```

## Deploying to Vercel

1. In Vercel, click **Add New → Project** and import `abdelhameed-khaleed/Sprix-ALX-Internship-Program`.
2. Keep the defaults, since Vercel detects Next.js automatically.
3. Add the `LEADERBOARD_CSV_URL` environment variable (optional; without it the page shows "coming soon").
4. Deploy. Pushes to `main` go to production, and other branches get preview URLs.

## Project docs

Spec-kit documents live in `specs/001-learner-hub/`, and the project rules are in `.specify/memory/constitution.md`.
