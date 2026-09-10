# snehajain.co.uk

Portfolio site for Sneha Jain, strategic brand designer for founders.

Next.js 16 with the App Router, React 19, TypeScript, and Motion for animation.
Case studies are written in MDX. Deployed on Vercel.

**If you are here to change something rather than to understand the code, open
[`docs/editing-guide.html`](docs/editing-guide.html) instead.** Double-click it,
it opens in a browser. This file is the technical reference underneath it.

---

## Read this first

Nothing here is hand written HTML. Pages are React components, case studies are
Markdown, and everything else is a plain list you can read. There is no build
step to remember: Vercel builds on every push.

| To change | Edit |
| --- | --- |
| A case study | `content/projects/<slug>.mdx` |
| Its pictures | `source-images/<slug>/`, then `npm run images` |
| Services and the twelve stages | `content/services.ts` |
| Packages, deliverables, prices | `content/services.ts` |
| Testimonials | `content/testimonials.ts` |
| FAQ | `content/faq.ts` |
| Email, socials, Tally id, nav | `content/site.ts` |
| Page copy and layout | `app/` and `components/` |
| Colour, type, spacing | `app/globals.css` |
| Animation | `components/motion/` |

Working locally:

```
npm install
npm run dev      # http://localhost:3000, updates as you type
npm run build    # what Vercel runs, use it to check nothing is broken
npm run images   # resize originals from source-images into public/work
```

On Windows, PowerShell blocks `npm` until you run
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or type `npm.cmd`
instead of `npm` every time.

---

## Adding or changing a project

Everything about one project lives in two places, both named after it:

```
content/projects/swirly.mdx     the words
public/work/swirly/             the pictures
```

The filename is the URL, so `swirly.mdx` is `/work/swirly`.

**To add one:** copy an existing `.mdx`, rename it lowercase with hyphens,
change the block at the top, write the body, put the photographs in
`source-images/<same-name>/`, run `npm run images`, commit and push.

### The block at the top

```mdx
export const meta = {
  title: "Swirly",
  subtitle: "Brand identity and packaging",
  client: "Swirly",
  year: "2026",
  sector: "Ice cream",
  services: ["Visual Identity", "Packaging Design"],
  summary: "One or two sentences, shown under the title and as the search description.",
  order: 3,
  published: true,
  featured: true,
};
```

No image paths. Nothing here has to be kept in step with the folder.

`client`, `year`, `sector` and `services` are all optional. An empty one is left
out rather than printed as a blank row.

### The three switches

| Switch | Effect |
| --- | --- |
| `order` | Position everywhere, lowest first. The lowest also **leads the home page** |
| `published: false` | Off the site entirely, file kept. No page, no card, no sitemap entry, and no dead link, because it drops out of the "next project" chain too |
| `featured: false` | Off the home page, still on `/work` |

**Reordering is `order` and nothing else.** Change the numbers and everything
follows: the home page lead, the index under it, the numbered spreads on
`/work`, and which project comes next at the foot of a case study.

**How many appear on the home page:** all of them, however many there are. One
leads and the rest become the index below it. With five that is right; with ten
it will be too many, and the answer then is `featured: false` on the ones that
have stopped earning their place, or ask for a cap.

### The body

A `##` starts a section, a blank line separates paragraphs, and `<Gallery />`
drops the pictures in.

```mdx
## The brand

Rooted in a blend of cultural symbolism and modern design.

<Gallery pick="box, pattern detail" />

## A distinctive identity

It tells a story.

<Gallery />
```

`<Gallery />` on its own shows **whatever no pick has claimed**, so a bare one at
the end catches new photographs automatically. `<Gallery pick="a, b" />` shows
those files in that order. Names are filenames without the path or extension,
and case, spaces, hyphens and underscores are all levelled, so `pattern detail`
finds `pattern-detail.jpg`. A name that is not in the folder **fails the build**
and lists what is available.

---

## Images

Full size exports go in `source-images/<slug>/`, then `npm run images`. That caps
them at 2000px and writes JPEGs into `public/work/<slug>/`. **That folder is the
gallery.** Nothing to list, nothing to link.

The filename decides everything:

| Filename | What it does |
| --- | --- |
| `cover.jpg` | The cover: the case study header, the home page card, the work page |
| anything else | The gallery, in alphabetical order |
| a name containing `wide` | Spans the full width |
| `cover-attention.jpg` | Crops the cover to the busiest part rather than the centre |
| `cover-top.jpg`, `cover-bottom.jpg` | Pins the crop to that edge |

