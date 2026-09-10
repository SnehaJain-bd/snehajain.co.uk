'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export type IndexItem = {
  slug: string;
  title: string;
  sector: string;
  year: string;
  cover: string;
  coverAlt: string;
};

/*
  The projects that are not leading, as a list of names with the cover
  appearing under the pointer.

  Every cover is rendered and stacked, with only the active one visible,
  rather than swapping one src. Swapping would make the browser fetch on
  first hover and flash; this way next/image has already done the work.

  There is no pointer on a phone, so the preview simply never appears and
  the list stays a list. Nothing here is the only route to anything.
*/
export default function WorkIndex({ items }: { items: IndexItem[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLSpanElement>(null);
  const [at, setAt] = useState<number | null>(null);
  const still = useReducedMotion();

  const track = (e: React.PointerEvent) => {
    if (still || !wrap.current || !preview.current) return;
    const b = wrap.current.getBoundingClientRect();
    preview.current.style.left = `${e.clientX - b.left}px`;
    preview.current.style.top = `${e.clientY - b.top}px`;
  };

  return (
    <div
      className="work-index"
      ref={wrap}
      onPointerMove={track}
      onPointerLeave={() => setAt(null)}
    >
      {!still ? (
        <span
          className={`work-index__preview${at !== null ? ' is-on' : ''}`}
          ref={preview}
          aria-hidden="true"
        >
          {items.map((p, i) => (
            <Image
              key={p.slug}
              src={p.cover}
              alt=""
              width={520}
              height={347}
              quality={78}
              sizes="240px"
              className={at === i ? 'is-on' : undefined}
            />
          ))}
        </span>
      ) : null}

      {items.map((p, i) => (
        <Link
          key={p.slug}
          className="work-index__row"
          href={`/work/${p.slug}`}
          onPointerEnter={() => setAt(i)}
          onFocus={() => setAt(null)}
        >
          <span className="work-index__name">{p.title}</span>
          <span className="work-index__meta">
            {p.sector} <span aria-hidden="true">&middot;</span> {p.year}
          </span>
        </Link>
      ))}
    </div>
  );
}
