# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio/CV site for Bruno Schvartz (front-end developer, job-seeking), deployed at
https://brunoschvartz.dev on Vercel (custom domain via Cloudflare DNS, apex is canonical — see
`docs/adr/0008-vercel-apex-canonical.md`). The entire site is statically rendered — no API routes,
no database, no authentication (`docs/adr/0002-nextjs-static-rendering.md`). The printed/exported
CV is not a maintained PDF file; it's a second React tree (`components/cv-print.tsx`) toggled via
`@media print`, rendered from the same content as the web page.

## Commands

Always use `vrp <script>` (= `volta run pnpm <script>`), not bare `pnpm` — this is the project's
convention throughout its history.

```bash
vrp dev          # dev server, Turbopack
vrp build        # production build
vrp start        # serve the production build
vrp lint         # eslint
vrp lint:ci      # eslint --max-warnings=0 (what CI runs)
vrp typecheck    # tsc --noEmit
vrp format       # prettier --write .
```

There is no test suite in this repo. Before every commit, `vrp typecheck`, `vrp lint`, and
`vrp build` must all be clean — this is the project's baseline, not optional. A pre-commit hook
(Husky + lint-staged) also runs Prettier/ESLint automatically on staged files.

## Architecture

- **`content/profile.ts`** is the single source of truth for every piece of site text: bio,
  experience, projects, skills, and the printed CV's content. Components must never hardcode text
  that belongs here — see `docs/adr/0006-centralized-content.md`.
- **`components/home/`** — homepage sections (Hero, Stack, Experience, CaseStudies, Contact,
  SiteHeader), assembled in `app/page.tsx`. **`components/ui/`** — reusable primitives (Button via
  CVA, PrintButton). Standalone pieces (`Wordmark`, `SectionLabel`, `CvPrint`, `ErrorPage`) live
  directly under `components/`.
- **`app/globals.css`** defines the design system as Tailwind v4 `@theme` tokens (colors, fonts) —
  no `tailwind.config.js`. A separate `--text-print-*`/`--color-print-*` token set exists
  specifically for the printed CV, distinct from the web palette.
- **`docs/`** is both the raw source of project documentation AND a live, non-indexed site section:
  `app/docs/[...slug]/page.tsx` renders every `.md` file found under `docs/` (including
  subdirectories) at `/docs`. Two categories exist today: `docs/dependencies.md` (what each
  `package.json` library does and why it's used here — check it before adding or evaluating a
  dependency) and `docs/adr/NNNN-*.md` (architecture decision records, Status/Context/Decision/
  Consequences format, sequentially numbered). Read the ADRs before making a structural or
  tooling change that might contradict one; write a new ADR for a new structural decision rather
  than editing an old one to bolt on an unrelated choice.
- **Error handling** uses only the standard Next.js trio (`app/not-found.tsx`, `app/error.tsx`,
  `app/global-error.tsx`) — no custom 401/403/500, nothing in this static/auth-less site can
  trigger them (`docs/adr/0010-error-page-strategy.md`). `not-found.tsx`/`error.tsx` share a
  `components/error-page.tsx` shell; `global-error.tsx` deliberately does not use it, since it must
  keep rendering even if a shared component is what crashed the root layout.
- **CI** (`.github/workflows/ci.yml`) runs typecheck/lint/build on every push and PR, and reports
  status to Vercel as a named Deployment Check that gates production promotion
  (`docs/adr/0009-vercel-deployment-checks.md`) — the check name must stay in sync with whatever is
  selected in the Vercel project's Deployment Checks settings, which lives outside this repo.

## Workflow conventions

- Every new development task — however small — starts with a GitHub issue. Create one if it
  doesn't already exist before writing any code, and reference it from the PR (e.g. `Closes #NN`).
  Immediately add it to the Project board (`gh project item-add 1 --owner TwelveLab12 --url
<issue-url>`) — an issue that isn't on the board doesn't count as tracked.
- Exception: Dependabot PRs don't get an issue or a board entry — they're not planned dev work, and
  a per-bump issue would just clutter the board. Merge directly (merge commit, not squash) once CI
  is green, for a minor/patch bump or an official GitHub Action at low risk. A major bump of an
  application dependency still deserves a look at the changelog before merging.
- Every issue carries exactly one type label: `bug` (defective behavior), `enhancement` (new
  feature or UX improvement), `documentation` (docs-only work), `chore` (tooling/infra/maintenance
  with no direct feature impact), or `content` (editorial copy changes — e.g. blog articles — with
  no code). Set it at creation (`gh issue create --label <type>`).
- One git branch and one PR per distinct concern. Don't stack unrelated changes onto a branch that
  already has an open PR for something else — branch from `main` again instead.
- Merge strategy: while a branch is open, keep it current with `git fetch origin && git rebase
origin/main` rather than merging `main` into it. Merge PRs into `main` with squash (GitHub's
  "Squash and merge", or `gh pr merge --squash`) — never a merge commit — so `main` stays one
  linear commit per PR. The Dependabot exception above still merges as a merge commit, which is
  fine since those PRs are single-commit anyway.
- Within a PR, split unrelated changes into separate commits, each with a single responsibility
  (e.g. an a11y fix and an SEO metadata change on the same file go in two commits, even done in the
  same session). This granularity is for review readability on the PR — squash-merging flattens it
  to one commit on `main`; the original commits stay visible on the closed PR on GitHub.
- After a PR merges, delete both branches (`git branch -d <branch>` locally; `gh pr merge --squash
--delete-branch` handles squash-merge + local/remote cleanup in one step).
- Keep `docs/dependencies.md` and `docs/adr/*.md` in sync proactively when dependencies or
  structural decisions change — as a dedicated commit folded into whatever branch/PR is already
  open, not automatically a separate PR (only spin up a standalone docs PR when nothing relevant is
  already in flight).
- The GitHub Project board (https://github.com/users/TwelveLab12/projects/1) is the reference for
  what's done and what's left — keep every issue's Status field in sync (À faire / En cours /
  Terminé) as work progresses, don't let the board drift from reality.
