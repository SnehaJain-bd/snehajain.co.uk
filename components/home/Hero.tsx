import Link from 'next/link';
import { Arrow } from '@/components/site/Footer';
import { RiseIn } from '@/components/motion/primitives';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <h1 className="hero__title">
          <RiseIn delay={0.05}>You know what you’re building.</RiseIn>
          <RiseIn delay={0.17}>Your brand doesn’t say it yet.</RiseIn>
        </h1>
        <RiseIn delay={0.32}>
          <p className="hero__sub">Strategic brand design for founder-led businesses.</p>
        </RiseIn>
        <RiseIn delay={0.44}>
          <div className="hero__actions">
            <Link className="btn btn--solid" href="/contact">
              Start a Project
              <Arrow />
            </Link>
            <Link className="btn btn--ghost" href="/work">
              See Selected Work
            </Link>
          </div>
        </RiseIn>
      </div>
    </section>
  );
}
