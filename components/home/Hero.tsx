import Link from 'next/link';
import { Arrow } from '@/components/site/Footer';
import { FadeIn, HighlightNow } from '@/components/motion/primitives';
import { FieldLayers } from '@/components/motion/CursorField';

/*
  Centred, because the right hand side of a left aligned hero was empty
  and the cursor field reads better with room on both sides of the words.

  The lines fade rather than rise. Timing, in order: first line at once,
  second at 0.18, the marker draws at 1.0, the sub-line at 1.3 and the
  buttons at 1.42. The marker is the only thing that moves, which is why
  it lands.

  hero__field is the cursor light sitting above the stripes rather than
  behind them. It reads --fx and --fy, which CursorField writes onto the
  root element from a single pointer listener.
*/
export default function Hero() {
  return (
    <section className="hero hero--centred">
      <FieldLayers local />
      <div className="wrap">
        <h1 className="hero__title">
          <FadeIn>You know what you’re building.</FadeIn>
          <FadeIn delay={0.18}>
            Your brand <HighlightNow delay={1}>doesn’t say it yet.</HighlightNow>
          </FadeIn>
        </h1>
        <FadeIn delay={1.3} duration={0.7}>
          <p className="hero__sub">Strategic brand design for founder-led businesses.</p>
        </FadeIn>
        <FadeIn delay={1.42} duration={0.65}>
          <div className="hero__actions">
            <Link className="btn btn--solid" href="/contact">
              Start a Project
              <Arrow />
            </Link>
            <Link className="btn btn--ghost" href="/work">
              See Selected Work
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
