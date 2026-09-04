# snehajain.co.uk

Portfolio site for Sneha Jain, strategic brand designer for founders.
Plain HTML and CSS with a little JavaScript. No framework, no dependencies, no hosting bill.

## Read this first: the HTML files are generated

Every `.html` file in this repo is written by `build/build.js`. Editing one by hand works
until the next build, which silently replaces it. Change the source instead:

| To change | Edit |
| --- | --- |
| Projects, testimonials | `content/projects.json`, or `admin.html` in a browser |
| Page copy, layout, sections | `build/build.js` |
| Colour, type, spacing | `assets/styles.css` |
| Clock, menu, reveals, Tally loader | `assets/script.js` |

Then run, from the repo root:

```
node build/build.js
```

It rewrites all the pages and `sitemap.xml`, and deletes case study pages for projects that
are no longer published.

## The project editor

`admin.html` is a small content editor. It is not linked from the site and carries a
`noindex` tag. Open it over a local server, not by double-clicking, so it can read the data
file:

```
python -m http.server 8000
```

Then go to <http://localhost:8000/admin.html>.

You get a list of projects on the left and a form on the right. Add, reorder, delete, and
fill in the fields. When you are done:

1. Press **Download projects.json**.
2. Replace `content/projects.json` with the file you just downloaded.
3. Run `node build/build.js`.
4. Commit and push.

If the editor cannot read the file, paste the contents of `content/projects.json` into the
Raw JSON box and press Load.

### Two switches worth knowing

- **Publish this project.** Unticked, the project stays in the file but leaves the site
  completely: no page, no card, no sitemap entry. Nothing is lost and one tick brings it
  back. Napur Gin is currently held back this way.
- **Show it on the home page.** Unticked, the project appears on the work page only.

### Fields that are left off while empty

`brief`, `decision` and `outcome` only render if you write something in them. A case study
with all three empty shows its summary, its facts and its image, and stops there. That way
a half-written project never reaches the site looking half-written.

## Projects currently live

Pulled from the Behance profile, in the order set in the data file.

| Order | Project | Year |
| --- | --- | --- |
| 1 | Asmi | 2026 |
| 2 | Sunlife International | 2026 |
| 3 | Swirly | 2026 |
| 4 | Paloma | 2026 |
| 5 | LUMEYA | 2026 |
| held back | Napur Gin | 2024 |

**The images are placeholders, not the Behance artwork.** Each project has an abstract SVG
in the brand palette at `assets/work/<slug>.svg`. Replace them with real images, about
1600px wide and compressed, then point the `image` field at the new file. Each case study
links out to its Behance page at the foot.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `about.html` | About |
| `services.html` | Services and packages |
| `work.html` | Selected work |
| `contact.html` | Start a project, with the Tally form |
| `404.html` | Not found |
| `work/<slug>.html` | One per published project |
| `admin.html` | Project editor, not linked, noindex |

## The header is still a placeholder

A new design is coming. Until it arrives the current header stands in, fenced in
`build/build.js` between these two comments, which then appear in every page:

```
<!-- HEADER, PLACEHOLDER. Replace this whole block when the new design lands. -->
...
<!-- END HEADER -->
```

Change it once in the builder, not in eleven files. Three hooks in `assets/script.js` depend
on it: the `.is-open` class on `#nav`, the `#clock` element, and the `--head-h` custom
property. Keep those three, or delete the matching code.

The header is the logo mark on its own. A `<picture>` element lets the browser pick the
cream or dark version natively, so only one is ever in the page, and the `img` carries real
`width` and `height` so it stays the right size even before CSS loads.

## After editing the stylesheet, bump the version

Pages link the stylesheet as `assets/styles.css?v=7`, set by `CSS_VERSION` at the top of
`build/build.js`. Browsers cache CSS hard, and a stale copy against new markup breaks the
page rather than merely dating it. Raise the number and rebuild.

## Brand tokens

Everything visual comes from the first 60 lines of `assets/styles.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#FBF9F4` | Off-white. Page ground |
| `--ink` | `#2A211A` | Dark coffee. All text, solid buttons, the closing band |
| `--yellow` | `#FFF176` | Highlighter, button hover, link underlines, active nav |
| `--blue` | `#00A7E1` | Accent. Decorative fills only on light ground |
| `--blue-deep` | `#0077A8` | Accent where something must actually be read |

