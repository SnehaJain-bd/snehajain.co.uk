# snehajain.co.uk

Portfolio site for Sneha Jain — graphic designer and brand strategist.
Plain HTML, CSS and a little JavaScript. No build step, no dependencies, no framework.
Edit a file, push, and the live site updates in about a minute.

The layout follows the [Quomi](https://quomi.framer.website/) template: a status bar, an
oversized statement hero, numbered service cards, `( LABEL )` section eyebrows, arrow links
and a four-column footer.

## The header is a placeholder

A new header design is coming. Until it lands, the current one is a stand-in and is fenced
off so it can be replaced without touching anything else:

| Where | What to replace |
| --- | --- |
| `index.html` | Between `HEADER — PLACEHOLDER` and `END PLACEHOLDER HEADER` |
| `work/_template.html` | The same two comment markers |
| `work/project-*.html` | The same two markers, in all four files |
| `404.html` | The single `<header class="site-head">` block |
| `assets/styles.css` | Section 5, between the two `⚑` banners |

The only thing outside those blocks that depends on the header is `assets/script.js`, which
toggles `.is-open` on `#nav`, fills `#clock` and `#today`, and sets a `--head-h` custom
property. Keep those four hooks, or delete the matching code.

## Brand tokens

Everything visual comes from the first 60 lines of `assets/styles.css`.

| Token | Value | Used for |
| --- | --- | --- |
| `--paper` | `#FBF9F4` | Page ground |
| `--ink` | `#2A211A` | Body text, solid buttons, the CTA band |
| `--yellow` | `#FFF176` | Highlight marker, accent buttons, quote marks |
| `--blue` | `#00A7E1` | Fills, the availability dot, focus rings, underlines |
| `--blue-ink` | `#0077A8` | Blue *as text* |

`--blue-ink` exists because `#00A7E1` only reaches 2.6:1 against the off-white ground, which
fails accessibility for text. The darker blue reaches 4.7:1 and passes. Use `--blue` for
shapes and fills, `--blue-ink` for anything that has to be read. Yellow is never used as a
text colour on paper for the same reason — it is a background for dark text.

Dark mode is a full second palette in the `prefers-color-scheme: dark` block below the
tokens. Change a token and the whole site follows.

## Type

| Role | Face | Loaded from |
| --- | --- | --- |
| Headings | Loretta Variable | Adobe Typekit, kit `yhu7ntr` |
| Body | Work Sans | Google Fonts |
| Accent | Shantell Sans | Google Fonts |
| Labels | System monospace | No download |

Loretta is a serif from Nova Type Foundry with weights 300–800 plus italics. The Typekit kit
must stay published and must list `snehajain.co.uk` as an allowed domain, or the headings
fall back to Georgia. The accent face is deliberately rare: the hero lead-in and little
`.scribble` notes only.

## Files

```
index.html            Homepage: hero, intro, services, work, testimonials,
                      process, pricing, FAQ, insights, CTA, contact
404.html              Shown for any bad URL
CNAME                 Tells GitHub Pages the custom domain
.nojekyll             Stops GitHub processing the site as a Jekyll blog
robots.txt            Search engine permissions
sitemap.xml           Page list — update when pages change
assets/styles.css     All styling, in 22 numbered sections
assets/script.js      Clock, mobile menu, scroll reveals, FAQ accordion
assets/img/           Portrait, favicon
assets/work/          Project images
work/_template.html   Copy this to start a new case study
work/project-*.html   The four case studies
```

## Replace before launch

Search the whole folder for each and change every occurrence.

| Find | Replace with |
| --- | --- |
| `USERNAME` | Real Instagram / LinkedIn / Behance handles, or delete those links |
| `YOUR_FORM_ID` | Formspree form ID, in two places: the contact form and the newsletter |
| `hello@snehajain.co.uk` | The real email address |
| `assets/img/portrait.svg` | A real photo (`portrait.jpg`) |
| `assets/work/*.svg` | Real project images (`.jpg`, ~1600px wide, compressed) |

Four blocks in `index.html` carry a `PLACEHOLDER` comment and need real content, not just a
find-and-replace:

- **Stats** — "40+ projects, 60% repeat clients, 12+ brands". Invented to fill the layout.
  Put real figures in or delete the `<ul class="stats">` block. Do not publish them as they are.
- **Testimonials** — all four say "Client name, Founder, Company". Replace with real quotes
  you have permission to use, or delete the section.
- **Pricing** — "from £4,500" is a guess at a sensible anchor, not your rate.
- **Insights** — four article cards marked "Coming soon" whose links point back at the
  section, because no article pages exist yet. Write them, or delete the section.

Still to make: `assets/img/og.png`, a 1200×630 PNG used as the preview when the site is
shared on WhatsApp, LinkedIn or Slack. Until it exists, links share with no picture. It must
be PNG or JPG; social platforms ignore SVG.

## Adding a new project

1. `cp work/_template.html work/project-five.html`
2. Replace the `PROJECT_*` placeholders: `PROJECT_NAME`, `PROJECT_SLUG`, `PROJECT_HEADLINE`,
   `PROJECT_BLURB`, `PROJECT_TAGS`, `PROJECT_SECTOR`, `PROJECT_NEXT`.
3. Add the image to `assets/work/`.
4. Copy one `<a class="project">` block in `index.html` and point it at the new page.
5. Add the new URL to `sitemap.xml`.

## Contact form

The form posts to [Formspree](https://formspree.io) (free tier: 50 submissions a month).
GitHub Pages only serves static files, so it cannot process a form itself.

1. Sign up at formspree.io with the address enquiries should reach.
2. Create a form and copy its endpoint ID.
3. Replace `YOUR_FORM_ID` in `index.html`.

The empty `_gotcha` field is a spam honeypot. Leave it alone.

## Previewing locally

From this folder:

```
python -m http.server 8000
```

Then open <http://localhost:8000>. Double-clicking `index.html` mostly works, but the
root-relative links in `404.html` only behave properly over a server.

## Deploying

See `DEPLOY.md` for the full GitHub and DNS walkthrough. Day to day:

```
git add -A
git commit -m "Update work section"
git push
```
