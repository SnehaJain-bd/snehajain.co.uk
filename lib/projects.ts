import fs from 'node:fs';
import path from 'node:path';

export type ProjectMeta = {
  title: string;
  subtitle: string;
  /* Optional. Left out or empty, no client is shown on the page. */
  client?: string;
  year: string;
  sector: string;
  services: string[];
  summary: string;
  /* Both optional. Left out, the cover is cover.* in public/work/<slug>/
     and the alt text is built from the title. */
  cover?: string;
  coverAlt?: string;
  order: number;
  published: boolean;
  featured: boolean;
};

export type Project = Omit<ProjectMeta, 'cover' | 'coverAlt'> & {
  slug: string;
  cover: string;
  coverAlt: string;
};

const DIR = path.join(process.cwd(), 'content/projects');

/** Every slug on disk, published or not. */
export function allSlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

/** Load one project's metadata. Runs at build time only. */
export async function getProject(slug: string): Promise<Project> {
  const mod = await import(`@/content/projects/${slug}.mdx`);
  const meta = mod.meta as ProjectMeta;
  const cover = meta.cover || findCover(slug);

  /* No cover means no images have been run for this project yet. Rather
     than fail the build on a broken image, treat it as not ready: it is
     filtered out below and the rest of the site keeps working. */
  if (!cover) {
    console.warn(
      `[projects] ${slug} has no images. Put originals in source-images/${slug}/ ` +
        'and run npm run images. Until then it stays off the site.'
    );
  }

  return {
    slug,
    ...meta,
    // A file need not name its cover. If it does not, take the folder’s.
    cover: cover || '',
    coverAlt: meta.coverAlt || `${meta.title} project cover`,
  };
}

/**
 * Published projects in the order set by `order` in each file.
 * published:false keeps a project on disk but off the site entirely:
 * no page, no card, no sitemap entry.
 */
export async function getProjects(): Promise<Project[]> {
  const all = await Promise.all(allSlugs().map(getProject));
  return all.filter((p) => p.published && p.cover).sort((a, b) => a.order - b.order);
}

export async function getFeatured(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured);
}

/** The project after this one, wrapping round at the end. */
export async function getNext(slug: string): Promise<Project> {
  const list = await getProjects();
  const i = list.findIndex((p) => p.slug === slug);
  return list[(i + 1) % list.length];
}

export type GalleryImage = { src: string; alt: string; wide?: boolean };
export type PackedImage = GalleryImage & { span: 'half' | 'third' | 'wide' };

/**
 * The gallery grid is six columns, so a row fills as 3+3, 2+2+2, or one 6.
 * Left alone, a wide image lands mid sequence and strands the images either
 * side of it in half empty rows. So: pair the ordinary images up, turn the
 * last three into a row of three when the count is odd, then slot the wide
 * ones in between whole rows.
 */
export function packGallery(items: GalleryImage[]): PackedImage[] {
  if (!items?.length) return [];

  const normals = items.filter((g) => !g.wide);
  const wides = items.filter((g) => g.wide);
  const rows: PackedImage[][] = [];

  if (normals.length === 1) {
    rows.push([{ ...normals[0], span: 'wide' }]);
  } else if (normals.length) {
    const rest = [...normals];
    const trio =
      rest.length % 2 === 1 && rest.length >= 3 ? rest.splice(-3, 3) : null;
    for (let i = 0; i < rest.length; i += 2) {
      rows.push(rest.slice(i, i + 2).map((g) => ({ ...g, span: 'half' as const })));
    }
    if (trio) rows.push(trio.map((g) => ({ ...g, span: 'third' as const })));
  }

  const out: PackedImage[] = [];
  let w = 0;
  rows.forEach((row, i) => {
    out.push(...row);
    if (w < wides.length && i < rows.length - 1) {
      out.push({ ...wides[w++], span: 'wide' });
    }
  });
  while (w < wides.length) out.push({ ...wides[w++], span: 'wide' });
  return out;
}

/* ---- images by folder ----
   Drop files in public/work/<slug>/ and they are found automatically.
   No paths to type anywhere.

     cover.*                 the case study cover and the work grid card
     anything else           the gallery, in filename order
     a name containing wide  spans the full width

   Alt text comes from the filename, so 03-pattern-detail.jpg reads as
   "pattern detail" to a screen reader. Build time only. */

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif|svg)$/i;

