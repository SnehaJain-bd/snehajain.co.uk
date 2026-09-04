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
| `logo-dark.png`, `logo-cream.png` | Header lockup and favicon. The cream version swaps in for dark mode |
| `bg-stripes.png` | Ground for the intro, how I work and services FAQ sections |
| `bg-dark.png` | Texture behind the closing band |
| `mark-dots.png` | Separator in the scrolling strip |
| `mark-braces.png` | Beside the pull quote on About |
| `mark-diamond.png`, `mark-heart.png` | Copied but not yet placed |
| `card-front.png`, `card-back.png` | Copied but not yet placed |

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
| `YOUR_FORM_ID` | Formspree form ID on `contact.html` |
| `assets/img/portrait.svg` | Her profile photo, the same one as Instagram |
| `assets/work/*.svg` | Real project images, about 1600px wide and compressed |

Marked in the files with a `PLACEHOLDER` comment:

- **Five things about me** on `about.html`. The copy file calls for the v2.4 list
  verbatim, including the introvert line. That file was not supplied, so four of the five
  are stand-ins.
- **Package deliverables and timelines** on `services.html`, all four marked
  "to confirm". Packages v3 was not supplied. No prices are shown anywhere, which is
  correct until the real figures are in.
- **FAQ answers** are written in her voice but are not the FAQ v3 text. The revision term
  is correct: three rounds of changes are included.
- **Case study bodies** are still the template prompts. Each one wants the brief, the
  decisions and the outcome, described by decisions rather than adjectives.

The three statistics on the home page are the verified ones from the copy file:
20+ clients, 50%+ come back, 5 years.

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
