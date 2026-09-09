# snehajain.co.uk

Portfolio site for Sneha Jain, strategic brand designer for founders.

Next.js 16 with the App Router, React 19, TypeScript, and Motion for animation.
Case studies are written in MDX. Deployed on Vercel.

---

## Read this first

Nothing here is hand written HTML any more. Pages are React components, and case
studies are Markdown files. There is no build step to remember before committing:
Vercel builds on every push.

| To change | Edit |
| --- | --- |
| A case study | `content/projects/<slug>.mdx` |
| Its images | `source-images/<slug>/`, then `npm run images` |
| Testimonials | `content/testimonials.ts` |
| Services and packages | `content/services.ts` |
| FAQ | `content/faq.ts` |
| Email, socials, Tally id | `content/site.ts` |
| Page copy and layout | `app/` and `components/` |
| Colour, type, spacing | `app/globals.css` |
| Animation | `components/motion/` |

Working locally:

```
npm install
npm run dev      # http://localhost:3000, updates as you type
npm run build    # what Vercel runs, use it to check nothing is broken
```

---

## Adding or changing a project

Everything about one project lives in two places, both named after the project:

```
content/projects/swirly.mdx     the words
public/work/swirly/             the pictures
```

The filename is the URL, so `swirly.mdx` is `/work/swirly`.

### Adding one

1. Copy any existing `.mdx` in `content/projects/` and rename it. Lowercase, hyphens, no spaces.
2. Change the block at the top, write the body.
3. Make a folder of the same name in `source-images/` and put the photographs in.
4. Run `npm run images`.
5. Commit and push. Vercel builds it.

### The block at the top

```mdx
export const meta = {
  title: "Swirly",
  subtitle: "Brand identity and packaging",
  client: "Swirly",
  year: "2026",
  sector: "Ice cream",
  services: ["Visual Identity", "Packaging Design"],
  summary: "One or two sentences, shown under the title and used as the search description.",
  order: 3,
  published: true,
  featured: true,
};
```

`order` sets the position on the work page, lowest first.

`published: false` takes a project off the site completely while keeping the file:
no page, no card, no sitemap entry, and no dead link, because it drops out of the
"next project" chain too.

`featured: false` keeps it off the home page but leaves it on the work page.

Note what is not in there: no image paths. Nothing to keep in step with the folder.

### The body

A `##` starts a section, a blank line separates paragraphs, and `<Gallery />` on a
line of its own drops the pictures in:

```mdx
## A full brand world

Every element is designed to feel cohesive yet full of personality.

<Gallery />

## A brand that stays with you

More than just a product on the shelf.
```

Put `<Gallery />` wherever the images belong. Write as many sections as you want. A
project with no sections at all is fine, it shows the cover, the facts and the
gallery.

---

## Images

Full size exports go in `source-images/<slug>/`, then:

```
npm run images
```

That caps them at 2000px and writes JPEGs to `public/work/<slug>/`. That folder
**is** the gallery. Nothing to list, nothing to link.

The filename decides three things:

| Filename | What it does |
| --- | --- |
| `cover.jpg` | The cover: the large image at the top, and the card on the work page |
| anything else | Goes in the gallery, in alphabetical order |
| a name containing `wide` | Spans the full width instead of sharing a row |

So `01-storefront.jpg`, `02-fridge-wide.jpg`, `03-tub.jpg` gives that order with the
fridge full width. Renaming a file reorders the page.

The rest of the name becomes the alt text a screen reader announces, so
`pattern-detail.jpg` is read as "Swirly, pattern detail". Worth naming files
properly for that alone.

Rows fill themselves. Images pair two to a row, an odd number turns the last three
into a row of three, and wide ones slot between whole rows, so no row is ever left
half empty. That packing is `packGallery` in `lib/projects.ts`.

**Replacing an image.** Same filename into `source-images/<slug>/`, run
`npm run images`, push.

**Removing one.** Delete it from `source-images/<slug>/` and from
`public/work/<slug>/`, since only the second is committed.

**Listing images by hand.** `<Gallery images={[{ src: "/work/swirly/tub.jpg", alt:
"Swirly, tub" }]} />` still works and overrides the folder for that one block. Only
needed if a case study wants two separate galleries.

`source-images/` is gitignored. Git keeps every version of every file forever, so
committing full size exports would bloat the repo permanently. The originals on
disk are 287 MB. What ships is 4.7 MB, and `next/image` cuts it again on Vercel:
AVIF and WebP, a size per device, lazy loading below the fold. A 229 KB source
cover reaches a phone as a 29 KB AVIF.

---

## Animation

Everything lives in `components/motion/`.

