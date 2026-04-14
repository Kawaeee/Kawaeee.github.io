# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository context

Kasidech C.'s personal portfolio (`Kawaeee.github.io`), rebuilt in SvelteKit on the `svelte-dev` branch. Sibling branches hold prior implementations: `main` (deployed Next.js build in `docs/`), `vuejs-dev`, `nextjs-dev`, `flutter-dev`. Image assets (experience logos, project thumbnails, contact icons) were pulled from the Next.js build on `main`.

### Product direction

Portfolio is a **chat-style UI** (`svelte-chat-portfolio`) in the spirit of LINE / iMessage — bubble rows, avatar, timestamps, typing indicator.

- **Interaction model:** visitor types freely; input is scored against a fixed topic set and the bot replies with a canned, content-rich response. This is keyword/phrase intent matching, **not** an LLM.
- **Topics:** bio, experience, projects, skills, contact, plus greeting/thanks/help/fallback.

## Commands

- `npm run dev` — Vite dev server (`npm run dev -- --open` to open browser)
- `npm run build` — production build to `build/`
- `npm run preview` — preview the production build
- `npm run check` — `svelte-kit sync` + `svelte-check` typecheck. This is the only correctness gate; there is no lint or test setup.
- `npm run check:watch` — check in watch mode

## Architecture

- **SvelteKit 2 + Svelte 5 in runes mode.** `svelte.config.js` force-enables runes for all non-`node_modules` files — use `$props()`, `$state()`, `$derived()`, `$effect()`, not legacy reactive syntax.
- **Adapter is `@sveltejs/adapter-static`** writing to `build/` with `fallback: '404.html'`. Served at the domain root, so `paths.base` is `''` — **do not** add a subpath prefix. Prefix static URLs via `$lib/asset.ts` (`asset()` + `fallbackImage()`), which handles the base for you.
- **Routes** in `src/routes/` (file-based); `+layout.svelte` wraps all pages.
- **`static/images/`** holds experience/project/contact/profile artwork. `images/fallback.png` is the generic error fallback.

### Content is data-driven — never hard-code in components

All displayed strings, imagery, and tunables live under `src/lib/data/`:

- `profile.ts` — name, bio, tagline, avatar, `contacts[]`
- `experiences.ts`, `projects.ts`, `skills.ts` — card/list data
- `topics.ts` — topic definitions (`keywords`, `phrases`, `reply()` → `MessageContent[]`)
- `config.ts` — `chatConfig` (header, placeholder, quick replies, typing delay, greeting text, site meta)

When adding content, edit data modules. Components should stay generic.

### Message pipeline

1. `Chat.svelte` is the single stateful shell — owns `messages`, `typing`, scroll state.
2. User input → `matcher.ts` `matchTopic()` → `{ id, score }`. Scoring: stopword-filtered tokens, `keywordWeight=1`, `phraseWeight=3`, `minScore=1`; below threshold falls back to `fallback` topic.
3. `topicById(id).reply()` returns `MessageContent[]` — a discriminated union (`text | experiences | projects | contacts | skills | suggestions`, see `src/lib/types.ts`).
4. `Message.svelte` dispatches on `block.kind` and delegates to `ExperienceCard`, `ProjectCard`, `ContactGrid`, `SkillsList`, or `Suggestions`. Adding a new block type = extend the union in `types.ts` **and** add a branch in `Message.svelte`.

### Scroll-to-bottom (fragile — read before touching)

The chat container is viewport-locked and only `.messages` scrolls. Auto-snap is held together by three pieces in `Chat.svelte`; changing one without the others tends to break it:

- `.app { height: 100dvh; overflow: hidden }` + `.frame { grid-template-rows: auto 1fr auto; height: 100%; min-height: 0 }` + `.messages { overflow-y: auto; min-height: 0 }`. The `min-height: 0` unlocks on both the grid row and the scroller are required — without them, the page grows past the viewport.
- `stickToBottom` is driven by an `IntersectionObserver` on a 1px `.bottom-sentinel` div, **not** by reading `scrollTop`/`scrollHeight`. Mid-reflow measurements during late image loads lie; the sentinel doesn't.
- `forceScrollToBottom()` runs on every user action (send, chip tap, preset): set sticky → `await tick()` → `jumpToBottom()` → double `requestAnimationFrame` re-snap. A `ResizeObserver` on `.inner` and a capture-phase `load` listener re-snap for late-loading cards/images.

### Theming

`src/lib/styles/palette.css` defines light/dark CSS variables; `src/lib/theme.svelte.ts` persists the choice to `localStorage` and toggles `documentElement.dataset.theme`. Components consume `var(--…)` only — no raw colors.
