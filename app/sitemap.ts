import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { getProjects } from '@/lib/projects';

/* Regenerated on every build, so a new case study appears in here the
   moment its MDX file lands. Held back projects never do. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ['', '/about', '/services', '/work', '/contact'].map((path) => ({
    url: `${site.url}${path}`,
    priority: path === '' ? 1 : 0.8,
  }));

  const projects = (await getProjects()).map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    priority: 0.6,
  }));

  return [...pages, ...projects];
}
