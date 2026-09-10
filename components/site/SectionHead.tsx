import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/primitives';
import Mark, { type MarkName } from '@/components/site/Mark';
import LinesIn from '@/components/motion/LinesIn';

export default function SectionHead({
  eyebrow,
  title,
  lede,
  mark,
  lines,
}: {
  eyebrow: string;
  title?: ReactNode;
  lede?: ReactNode;
  /* Only where the glyph means something. Sections that already carry a
     mark of their own, like services and testimonials, leave this out. */
  mark?: MarkName;
  /* S4, for the headings that carry the argument. Needs a plain string,
     since the lines are worked out by measuring the words. */
  lines?: string;
}) {
  return (
    <Reveal className="sec-head" y={lines ? 0 : 18}>
      <p className="eyebrow">
        {mark ? <Mark name={mark} size={12} className="eyebrow__mark" /> : null}
        {eyebrow}
      </p>
      <div>
        <h2 className="sec-title">{lines ? <LinesIn text={lines} /> : title}</h2>
        {lede ? <p className="sec-lede">{lede}</p> : null}
      </div>
    </Reveal>
  );
}
