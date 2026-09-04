# snehajain.co.uk

Portfolio site for Sneha Jain — graphic designer and brand strategist.
Plain HTML, CSS and a little JavaScript. No build step, no dependencies, no framework.
Edit a file, push, and the live site updates in about a minute.

## Files

```
index.html            Homepage: hero, work, services, about, process, contact
404.html              Shown for any bad URL
CNAME                 Tells GitHub Pages the custom domain (snehajain.co.uk)
.nojekyll             Stops GitHub trying to process the site as a Jekyll blog
robots.txt            Search engine permissions
sitemap.xml           List of pages for search engines — update when pages change
assets/styles.css     All styling. Colours and fonts are the tokens at the top
assets/script.js      Mobile menu, scroll reveals, footer year
assets/img/           Portrait, favicon
assets/work/          Project images
work/_template.html   Copy this to start a new case study
work/project-*.html   The four case studies
```

## Things to replace before launch

Search the whole folder for each of these and change every occurrence.

| Find | Replace with |
| --- | --- |
| `USERNAME` | Real Instagram / LinkedIn / Behance handles (or delete those links) |
| `YOUR_FORM_ID` | Formspree form ID — see "Contact form" below |
| `hello@snehajain.co.uk` | The real email address |
| `assets/img/portrait.svg` | A real photo (`portrait.jpg`) |
| `assets/work/*.svg` | Real project images (`.jpg`, ~1600px wide, compressed) |
| Project names, copy, testimonial | Sneha's real words |

The placeholder artwork is deliberately abstract so the layout looks finished
while the real images are prepared. Nothing breaks if it stays for a week.

Still to make: `assets/img/og.png` — a 1200×630 PNG used as the preview image
when the site is shared on WhatsApp, LinkedIn or Slack. Until it exists, links
share with no picture. That is the one asset that must be PNG or JPG; social
platforms ignore SVG.

## Adding a new project

1. `cp work/_template.html work/project-five.html`
2. Replace the `PROJECT_*` placeholders in the new file.
3. Add the image to `assets/work/`.
4. Copy one `<a class="card">` block in `index.html` and point it at the new page.
5. Add the new URL to `sitemap.xml`.

## Changing colours or fonts

Everything visual is driven by the tokens in the first 40 lines of
`assets/styles.css` — the light palette in `:root`, the dark palette in the
`prefers-color-scheme: dark` block below it. Change `--accent` and the buttons,
links, underlines and highlights all follow.

## Contact form

The form posts to [Formspree](https://formspree.io) (free tier: 50 submissions a
month). GitHub Pages only serves static files, so it cannot process a form itself.

1. Sign up at formspree.io with the address enquiries should reach.
2. Create a form, copy its endpoint ID.
3. Replace `YOUR_FORM_ID` in `index.html`.

The empty `_gotcha` field is a spam honeypot — leave it alone.

## Previewing locally

From this folder:

```
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` by double-clicking works
too, but the root-relative links in `404.html` only behave properly over a server.

## Deploying

See `DEPLOY.md` for the full GitHub + DNS walkthrough. Day to day, once it is set
up, deploying is:

```
git add -A
git commit -m "Update work section"
git push
```
