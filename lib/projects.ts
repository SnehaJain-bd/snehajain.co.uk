import fs from 'node:fs';
import path from 'node:path';

export type ProjectMeta = {
  title: string;
  subtitle: string;
  client: string;
  year: string;
  sector: string;
  services: string[];
  summary: string;
  cover: string;
  coverAlt: string;
  order: number;
  published: boolean;
  featured: boolean;
};

export type Project = ProjectMeta & { slug: string };

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
  return { slug, ...(mod.meta as ProjectMeta) };
}

/**
 * Published projects in the order set by `order` in each file.
 * published:false keeps a project on disk but off the site entirely:
 * no page, no card, no sitemap entry.
 */
export async function getProjects(): Promise<Project[]> {
  const all = await Promise.all(allSlugs().map(getProject));
  return all.filter((p) => p.published).sort((a, b) => a.order - b.order);
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
