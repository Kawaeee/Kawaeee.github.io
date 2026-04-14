# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository context

This is Kasidech C.'s personal web portfolio (`Kawaeee.github.io`), being rebuilt in SvelteKit on the `svelte-dev` branch. Prior implementations live on sibling branches (`main` — Next.js, `vuejs-dev`, `nextjs-dev`, `flutter-dev`); `main` is the deployed Next.js version with pre-built assets in `docs/`. The `svelte-dev` branch starts from a fresh `sv create --template minimal --types ts` scaffold — treat it as greenfield.

### Product direction (this rewrite)

The portfolio is being reimagined as a **chat-application UI** (package name: `svelte-chat-portfolio`). Design decisions the user has already locked in:

- **Visual vibe:** Clean messenger look — LINE / iMessage style (bubble rows, avatar, timestamps, typing indicators).
- **Interaction model:** Visitor types freely; the app matches the input to the closest topic and replies with a canned response. This is intent-matching over a fixed topic set, not an LLM/free-form chat.
- **Topic coverage:** About me / Bio, Work experience, Projects / Portfolio, Skills & tech stack, Contact / Socials. Content for these topics should be sourced from the existing Next.js build under `docs/` on `main` (experience logos, project images, contact icons are all present there and can be reused).

## Commands

- `npm run dev` — Vite dev server (`npm run dev -- --open` to open browser)
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run check` — run `svelte-kit sync` + `svelte-check` typecheck (use this to verify TS/Svelte correctness; there is no separate lint or test setup)
- `npm run check:watch` — check in watch mode

## Architecture

- **SvelteKit 2 + Svelte 5 in runes mode.** `svelte.config.js` force-enables runes for all non-`node_modules` files, so use `$props()`, `$state()`, `$derived()`, `$effect()` instead of legacy reactive syntax.
- **Adapter is `@sveltejs/adapter-auto`.** For GitHub Pages deployment (matching prior branches' `docs/` output), this will need to be swapped to `@sveltejs/adapter-static` with `paths.base` set to the repo subpath — the current adapter will not produce a static site suitable for `github.io` as-is.
- **Routes** live in `src/routes/` using SvelteKit's file-based routing. `+layout.svelte` wraps all pages; `+page.svelte` is the root.
- **`$lib`** (`src/lib/`) is the alias for shared modules and assets (`$lib/assets/...`).
- **`static/`** holds files served at the site root (e.g. `robots.txt`).
