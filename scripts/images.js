#!/usr/bin/env node
/* =========================================================
   snehajain.co.uk image preparation

   Reads full size originals from  source-images/<slug>/
   Writes source JPEGs to          public/work/<slug>/

   Run from the repo root:   npm run images

   Originals are never touched and never committed. Only the
   web sized files go into the repo, which keeps git history
   small, since git keeps every version of a file forever.

   Naming carries meaning, so it is preserved through the
   resize apart from being lowercased and hyphenated:

     cover.*            the case study cover and grid thumbnail
     anything else      the gallery, in filename order
     a name with wide   spans the full width of the gallery

   A cover is cropped to 3:2. Where that crop lands matters, so the
   filename can say: cover-attention.jpg, cover-top.jpg, cover-bottom.jpg.
   The token is stripped and the file still lands as cover.jpg.
   ========================================================= */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC  = path.join(ROOT, 'source-images');
const OUT  = path.join(ROOT, 'public/work');

/* Displayed widths, doubled for high density screens, then capped.
   The cover runs full bleed, gallery images sit two up or full width. */
/* Every slot a cover appears in is landscape and uses object-fit:cover:
   the case study band is 3:2, the work card and the next project thumb
   are 4:3. So the cover is cropped to 3:2 here, which is the crop the
   browser was doing anyway, done once at full resolution.

   Capping the height instead, as this used to, starved portrait sources
   of width: a 4096x5460 cover came out 1200px wide and was then stretched
   across a 2000px band. That is what made those covers look soft. */
const COVER_W       = 2000;
const COVER_H       = 1333;

/* Where the 3:2 cover crop lands, taken from the filename.

   Centre is the default because it is predictable. It suits most covers,
   Paloma included, where the mark and the wordmark sit either side of the
   middle and a smart crop would clip the wordmark off.

   Portrait sources with the subject low, like Swirly, need attention,
   which is libvips picking the busiest region. Hence the override. */
const COVER_FOCUS = /^cover[-_](centre|center|attention|entropy|top|bottom|left|right)/i;

function coverPosition(focus){
  if (!focus) return 'centre';
  const f = focus.toLowerCase();
  if (f === 'attention') return sharp.strategy.attention;
  if (f === 'entropy')   return sharp.strategy.entropy;
  if (f === 'center')    return 'centre';
  return f;
}
const WIDTH_WIDE    = 2000;
const WIDTH_GALLERY = 2000;
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
  if (/^cover\b/.test(name)) return COVER_W;
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

    /* cover-attention.jpg is still the cover, so strip the token off
       the name and remember it for the crop. */
    const raw   = tidy(job.file);
    const hit   = raw.match(COVER_FOCUS);
    const focus = hit ? hit[1] : null;
    const name  = focus ? 'cover.jpg' : raw;
    const dest = path.join(outDir, name);
    const width = widthFor(name);

    const src = fs.statSync(job.src).size;
    const meta = await sharp(job.src).metadata();

    await sharp(job.src)
      .rotate()                                   // honour EXIF orientation
      .resize(/^cover/.test(name)
        ? { width: COVER_W, height: COVER_H, fit: 'cover',
            position: coverPosition(focus), withoutEnlargement: true }
        : { width, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toFile(dest);

    const out = fs.statSync(dest).size;
    const made = await sharp(dest).metadata();
    inBytes += src; outBytes += out; count++;

    console.log(
      (job.slug + '/' + name).padEnd(46) +
      String(meta.width + 'x' + meta.height).padEnd(12) + '-> ' +
      String(made.width + 'x' + made.height).padEnd(12) +
      (src / 1048576).toFixed(1) + ' MB -> ' + (out / 1024).toFixed(0) + ' KB'
    );
  }

  console.log('\n' + count + ' images');
  console.log('originals ' + (inBytes / 1048576).toFixed(0) + ' MB');
  console.log('web       ' + (outBytes / 1048576).toFixed(1) + ' MB   ' +
              (100 - outBytes / inBytes * 100).toFixed(1) + '% smaller');
  console.log('\nNow commit and push. Vercel builds the site itself.');
})().catch(e => { console.error(e); process.exit(1); });
