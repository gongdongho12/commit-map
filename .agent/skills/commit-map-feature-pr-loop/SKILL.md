---
name: commit-map-feature-pr-loop
description: Plan and implement focused feature PRs for the commit-map Astro travel site. Use when Codex or a sub-agent is asked to turn travel-map ideas into small PR-ready branches, split work across agents, add UI/content features, or validate changes for this repository.
---

# Commit Map Feature PR Loop

## Overview

Use this skill to turn a commit-map feature idea into one small, reviewable PR. Keep each PR focused, preserve the existing Astro/React/Leaflet patterns, and validate with `npm run build`.

## Repository Rules

- Work from the current branch unless the coordinator assigns a feature branch.
- Do not commit `.serena/`, `dist/`, or unrelated local artifacts.
- Prefer explicit file staging over `git add -A`.
- Do not revert user or other-agent changes. If files changed by another agent overlap, adapt or stop with a clear conflict note.
- Treat `src/content.config.ts` as the active content schema. Do not edit `src/content/config.ts`.
- Avoid Markdown syntax such as `**bold**` inside frontmatter string fields because those strings render as plain text in cards and location content.
- Run `npm run build` before final handoff. Mention any existing debug output separately rather than treating it as a failure.

## PR Shape

Each PR should have:

- One user-visible feature or one cohesive UX improvement.
- A terse commit title, for example `feat: add travel stats summary`.
- A short PR body with: what changed, why, validation, and screenshots only when requested or useful.
- No broad refactors unless they are necessary for the feature.

## Feature Slices

Choose one slice per agent or PR. See `references/backlog.md` for candidate tasks and suggested file ownership.

Good first slices:

- Travel stats summary on the home page.
- Country archive pages.
- Place-type filters for map-heavy views.
- Post detail route animation.

## Implementation Workflow

1. Read the relevant files before editing. For UI work, inspect `src/pages/index.astro`, `src/pages/timeline.astro`, `src/pages/posts/[slug].astro`, and `src/components/map/*` only as needed.
2. Define the exact write scope in the first status update.
3. Implement conservatively using existing styles and data structures.
4. Keep mobile behavior in mind for any visible UI.
5. Run `npm run build`.
6. Stage only changed files for this feature.
7. Commit with a focused message.
8. Report changed files, validation, branch, and commit hash.

## Frontend Taste

- Build the real usable UI, not explanatory copy.
- Keep operational UI quiet and scannable.
- Use compact cards, tabs, chips, toggles, and controls that match the current app.
- Do not add decorative gradient blobs or oversized marketing sections.
- Keep text fitting within cards and buttons on mobile.
