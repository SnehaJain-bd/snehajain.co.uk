'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useReducedMotion } from 'motion/react';

/*
  A heading arriving one line at a time, each rising from behind a mask.

  The hard part is knowing where the lines are. Type rewraps with the
  width, the face, and whether Typekit has arrived yet, so the breaks
  cannot be written into the markup. A hidden copy of the heading is laid
  out alongside with every word in its own span; words sharing an
  offsetTop are on the same line. Re-measured whenever the width changes
  or a font lands.

  Until that measurement happens the plain heading is what renders, which
  also means it degrades well: with no JavaScript at all the heading is
  simply there, rather than sitting at opacity zero waiting for a script
  that is never going to run.

  Deliberately for the few headings that carry the argument. Every
  heading doing this would be a tic, and it would slow the whole page
  down to read.
*/

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export default function LinesIn({ text, className }: { text: string; className?: string }) {
  const probe = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const still = useReducedMotion();

  useEffect(() => {
    if (still) return;
    const el = probe.current;
    if (!el) return;

    const measure = () => {
      const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
      if (!words.length) return;

      const rows: string[] = [];
      let cur: string[] = [];
      let top: number | null = null;

      for (const w of words) {
        const t = Math.round(w.offsetTop);
        if (top !== null && t !== top && cur.length) {
          rows.push(cur.join(' '));
          cur = [];
        }
        cur.push(w.textContent ?? '');
        top = t;
      }
      if (cur.length) rows.push(cur.join(' '));

      setLines((prev) =>
        prev && prev.length === rows.length && prev.every((l, i) => l === rows[i]) ? prev : rows
      );
    };

    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure);

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [still, text]);

  const words = text.split(/\s+/);

  return (
    <span className={`linesin${className ? ' ' + className : ''}`}>
      {/* laid out, never seen, only measured */}
      {!still ? (
        <span className="linesin__probe" aria-hidden="true" ref={probe}>
          {words.map((w, i) => (
            <span data-word key={i}>
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
      ) : null}

      {lines ? (
        <m.span
          className="linesin__lines"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={{ shown: { transition: { staggerChildren: 0.09 } } }}
        >
          {lines.map((line, i) => (
            <span className="linesin__mask" key={i}>
              <m.span
                className="linesin__line"
                variants={{
                  hidden: { y: '110%' },
                  shown: { y: '0%', transition: { duration: 0.8, ease: EASE_EXPO } },
                }}
              >
                {line}
              </m.span>
            </span>
          ))}
        </m.span>
      ) : (
        <span className="linesin__plain">{text}</span>
      )}
    </span>
  );
}
