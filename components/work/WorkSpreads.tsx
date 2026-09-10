import Link from 'next/link';
import Image from 'next/image';
import { projectImages, type Project } from '@/lib/projects';

/*
  W5. Each project a numbered spread: the cover wide, a second shot tall
  beside it, under a rule carrying the number.

  All type sits on the page rather than on the photographs, which is the
  point. Anything laid over an image is only legible if the image
  cooperates, and covers chosen for their colour will not always
  cooperate. Here nothing depends on what the picture happens to be
  doing in the corner where the words are.

  The second shot comes from the project's own folder. Wide files are
  skipped for that slot, since a landscape image cropped into a tall
  frame loses its middle.

  It uses projectImages rather than folderGallery on purpose. The latter
  returns only what no <Gallery pick> has claimed, which meant the work
  page quietly showed a different shot depending on what the case study
  happened to name.
*/
export default function WorkSpreads({ projects }: { projects: Project[] }) {
  return (
    <div className="spreads">
      {projects.map((p, i) => {
        const gallery = projectImages(p.slug, p.title);
        const second = gallery.find((g) => !g.wide) ?? gallery[0] ?? null;
        const meta = [p.sector, p.year].filter(Boolean).join(' · ');

        return (
          <Link className="spread" key={p.slug} href={`/work/${p.slug}`}>
            <span className="spread__n">{String(i + 1).padStart(2, '0')}</span>

            <span className="spread__body">
              <span className="spread__head">
                <span className="spread__title">
                  {p.title}
                  <span className="arw" aria-hidden="true">
                    &#8599;
                  </span>
                </span>
                {meta ? <span className="spread__meta">{meta}</span> : null}
              </span>

              {p.subtitle ? <span className="spread__sub">{p.subtitle}</span> : null}

              <span className={`spread__shots${second ? '' : ' spread__shots--one'}`}>
                <Image
                  src={p.cover}
                  alt={p.coverAlt}
                  width={1400}
                  height={933}
                  quality={82}
                  priority={i === 0}
                  sizes="(max-width: 700px) 100vw, 60vw"
                  className="spread__wide"
                />
                {second ? (
                  <Image
                    src={second.src}
                    alt={second.alt}
                    width={900}
                    height={1200}
                    quality={82}
                    sizes="(max-width: 700px) 100vw, 30vw"
                    className="spread__tall"
                  />
                ) : null}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