The rest of the name becomes the alt text, so `pattern-detail.jpg` is announced
as "Swirly, pattern detail". Numbers and the word `wide` are stripped out.

Covers are cropped to **3:2** at 2000x1333, because every slot a cover fills is
landscape. `source-images/` is gitignored: git keeps every version of every file
forever, and the originals are 289 MB against 7 MB of web files.

**Two things the pipeline cannot fix.** It cannot recover detail that was never
in the file, so never upscale before exporting. And it cannot change your colour
profile: export sRGB, or the site renders flat and grey. Both are covered in the
editing guide.

---

## The brand marks

`public/img/marks/` holds fifteen glyphs, each in blue and yellow.

They come from an alphabet of twenty-one glyphs drawn in four colours, in
`brand-assets-backup/Brand Assets/Graphics/`. The order is fixed: the fourteen
core glyphs run blue 28, yellow 42, white 56, coffee 70, and the seven extras run
blue 84, yellow 91, white 98, coffee 105. Any glyph in any colour is a lookup,
not a hunt.

```tsx
<Mark name="question" size={12} className="eyebrow__mark" />
```

`components/site/Mark.tsx` picks blue in light mode and yellow in dark, using a
`<picture>` element, so neither is a filtered approximation of the other. Blue is
decorative here and never carries meaning alone, which keeps it inside the
palette rule below.

**A mark earns its place by meaning something**: the question mark on the FAQ,
ticks on package deliverables, braces beside the paragraph about being an
engineer, the ring as the nought in 404. The moment one appears because a space
looked empty, the set stops reading as a language and becomes clip art.

---

## Animation

Everything lives in `components/motion/`.

| Component | What it does |
| --- | --- |
| `Reveal` | Fades and lifts into place on first scroll into view |
| `Stagger` and `StaggerItem` | A list whose children arrive one after another |
| `FadeIn` | Hero lines fading in on load |
| `Highlight` | The yellow marker drawing itself, on scroll |
| `HighlightNow` | The same, on load, for the hero |
| `LinesIn` | A heading arriving line by line |
| `CoverSettle` | A case study cover settling from 108 percent |
| `ScrollProgress` | The reading bar on case studies |
| `CursorField` | The light that follows the pointer |

**Every one checks `useReducedMotion` first.** If a visitor has asked their
system to reduce motion, nothing moves. That is not decoration.

Motion is loaded through `LazyMotion` in `MotionProvider.tsx` with `strict` on,
which means **`m.div`, never `motion.div`**. The build fails if you forget, which
is the point: `motion.` pulls the whole library back into the bundle.

### Two easings, and which is which

```css
--ease:       cubic-bezier(.22,.61,.36,1);   /* things that travel */
--ease-inout: cubic-bezier(.45,.05,.35,1);   /* things that only fade */
```

On `--ease` an opacity fade reaches almost full in the first fraction of a second
and then crawls, so the element appears and then lingers. A fade has to start
slowly. Anything that moves wants the opposite.

### The cursor field

Three blurred blobs, each lagging further behind the last, stretched along their
direction of travel and squashed across it, so it deforms rather than sliding.
One loop drives every layer.

- Yellow on the off-white ground, **off-white on anything dark**. Yellow over
  dark coffee glows rather than falls.
- Sections with their own opaque background carry a local copy
  (`<FieldLayers local />`), or the page-wide one is simply hidden behind them.
- It goes out when the pointer stops, when anything is clicked, and when the
  pointer leaves the window.
- No fine pointer, so on a phone, it wanders on its own.
- Layers are re-collected on route change. They were not, once, and every page
  after the first showed a light stuck where it first painted.

---

## Reference

### Routes

| Path | File |
| --- | --- |
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/services` | `app/services/page.tsx` |
| `/work` | `app/work/page.tsx`, numbered spreads |
| `/work/<slug>` | `app/work/[slug]/page.tsx`, one per published project |
| `/contact` | `app/contact/page.tsx` |
| 404 | `app/not-found.tsx` |

The old `.html` URLs redirect permanently, set up in `next.config.mjs`.

### Colour

Tokens at the top of `app/globals.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#FBF9F4` | Off-white. Page ground |
| `--ink` | `#2A211A` | Dark coffee. Text, solid buttons, the closing band |
| `--yellow` | `#FFF176` | Highlighter, button hover, the cursor field, active nav |
| `--blue` | `#00A7E1` | Accent. Decorative fills only on light ground, including the marks |
| `--blue-deep` | `#0077A8` | The blue darkened, for anything that must be read |

