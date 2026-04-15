# Kawaeee.github.io — chat-style portfolio

A single-page portfolio shaped like a messaging app. You type a question, it matches it to a topic, and it replies with a prepared answer (text, cards, skill chips, etc.). No backend, no LLM, no network calls — it's all static files deployed to GitHub Pages.

---

## Running it

```sh
npm install        # once
npm run dev        # local dev server with hot reload
npm run build      # produce the static site in build/
npm run preview    # preview the production build
npm run check      # type-check + Svelte lint (use before pushing)
```

There are no unit tests. `npm run check` is the gate.

---

## The big picture, in one diagram

```
User types in the text box
        │
        ▼
  Chat.svelte   ──────── holds the message list (runes state)
        │
        ▼
  matcher.ts    ──────── scores user text against every topic
        │                returns the winning topic id
        ▼
  topics.ts     ──────── topic's reply() returns content blocks
        │                  [{kind:'text'}, {kind:'projects'}, ...]
        ▼
  Message.svelte ─────── renders each block with the right component
                         (ExperienceCard, ProjectCard, SkillsList,
                          ContactGrid, Suggestions)
```

Everything else (theme, layout, avatar, quick replies) is just chrome around that loop.

---

## Where stuff lives

```
src/
├─ routes/
│  ├─ +layout.svelte      site <head>, theme meta tags
│  ├─ +layout.ts          prerender config (static site flags)
│  └─ +page.svelte        the only route — mounts <Chat />
│
├─ lib/
│  ├─ components/         all the UI pieces (Chat, Message, cards, etc.)
│  │
│  ├─ data/               ← THIS IS WHERE YOU EDIT CONTENT
│  │  ├─ profile.ts       your name, bio, avatar, contact links
│  │  ├─ experiences.ts   job history cards
│  │  ├─ projects.ts      project cards with demo/source links
│  │  ├─ skills.ts        skill chip groups
│  │  ├─ topics.ts        the chat "brain" — keywords → replies
│  │  └─ config.ts        header text, greeting, quick replies, typing delay
│  │
│  ├─ styles/
│  │  ├─ palette.css      all colors (light + dark)
│  │  └─ tokens.css       fonts, radii, font sizes
│  │
│  ├─ matcher.ts          scoring algorithm for topic routing
│  ├─ theme.svelte.ts     light/dark toggle + localStorage
│  ├─ asset.ts            resolves static/ paths against the base URL
│  └─ types.ts            MessageContent union (text | cards | chips ...)
│
├─ app.css, app.html, app.d.ts    root styles / HTML shell / TS globals
│
└─ static/
   └─ images/             avatars, company logos, project thumbnails
      ├─ profile-pictures/
      ├─ contacts/
      ├─ experiences/
      └─ projects/
```

If you want to change what's on the page, you almost always edit something in `src/lib/data/`.

---

## Common edits

### Change your name, bio, or avatar

Edit `src/lib/data/profile.ts`. The header, page title, greeting, and bio topic all read from this file, so one change updates everywhere.

To swap the avatar, drop a new PNG into `static/images/profile-pictures/` and point `profile.avatar` at it (path is relative to `static/`, no leading slash).

### Add / edit a project

Append an entry to `projects` in `src/lib/data/projects.ts`. Each project needs a unique `id`, a `name`, a `description`, and an `icon` path. `sourceUrl` and `demoUrl` are optional; if you set them, buttons appear on the card.

Drop the icon image into `static/images/projects/`. If you don't have a logo, use `images/projects/blank.png`.

### Add / edit a job experience

Same idea — append to `experiences` in `src/lib/data/experiences.ts`. Set `current: true` to get the little "current" pill. The list renders in declaration order, so put the most recent first.

### Add / edit skills

Edit the `skillGroups` array in `src/lib/data/skills.ts`. Each group is a heading plus a flat list of chip labels.

### Tweak the greeting, quick replies, or typing delay

`src/lib/data/config.ts`. The greeting text and the chip labels under it are here. `typingDelayMs` controls how long the "..." indicator shows before the bot replies.

### Change colors / dark-mode palette

`src/lib/styles/palette.css`. Edit the CSS variables under `:root[data-theme='light']` and `:root[data-theme='dark']`. Don't put hex colors anywhere else — everything else consumes the variables.

---

## How the chat "brain" works

This is the part that usually confuses people, so here's the short version.

Each topic in `src/lib/data/topics.ts` has three things:

```ts
topic({
    id: 'projects',
    keywords: ['project', 'github', 'portfolio', ...],   // single words
    phrases:  ['show me your work', 'side project'],     // exact substrings
    reply: () => [...]                                    // what to send back
})
```

