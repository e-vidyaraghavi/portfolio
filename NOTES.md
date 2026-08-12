# Portfolio — Build Notes

A personal portfolio for **Vidya Raghavi Elangovan**, built with Vue 3 + Vite and set up to
deploy to GitHub Pages automatically.

**Live preview:** https://claude.ai/code/artifact/c6b9f8e8-9239-4fa6-b23b-e492b146aeb4
(a single-file snapshot of the built site — private until you share it)

---

## 1. Final file structure

```
Portfolio/
├── .github/workflows/deploy.yml     # CI: builds and publishes to GitHub Pages
├── index.html                       # HTML shell: meta tags, fonts, dark ground
├── vite.config.js                   # Vue plugin + configurable base path
├── package.json
├── scripts/
│   └── bundle-single-file.mjs       # Inlines dist/ into one shareable .html
└── src/
    ├── main.js                      # App entry — mounts Vue, imports global CSS
    ├── App.vue                      # Composes the page sections in order
    ├── data/profile.js              # ALL content lives here (resume + Notion)
    ├── styles/main.css              # Design tokens, reset, shared classes
    ├── composables/
    │   ├── useReveal.js             # Fade sections in on scroll
    │   ├── useSpotlight.js          # Cursor-following sheen on cards
    │   ├── useCountUp.js            # Animate numbers when scrolled into view
    │   └── useActiveSection.js      # Nav highlight + scroll progress
    └── components/
        ├── AppIcon.vue              # Central SVG icon registry (24 icons)
        ├── AppArt.vue               # Iridescent SVG illustrations (9 scenes)
        ├── BubbleField.vue          # Ambient rising bubbles
        ├── SiteHeader.vue           # Sticky nav + progress bar
        ├── HeroSection.vue          # Name, role, CTAs, whale
        ├── StatCounter.vue          # One animated stat tile
        ├── AboutSection.vue         # "Who am I" summary
        ├── ProductSection.vue       # Collapsible product case studies
        ├── ProjectsSection.vue      # Figma / research work from Notion
        ├── ExperienceSection.vue    # Collapsible timeline of roles
        ├── SkillsSection.vue        # Grouped skill chips
        ├── EducationSection.vue     # Degree + certifications
        ├── ContactSection.vue       # Email / Phone / LinkedIn / Résumé cards
        └── SiteFooter.vue
```

> `ThemeToggle.vue` was removed in §5 — the site is deliberately dark-only now.

---

## 2. Steps taken, and why

### Step 1 — Scaffold with Vite

```bash
npm create vite@latest . -- --template vue
```

Vite is the dev server + bundler; `@vitejs/plugin-vue` compiles `.vue` single-file components
(template + script + scoped styles in one file). The demo boilerplate that ships with the
template (`HelloWorld.vue`, `assets/`, `style.css`) was deleted so we started clean.

### Step 2 — Content as data, not markup

All resume content went into [src/data/profile.js](src/data/profile.js) as exported objects and
arrays: `profile`, `highlights`, `skills`, `experience`, `education`, `certifications`.

**Why:** components stay presentational and loop over data with `v-for`. To update your resume
you edit one file — you never touch HTML. Adding a fourth job is one array entry, not a copy-pasted
block.

### Step 3 — A design system in CSS custom properties

[src/styles/main.css](src/styles/main.css) defines the whole visual language up front:

| Token | Purpose |
|---|---|
| `--bg`, `--surface`, `--border` | Grounds and edges |
| `--text`, `--muted`, `--faint` | A strict 3-level text hierarchy |
| `--accent`, `--accent-soft` | The single accent colour (indigo) |
| `--max: 720px` | One narrow reading column |
| `--step` | Fluid page gutter via `clamp()` |

Design decisions behind the minimalist look:

- **One column, 720px.** A single narrow measure reads like a well-set document. This is most of
  the minimalism — no sidebars, no grid gymnastics.
- **One accent colour.** Indigo appears on links, the active timeline node, and the primary
  button. Nothing else is coloured.
- **Hairline borders instead of shadows.** Sections are separated by `1px` rules, not cards
  floating on drop shadows.
- **`clamp()` everywhere** for type and spacing, so the layout is fluid across screen sizes with
  almost no media queries.
- **Dark mode is only a second token block** (`:root[data-theme='dark']`). Components reference
  tokens and never hardcode a colour, so theming was free.
