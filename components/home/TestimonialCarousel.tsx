'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import Mark from '@/components/site/Mark';
import type { Testimonial } from '@/content/testimonials';

/*
  One testimonial at a time, full quote, with the highlighter drawing
  itself across the phrase that does the persuading.

  The marker redrawing is what signals a new quote has arrived. Without
  it this is a slideshow ticking over; with it the change reads as
  deliberate.

  Nine seconds each, not five. The longest quote here takes about eleven
  seconds to read carefully, and a carousel that outruns its reader is
  worse than no carousel. It also pauses on hover and on keyboard focus,
  and stops permanently the moment anyone presses an arrow, because at
  that point they are steering and it should stop fighting them.
*/

const DWELL = 9000;

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [at, setAt] = useState(0);
  const [held, setHeld] = useState(false);
  const [taken, setTaken] = useState(false);
  const still = useReducedMotion();
  const liveRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => setAt((next + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (still || held || taken || items.length < 2) return;
    const t = setTimeout(() => go(at + 1), DWELL);
    return () => clearTimeout(t);
  }, [at, held, taken, still, go, items.length]);

  const steer = (next: number) => {
    setTaken(true);
    go(next);
  };

  if (!items.length) return null;

  return (
    <div
      className="solo"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="solo__stage" ref={liveRef} aria-live="polite">
        {items.map((t, i) => (
          <figure key={t.name} className={`solo__item${i === at ? ' is-on' : ''}`} aria-hidden={i !== at}>
            <Mark name="quotes" size={30} className="solo__qm" />
            <blockquote className="solo__quote">{renderQuote(t, i === at)}</blockquote>
            <figcaption className="solo__by">
              <span className="solo__name">{t.name}</span>
              <span className="solo__role">{[t.role, t.brand].filter(Boolean).join(', ')}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* A row of its own, under a hairline, so nothing can collide with
          the attribution however long a quote runs. */}
      <div className="solo__controls">
        <div className="solo__dots">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`solo__dot${i === at ? ' is-on' : ''}`}
              onClick={() => steer(i)}
              aria-label={`Testimonial ${i + 1} of ${items.length}, ${t.name}`}
              aria-current={i === at ? 'true' : undefined}
            />
          ))}
        </div>

        <div className="solo__arrows">
          <button
            type="button"
            className="solo__arrow solo__arrow--prev"
            onClick={() => steer(at - 1)}
            aria-label="Previous testimonial"
          >
            <Mark name="chevron" size={18} />
          </button>
          <button
            type="button"
            className="solo__arrow solo__arrow--next"
            onClick={() => steer(at + 1)}
            aria-label="Next testimonial"
          >
            <Mark name="chevron" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/*
  The phrase to highlight is whatever sits between [ and ] in the quote,
  so it is chosen in content/testimonials.ts by the person writing it
  rather than guessed here. A quote with no brackets simply renders
  plain, which is what makes this safe to leave in place.
*/
function renderQuote(t: Testimonial, live: boolean) {
  const parts = t.quote.split(/\[([^\]]+)\]/);
  if (parts.length === 1) return t.quote;

  return parts.map((chunk, i) =>
    i % 2 === 1 ? (
      <span className="mark-draw" key={i}>
        <span className={`mark-draw__ink${live ? ' is-drawn' : ''}`} aria-hidden="true" />
        <span className="mark-draw__text">{chunk}</span>
      </span>
    ) : (
      chunk
    )
  );
}
