# snehajain.co.uk

Portfolio site for Sneha Jain, strategic brand designer for founders.

Plain HTML and CSS with a little JavaScript. The published site has no dependencies and no
hosting bill. The one package in `package.json` is `sharp`, used only to resize photographs
on your machine. Nothing from `node_modules` is ever served.

---

## Read this first

**Every `.html` file here is generated.** Editing one by hand works until the next build,
which silently replaces it. Change the source instead:

| To change | Edit |
| --- | --- |
| Projects and testimonials | `content/projects.json`, or `admin.html` in a browser |
| Project images | Drop files in `source-images/<slug>/` |
| Page copy, layout, sections | `build/build.js` |
| Colour, type, spacing | `assets/styles.css` |
| Clock, menu, reveals, Tally loader | `assets/script.js` |

Two commands, both run from this folder:

```
node build/images.js     # only when you have added or changed photographs
node build/build.js      # always, before committing
```

`build.js` rewrites every page and `sitemap.xml`, and deletes case study pages for projects
that are no longer published.

---

## Everyday tasks

### Editing project text

Open `admin.html` over a local server so it can read the data file:

```
python -m http.server 8000
```

Then go to <http://localhost:8000/admin.html>. Projects on the left, a form on the right.
When you are done, press **Download projects.json**, drop it into `content/` over the old
one, run `node build/build.js`, and push.

If the editor cannot read the file, paste the contents of `content/projects.json` into the
Raw JSON box and press Load.

Two switches matter:

- **Publish this project.** Unticked, it stays in the file but leaves the site completely:
  no page, no card, no sitemap entry. Nothing is lost and one tick brings it back.
- **Show it on the home page.** Unticked, it appears on the work page only.

The `brief`, `decision` and `outcome` fields only render when you write something in them,
and the same goes for the gallery and credits. A case study with all of them empty shows its
cover, title, summary and facts, then stops. A half-written project never looks half-written.

### Adding project images

Put full size originals in `source-images/<slug>/`. Export at whatever size you like, no
need to resize anything. Then run both build commands.

Filenames carry the meaning:

| File | What it becomes |
| --- | --- |
| `cover.jpg` | The top of the case study, and the work grid card |
| anything else | The gallery, in filename order |
| a name containing `wide` | Spans the full width instead of sitting two up |

Number files to control order, for example `01-logo.jpg`, `02-pattern.jpg`. Names are
lowercased and hyphenated on the way through, so `Cream jar open.jpg` becomes
`cream-jar-open.jpg` and the URL stays clean.

Alt text is read from the filename, with leading numbers and the word `wide` stripped, so
`03-pattern-detail.jpg` reads as "pattern detail" to a screen reader. Name files in plain
words rather than `IMG_4471.jpg`.

**Originals never enter the repository.** `source-images/` is gitignored. Git keeps every
version of every file forever, so committing full size exports would bloat the repo
permanently even after a delete. The originals on disk are 287 MB. The web copies are
4.7 MB. Sizes are set at the top of `build/images.js`.

### Adding a whole new project

1. Add it in `admin.html`, or copy an existing block in `content/projects.json`.
2. Give it a `slug`. That becomes the URL, so lowercase with hyphens.
3. Make `source-images/<slug>/` and put the photographs in.
4. Run both build commands, then push.

---

## Reference

### Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `about.html` | About |
| `services.html` | Services and packages |
| `work.html` | Selected work |
| `contact.html` | Start a project, with the Tally form |
| `404.html` | Not found |
| `work/<slug>.html` | One per published project |
| `admin.html` | Project editor. Not linked from the site, carries `noindex` |

Live projects, in the order set in the data file: Asmi, Sunlife International, Swirly,
Paloma, LUMEYA. Napur Gin is held back. Asmi, Lumeya and Swirly carry her published copy
taken verbatim from the Framer site. Sunlife and Paloma have none yet, so those two show
cover, summary, facts and gallery, then stop.

### Colour

Everything comes from the tokens at the top of `assets/styles.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#FBF9F4` | Off-white. Page ground |
| `--ink` | `#2A211A` | Dark coffee. Text, solid buttons, the closing band |
| `--yellow` | `#FFF176` | Highlighter, button hover, link underlines, active nav |
| `--blue` | `#00A7E1` | Accent. Decorative fills only on light ground |
| `--blue-deep` | `#0077A8` | The blue darkened, for anything that must be read |

Every other value in the stylesheet is a tint or shade of these four.

**Two rules that are not negotiable.** Brand blue measures 2.6:1 on the off-white ground and
fails legibility, so `--blue-deep` at 4.7:1 carries any blue that has to be read. Yellow on
off-white is 1.1:1, so yellow is always a fill behind dark text, never a text colour.

Dark mode is a second palette in the `prefers-color-scheme` block. Two sections behave
differently there: the hero takes the dark texture, since the stripe paper is a light
pattern, and the approach section inverts to an off-white band on the coffee page. Yellow
carries the accents, at 15.6:1 on the dark ground.

### Type

| Role | Face | Source |
| --- | --- | --- |
| Headings | Loretta Variable | Adobe Typekit, kit `yhu7ntr` |
| Body | Work Sans | Google Fonts |
| Labels and numbers | System monospace | No download |

