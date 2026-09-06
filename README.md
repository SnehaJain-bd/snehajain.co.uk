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

`brief`, `decision` and `outcome` only render if you write something in them, and the same
goes for the gallery and credits. A case study with all of them empty shows its cover, its
title, its summary and its facts, and stops there. That way a half-written project never
reaches the site looking half-written.

**All five published projects currently carry dummy text**, so the full case study layout is
visible while the design is being reviewed. Every dummy paragraph starts with the words
"Dummy text" and the gallery uses `placeholder-01` through `placeholder-04`. Replace them
before the site goes anywhere near a client. Search the repo for `Dummy text` to find them.

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
1600px wide and compressed, then point the `image` field at the new file.

Case studies do not link out to Behance. The `behance` field stays in the data file as a
reference for whoever is writing the case study, but nothing renders it. Behance is still
linked once, in the footer under Social.

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

Pages link the stylesheet as `assets/styles.css?v=12`, set by `CSS_VERSION` at the top of
`build/build.js`. Browsers cache CSS hard, and a stale copy against new markup breaks the
page rather than merely dating it. Raise the number and rebuild.

## How the page rhythm works

The hero carries the hand-drawn stripe paper, so the section under it cannot also carry
it. The approach section is dark instead, using `bg-dark.png`. That gives the home page a
light hero, a dark argument, a long light run through services, work, testimonials and
questions, then the dark closing band.

`.section--dark` and `.cta-band` hard-code coffee and cream rather than using `--ink` and
`--paper`. Those two tokens swap in dark mode, which previously left the closing band
painting dark text on the dark texture at 1.15:1. Both bands now stay dark in both themes.

To make the approach section plain off-white instead, drop `section--dark` from it in
`build/build.js` and rebuild.

## The hero

A two line serif statement, "You know what you are building. Your brand does not say it
yet.", then a sans sub-line, "Strategic brand design for founder-led businesses", then the
two buttons, then a strip reading "Brands that get chosen."

The heading lines are separate spans so they break where they are written rather than where
the container runs out. The two hero buttons are the only ones on the site in title case,
matching the design. Every other "Start a project" button is sentence case.

## Case study layout

Modelled on the Thought Over Design case studies: a full-bleed cover, then contained text
bands with the label on the left and the argument on the right, then image blocks, then a
large next-project card.

The order is cover, intro, facts, the brief, the decision, gallery, the outcome, credits,
Behance link, next project. Every one of those after the facts row is optional. A project
with no written blocks and no gallery renders as a cover, a title, a summary and its facts,
and stops there.

Two fields feed the image and credit blocks, both editable in `admin.html`:

- **Gallery.** One image per line as `path | description | wide`. Adding `wide` at the end
  makes that image span the full width of the grid. Everything else sits two up.
- **Credits.** One per line as `Role: Name`.

## Two layout traps worth remembering

**A backdrop-filter creates a containing block for fixed children.** The sticky header had
one, which meant the mobile menu, a  panel inside that header, was laid out
against the 72px header box instead of the viewport. It opened a few pixels tall and its
links spilled over the page. The filter is switched off below 860px, where the menu lives.

**Footer buttons need their colour restated.**  sets the muted link colour and
is more specific than , so a button in the footer silently inherited it and
rendered at 2.56:1.  puts it back to 15:1.

Headings that carry a  highlight need line-height of about 1.24. Below that, the
yellow block collides with the descenders on the line above once the text wraps on a phone.

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
| `bg-stripes.png` | Ground for the hero and the services page FAQ |
| `bg-dark.png` | Texture behind the approach section and the closing band |
| `mark-dots.png` | Not currently placed. The strip under the hero is now plain text |
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

### The Tally badge cannot be removed on the free plan

Tally decides this server side. Requesting `removeBranding=1` in the embed URL is ignored:
the payload still comes back with `"removeBranding":false`. Styling it away is impossible
too, because the form is a cross-origin iframe and a page cannot reach inside one.

The only supported way to drop it is Tally Pro, which turns on a "Remove Tally branding"
setting for the form.

## Testimonials

The section is live on the home page. Quotes come from the `testimonials` array in
`content/projects.json`. An empty quote renders as a visible dashed slot reading "Waiting on
a real quote", so the layout is there and nothing is invented. Fill in the quote, name, role
and brand through `admin.html` and the slot becomes a real testimonial.

Only use words a client actually said, with their permission.

## The email address does not exist yet

The site now shows `hello@snehajain.co.uk` everywhere: the contact page, the footer and the
structured data. GitHub Pages serves web pages only and cannot receive mail, so that mailbox
has to be created somewhere before anyone writes to it. Until then, enquiries sent to it go
nowhere.

Section 5 of `DEPLOY.md` lists the options, cheapest first. Registrar forwarding into an
existing inbox is free at most UK registrars and is enough to start.

The contact page lists email only. Instagram and Behance were removed from it, though both
are still in the footer under Social. The footer Contact column is now the address plus a
solid Start a Project button, and the line about working with founders anywhere has been
taken out of both the footer and the contact page. It still appears in the meta description.

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
