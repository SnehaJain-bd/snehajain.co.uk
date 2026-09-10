import Link from 'next/link';
import { Arrow } from './Footer';
import { Highlight, Reveal } from '@/components/motion/primitives';
import { FieldLayers } from '@/components/motion/CursorField';

export default function CtaBand({ lead = 'Tell me what you’re' }: { lead?: string }) {
  return (
    <section className="cta-band">
      <FieldLayers local />
      <div className="wrap">
        <Reveal as="div">
          <h2 className="cta-band__title">
            {lead} <Highlight>building.</Highlight>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="cta-band__lede">
            Send a short message about your business. If it looks like a fit, we’ll book a call.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <Link className="btn btn--yellow" href="/contact">
            Start a project
            <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