The Typekit kit must stay published with `snehajain.co.uk` on its allowed domains, or
headings fall back to Georgia. The hero is the exception: it is set in Work Sans at regular
weight to match the supplied design, and its two buttons are the only title-case ones on the
site.

### Brand assets

| File | Where it appears |
| --- | --- |
| `logo-dark.png`, `logo-cream.png` | The header mark. Cream swaps in for dark mode |
| `favicon.svg` | Browser tab icon. Generated, see below |
| `bg-stripes.png` | The hero in light mode, and the services page FAQ |
| `bg-dark.png` | The hero in dark mode, and the closing band |
| `mark-dots.png`, `mark-braces.png`, `mark-diamond.png`, `mark-heart.png` | Not currently placed |
| `card-front.png`, `card-back.png` | Not currently placed |

The favicon is generated rather than pointing at a logo file. The mark is portrait at
roughly 1136 by 1783, so a browser squashed it into its square slot. `favicon.svg` holds it
centred on a yellow tile at its true proportions, filling 88% of the height, with the PNG
embedded so it costs no second request. Regenerate rather than editing it by hand.

### The enquiry form

Tally form `OD2Da8`, embedded as an iframe on `contact.html`. Answers go straight to the
Tally inbox and never touch this site. The loader lives in `assets/script.js` and only runs
on pages containing a Tally iframe. With JavaScript off, a link to the form shows instead.
To swap forms, change `TALLY` at the top of `build/build.js`.

**The Tally badge cannot be removed on the free plan.** Tally enforces it server side:
requesting `removeBranding=1` in the embed URL is ignored and the payload still returns
`"removeBranding":false`. Styling it away is impossible too, since the form is a
cross-origin iframe. Tally Pro is the only supported way.

### Testimonials

Three real quotes live in the `testimonials` array in `content/projects.json`. An empty
quote renders as a visible dashed slot rather than anything invented. Only use words a
client actually said, with their permission.

---

## Things that will bite you

**Bump the stylesheet version after editing CSS.** Pages link it as `assets/styles.css?v=19`,
set by `CSS_VERSION` at the top of `build/build.js`. Browsers cache CSS hard, and a stale
copy against new markup breaks the page rather than merely dating it.

**The header is still a placeholder.** A new design is coming. Until it arrives the current
one is fenced in `build/build.js` between `HEADER, PLACEHOLDER` and `END HEADER`, which then
appears in every page. Change it once in the builder. Three hooks in `assets/script.js`
depend on it: the `.is-open` class on `#nav`, the `#clock` element, and the `--head-h`
custom property.

**A `backdrop-filter` makes an element the containing block for fixed children.** The sticky
header has one, which trapped the mobile menu inside the 72px header instead of the
viewport. The filter is switched off below 860px, where the menu lives. Do not put it back.

**Footer buttons need their colour restated.** `.foot-col a` sets the muted link colour and
is more specific than `.btn--solid`, so a button in the footer silently inherits it and
renders at 2.56:1.

**Headings carrying a `.mark` highlight need line-height of about 1.24.** Below that the
yellow block collides with descenders on the line above once the text wraps on a phone.

**The gallery packs itself.** The grid is six columns, so a row fills as 3 + 3, or 2 + 2 + 2,
or a single 6. Ordinary images pair up, an odd number turns the last three into a row of
three, and wide images slot between whole rows. This is why no row is ever left half empty.

---

## Still outstanding

**GitHub Pages has never been enabled.** This is why the site 404s. DNS is already correct
for both the apex and www, the repo is public, and `index.html`, `CNAME` and `.nojekyll` are
all at the root of `main`. It only needs turning on at
<https://github.com/SnehaJain-bd/snehajain.co.uk/settings/pages>, with the source set to
`main` and `/ (root)`.

**The email address does not exist yet.** The site shows `hello@snehajain.co.uk` everywhere.
GitHub Pages serves web pages only and cannot receive mail, so that mailbox has to be
created somewhere before anyone writes to it. Section 5 of `DEPLOY.md` lists the options,
cheapest first. Registrar forwarding into an existing inbox is free at most UK registrars.

Also to do:

- **Case study copy for Sunlife International and Paloma.** Both have a summary and facts
  but no brief, decision or outcome, so those sections do not render.
- **Package deliverables and timelines** on `services.html`, all four marked "to confirm".
  No prices are shown anywhere, which is correct until the real figures are in.
- **`assets/img/og.png`**, 1200 by 630, the preview image when a link is shared. Until it
  exists links share with no picture. It must be PNG or JPG, because social platforms ignore
  SVG.
- **`portrait.png` is 671 KB.** Exporting the same photo as a JPEG at about 80 percent would
  land near 120 KB with no visible difference.

---

## Previewing and deploying

```
python -m http.server 8000
```

Then open <http://localhost:8000>. Double-clicking a file mostly works, but the
root-relative links in `404.html` and the editor's file loading only behave over a server.

See `DEPLOY.md` for the GitHub and DNS walkthrough. Day to day:

```
node build/build.js
git add -A
git commit -m "Add the Swirly case study"
git push
```