Off-white, coffee and yellow do the work. Blue is an accent and is kept off anything that
has to be legible on the light ground, because `#00A7E1` measures 2.6:1 there and fails the
4.5:1 minimum. It survives where it is safe: the pulsing availability dot, focus rings via
`--blue-deep` at 4.7:1, and dark mode, where the brand blue measures 6.6:1 and is used
directly.

Yellow is a fill, never a text colour. Yellow on off-white is 1.1:1 and effectively
invisible. Coffee on yellow is 13.6:1, so yellow always sits behind dark text.

Text links are coffee with a yellow underline that fills on hover. Blue is not used for
links anywhere on the light ground.

## Type

| Role | Face | Source |
| --- | --- | --- |
| Headings | Loretta Variable | Adobe Typekit, kit `yhu7ntr` |
| Body | Work Sans | Google Fonts |
| Labels and numbers | System monospace | No download |

The accent face is dropped for now. Shantell Sans is not loaded on any page. The Typekit kit
must stay published with `snehajain.co.uk` on its allowed domains, or headings fall back to
Georgia.

## Brand assets in use

| File | Where it appears |
| --- | --- |
| `logo-dark.png`, `logo-cream.png` | The header mark. The cream version swaps in for dark mode |
| `favicon.svg` | Browser tab icon, generated. See below |
| `bg-stripes.png` | Ground for the approach section and the services page FAQ |
| `bg-dark.png` | Texture behind the closing band |
| `mark-dots.png` | Separator in the strip under the hero |
| `mark-braces.png`, `mark-diamond.png`, `mark-heart.png` | Copied but not yet placed |
| `card-front.png`, `card-back.png` | Copied but not yet placed |

The rest of the brand assets folder, including six other backgrounds and around eighty
graphics, is deliberately unused.

### The favicon is generated, not a raw logo file

The logo mark is portrait, roughly 1136 by 1783. Pointing a favicon straight at it made
browsers squash it into their square slot. `assets/img/favicon.svg` holds the cream mark
centred on a coffee tile at its true proportions, with the PNG embedded so the icon needs no
second request. Regenerate rather than editing it by hand if the logo art changes.

## The enquiry form is Tally

The form on `contact.html` is Tally form `OD2Da8`, embedded as an iframe. Answers go
straight to the Tally inbox and never touch this site. The loader lives in
`assets/script.js` and only runs on pages that contain a Tally iframe. With JavaScript off,
a link to the form is shown instead.

To swap forms, change `TALLY` at the top of `build/build.js` and rebuild.

## Testimonials

The section is live on the home page. Quotes come from the `testimonials` array in
`content/projects.json`. An empty quote renders as a visible dashed slot reading "Waiting on
a real quote", so the layout is there and nothing is invented. Fill in the quote, name, role
and brand through `admin.html` and the slot becomes a real testimonial.

Only use words a client actually said, with their permission.

## Still to fill in

| Find | Replace with |
| --- | --- |
| `USERNAME` | Real LinkedIn handle, or delete that link |
| `assets/img/portrait.svg` | Her profile photo, the same one as Instagram |
| `assets/work/*.svg` | Real project images |

Also outstanding:

- **Case study bodies.** Every project has its summary and facts, but `brief`, `decision`
  and `outcome` are empty, so those sections do not render yet. The decision is the one the
  page is named after.
- **Package deliverables and timelines** on `services.html`, all four marked "to confirm".
  No prices are shown anywhere, which is correct until the real figures are in.
- **`assets/img/og.png`**, 1200 by 630, the preview image when a link is shared. Until it
  exists links share with no picture. It must be PNG or JPG, because social platforms ignore
  SVG.

## Previewing locally

```
python -m http.server 8000
```

Then open <http://localhost:8000>. Double-clicking a file mostly works, but the
root-relative links in `404.html` and the editor's file loading only behave over a server.

## Deploying

See `DEPLOY.md` for the GitHub and DNS walkthrough. Day to day:

```
node build/build.js
git add -A
git commit -m "Add the Swirly case study"
git push
```