When the user types something, `matcher.ts`:

1. Lowercases the text, strips punctuation, removes stopwords like "the" / "you".
2. For every topic, counts:
   - **+3 points** per phrase that appears in the text
   - **+1 point** per keyword that matches a remaining word
3. The topic with the highest score wins and its `reply()` is called.
4. If no topic scores at least 1, the `fallback` topic runs ("hmm I didn't catch that").

### Three things that always trip people up

**1. Ties break by declaration order.** If two topics tie, the one declared **earlier** in `topics.ts` wins. That's why the file is split into tiers with big comment banners:

- **Tier 1** = specific / niche (salary, availability, bot identity…)
- **Tier 2** = core portfolio (skills, experience, projects…)
- **Tier 3** = conversational (greeting, thanks, goodbye…)
- **Tier 4** = fallback — must stay last.

If you add a generic topic in Tier 1, it will steal matches from more specific topics below it. Put it in the right tier.

**2. Phrases are weighted 3×, keywords 1×.** So a single phrase match beats three keyword matches. This matters: if you put `'tell me about'` as a phrase in one topic, the text "tell me about your projects" will route to that topic instead of `projects`, even though the word "projects" is right there. Phrases should be specific enough that they really only mean one thing — prefer `'tell me about yourself'` over `'tell me about'`.

**3. Don't put the same keyword/phrase in two topics.** It works today only because of tier ordering, but it's a landmine. When in doubt, pick one topic to own a term. A comment in `matcher.ts` flags the two existing overlaps (`work`, `github`).

### Adding a new topic

Copy an existing topic definition, give it a unique `id`, list keywords and phrases, and write the `reply()` function. A reply is an array of content blocks:

```ts
reply: () => [
    { kind: 'text', text: 'Hello!' },
    { kind: 'suggestions', items: ['Skills', 'Experience'] }
]
```

The block kinds are defined in `src/lib/types.ts`: `text`, `experiences`, `projects`, `contacts`, `skills`, `suggestions`. `Message.svelte` renders each kind with the matching component.

### Testing a topic

There's no test framework, but you can sanity-check any phrase from a terminal:

```sh
npx tsx -e "import {matchTopic} from './src/lib/matcher.ts'; console.log(matchTopic('your question here'))"
```

It prints the winning topic id and score.

---

## Theming

`theme.svelte.ts` holds a single `theme` object with a `.value` and a `.toggle()`. It writes `data-theme="dark"` (or `"light"`) on `<html>` and persists to `localStorage`. All CSS reacts via the `:root[data-theme='...']` selectors in `palette.css`.

To avoid the "flash of wrong theme" on load, `src/app.html` runs a tiny inline script **before** SvelteKit hydrates that reads `localStorage` / system preference and sets `data-theme` immediately. If you change how themes work, keep that script in sync.

---

## Deployment

This site is a **root-served** GitHub Pages site (`Kawaeee.github.io`), so:

- `svelte.config.js` sets `paths.base = ''` (no `/repo-name/` prefix).
- `adapter-static` outputs a fully prerendered site into `build/`.
- Every page has `prerender = true` set in `src/routes/+layout.ts`.

**Important rule when writing UI code**: always resolve static-asset paths through `asset(path)` from `src/lib/asset.ts`. Don't write `/images/foo.png` by hand — it will break the moment SvelteKit introduces a base path or if you ever rename the repo.

### Pushing changes

The `build/` directory is committed in this repo (check `git log`). After `npm run build`, commit the updated `build/` and push to the `main` branch. GitHub Pages serves from there. (If you later switch to GitHub Actions-based deploys, you can stop committing `build/`.)

---

## If something breaks

| Symptom | Most likely cause |
|---|---|
| Images not showing | Path typo in `profile.ts` / `experiences.ts` / etc., or missing file in `static/images/...`. The code already falls back to a placeholder image on 404 but the placeholder isn't the point. |
| A question routes to the wrong answer | Phrase/keyword collision in `topics.ts`. Use `npx tsx -e ...` trick above to see which topic actually won, then remove the overlapping term. |
| Theme looks wrong on first load | Inline script in `src/app.html` got edited, or a CSS variable is missing under the `[data-theme='dark']` selector. |
| `npm run check` complains about types | You probably edited a data file and forgot a field. Check the interface at the top of each `src/lib/data/*.ts`. |
| Build succeeds but deployed site is broken | You hard-coded an asset path somewhere. Grep for `src="/images` and route it through `asset()`. |