**Two rules that are not negotiable.** Brand blue measures 2.6:1 on the off-white
ground and fails legibility, so `--blue-deep` at 4.7:1 carries any blue that has
to be read. Yellow on off-white is 1.1:1, so yellow is always a fill behind dark
text, never a text colour.

In dark mode the hero takes the dark texture and the approach section inverts to
an off-white band on the coffee page.

### Type

| Role | Face | Source |
| --- | --- | --- |
| Headings | Loretta Variable | Adobe Typekit, kit `yhu7ntr` |
| Body | Work Sans | Self hosted by `next/font` |
| Labels | System monospace | No download |

Typekit must stay published with `snehajain.co.uk` on its allowed domains, or
headings fall back to Georgia.

### The enquiry form

Tally form `OD2Da8`, embedded on `/contact` by `components/contact/TallyEmbed.tsx`.
Answers go to the Tally inbox, which is deliberate: Tally also handles enquiries
that do not come from the site. Change the id in `content/site.ts` to swap forms.

---

## Things that will bite you

**The header is still a placeholder.** `components/site/Header.tsx` plus section 5
of `globals.css`. Replace both when the new design lands.

**Use `m.` not `motion.`** See the animation section.

**`backdrop-filter` makes an element the containing block for fixed children.**
The mobile menu is a sibling of the header rather than a child for this reason.
Do not move it back inside.

**The header is opaque on purpose.** It was translucent, which let the cursor
field show through it. Making it see-through again brings that back.

**Never give an element `position` to fix a paint order problem.** A rule that
did exactly that once turned the sticky header into a relative one and the skip
link into a visible element nine thousand pixels off screen. Reach for `z-index`.

**Do not delete CSS by scanning to the next comment.** The stylesheet is not
ordered by feature. Doing that once removed the packages and the three steps
along with the rules that were actually dead. Match braces, or delete rule by
rule.

**`folderGallery` returns leftovers, not everything.** It gives what no
`<Gallery pick>` has claimed, which is right inside a case study and wrong
anywhere else. Use `projectImages` outside.

**Headings carrying a highlight need line-height around 1.24.** Below that the
yellow block collides with descenders on the line above once the text wraps.

---

## Still outstanding

- **Package deliverables, timelines and prices are drafts I did not write.**
  They are in `content/services.ts` behind a comment saying so. The prices read
  `From £0,000` deliberately: an impossible figure cannot ship unnoticed and
  quote a client something that was never agreed. Replace all three before the
  site goes live.
- **The email address does not exist yet.** The site shows
  `hello@snehajain.co.uk`. A mailbox has to exist before anyone writes to it.
  Registrar forwarding into an existing inbox is free at most UK registrars.
- **Case study copy for Sunlife International and Paloma.** Both have a summary,
  facts and a gallery but no written sections, so those simply do not render.
- **`public/img/og.png`**, 1200 by 630, the preview image when a link is shared.
  Until it exists, links share with no picture.
- **Swirly's `3-tubs.jpg` is 1024px at source**, the only image on the site that
  cannot be sharpened. A larger export would fix it.
- **Motion renders at `opacity: 0` before hydration.** Every `Reveal` on the site
  does, so with JavaScript blocked the page loads close to blank. `LinesIn` is
  the one component that degrades properly, and it is the pattern to follow if
  this is ever worth fixing.

---

## Deploying

Vercel builds and deploys on every push. `main` is production, every other branch
gets its own preview URL.

First time only: import the repo at vercel.com, accept the detected Next.js
settings, then add `snehajain.co.uk` under Domains and follow its DNS
instructions. Turn GitHub Pages off only once Vercel is serving the domain.

---

## The working files

`docs/` holds the guide and the rounds of design options this site was chosen
from. They are plain HTML, open by double-clicking, and are never published.

| File | What it is |
| --- | --- |
| `editing-guide.html` | How to change anything. Start here |
| `animation-lab.html` | The five dials of motion, and the hero six ways |
| `animation-menu.html` | Cursor, scroll, hover and whimsy options |
| `animation-round2.html` | Easing, the field in one colour, real scroll examples |
| `animation-round3.html` | Work and services layouts, testimonials |
| `animation-round4.html` | The mark alphabet decoded, more service layouts |
| `animation-round5.html` | Underlines, packages, full width work rows |
| `animation-round6.html` | Deliverables four ways, five work layouts |
| `animation-round7.html` | Five more work layouts, colour fields |

They are a record of what was tried and rejected, which is worth more than it
looks: most of the questions that come up later have already been answered in
one of them.
