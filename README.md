# Vishwas Pratap Singh — Developer Portfolio

A brutalist-editorial personal portfolio built with **React, TypeScript, Vite and Tailwind CSS**, with motion from **Framer Motion**.

All content lives in typed data files under `src/data/`. You can add, edit, remove or hide almost anything without touching a component.

---

## Getting started

```bash
npm install
npm run dev      # local dev server (Vite)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
npm run lint     # oxlint
```

Requires Node 20+.

---

## Project structure

```
public/                 favicon and static assets
src/
  components/           one component per section + shared UI
  data/                 ALL editable content lives here
    types.ts            TypeScript shapes for every content type
    profile.ts          name, links, email, hero copy, about copy, contact copy
    projects.ts         project objects
    skills.ts           skill groups
    experience.ts       experience entries (empty by default → auto-hidden)
    achievements.ts     achievements (empty by default → auto-hidden)
    education.ts        education entries
    navigation.ts       nav order and labels
    sections.ts         section visibility, headings, kickers, notes
    index.ts            selectors: isSectionVisible, visibleNavItems, sectionNumber
  hooks/                active section, scroll lock, clipboard, local time
  App.tsx               page composition
  index.css             design tokens + shared component classes
index.html              SEO meta, fonts, JSON-LD
```

---

## Editing your profile

Open `src/data/profile.ts`:

| What | Field |
| --- | --- |
| Name / monogram | `name`, `monogram` |
| Role line | `role` |
| Location | `location` |
| Email | `email` |
| Availability badge | `availability.available`, `availability.label` |
| GitHub / LinkedIn | `links.github`, `links.linkedin` |
| Browser title & description | `seo.title`, `seo.description` |
| Hero headline / intro | `hero.headline`, `hero.intro` |
| Hero name treatment | `hero.nameLines` (`outline` renders hollow type, `dot` adds the red period) |
| Hero buttons | `hero.primaryCta`, `hero.secondaryCta` |
| Marquee words | `hero.marquee` |
| About paragraphs | `about.intro` |
| Pull quote | `about.quote` |
| Focus / building / interests | `about.focus`, `about.building`, `about.interests` |
| Timeline | `about.timeline` (`label`, `title`, `detail`) |
| Contact heading lines | `contact.heading` |
| Contact note | `contact.note` |
| Footer line | `footer.note` |

Links are referenced once and reused by the navbar, hero, contact and footer — change them in this one file.

The GitHub URL currently in `links.github` was inferred from your git configuration. Replace it if it is not your profile and delete the TODO comment above it.

---

## Projects

Edit `src/data/projects.ts`. Adding a project is just adding one object:

```ts
{
  slug: 'my-project',              // unique, used as a React key
  name: 'My Project',
  mark: 'MP',                      // two letters shown on the poster
  tagline: 'One line that sells it.',
  description: 'Two or three honest sentences about what it does and how it works.',
  category: 'Full-stack · Tooling',// shown on the poster and in the row meta
  year: '2026',                    // optional
  status: 'live',                  // 'live' | 'in-progress' | 'built'
  tech: ['React', 'Node.js'],
  techNote: 'Stack still being finalised.', // optional, used when tech is empty
  links: {
    live: 'https://example.com',   // omit if there is no live site
    github: 'https://github.com/you/repo', // omit if there is no repo
  },
  poster: 'orbit',                 // 'orbit' | 'grid' | 'stack'
  features: [],                    // leave empty until you have real ones
  challenges: [],
  learnings: [],
}
```

Notes:

- **No fake screenshots.** Posters are generated SVG art (`orbit`, `grid`, `stack`). Pick the variant that fits the project.
- **Missing links are handled.** Cards show a "Repository link coming soon" note instead of dead buttons.
- **Case studies are optional.** `features`, `challenges` and `learnings` can stay empty; the drawer then shows an honest "Case study in progress" note.
- **Removing a project** = deleting its object. Everything else (numbering, "Next project", footer count) updates automatically.

---

## Skills

Edit `src/data/skills.ts`:

```ts
{
  id: 'frontend',
  title: 'Frontend',
  note: 'Optional supporting line',
  skills: ['React', 'HTML', 'CSS'],
  highlight: false, // true renders the group as "currently learning"
}
```