| Component | What it does |
| --- | --- |
| `Reveal` | Fades and lifts into place on first scroll into view |
| `Stagger` and `StaggerItem` | A list whose children arrive one after another |
| `RiseIn` | Hero lines rising from behind a mask on load |
| `Highlight` | The yellow marker drawing itself across a word |
| `ParallaxImage` | A cover that drifts slightly as it passes |

**Every one of them checks `useReducedMotion` first.** If a visitor has asked
their system to reduce motion, nothing moves and elements render at their final
state. That is not decoration, it is what the old stylesheet did and it has to
keep working. If you add animation, follow the same pattern.

Motion is loaded through `LazyMotion` in `components/motion/MotionProvider.tsx`,
with `strict` on. That means you must use `m.div` rather than `motion.div`. The
build fails if you forget, which is the point: `motion.` pulls the whole library
back into the bundle.

---

## Reference

### Routes

| Path | File |
| --- | --- |
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/services` | `app/services/page.tsx` |
| `/work` | `app/work/page.tsx` |
| `/work/<slug>` | `app/work/[slug]/page.tsx`, one per published project |
| `/contact` | `app/contact/page.tsx` |
| 404 | `app/not-found.tsx` |

The old `.html` URLs redirect permanently to these, set up in `next.config.mjs`,
so any link anyone already has keeps working.

### Colour

Tokens at the top of `app/globals.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#FBF9F4` | Off-white. Page ground |
| `--ink` | `#2A211A` | Dark coffee. Text, solid buttons, the closing band |
| `--yellow` | `#FFF176` | Highlighter, button hover, link underlines, active nav |
| `--blue` | `#00A7E1` | Accent. Decorative fills only on light ground |
| `--blue-deep` | `#0077A8` | The blue darkened, for anything that must be read |

Every other value is a tint or shade of those four.

**Two rules that are not negotiable.** Brand blue measures 2.6:1 on the off-white
ground and fails legibility, so `--blue-deep` at 4.7:1 carries any blue that has to
be read. Yellow on off-white is 1.1:1, so yellow is always a fill behind dark text,
never a text colour.

In dark mode the hero takes the dark texture and the approach section inverts to an
off-white band on the coffee page. Yellow carries the accents at 15.6:1.

### Type

| Role | Face | Source |
| --- | --- | --- |
| Headings | Loretta Variable | Adobe Typekit, kit `yhu7ntr` |
| Body | Work Sans | Self hosted by `next/font` |
| Labels | System monospace | No download |

Work Sans is self hosted now, so there is no request to Google and no flash of
fallback type. Typekit must stay published with `snehajain.co.uk` on its allowed
domains, or headings fall back to Georgia.

### The enquiry form

Tally form `OD2Da8`, embedded on `/contact` and loaded by
`components/contact/TallyEmbed.tsx`. Answers go to the Tally inbox, which is
deliberate: Tally also handles enquiries that do not come from the site. Change the
id in `content/site.ts` to swap forms. The Tally badge cannot be removed on the
free plan, Tally enforces that server side.

---

## Things that will bite you

**The header is still a placeholder.** `components/site/Header.tsx` plus section 5
of `globals.css`. Replace both when the new design lands.

**Use `m.` not `motion.`** See the animation section above.

**`backdrop-filter` makes an element the containing block for fixed children.** The
sticky header has one, which is why the mobile menu is a sibling of the header
rather than a child. Do not move it back inside.

**Footer buttons need their colour restated.** `.foot-col a` sets the muted link
colour and is more specific than `.btn--solid`.

**Headings carrying a highlight need line-height of about 1.24.** Below that the
yellow block collides with descenders on the line above once the text wraps.

---

## Still outstanding

- **The email address does not exist yet.** The site shows `hello@snehajain.co.uk`.
  A mailbox has to exist somewhere before anyone writes to it. Registrar forwarding
  into an existing inbox is free at most UK registrars.
- **Case study copy for Sunlife International and Paloma.** Both have a summary,
  facts and a gallery but no written sections, so those simply do not render.
- **Package deliverables and timelines** on `/services`, all four marked
  "to confirm". No prices are shown, which is correct until the real figures are in.
- **`public/img/og.png`**, 1200 by 630, the preview image when a link is shared.
  Until it exists links share with no picture.

---

## Deploying

Vercel builds and deploys on every push. `main` is production, every other branch
gets its own preview URL.

First time only: import the repo at vercel.com, accept the detected Next.js
settings, then add `snehajain.co.uk` under the project's Domains tab and follow its
DNS instructions. Turn GitHub Pages off only once Vercel is serving the domain.
