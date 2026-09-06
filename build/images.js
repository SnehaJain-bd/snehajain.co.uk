#!/usr/bin/env node
/* =========================================================
   snehajain.co.uk image preparation

   Reads full size originals from  source-images/<slug>/
   Writes web sized JPEGs to       assets/work/<slug>/

   Run from the repo root:   node build/images.js

   Originals are never touched and never committed. Only the
   web sized files go into the repo, which keeps git history
   small, since git keeps every version of a file forever.

   Naming carries meaning, so it is preserved through the
   resize apart from being lowercased and hyphenated:

     cover.*            the case study cover and grid thumbnail
     anything else      the gallery, in filename order
     a name with wide   spans the full width of the gallery
   ========================================================= */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC  = path.join(ROOT, 'source-images');
const OUT  = path.join(ROOT, 'assets/work');

/* Displayed widths, doubled for high density screens, then capped.
   The cover runs full bleed, gallery images sit two up or full width. */
const WIDTH_COVER   = 2000;
const HEIGHT_COVER  = 1600;   // the cover slot crops to 16:7, so tall sources waste bytes
const WIDTH_WIDE    = 1800;
const WIDTH_GALLERY = 1400;
const WIDTH_THUMB   = 900;    // the work grid card, never shown large
const QUALITY       = 78;

const IN_EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

/* Lowercase, hyphenated, no spaces. Keeps URLs clean and predictable. */
function tidy(name){
  return name
    .replace(IN_EXT, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') + '.jpg';
}

function widthFor(name){
  if (/^cover\b/.test(name)) return WIDTH_COVER;
  if (/wide/.test(name)) return WIDTH_WIDE;
  return WIDTH_GALLERY;
}

if (!fs.existsSync(SRC)) {
  console.error('No source-images folder. Put your originals in source-images/<slug>/ and run this again.');
  process.exit(1);
}

let inBytes = 0, outBytes = 0, count = 0;
const work = [];

for (const slug of fs.readdirSync(SRC)) {
  const dir = path.join(SRC, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const file of fs.readdirSync(dir)) {
    if (!IN_EXT.test(file)) continue;
    work.push({ slug, file, src: path.join(dir, file) });
  }
}

(async () => {
  for (const job of work) {
    const outDir = path.join(OUT, job.slug);
    fs.mkdirSync(outDir, { recursive: true });

    const name = tidy(job.file);
    const dest = path.join(outDir, name);
    const width = widthFor(name);

    const src = fs.statSync(job.src).size;
    const meta = await sharp(job.src).metadata();

    await sharp(job.src)
      .rotate()                                   // honour EXIF orientation
      .resize(/^cover/.test(name)
        ? { width, height: HEIGHT_COVER, fit: 'inside', withoutEnlargement: true }
        : { width, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toFile(dest);

    /* The work grid shows the cover in a small card. Serving the full
       size cover there wasted about 800 KB on the home page alone. */
    if (/^cover./.test(name)) {
      await sharp(job.src)
        .rotate()
        .resize({ width: WIDTH_THUMB, height: WIDTH_THUMB, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toFile(path.join(outDir, 'cover-thumb.jpg'));
    }

    const out = fs.statSync(dest).size;
    inBytes += src; outBytes += out; count++;

    console.log(
      (job.slug + '/' + name).padEnd(46) +
      String(meta.width + 'x' + meta.height).padEnd(12) + '-> ' +
      String(Math.min(width, meta.width) + 'px').padEnd(8) +
      (src / 1048576).toFixed(1) + ' MB -> ' + (out / 1024).toFixed(0) + ' KB'
    );
  }

  console.log('\n' + count + ' images');
  console.log('originals ' + (inBytes / 1048576).toFixed(0) + ' MB');
  console.log('web       ' + (outBytes / 1048576).toFixed(1) + ' MB   ' +
              (100 - outBytes / inBytes * 100).toFixed(1) + '% smaller');
  console.log('\nNow run: node build/build.js');
})().catch(e => { console.error(e); process.exit(1); });
