'use client';

import { useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

/*
  A soft wash of yellow that follows the pointer, so the page is never
  completely still anywhere.

  One listener writes --fx and --fy onto the root element and every layer
  that wants the light reads them: this fixed one behind the whole page,
  and the hero's own, which sits above the stripes rather than behind
  them. Two elements, one pointer, no duplicated maths.

  Settings are the ones chosen from the dials:
    size 400   strength 0.50   lag 0.09   softness 50

  Lag is what stops it feeling welded to the cursor. Each frame the light
  moves nine percent of the remaining distance, so it arrives a moment
  after you do.

  Without a fine pointer, so on a phone, it drifts slowly on its own
  instead. Reduced motion parks it in the middle and stops.
*/

const LAG = 0.09;

export default function CursorField() {
  const still = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    if (still) {
      root.style.setProperty('--fx', '50%');
      root.style.setProperty('--fy', '38%');
      return;
    }

    const fine = window.matchMedia('(pointer: fine)').matches;
    let tx = 50;
    let ty = 38;
    let x = 50;
    let y = 38;
    let raf = 0;
    let drift = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    };

    const frame = () => {
      if (!fine) {
        // no pointer to follow, so wander instead
        drift += 0.0022;
        tx = 50 + Math.sin(drift) * 26;
        ty = 42 + Math.cos(drift * 0.8) * 18;
      }
      x += (tx - x) * LAG;
      y += (ty - y) * LAG;
      root.style.setProperty('--fx', x.toFixed(2) + '%');
      root.style.setProperty('--fy', y.toFixed(2) + '%');
      raf = requestAnimationFrame(frame);
    };

    if (fine) window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      if (fine) window.removeEventListener('pointermove', onMove);
    };
  }, [still]);

  return <div className="cursor-field" aria-hidden="true" />;
}
