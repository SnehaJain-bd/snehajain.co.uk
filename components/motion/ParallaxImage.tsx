'use client';

import Image from 'next/image';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * An image that drifts slightly as it passes through the viewport.
 * The movement is small on purpose: enough to feel alive, not enough to
 * make anyone seasick. Held still entirely for reduced motion.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  sizes = '100vw',
  priority = false,
  amount = 40,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <m.div
        style={still ? undefined : { y, height: `calc(100% + ${amount * 2}px)`, marginTop: -amount }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={85}
          style={{ objectFit: 'cover' }}
        />
      </m.div>
    </div>
  );
}
