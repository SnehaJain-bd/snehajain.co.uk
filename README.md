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

## Writing a case study

One file per project at `content/projects/<slug>.mdx`. The filename becomes the URL.

The top of the file is the metadata:

```mdx
export const meta = {
  title: "Asmi",
  subtitle: "Brand identity for an apparel brand",
  client: "Shruti Patki",
  year: "2026",
  sector: "Clothing",
  services: ["Brand Strategy", "Visual Identity"],
  summary: "One or two sentences, used under the title and as the search description.",
  cover: "/work/asmi/cover.jpg",
  coverAlt: "Asmi project cover",
  order: 1,
  published: true,
  featured: true,
};
```

Then write. A `##` starts a section, blank lines separate paragraphs, and you can
drop a gallery in wherever it belongs:

```mdx
## Bridging culture with contemporary expression

The visual identity was crafted to merge tradition with modern design sensibilities.

<Gallery
  images={[
    { src: "/work/asmi/box.jpg", alt: "Asmi, box" },
    { src: "/work/asmi/label-tag.jpg", alt: "Asmi, label tag", wide: true },
  ]}
/>

## A distinctive identity

Asmi's brand identity goes beyond aesthetics.
```

`wide: true` makes an image span the full width. Everything else pairs up two to a
row, and an odd number turns the last three into a row of three, so no row is ever
left half empty. That packing lives in `packGallery` in `lib/projects.ts`.

**Two switches.** `published: false` keeps a project on disk but off the site
completely: no page, no card, no sitemap entry. Napur Gin is held back this way.
`featured: false` keeps it off the home page but on the work page.

**Adding a project.** Copy an existing `.mdx`, change the metadata, put images in
`public/work/<slug>/`, and set `order`. Nothing else to register.

---

## Images

Put full size originals in `source-images/<slug>/`, then run:

```
npm run images
```

That caps them at 2000px and writes JPEGs to `public/work/<slug>/`. From there
`next/image` does the real work on Vercel: AVIF and WebP, a size per device, lazy
loading below the fold. A 229 KB source cover is served as a 29 KB AVIF.

`source-images/` is gitignored. Git keeps every version of every file forever, so
committing full size exports would bloat the repo permanently. The originals on
disk are 287 MB. What ships is a fraction of that.

Reference the file at its `public` path, so `public/work/asmi/box.jpg` is
`/work/asmi/box.jpg`.

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