function altFromName(file: string, title: string): string {
  const words = file
    .replace(IMAGE_EXT, '')
    .replace(/^[\s_\-0-9]+/, '')
    .replace(/[-_\s]*\bwide\b[-_\s]*/gi, ' ')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return words ? `${title}, ${words}` : `${title} project image`;
}

function listFolder(slug: string): string[] {
  const dir = path.join(process.cwd(), 'public/work', slug);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return [];
  return fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f)).sort();
}

/** The cover file for a project, if one is on disk. */
export function findCover(slug: string): string | null {
  const files = listFolder(slug);
  if (!files.length) return null;
  const cover = files.find((f) => /^cover\./i.test(f)) ?? files[0];
  return `/work/${slug}/${cover}`;
}

function toImage(slug: string, title: string, file: string): GalleryImage {
  return {
    src: `/work/${slug}/${file}`,
    alt: altFromName(file, title),
    wide: /wide/i.test(file),
  };
}

/** The gallery files: everything in the folder bar the cover. */
function galleryFiles(slug: string): string[] {
  const files = listFolder(slug);
  if (!files.length) return [];
  const cover = files.find((f) => /^cover\./i.test(f)) ?? files[0];
  return files.filter((f) => f !== cover);
}

/* A name in a pick is a filename without its extension, compared
   loosely on purpose. Case, spaces, hyphens and underscores are all
   levelled, so "pattern detail", "Pattern_Detail" and "pattern-detail"
   all find pattern-detail.jpg. A leading number is optional too, so
   "box" finds 01-box.jpg. Writing prose should not mean remembering
   punctuation. */
const stem = (f: string) =>
  f
    .replace(IMAGE_EXT, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
const bare = (f: string) => stem(f).replace(/^[0-9]+-*/, '');

function matchFile(files: string[], name: string): string | null {
  const want = stem(name.trim());
  return files.find((f) => stem(f) === want) ?? files.find((f) => bare(f) === want) ?? null;
}

/**
 * A named handful from the folder, in the order asked for, so a case
 * study can alternate writing and pictures:
 *
 *   <Gallery pick="box, pattern-detail" />
 *
 * A name that is not in the folder fails the build rather than quietly
 * rendering nothing, and the error says what is available.
 */
export function pickGallery(slug: string, title: string, pick: string): GalleryImage[] {
  const files = galleryFiles(slug);
  return pick
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean)
    .map((name) => {
      const hit = matchFile(files, name);
      if (!hit) {
        throw new Error(
          `[projects] ${slug}: <Gallery pick> asked for "${name}", which is not in ` +
            `public/work/${slug}/. Available: ${files.map(stem).join(', ')}`
        );
      }
      return toImage(slug, title, hit);
    });
}

/**
 * Every image in the folder except the cover, whatever the case study
 * does with them.
 *
 * Not the same thing as folderGallery, which returns only what no pick
 * has claimed. Anywhere outside the case study itself wants this one:
 * the work page took the other by mistake, and its second shot silently
 * changed depending on which images the case study happened to name.
 */
export function projectImages(slug: string, title: string): GalleryImage[] {
  return galleryFiles(slug).map((f) => toImage(slug, title, f));
}

/** Every name mentioned by a pick anywhere in this case study. */
function pickedIn(slug: string): string[] {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, 'utf8');
  return [...src.matchAll(/pick=["']([^"']+)["']/g)].flatMap((m) =>
    m[1].split(',').map((s) => s.trim()).filter(Boolean)
  );
}

/**
 * What a bare <Gallery /> shows: the folder minus the cover, minus
 * anything already claimed by a pick in this file. With no picks that
 * is the whole folder, which is the common case.
 */
export function folderGallery(slug: string, title: string): GalleryImage[] {
  const files = galleryFiles(slug);
  const used = new Set(
    pickedIn(slug)
      .map((n) => matchFile(files, n))
      .filter((f): f is string => Boolean(f))
  );
  return files.filter((f) => !used.has(f)).map((f) => toImage(slug, title, f));
}
