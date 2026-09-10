import Link from 'next/link';
import { Arrow } from '@/components/site/Footer';
import { Highlight, Reveal } from '@/components/motion/primitives';
import Mark from '@/components/site/Mark';

/*
  Nobody plans to see this page, which makes it the one place where being
  playful costs nothing. The ring from the brand alphabet stands in for
  the nought: Asset 33 in blue for light, 47 in yellow for dark, both
  drawn rather than filtered.

  The mark carries meaning here rather than decorating, so it keeps its
  alt text. Read aloud the heading is still "404".
*/
export default function NotFound() {
  return (
    <main id="main" className="oops">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            Error
          </p>
          <p className="oops__num" aria-label="404">
            <span aria-hidden="true">4</span>
            <Mark name="ring" size={96} className="oops__ring" />
            <span aria-hidden="true">4</span>
          </p>
          <h1 className="oops__title">
            This page doesn’t exist. <Highlight delay={0.35}>The work does.</Highlight>
          </h1>
          <p style={{ marginTop: '2rem' }}>
            <Link className="btn btn--solid" href="/work">
              Selected work
              <Arrow />
            </Link>
          </p>
        </Reveal>
      </div>
    </main>
  );
}
