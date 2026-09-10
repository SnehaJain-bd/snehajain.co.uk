import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/primitives';
import Mark, { type MarkName } from '@/components/site/Mark';

export default function SectionHead({
  eyebrow,
  title,
  lede,
  mark,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /* Only where the glyph means something. Sections that already carry a
     mark of their own, like services and testimonials, leave this out. */
  mark?: MarkName;
}) {
  return (
    <Reveal className="sec-head">
      <p className="eyebrow">
        {mark ? <Mark name={mark} size={12} className="eyebrow__mark" /> : null}
        {eyebrow}
      </p>
      <div>
        <h2 className="sec-title">{title}</h2>
        {lede ? <p className="sec-lede">{lede}</p> : null}
      </div>
    </Reveal>
  );
}
