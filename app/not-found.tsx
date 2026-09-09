import Link from 'next/link';
import { Arrow } from '@/components/site/Footer';
import { Highlight, Reveal } from '@/components/motion/primitives';

export default function NotFound() {
  return (
    <main id="main" className="oops">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Error 404</p>
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
