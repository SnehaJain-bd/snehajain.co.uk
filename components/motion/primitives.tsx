'use client';

import { m, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

/*
  Every component here checks useReducedMotion first. If someone has asked
  their system to reduce motion, nothing moves: elements render at their
  final state rather than animating to it. That is not a nicety, it is what
  the old stylesheet did and it must survive the rewrite.
*/

const EASE = [0.22, 0.61, 0.36, 1] as const;

/*
  Anything that travels uses EASE: quick away, slowing into place, which
  is how a moving thing should arrive. Anything that only fades uses
  EASE_INOUT instead. With EASE an opacity fade reaches almost full in
  the first fraction of a second and then crawls, so the element appears
  and then lingers, which reads as abrupt. A fade has to start slowly.
*/
const EASE_INOUT = [0.45, 0.05, 0.35, 1] as const;

/** Fades and lifts into place the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'p' | 'span';
}) {
  const still = useReducedMotion();
  const Tag = m[as];

  if (still) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Parent for a list whose children arrive one after another.
 * Pair with StaggerItem.
 */
export function Stagger({
  children,
  className,
  gap = 0.08,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: 'div' | 'ol' | 'ul';
}) {
  const still = useReducedMotion();
  const Tag = m[as];

  if (still) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      variants={{ shown: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Tag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
  as = 'li',
}: {
  children: ReactNode;
  className?: string;
  as?: 'li' | 'div' | 'a';
}) {
  const still = useReducedMotion();
  const Tag = m[as];
  if (still) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  );
}

/**
 * The yellow highlighter drawing itself across a word, as if with a marker.
 * Falls back to a plain painted highlight when motion is reduced.
 */
export function Highlight({
  children,
  delay = 0.45,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const still = useReducedMotion();

  if (still)
    return (
      <span className="mark-draw">
        <span aria-hidden className="mark-draw__ink" />
        <span className="mark-draw__text">{children}</span>
      </span>
    );

  return (
    <span className="mark-draw">
      <m.span
        aria-hidden
        className="mark-draw__ink"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE, delay }}
      />
      <span className="mark-draw__text">{children}</span>
    </span>
  );
}

/**
 * Hero lines arriving on load by fading, not moving. Nothing travels, so
 * the marker drawing itself becomes the only movement in the hero and
 * lands with real weight.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const still = useReducedMotion();
  if (still) return <span className={className}>{children}</span>;

  return (
    <m.span
      className={className}
      style={{ display: 'block' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, ease: EASE_INOUT, delay }}
    >
      {children}
    </m.span>
  );
}

/**
 * The highlighter, drawn on load rather than on scroll, for the hero
 * where the line is on screen from the start.
 */
export function HighlightNow({
  children,
  delay = 1,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const still = useReducedMotion();
  if (still)
    return (
      <span className="mark-draw">
        <span aria-hidden className="mark-draw__ink" />
        <span className="mark-draw__text">{children}</span>
      </span>
    );

  return (
    <span className="mark-draw">
      <m.span
        aria-hidden
        className="mark-draw__ink"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.55, ease: EASE, delay }}
      />
      <span className="mark-draw__text">{children}</span>
    </span>
  );
}

/** Hero words arriving line by line on load. */
export function RiseIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const still = useReducedMotion();
  if (still) return <span className={className}>{children}</span>;

  return (
    <span className={className} style={{ display: 'block', overflow: 'hidden' }}>
      <m.span
        style={{ display: 'block' }}
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.85, ease: EASE, delay }}
      >
        {children}
      </m.span>
    </span>
  );
}