- **Accessibility:** visible `:focus-visible` outlines, `aria-label` on the icon-only toggle,
  semantic `<dl>` for label/value pairs, and all motion disabled under
  `prefers-reduced-motion: reduce`.

### Step 4 — Components

Each section is its own small SFC that imports the slice of data it needs. Styles are `scoped`,
so `.card` in one component can't leak into another.

Notable implementation details:

- **[ThemeToggle.vue](src/components/ThemeToggle.vue)** — reads `localStorage` first, falls back
  to the OS `prefers-color-scheme`. A single `watchEffect` writes `data-theme` to
  `<html>` and persists the choice; because `watchEffect` runs immediately *and* on change, the
  first paint and every later toggle share one code path.
- **[ExperienceSection.vue](src/components/ExperienceSection.vue)** — the timeline's vertical line
  is a `border-left` on each `<li>`, transparent on `:last-child`, so the line stops cleanly at
  the last role instead of dangling.
- **[SiteHeader.vue](src/components/SiteHeader.vue)** — sticky with a blurred translucent
  background; its bottom border only appears once you've scrolled (`scrolled` ref on a passive
  scroll listener).

### Step 5 — Scroll reveal without a library

[src/composables/useReveal.js](src/composables/useReveal.js) is a composable (a reusable function
using Vue's lifecycle hooks). It observes every `.reveal` element with `IntersectionObserver`,
adds `.is-visible` when one scrolls in, then `unobserve`s it — reveal once, then stop watching.
Falls back to showing everything if the API is unavailable. Cost: ~20 lines, zero dependencies.

### Step 6 — The HTML shell

[index.html](index.html) carries the page `<title>`, the meta description, Open Graph tags (the
preview card when the link is shared), the Inter webfont, and an inline SVG emoji favicon.

The important bit is the small **blocking script in `<head>`** that sets `data-theme` before Vue
loads. Without it, a dark-mode visitor gets a white flash on every page load.

### Step 7 — GitHub Pages setup

Two pieces:

1. **[vite.config.js](vite.config.js)** — `base: process.env.BASE_PATH || '/'`. GitHub Pages
   serves project sites from `https://<user>.github.io/<repo>/`, so built asset URLs need that
   prefix; locally it stays `/`.
2. **[.github/workflows/deploy.yml](.github/workflows/deploy.yml)** — on every push to `main`:
   checkout → `npm ci` → `npm run build` with
   `BASE_PATH=/${{ github.event.repository.name }}/` (so the repo name is never hardcoded) →
   upload `dist/` as a Pages artifact → deploy. Uses the official Pages actions with
   `id-token: write` (OIDC), so no personal access token or `gh-pages` branch is needed.

### Step 8 — Build verified

```
dist/index.html      1.77 kB │ gzip 0.91 kB
dist/assets/*.css    7.99 kB │ gzip 2.42 kB
dist/assets/*.js    71.15 kB │ gzip 28.01 kB
```

~31 kB gzipped total — the whole site is one HTTP round trip's worth of content.

### Step 9 — Single-file bundle (for the preview link)

[scripts/bundle-single-file.mjs](scripts/bundle-single-file.mjs) reads `dist/`, inlines the CSS
and JS into one `.html` file, and reuses the theme bootstrap verbatim. That's what's published at
the preview link above. GitHub Pages doesn't need it — it serves `dist/` directly — but it's handy
for emailing a self-contained copy.

---

## 3. Changelog — dark black/blue redesign (11 Aug 2026)

Requested changes: attractive black-and-blue background, collapsible sections, a contact
section with icons, icons throughout, and improved content.

### 3.1 Black & blue theme is now the default

- [src/styles/main.css](src/styles/main.css) was flipped to **dark-first**: the bare `:root`
  now holds the dark palette (near-black blue `#060a14` ground, navy surfaces, electric blue
  `#5ea1ff` accent), and light mode moved behind `[data-theme='light']` — still reachable via
  the header toggle.
- **Ambient background** on `body::before`: two soft radial blue glows (top-right and mid-left)
  over a faint 44px engineering grid. It's a `position: fixed` layer with `z-index: -1`, so it
  never repaints on scroll and sits behind everything.
- The theme bootstrap in [index.html](index.html) and the toggle default to `dark`; a
  `theme-color` meta tints the mobile browser chrome to match.

### 3.2 Collapsible experience section

- Each role in [ExperienceSection.vue](src/components/ExperienceSection.vue) is now a
  collapsible entry: the header (role, company, period, chevron) is a real `<button>` with
  `aria-expanded`/`aria-controls`, a one-line summary stays visible, and the bullet points
  expand/collapse.
- The current role starts open; older roles start closed.
- Animation uses the **CSS grid `0fr → 1fr` trick** (`.collapse` in main.css) — the only way to
  animate `height: auto` in pure CSS, no JS measuring. Disabled under
  `prefers-reduced-motion`.

### 3.3 Contact section with icons

- [ContactSection.vue](src/components/ContactSection.vue) rebuilt as a grid of four tappable
  cards — Email, Phone, LinkedIn, GitHub — each with a tinted icon tile, an uppercase label,
  and the value. Cards lift and glow blue on hover.

### 3.4 Icons everywhere

- New [AppIcon.vue](src/components/AppIcon.vue): a single registry of 17 Feather-style stroke
  SVGs rendered by name (`<AppIcon name="mail" />`). One place to add or swap icons; they
  inherit `currentColor` so they theme automatically.
- Applied to: every section label (About / Experience / Skills / Education / Certifications /
  Contact), skill-group headings, the hero's role line (briefcase + location pin), and the hero
  buttons (send, download, LinkedIn, GitHub).

### 3.5 Content improvements

- Rewrote the tagline and summary in [profile.js](src/data/profile.js) to lead with what you
  build ("Outlook add-ins to secure, identity-driven backend services") instead of a generic
  intro.
- Every experience entry gained a one-line `summary` (shown even when collapsed); bullets were
  rewritten in active voice.
- Contact pitch now sets expectations ("fastest way to reach me is email — I usually reply
  within a day"); hero shows company and location.

---

## 4. Changelog — repositioned toward product management (11 Aug 2026)

The site read as "backend engineer who also does product." It now reads as "product person with
real engineering depth." Nothing was invented — every claim still traces to the resume; what
changed is the framing and the emphasis.

### 4.1 New Product Work section (the centrepiece)

[ProductSection.vue](src/components/ProductSection.vue) sits directly after About, before
Experience — so a hiring manager hits product thinking first. Three collapsible case studies,
each structured the way a PM interview expects:

| Case study | Lens |
|---|---|
| Lifting engagement 32% by following the data | Growth & Analytics |
| Meeting users inside Outlook instead of asking them to switch | Product Strategy |
| Turning product vision into something engineers can build | Cross-functional Delivery |

Each expands into **The problem → How I approached it → Outcome**, with the outcome pulled out
onto a tinted blue rail because that's the part that gets read. First card opens by default.

The content is a reframing of your existing Zoho bullets: the 32% engagement lift became a
discovery-and-prioritisation story; the Outlook add-ins became a distribution/friction argument;
the "worked closely with PMs and designers" bullet became a delivery story.

### 4.2 Positioning rewritten throughout

- **Title:** "Software Developer" → **"Product-Minded Software Developer"**, and the hero pill now
  reads "Open to product management roles."
- **Tagline:** leads with the product instinct — *"I turn user problems into shipped product…
  the instinct to ask what a feature is actually for before building it."*
- **Summary:** states the ambition explicitly — an engineer who works like a product owner,
  INSEAD-certified, looking to move formally into product.
- **Stats:** reordered so **32% engagement lift** comes first, and the third stat is now the
  **INSEAD** certification rather than an integration count.
- **Experience bullets:** reordered so the analytics/engagement outcome leads and the
  cross-functional bullet sits third; infrastructure detail moved down.
- **Contact:** names the roles you want (APM / technical PM / product-focused engineering) and
  invites a walkthrough of the case studies.
- **Certifications:** the INSEAD entry is now framed as "the formal grounding behind how I
  already work," and Figma as design fluency for talking to designers.

### 4.3 Skills regrouped around product

Was: Languages / Frameworks / Cloud / Practices.
Now: **Product** (first) / Engineering / Platform & Identity / Ways of working — so the first
thing scanned is product capability, with engineering as supporting evidence.

### 4.4 Supporting changes

- 6 new icons in [AppIcon.vue](src/components/AppIcon.vue): `trending`, `target`, `compass`,
  `question`, `route`, `flag` — used for case-study types and the problem/approach/outcome labels.
- Nav gained "Product Work"; dropped "Education" to keep it to five items (the section is still
  there, reachable by scrolling).
- `<title>`, meta description, and Open Graph tags rewritten so shared links lead with product.

> ⚠️ **One thing to check before you publish:** the Product skills list includes
> *Prioritisation* and *Experimentation*, which come from the INSEAD coursework rather than
> shipped work. Keep them only if you can talk through a concrete example in an interview —
> otherwise trim them in [profile.js](src/data/profile.js).

---

## 5. Changelog — Notion content merge + vibrant aquatic theme (11 Aug 2026)

Requested: pull in the Notion portfolio content, go dark-only, make the UI more attractive and
vibrant/interactive in the style of the reference image (teal water, iridescent creature), and add
pictures to every section.

### 5.1 Content merged from the Notion page

The Notion page renders client-side, so a plain fetch returns an empty shell. Content was pulled
from Notion's own API instead:

```bash
curl -s -X POST 'https://important-marble-998.notion.site/api/v3/loadPageChunk' \
  -H 'Content-Type: application/json' \
  -d '{"pageId":"8a01781e-80b0-4c9e-a331-542c2c933e05","limit":300,
       "cursor":{"stack":[]},"chunkNumber":0,"verticalColumns":false}'
# projects gallery: same host, /api/v3/queryCollection
#   collection 6a6ac0a7-cb40-4092-9c82-c62d73f2a07a
```

What it added or corrected:

| Field | Change |
|---|---|
| Job title | "Software Developer" → **Member of Technical Staff** |
| Headline metric | Now attributed: **Parse Attachment in Zoho Recruit → 30% engagement lift** |
| Intro | The real "Hola!" summary, verbatim from Notion |
| LinkedIn | Real URL `linkedin.com/in/vidyaraghavi333/` (was a guess) |
| Résumé | Now links to your Google Drive PDF — no local file needed |
| Skills | Added Zapier, MySQL, Git, JIRA, Zoho Projects; PM skills from the Notion list |
| TCS role | CISCO tooling, data switch / firewall disruption, international clients |
| **Projects** | New section from the Notion gallery: HousePlant (Figma) + User Persona (Slides) |

> ⚠️ **Three conflicts between the resume PDF and Notion — worth resolving:**
> 1. **Engagement lift: 30% (Notion) vs 32% (resume).** The site now says **30%**, because Notion
>    ties it to a specific feature. Pick one and make both documents agree.
> 2. **Email: `e.vidyaraghavi.e@gmail.com` (resume) vs `e.vidyaraghavi@gmail.com` (Notion).** The
>    site uses the resume version. Confirm which is live.
> 3. **Job title** differs as above; the site follows Notion.

### 5.2 Dark-only vibrant ocean theme

- The light palette and `ThemeToggle.vue` were **deleted** — the site is dark by design now, with
  `color-scheme: dark` and an inline ground colour so there's no white flash before CSS loads.
- Palette from the reference image: abyss `#02141c` → petrol `#0a3543` water, with an iridescent
  accent trio — cyan `#4fe3d2`, violet `#9b8cf7`, pink `#f98fd4` — combined into a single `--iris`
  gradient used on headings, numbers, rails, and the progress bar.
- **Layered ocean background:** three drifting radial blooms plus a caustic light grid, masked so
  it fades out down the page.
- **Glass cards** — translucent surfaces with `backdrop-filter`, a lit top edge, and a
  pointer-tracking sheen.

### 5.3 Interactive touches

| Interaction | Where |
|---|---|
| Reading-progress bar + active-section dot in the nav | `useActiveSection.js` |
| Numbers counting up when scrolled into view | `useCountUp.js` → `StatCounter.vue` |
| Cursor-following sheen on every card | `useSpotlight.js` (one delegated listener) |
| Bubbles drifting up behind the content | `BubbleField.vue` |
| Whale bobbing as if suspended in water | `HeroSection.vue` |
| Collapsible cases and roles, hover lift, animated chevrons | Product / Experience sections |

All of it is disabled under `prefers-reduced-motion: reduce`.

### 5.4 Pictures for every section

New [AppArt.vue](src/components/AppArt.vue) holds nine hand-drawn iridescent SVG illustrations:
`whale` (hero), `growth`, `orbit`, `network` (one per case study), `wave` / `pulse` (role bands),
`prism` (skills), `scroll` (education), `bubbles` (about + contact).

They're **inline SVG, not image files** — so there are no external requests, they inherit the
palette, and they can't 404. Gradient IDs are made unique with Vue's `useId()` so multiple
instances on one page don't collide.

### 5.5 Four bugs found by screenshotting the build

Rendering the built page in headless Chrome caught things the build step can't:

1. **The whole ocean background was invisible.** A `position: fixed` pseudo-element at
   `z-index: -2` paints *behind its own element's background* — and `body` had a background. Fixed
   by moving the base colour to `html` and leaving `body` transparent.
2. **The page was blank without JS.** `.reveal` started at `opacity: 0`, so if the observer never
   ran, nothing was readable. Now content is visible by default and only hidden once
   `useReveal()` confirms it can observe (`.reveal-ready` on `<html>`).
3. **Collapsed cards leaked a strip of content.** A border box can't shrink below its own padding,
   so the `0fr` grid row still showed ~38px. Fixed with a padding-free `.clip` wrapper inside
   `.collapse`.
4. **A blank icon and a blank art band.** The case study asked for a `users` icon that was never
   registered (only `user` existed), and the role band cropped a region the artwork didn't occupy.
   `AppArt` now takes `viewBox` + `stretch` props instead of a negative-margin hack.

---

## 6. Visual verification pass (12 Aug 2026)

Every section was rendered in headless Chrome and reviewed. The build tool can only tell you the
CSS parsed — it can't tell you the artwork landed inside its crop window, so this pass is worth
repeating whenever the design changes:

```bash
npm run build && node scripts/bundle-single-file.mjs /tmp/portfolio.html
# The bundle is a fragment, so wrap it in a doctype + viewport meta first:
printf '<!doctype html><html><head><meta charset="utf-8">%s</head><body>' \
  '<meta name="viewport" content="width=device-width, initial-scale=1.0">' > /tmp/shot.html
cat /tmp/portfolio.html >> /tmp/shot.html && echo '</body></html>' >> /tmp/shot.html

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --window-size=1100,6400 --virtual-time-budget=10000 \
  --screenshot=shot.png "file:///tmp/shot.html"
```

**Verified:** hero and whale, About, all three Product cases (open *and* collapsed), Projects,
both Experience roles with their wave/pulse bands, Skills with the prism, Education with the
certificate seal, Contact cards, footer. Narrow layout (500px) checked separately: the whale
stacks above the copy, stats go single-column, and the nav scrolls horizontally.

**Two more fixes this pass:**

- The Education artwork read as a plain filled box; redrawn as a certificate with a ribbon seal.
- Contact cards wrapped 3 + 1 with a ragged email card; column min dropped to `190px` so all four
  share one row at equal height.

**Overflow check.** Rather than eyeball it, the page was instrumented to compare
`documentElement.scrollWidth` against `clientWidth` at 500 / 768 / 1024 / 1440 px — equal at every
width, so nothing overflows horizontally.

> **Headless gotchas worth knowing before you trust a screenshot:**
> - `--window-size` **cannot go below 500px** — Chrome clamps it. A 390px screenshot is just a
>   crop of a 500px-wide layout, which looks exactly like a clipping bug. Verify overflow by
>   measuring, not by looking.
> - If your wrapper omits `<meta name="viewport">`, the layout width won't match the real page.
> - The stat counters often appear mid-animation (`6%` instead of `30%`) because virtual time
>   doesn't advance `requestAnimationFrame` to completion. Not a bug — confirm with `npm run dev`.

---

## 7. Commands

```bash
npm install      # install dependencies
npm run dev      # dev server with hot reload → http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve dist/ locally to check the real build
npm run bundle   # build + inline into portfolio-single-file.html
```

---

## 8. Deploying to GitHub — personal account on a work machine

Target: **https://github.com/e-vidyaraghavi/portfolio** → site at
`https://e-vidyaraghavi.github.io/portfolio/`.

### The problem this setup solves

This machine is set up for the **work** GitHub account, in two independent places:

| What | Where it lives | Value |
|---|---|---|
| Commit identity | `~/.gitconfig` (global) | `vidyaraghavi.e@zohocorp.com` |
| Push credential | macOS keychain, `github.com` | the work account's token |

The credential helper is `osxkeychain`, and it is **not** something this user configured — it comes
from Xcode's Command Line Tools system gitconfig
(`/Library/Developer/CommandLineTools/usr/share/git-core/gitconfig`). So it applies everywhere by
default. Left alone, a push from this repo would be committed under the work email *and*
authenticated as the work account.

### How it's kept separate — three independent switches

1. **Which repo** — the remote URL:
   `https://e-vidyaraghavi@github.com/e-vidyaraghavi/portfolio.git`
2. **Whose name is on the commits** — `user.name` / `user.email` set **locally**, in this repo's
   `.git/config` only. The global work identity is untouched:
   ```bash
   git config user.name  "Vidya Raghavi Elangovan"     # note: no --global
   git config user.email "e.vidyaraghavi@gmail.com"
   ```
3. **Which account authenticates the push** — this is the subtle one. Keychain credentials are keyed
   by **protocol + host + account**, so embedding `e-vidyaraghavi@` in the remote URL makes git ask
   the keychain for *that specific username* on github.com. There's no entry for it, so git prompts
   for a password instead of silently reusing the work token — and stores the answer as a **new,
   separate** keychain entry. The work entry is never read or modified.

Verify at any time (prints no secrets):

```bash
git config --show-origin --get user.email   # → file:.git/config  e.vidyaraghavi@gmail.com
git config --global --get user.email        # → vidyaraghavi.e@zohocorp.com (untouched)
git remote -v
```

### Token scope — the gotcha that rejects the push

Paste a **Personal Access Token** as the password (GitHub stopped accepting account passwords over
HTTPS). It needs more than repo access, because this repo contains `.github/workflows/deploy.yml`:

- **Fine-grained token:** Repository access → this repo, with **Contents: Read and write** *and*
  **Workflows: Read and write**.
- **Classic token:** scopes **`repo`** *and* **`workflow`**.

Without the workflow permission the push is rejected with
*"refusing to allow a Personal Access Token to create or update workflow …"* — and the failure looks
like an auth problem when it's really a scope problem.

### The push

```bash
git push -u origin main
# Username: pre-filled from the URL (e-vidyaraghavi)
# Password: paste the token
```

Then in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The workflow runs on that push and the site goes live at
`https://e-vidyaraghavi.github.io/portfolio/`. Every later push to `main` redeploys automatically.

> **If commits don't show as yours on GitHub:** add `e.vidyaraghavi@gmail.com` to the personal
> account under *Settings → Emails*. GitHub links commits by email, so an unrecognised address
> shows the commit without your avatar. Fix retroactively with
> `git commit --amend --reset-author` (before pushing) or by adding the email afterwards.

> **Naming note:** a repo called `e-vidyaraghavi.github.io` would publish to the root domain
> instead, and then you'd drop the `BASE_PATH` line from the workflow since the base is already `/`.

---

## 9. Contact section tidy-up (12 Aug 2026)

- **Phone number removed** — from the contact cards *and* from `profile.js`, so it isn't published
  anywhere on the site.
- **Three equal columns.** The grid was `auto-fit, minmax(...)`, which sized cards to their
  content; it's now `repeat(3, minmax(0, 1fr))` so every card is exactly the same width. Each
  `<li>` is a grid and the card inside is `height: 100%`, so a card whose text wraps no longer ends
  up taller than its neighbours.
- **Email fits on one line** at `0.8rem` with a 36px icon tile, and uses `overflow-wrap: break-word`
  rather than `anywhere` so it only ever breaks as a last resort.
- **Copy rewritten** to just the connect details: *"Email is the fastest way to reach me — I
  usually reply within a day. You'll also find me on LinkedIn, and my résumé is a click away."*
  The "looking for product roles" sentence is gone.
- **The hero's "Open to Product Management roles" pill was removed too** (with its pinging dot),
  since it made the same claim.

### 9.1 Hero tags replace the old pill

Where that pill used to be, the hero now carries a row of four self-descriptor tags, each with a
small iridescent dot. They live in a `tags` array in [profile.js](src/data/profile.js) and sit
between the tagline and the buttons — below the name rather than above it, so the headline stays
the first thing you read.

The wording was lightly polished from what was supplied, to read the way a recruiter expects:

| Supplied | On the site |
|---|---|
| software developer with product mindset | Software developer with a product mindset |
| interest in PM | Interested in Product Management |
| front end liker | Front-end enthusiast |
| problem solver | Problem solver |

Change any of them back in one line if you prefer your original phrasing.

---

## 10. Accuracy correction — Parse Attachment (12 Aug 2026)

The site claimed you **led the development** of Parse Attachment. That came from the Notion page
("Led the development of Parse Attachment feature… resulting in improved user engagement by 30%")
and it overstated the work. What actually happened: **the feature already existed, and you made it
visible to users by changing the UI, which improved engagement with the product by 30%.**

Corrected in five places:

| Where | Now reads |
|---|---|
| Case study title | "A feature nobody could find: surfacing Parse Attachment in the UI" |
| Case study tag | "UI & Discoverability · Zoho Recruit" (was "Feature Ownership") |
| Case study problem | The feature existed but users weren't finding it — not that it didn't exist |
| Experience bullet | "Made the Parse Attachment feature… visible to users… through UI changes" |
| Hero stat label | "Engagement lift from my UI work" |
| `<meta description>` | "UI work in Zoho Recruit's Outlook add-in improved user engagement by 30%" |

Three nearby claims were softened in the same pass, because they had the same flavour of
over-statement and none of them came from a source document:

- Section intro: "Three problems I **owned end to end** … how I **decided** what to do" →
  "Three problems I **worked on** — what was wrong, what I changed, and what happened as a result."
- Zoho role summary: "**Own** the Microsoft integration story… from **deciding** what belongs in a
  plugin" → "Work across Zoho's Microsoft integrations — Outlook add-ins, the APIs behind them, and
  the UI users actually touch."
- Case study 2: "**Scoped** what genuinely belongs in a plugin" → "**Worked with the team on** what
  belongs in an add-in versus the main app."

> ⚠️ **Your resume PDF and Notion page still say "Led the development."** Update both — an
> interviewer who reads the resume and then the site will spot the difference, and the UI-visibility
> story is the more interesting one anyway: it shows you noticed that discoverability, not
> capability, was the bottleneck.

---

## 11. Hero tag alignment + working CTA (12 Aug 2026)

**Tags now sit on one straight line.** They were inside the hero's narrow copy column (about 470px
of an 880px row, with the whale beside them), so four tags totalling ~700px had no choice but to
wrap 1 / 2 / 1. Moved out of the copy column to full page width, below the buttons — one row at
1200px and 900px, with `white-space: nowrap` per chip so a tag never breaks mid-phrase, and
`flex-wrap: wrap` retained so genuinely narrow screens still stack cleanly.

**"Get in touch" now works.** It was `href="mailto:…"`, which does nothing visible when there's no
mail client registered — and is blocked outright inside a sandboxed preview iframe, which is why it
looked broken. It now points at `#contact`, scrolling to the contact section where the email card
lives. The email card itself keeps the `mailto:`.

Related fix: contact cards had a blanket `target="_blank"`, which on a `mailto:` link leaves an
empty tab behind. Now only `http(s)` destinations open in a new tab.

Verified in the rendered DOM, not just by eye:

```
CTA href=#contact present: True
target id=contact exists:  True
email card tag: <a class="card spotlight contact-card" href="mailto:e.vidyaraghavi@gmail.com">
```

---

## 12. Remaining to-dos

**Yours to decide (§5.1 has the detail):**

1. **Engagement metric: 30% or 32%?** The resume says 32%, Notion says 30% tied to Parse
   Attachment. The site currently says 30%. Make both documents agree.
2. ~~**Which email is live?**~~ **Resolved** — `profile.js` now uses `e.vidyaraghavi@gmail.com`
   (the Notion address). Worth updating the resume PDF to match.
3. **Job title:** the site uses Notion's "Member of Technical Staff"; your resume PDF says
   "Software Developer." Update whichever is stale.
4. **Product skills to defend.** *Roadmapping*, *Competitive Analysis*, and *Market Research* come
   from the INSEAD coursework and the Notion skills list rather than shipped work. Keep them only
   if you can give a concrete example in an interview; otherwise trim them in
   [profile.js](src/data/profile.js).

**Then ship it:** follow §8 to push and switch on GitHub Pages. Nothing else is blocking —
the résumé button points at your Google Drive PDF and the LinkedIn URL is the real one, so there
are no placeholder links left.

**Optional polish:**

- Self-host Inter (as a `@font-face` woff2 in `public/`) to drop the Google Fonts request and make
  the page fully self-contained.
- Add a third project to `projects` in `profile.js` — the section takes any number.
- Add real screenshots to the Projects cards (a `public/` image plus an `<img>` in
  `ProjectsSection.vue`); the current cards are text + emoji only.