There are no percentages or levels by design. Groups render in the order they appear.

---

## Experience and achievements

Both sections are **empty by default**, which means they are hidden from the page and the navigation automatically.

- `src/data/experience.ts` — add objects with `id`, `organization`, `role`, `period`, `description`, `tech`, `links`.
- `src/data/achievements.ts` — add objects with `id`, `title`, `type` (`hackathon | award | certification | academic | competition | other`), and optional `issuer`, `year`, `detail`, `link`.

Add the first real entry and the section appears — no component changes needed.

---

## Education

Edit `src/data/education.ts`. Each entry has `institution`, `degree`, `field`, `location`, `period`, `status`, `notes` and `coursework`. Empty `notes`/`coursework` are hidden gracefully.

---

## Hiding or renaming sections

Open `src/data/sections.ts`:

```ts
projects: {
  enabled: true,             // false → section and nav item disappear
  heading: 'Selected work',  // last word is typeset in serif italic
  kicker: 'Projects & builds',
  note: 'Real projects — shipped, live and in progress.',
},
```

- `enabled: false` hides the section even if it has content.
- Empty data hides `experience` and `achievements` automatically.
- Section numbers (`01`, `02`, …) and nav numbering are recalculated with **no gaps** based on what is actually visible.

### Reordering navigation

Edit `src/data/navigation.ts` — the array order controls both the navbar and the page order reference. `home` maps to the hero; every other id must exist in `sections.ts`.

---

## Adding a brand-new section (e.g. Writing / Blog)

The architecture is built for this:

1. Add the data file, e.g. `src/data/writing.ts`, with a typed entry list.
2. Add the new id to `ContentSectionId` in `src/data/types.ts`.
3. Add its config to `sections.ts` and its nav entry to `navigation.ts`.
4. Export the data and add a `contentCount` entry in `src/data/index.ts` (visibility depends on it).
5. Create `src/components/Writing.tsx` following an existing section (`Achievements.tsx` is the smallest), using `<SectionHeader section="writing" index={sectionNumber('writing')} />`.
6. Render it in `App.tsx` inside the `isSectionVisible('writing')` check.

No other section needs to change. This is also the seam where a future admin dashboard or CMS would plug in: components read data through `src/data/index.ts`, so swapping the static files for fetched data stays contained.

---

## Design system

Tokens and shared classes live in `src/index.css`:

- Colors: `--color-paper`, `--color-paper-deep`, `--color-ink`, `--color-ink-soft`, `--color-accent`, `--color-accent-deep`, `--color-night`.
- Fonts: Anton (display), Instrument Serif (editorial italic), Space Grotesk (body), JetBrains Mono (labels).
- Utility classes: `.shell`, `.section`, `.eyebrow`, `.btn-*`, `.tag`, `.nav-link`, `.link-line`, `.halftone`, `.paper-grid`, `.dropcap`, `.stamp`, `.marquee`, `.grain`.

Change a token once and the whole site follows.

---

## Motion and accessibility

- Scroll reveals, hero mask reveal, marquees and the project drawer use Framer Motion.
- `prefers-reduced-motion` is respected: animations are skipped, content stays visible.
- The project drawer is a real dialog: focus trap, Escape to close, focus restoration, scroll lock.
- The mobile menu closes on Escape, outside click and viewport resize; the backdrop is portalled so the blurred header cannot trap it.
- Semantic landmarks, skip link, `aria-current` navigation state, visible focus rings and labelled sections are in place.

---

## Deployment

The site is fully static. `npm run build` emits `dist/`.

- **Vercel / Netlify:** framework preset Vite, build `npm run build`, output `dist`.
- **GitHub Pages:** works if served from the domain root. If you deploy under `https://user.github.io/repo/`, set `base: '/repo/'` in `vite.config.ts`.
- No router is used, so no SPA rewrite rules are required. Project details open in an accessible drawer instead of separate URLs.

Before publishing, double-check `profile.ts` (GitHub URL), `index.html` (title/description/OG meta) and the favicon in `public/`.

---

## Content rules used in this build

- No invented achievements, metrics, user counts, awards, certifications or skill percentages.
- No fake statistics and no fake screenshots — posters are generated art.
- Empty sections hide themselves instead of showing placeholders.
- Missing links degrade to honest labels instead of broken buttons.
