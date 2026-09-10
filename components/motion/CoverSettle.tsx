'use client';

import Image from 'next/image';
import { m, useReducedMotion } from 'motion/react';

/*
  The case study cover, settling to true size as the page opens.

  The cover already sits in a fixed 3:2 frame and is cropped to fill it,
  so there is spare image on all four sides that nobody ever sees.
  Starting at 108 percent and settling spends exactly that spare. No
  layout moves, because the frame never changes size, and nothing is cut
  that was not already being cut.

  It fires once, on arrival, rather than tracking the scroll. That is the
  point: it reads as the page opening rather than as a moving background,
  and it replaces the drift these covers used to have. Two motions on one
  image is one too many.
*/
export default function CoverSettle({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const still = useReducedMotion();

  const image = (
    <Image src={src} alt={alt} fill priority quality={82} sizes="100vw" />
  );

  if (still) return <div className={className}>{image}</div>;

  return (
    <div className={className}>
      <m.div
        className="cover-settle"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {image}
      </m.div>
    </div>
  );
}
