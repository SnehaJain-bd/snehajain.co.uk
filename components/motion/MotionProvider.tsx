'use client';

import { LazyMotion, domAnimation } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * `motion.div` bundles every feature Motion has. `m.div` bundles none and
 * takes them from this provider instead, which is a large saving on a site
 * that only fades, lifts and staggers.
 *
 * `strict` makes the build fail if anyone reaches for `motion.` by habit,
 * which would silently pull the whole library back in.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
