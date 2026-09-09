import type { Metadata } from 'next';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CtaBand from '@/components/site/CtaBand';
import ParallaxImage from '@/components/motion/ParallaxImage';
import { Reveal } from '@/components/motion/primitives';
import Gallery from '@/components/work/Gallery';
import {
  allSlugs,
  getProject,
  getNext,
  folderGallery,
  type Project,
  type GalleryImage,
} from '@/lib/projects';

type MDXBody = React.ComponentType<{ components?: MDXComponents }>;

type Params = { params: Promise<{ slug: string }> };

/* Every published project becomes a static page at build time. */
export async function generateStaticParams() {
  const slugs = allSlugs();
  const metas = await Promise.all(slugs.map(getProject));
  return metas.filter((p) => p.published && p.cover).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  try {
    const p = await getProject(slug);
    return {
      title: p.title,
      description: p.summary,
      alternates: { canonical: `/work/${slug}` },
      openGraph: { type: 'article', title: p.title, description: p.summary, images: [p.cover] },
    };
  } catch {
    return {};
  }
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;

  let project: Project;
  let Body: MDXBody;
  try {
    const mod = await import(`@/content/projects/${slug}.mdx`);
    Body = mod.default;
    // getProject, not mod.meta, so the cover falls back to the folder
    project = await getProject(slug);
  } catch {
    notFound();
  }

  if (!project!.published || !project!.cover) notFound();
  const next = await getNext(slug);

  /* <Gallery /> written bare in the MDX means every image in
     public/work/<slug>/ except the cover, in filename order. An explicit
     images list still wins, for when the order needs holding by hand. */
  const folder = folderGallery(slug, project!.title);
  const BoundGallery = ({ images }: { images?: GalleryImage[] }) => (
    <Gallery images={images ?? folder} />
  );

  return (
    <>
      <main id="main">
        <ParallaxImage
          className="case-cover"
          src={project!.cover}
          alt={project!.coverAlt}
          sizes="100vw"
          priority
          amount={36}
        />

        <section className="case-intro">
          <div className="wrap">
            <Reveal>
              <p className="case-intro__client">For {project!.client}</p>
              <h1 className="case-intro__title">{project!.title}</h1>
              <p className="case-intro__tags">
                {project!.services.map((s, i) => (
                  <span key={s} className="case-intro__tag">
                    {i > 0 ? <span>/</span> : null}
                    {s}
                  </span>
                ))}
              </p>
              <p className="case-intro__summary">{project!.summary}</p>
            </Reveal>
          </div>
        </section>

        <div className="wrap">
          <Reveal as="div">
            <dl className="case-facts">
              <div>
                <dt>Client</dt>
                <dd>{project!.client}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project!.year}</dd>
              </div>
              <div>
                <dt>Sector</dt>
                <dd>{project!.sector}</dd>
              </div>
              <div>
                <dt>Services</dt>
                <dd>{project!.services.join(', ')}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* The case study itself, written in content/projects/<slug>.mdx */}
        <article className="case-article">
          <Body components={{ Gallery: BoundGallery }} />
        </article>

        <section className="section section--tight">
          <div className="wrap">
            <Reveal as="div">
              <Link className="next-project" href={`/work/${next.slug}`}>
                <div>
                  <p className="next-project__label">Next project</p>
                  <h2 className="next-project__title">
                    {next.title} <span className="arw">&#8599;</span>
                  </h2>
                  <p className="next-project__sub">{next.subtitle}</p>
                </div>
                <div className="next-project__media">
                  <Image
                    src={next.cover}
                    alt=""
                    width={1200}
                    height={900}
                    sizes="(max-width: 720px) 100vw, 280px"
                  />
                </div>
              </Link>
            </Reveal>

            <nav className="case-nav" aria-label="Project navigation">
              <Link className="arrow-link" href="/work">
                <span>&larr;</span> All work
              </Link>
            </nav>
          </div>
        </section>
      </main>
      <CtaBand />
    </>
  );
}
