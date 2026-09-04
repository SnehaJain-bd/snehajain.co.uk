# snehajain.co.uk

Portfolio site for Sneha Jain, strategic brand designer for founders.
Plain HTML, CSS and a little JavaScript. No build step, no dependencies, no framework.
Edit a file, push, and the live site updates in about a minute.

Layout follows the [Quomi](https://quomi.framer.website/) template. Copy follows
`website-copy.md` in the brand assets folder. Voice rules from that file are applied
throughout: plain statements, no em-dashes, nothing bracketed ships.

## Pages

Every item in the navigation is its own page.

| File | Page | Nav |
| --- | --- | --- |
| `index.html` | Home | Logo |
| `about.html` | About | About |
| `services.html` | Services and packages | Services |
| `work.html` | Selected work | Work |
| `contact.html` | Start a project | Start a project button |
| `404.html` | Not found | Not linked |
| `work/project-*.html` | Four case studies | From the work grid |
| `work/_template.html` | Copy this for a new case study | Not published |

## The header is still a placeholder

A new design is coming. Until it arrives the current header stands in, and it is fenced
in every page between these two comments:

```
<!-- HEADER, PLACEHOLDER. Replace this whole block when the new design lands. -->
...
<!-- END HEADER -->
```

That block appears in all eleven HTML files. The matching CSS is section 5 of
`assets/styles.css`. Three hooks in `assets/script.js` depend on it: the `.is-open`
class on `#nav`, the `#clock` element, and the `--head-h` custom property. Keep those
three, or delete the matching code.

The oversized name that used to sit under the header has been removed.

## After editing the stylesheet, bump the version

Every page links the stylesheet as `assets/styles.css?v=5`. Browsers cache CSS hard,
and a stale copy against new markup breaks the page rather than merely dating it.
Raising that number in all eleven HTML files forces every browser to fetch
the new file. Nothing else depends on it.

The header is the logo mark on its own, with no name beside it. A `<picture>` element
lets the browser pick the cream or dark version natively, so only one is ever in the
page, and the `img` carries real `width` and `height` attributes so it stays the right
size even before CSS loads.

## Brand tokens

Everything visual comes from the first 60 lines of `assets/styles.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#FBF9F4` | Off-white. Page ground |
| `--ink` | `#2A211A` | Dark coffee. All text, solid buttons, the closing band |
| `--yellow` | `#FFF176` | Highlighter, button hover, link underlines, active nav |
| `--blue` | `#00A7E1` | Accent. Decorative fills only on light ground |
| `--blue-deep` | `#0077A8` | Accent where something must actually be read |

Off-white, coffee and yellow do the work. Blue is an accent and is kept off anything
that has to be legible on the light ground, because `#00A7E1` measures 2.6:1 there and
fails the 4.5:1 minimum. It survives in three places where it is safe: the pulsing
availability dot, focus rings via `--blue-deep` at 4.7:1, and dark mode, where the true
brand blue measures 6.6:1 against the dark ground and is used directly.

Yellow is a fill, never a text colour. Yellow on off-white is 1.1:1 and effectively
invisible. Coffee on yellow is 13.6:1, the strongest pairing in the palette, so yellow
always sits behind dark text: the `.mark` highlighter, link underlines that fill on
hover, and the solid button hover state.

Text links are coffee with a yellow underline that fills on hover. Blue is not used for
links anywhere on the light ground.

## Type

| Role | Face | Source |
| --- | --- | --- |
| Headings | Loretta Variable | Adobe Typekit, kit `yhu7ntr` |
| Body | Work Sans | Google Fonts |
| Labels and numbers | System monospace | No download |

The accent face has been dropped for now. Shantell Sans is no longer loaded on any page.
The font package is still in the brand assets folder if it comes back.

The Typekit kit must stay published with `snehajain.co.uk` on its allowed domains, or
headings fall back to Georgia.

## Brand assets in use

Copied into `assets/img/` from the brand assets folder. The rest of that folder, including
the other six backgrounds and roughly eighty graphics, is deliberately unused.

| File | Where it appears |
| --- | --- |
| `logo-dark.png`, `logo-cream.png` | The header mark. The cream version swaps in for dark mode |
| `favicon.svg` | Browser tab icon. Generated, see below |
| `bg-stripes.png` | Ground for the intro, how I work and services FAQ sections |
| `bg-dark.png` | Texture behind the closing band |
| `mark-dots.png` | Separator in the scrolling strip |
| `mark-braces.png` | Beside the pull quote on About |
| `mark-diamond.png`, `mark-heart.png` | Copied but not yet placed |
| `card-front.png`, `card-back.png` | Copied but not yet placed |

## The favicon is generated, not a raw logo file

The logo mark is portrait, roughly 1136 by 1783. Pointing a favicon straight at it
made browsers squash it into their square slot, which stretched it. `assets/img/favicon.svg`
now holds the cream mark centred on a coffee tile at its true proportions, with the PNG
embedded so the icon needs no second request.

If the logo art ever changes, regenerate it rather than editing by hand. The mark is
placed at 40 units tall inside a 64 unit square, and its width follows the source
aspect ratio.

## Enquiries go out to Tally, not to a form on the site

There is no form on the site. Sneha uses Tally and did not want one embedded, so
`contact.html` offers email and an Instagram DM, both of which work today.

A third button linking out to Tally sits ready in a comment block on that page. Make a
Tally form carrying only the fields you want from website enquiries, keeping it separate
from any existing form so the two do not mix. Paste its share link over
`YOUR_TALLY_LINK` and delete the two comment markers.

The `.form` styles are still in the stylesheet in case a form ever comes back.

## Two sections are hidden on purpose

**Testimonials** are commented out in `index.html`. The copy file marks them
`[CONFIRM: 2 or 3 real quotes, verbatim, name + brand + permission. Never paraphrased]`
and its own rule is that nothing bracketed ships. Invented quotes were removed rather
than published under real-sounding names. Paste real quotes into the commented block and
delete the comment markers to bring it back. The styles are already there.

**Insights** has been removed entirely, along with its navigation entry.

## Still to fill in

| Find | Replace with |
| --- | --- |
| `USERNAME` | Real LinkedIn and Behance handles, or delete those two links |
| `YOUR_TALLY_LINK` | Tally share link, in the commented block on `contact.html` |
| `assets/img/portrait.svg` | Her profile photo, the same one as Instagram |
| `assets/work/*.svg` | Real project images, about 1600px wide and compressed |

Marked in the files with a `PLACEHOLDER` comment:

- **About page body copy.** The five things list was written for an Instagram story, not
  the site, so it has been removed. The page currently runs on two approved lines. It
  wants a proper written bio.
- **Package deliverables and timelines** on `services.html`, all four marked
  "to confirm". Packages v3 was not supplied. No prices are shown anywhere, which is
  correct until the real figures are in.
- **FAQ answers** are twelve questions across four groups. They are written in her voice
  rather than being the FAQ v3 text. The revision term is correct: three rounds of
  changes are included.
- **Case study bodies** are still the template prompts. Each one wants the brief, the
  decisions and the outcome, described by decisions rather than adjectives.

The counter on the home page has been removed. The same figures still appear as a
sentence at the foot of the About page, which is the approved proof line.

Still to make: `assets/img/og.png`, 1200x630, the preview image when a link is shared.
Until it exists links share with no picture. It must be PNG or JPG, because social
platforms ignore SVG.

## Adding a new project

1. `cp work/_template.html work/project-five.html`
2. Replace `PROJECT_NAME`, `PROJECT_SLUG`, `PROJECT_HEADLINE`, `PROJECT_BLURB`,
   `PROJECT_TAGS`, `PROJECT_SECTOR` and `PROJECT_NEXT`.
3. Add the image to `assets/work/`.
4. Copy one `<a class="project">` block into `work.html` and `index.html`.
5. Add the URL to `sitemap.xml`.

## Previewing locally

```
python -m http.server 8000
```

Then open <http://localhost:8000>. Double-clicking a file mostly works, but the
root-relative links in `404.html` only behave properly over a server.

## Deploying

See `DEPLOY.md` for the GitHub and DNS walkthrough. Day to day:

```
git add -A
git commit -m "Update work section"
git push
```
