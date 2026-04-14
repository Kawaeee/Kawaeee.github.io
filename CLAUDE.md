# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (add `-- --open` to open a tab).
- `npm run build` — produce the static site into `build/` via `@sveltejs/adapter-static`.
- `npm run preview` — serve the built site locally.
- `npm run check` — run `svelte-kit sync` then `svelte-check` against `tsconfig.json`. Use this as the type/lint gate; there is no separate ESLint or test runner configured.

There are no unit tests in this repo.

## Deployment target

This is a user/organization GitHub Pages site (`Kawaeee.github.io`) served at the domain root. `svelte.config.js` sets `paths.base = ''` and uses `adapter-static` with `fallback: '404.html'`. Any link to a static asset must go through `src/lib/asset.ts`'s `asset()` helper so it composes with the SvelteKit `base` path — do not hard-code `/images/...`. The whole site is prerendered (`src/routes/+layout.ts` sets `prerender = true`, `trailingSlash = 'always'`).

## Architecture

The site is a single-page, chat-style portfolio. There is exactly one route (`src/routes/+page.svelte`) which renders `Chat.svelte`. All "content" (bio, experience, projects, skills, contacts) lives as typed data modules under `src/lib/data/`, and the UI is a thin chat shell around a rule-based matcher — **there is no backend, no LLM, no network calls for the chat logic**.

### The chat loop

1. `Chat.svelte` owns `messages: ChatMessage[]` state (Svelte 5 runes — the whole project is in `runes: true` mode, see `svelte.config.js`).
2. User input → `matchTopic(text)` in `src/lib/matcher.ts` → returns a `TopicId`.
3. `topicById(id).reply()` in `src/lib/data/topics.ts` returns a `MessageContent[]` (see `src/lib/types.ts` for the tagged-union variants: `text`, `experiences`, `projects`, `contacts`, `skills`, `suggestions`).
4. `Message.svelte` dispatches on `content.kind` to render the appropriate component (`ExperienceCard`, `ProjectCard`, `ContactGrid`, `SkillsList`, `Suggestions`).

### The matcher (important when editing topics)

`src/lib/matcher.ts` scores each topic by summing `phraseWeight` for every matching regex in `phrases` and `keywordWeight` for every token in `keywords`. Phrase regexes are **pre-compiled at module load** — if you add a phrase, it's compiled once. Stopwords are filtered from keyword matches.

Ties are broken by **declaration order in `topics.ts`**. The file is organised into tiers (specific → generic → conversational → fallback) with comments marking each tier. **When adding a new topic, place it in the correct tier** — a generic topic placed above a specific one will steal matches. The `fallback` topic must remain last and is returned when no topic clears `minScore` (default 1).

### Content modules

- `src/lib/data/profile.ts` — single source of truth for name, bio, avatar path, `contacts[]`.
- `src/lib/data/experiences.ts`, `projects.ts`, `skills.ts` — typed content arrays consumed by both topics and UI components.
- `src/lib/data/config.ts` — `chatConfig`: header, greeting, quick replies, typing delay, site title/description. Pulls from `profile` so changing name/avatar ripples everywhere.
- `src/lib/data/topics.ts` — the router. Each `topic({...})` entry defines keywords, phrases, and a `reply()` that returns `MessageContent[]`.

### Theming

`src/lib/theme.svelte.ts` exports a runes-based `theme` singleton that reads/writes `document.documentElement.dataset.theme` and `localStorage`. CSS variables live in `src/lib/styles/palette.css` (colours) and `tokens.css` (spacing/radii); they are toggled via `[data-theme="dark"]` selectors. `ThemeToggle.svelte` is the only UI for flipping it.

### Scroll behaviour in `Chat.svelte`

The chat uses an `IntersectionObserver` on a bottom sentinel to track `stickToBottom`, plus a `ResizeObserver` on the inner list and a capturing `load` listener for late-loading images. When adding new message content types (especially anything with images or async-sized content), rely on these observers rather than ad-hoc `scrollIntoView` calls — `forceScrollToBottom()` already double-rAFs to let layout settle.
