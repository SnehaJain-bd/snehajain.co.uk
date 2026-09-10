import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/projects';

/*
  X5. One project per screen, full bleed, snapping as you scroll.

  Two things are deliberately not what the usual version of this layout
  does.

  The scrim only darkens the bottom third, where the words sit, instead
  of covering the whole image. These covers were chosen for their
  colour, and laying a flat grey over all of them to make white text
  legible would be throwing away the reason they were picked.

  And the snap is proximity rather than mandatory, so it settles a
  chapter when you land near one and otherwise lets you scroll normally.
  Mandatory snap fights the reader on the hero, the closing band and the
  footer, which are not chapters and should not behave like them.

  No client JavaScript. It is CSS scroll snap and nothing else, so it
  works before hydration and with scripting off entirely.
*/
export default function WorkChapters({ projects }: { projects: Project[] }) {
  return (
    <div className="chapters">
      {projects.map((p, i) => (
        <Link className="chapter" key={p.slug} href={`/work/${p.slug}`}>
          <Image
            src={p.cover}
            alt={p.coverAlt}
            fill
            quality={82}
            sizes="100vw"
            priority={i === 0}
            className="chapter__img"
          />
          <span className="chapter__cap">
            <span className="chapter__meta">
              {String(i + 1).padStart(2, '0')}
              {p.sector ? <> &middot; {p.sector}</> : null}
              {p.year ? <> &middot; {p.year}</> : null}
            </span>
            <span className="chapter__title">
              {p.title}
              <span className="chapter__arw" aria-hidden="true">
                &#8599;
              </span>
            </span>
            <span className="chapter__sub">{p.subtitle}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
