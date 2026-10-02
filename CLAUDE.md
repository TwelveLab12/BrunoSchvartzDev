# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio/CV site for Bruno Schvartz (front-end developer, job-seeking), deployed at
https://brunoschvartz.dev on Vercel (custom domain via Cloudflare DNS, apex is canonical — see
`docs/adr/0008-vercel-apex-canonical.md`). The public site is statically rendered — no database
(`docs/adr/0002-nextjs-static-rendering.md`). The one exception is `/admin`: a NextAuth-gated
(LinkedIn OAuth, owner-only) dynamic area that writes blog Markdown straight to this repo via
GitHub's Contents API (`docs/adr/0011-blog-admin-architecture.md`), usable only in production and
local, not on Vercel previews (`docs/adr/0014-admin-production-et-local-uniquement.md`). The
printed/exported CV is not a maintained PDF file; it's a second React tree
(`components/cv-print.tsx`) toggled via `@media print`, rendered from the same content as the web
page.

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
vrp a11y         # axe-core on the served site — run `vrp build`, then `vrp start` in another terminal
```

There is no test suite in this repo (`vrp a11y` is a rendered-output check, not a test suite;
locally set `PLAYWRIGHT_CHANNEL=chrome` to reuse your installed Chrome instead of downloading
Chromium). Before every commit, `vrp typecheck`, `vrp lint`, and `vrp build` must all be clean —
this is the project's baseline, not optional. `vrp lint` includes
the `jsx-a11y` `strict` ruleset: an a11y lint error is a real defect — fix it, and never add an
`eslint-disable` for a `jsx-a11y` rule without a comment saying why (see `components/ui/button.tsx`
for the one existing example). A pre-commit hook (Husky + lint-staged) also runs Prettier/ESLint
automatically on staged files.

## Architecture

- **`content/profile.ts`** is the single source of truth for every piece of site text: bio,
  experience, projects, skills, and the printed CV's content. Components must never hardcode text
  that belongs here — see `docs/adr/0006-centralized-content.md`.
- **Derived facts shown on the site are computed at build time from their real source, never
  typed by hand as a string that drifts** — e.g. the ADR count in `components/home/site-case.tsx`
  (`getAdrCount()` in `lib/docs.ts`) and the years-of-experience figures in `profile.proofs`
  (`yearsSince(CAREER_START_YEAR)` / `yearsSince(REACT_START_YEAR)` in `content/profile.ts`, also
  reused by `app/layout.tsx`'s metadata description). Adding a new stat to the site? Check whether
  it's derivable from something already in this repo (a folder, a date, a list) before typing a
  number — if it is, compute it, don't hardcode it. Exception: a blog post's prose
  (`content/blog/*.md`) is a dated artifact — leave stated durations as written, don't templatize
  published articles.
- **`components/home/`** — homepage sections (Hero, Stack, CaseStudies with its
  `CaseStudyDiagram` SVG schematics, Experience, Recommendations, SiteCase, Contact, SiteHeader
  with its `MobileNav`), assembled in `app/page.tsx`. **`components/ui/`** — reusable primitives
  (Button via CVA, PrintButton). Standalone pieces (`Wordmark`, `SectionLabel`, `CvPrint`,
  `ErrorPage`, `SocialIcons`) live directly under `components/`.
- **`app/admin/`** (login, post list, post editor) and **`app/blog/`** (public list + article
  pages, reading `content/blog/*.md` via `lib/blog.ts`) implement the blog described by
  `docs/adr/0011-blog-admin-architecture.md`. `proxy.ts` (Next.js 16's rename of `middleware.ts`)
  gates `/admin/:path*` behind the NextAuth session; `docs/adr/0012-admin-401-403-scope.md` covers
  the 401/403 handling specific to this area.
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
- **Error handling** on the public site uses only the standard Next.js trio (`app/not-found.tsx`,
  `app/error.tsx`, `app/global-error.tsx`) — no custom 401/403/500 there, nothing outside `/admin`
  can trigger them (`docs/adr/0010-error-page-strategy.md`). `/admin` is the one area that can hit
  401/403: `proxy.ts` redirects an unauthenticated visitor to `/admin/login`, and a wrong LinkedIn
  account is bounced to `/admin/error` — both reuse the `components/error-page.tsx` shell rather
  than a dedicated 401/403 file or route (`docs/adr/0012-admin-401-403-scope.md`). `not-found.tsx`/
  `error.tsx`/the admin interstitials share that shell; `global-error.tsx` deliberately does not
  use it, since it must keep rendering even if a shared component is what crashed the root layout.
- **CI** (`.github/workflows/ci.yml`) runs typecheck/lint/build on every push and PR, and reports
  status to Vercel as a named Deployment Check that gates production promotion
  (`docs/adr/0009-vercel-deployment-checks.md`) — the check name must stay in sync with whatever is
  selected in the Vercel project's Deployment Checks settings, which lives outside this repo. A
  separate `a11y` job in the same workflow (axe-core via `scripts/a11y.mjs` on the built site) is
  deliberately NOT reported to Vercel and runs with `continue-on-error`: it stays advisory until
  promoted to blocking, which would amend ADR 0009 and 0016.
- **Accessibility** is a project constraint, not a polish pass. Target: WCAG 2.2 AA, with the RGAA
  (4.1.2 until RGAA 5 ships) as the French reference grid — see
  `docs/adr/0016-accessibility-strategy.md`. Three layers, none sufficient alone: `jsx-a11y` strict
  rules in `eslint.config.mjs` (blocking, part of `lint:ci`); a rendered-output check with axe-core
  (advisory CI job, not reported to Vercel); and the manual checklist below for what tools can't
  see (focus order, screen reader, zoom/reflow). A green tool run is not a conformance claim — and
  this project deliberately doesn't publish one (ADR 0016).

## Accessibility checklist

Apply to every new component or page.

- **Structure**: one `<h1>` per page, no skipped heading levels; page-level `<header>`/`<nav>`/
  `<footer>` outside `<main>` (siblings, as in `app/page.tsx`); give each `<nav>` an `aria-label`.
  Every page's `<main>` carries `id="contenu"` — it is the target of the skip link in
  `app/layout.tsx`, which must stay the first focusable element.
- **Native first**: `<button>` for actions, `<a>` for navigation, `<ul>/<li>` for lists (tags,
  chips, jobs), `<time>` for dates. No `div onClick`.
- **Names**: every control has an accessible name; icon-only controls get a constant `aria-label`
  (don't swap the label _and_ `aria-expanded`); decorative icons `aria-hidden`; images: meaningful
  `alt`, decorative `alt=""`; an SVG that conveys information (e.g. an architecture diagram) needs
  `role="img"` + `aria-label`/`aria-labelledby`, and never encodes meaning by color alone — pair it
  with a shape/pattern difference and, where practical, a visible legend.
- **Color**: use `app/globals.css` tokens only; never convey information by color alone (keep link
  underlines).
- **Focus**: keep the global `:focus-visible` ring; never `outline-none` without an equally visible
  replacement; menus/disclosures return focus to their trigger on Escape/close, and keep their
  `aria-controls` target in the DOM (visibility toggled in CSS) so the id stays valid while closed;
  DOM order = tab order; no keyboard traps. A container that scrolls (`overflow-x-auto`…) must be
  keyboard-reachable: `tabIndex={0}` + `role="group"` + a constant `aria-label` (see
  `components/home/case-study-diagram.tsx`) — axe flags it otherwise (`scrollable-region-focusable`).
  Rendered Markdown (docs, blog, admin preview) must go through `components/markdown.tsx`, which
  already does this for code blocks and tables — never use `<ReactMarkdown>` directly.
- **Targets**: ≥ 24×24 CSS px (WCAG 2.5.8), prefer 44×44 for icon-only controls.
- **Motion**: no animation or smooth scroll outside `prefers-reduced-motion: no-preference`.
- **Reflow**: no horizontal scroll at 320 px; prefer `rem` over `px` for font sizes.
- **Forms** (admin): visible `<label>`, field borders ≥ 3:1 (`border-ink/55`), errors announced with
  `role="alert"` in `text-danger` (the only error color — red-600 failed 4.5:1). Fields get the global
  focus ring; never `outline-none`. A failed action must never wipe what was typed (WCAG 3.3.7):
  React 19 resets a `<form action>` after the action, so `PostEditor` submits through `onSubmit`.
- **Print CV** (`components/cv-print.tsx`): keep it semantic (`h2` sections, no `h1` — ADR 0005);
  hide it on screen with `hidden` (display:none), never `sr-only`; keep print colors ≥ 4.5:1.

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
  no code). Set it at creation (`gh issue create --label <type>`). Issues that touch accessibility
  also carry the `accessibility` topic label, in addition to (never instead of) the type label.
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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
