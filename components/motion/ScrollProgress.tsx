'use client';

import { useEffect, useRef } from 'react';

/*
  A hairline of yellow across the top, filling as you read.

  Case study pages only. On a short page it says nothing you cannot see
  from the scrollbar, but a case study is long and unbroken, and knowing
  how much is left is the difference between reading on and giving up.

  Left in place under reduced motion. Nothing here animates: the width
  tracks the scroll position directly, so it moves only because the
  reader is moving.
*/
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    let raf = 0;
    const paint = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      el.style.transform = `scaleX(${Math.min(pct, 100) / 100})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="readbar" aria-hidden="true">
      <div className="readbar__ink" ref={bar} />
    </div>
  );
}
