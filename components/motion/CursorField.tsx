'use client';

import { useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

/*
  Light that flows with the pointer rather than a circle that chases it.

  Three blobs, each lagging further behind the last, so it reads as one
  thing being dragged rather than three things following. Each is
  stretched along its own direction of travel and squashed across it, by
  an amount taken from how fast it is going: move quickly and it draws a
  streak, stop and it relaxes back to round. That is the whole
  difference. A circle that merely moves still looks like a circle; a
  circle that deforms looks like liquid.

  One loop drives every layer on the page. The page-wide one sits behind
  the content, and sections with their own opaque background carry a
  local copy so the light is not hidden by them: the hero above its
  stripes, the closing band above its dark ground. Local layers are
  offset by their own position, so all of them move as one.

  Transforms only, so nothing reflows or repaints, it only composites.

  Without a fine pointer, so on a phone, it wanders a slow path of its
  own. Reduced motion parks it and stops.
*/

type Layer = {
  el: HTMLElement;
  lag: number;
  x: number;
  y: number;
  /* stretch, eased rather than snapped, so a flick smears */
  s: number;
};

type Field = {
  root: HTMLElement;
  local: boolean;
  left: number;
  top: number;
  layers: Layer[];
};

const LAGS = [0.16, 0.09, 0.055];

export default function CursorField() {
  const still = useReducedMotion();

  useEffect(() => {
    const roots = Array.from(document.querySelectorAll<HTMLElement>('.cursor-field'));
    if (!roots.length) return;

    const fields: Field[] = roots.map((root) => ({
      root,
      local: root.classList.contains('cursor-field--local'),
      left: 0,
      top: 0,
      layers: Array.from(root.querySelectorAll<HTMLElement>('.cursor-field__blob')).map(
        (el, i) => ({ el, lag: LAGS[i] ?? 0.1, x: 0, y: 0, s: 0 })
      ),
    }));

    /* A local layer is positioned inside its section, so it has to know
       where that section currently is. Cheap to read, but only on the
       events that can move it. */
    const measure = () => {
      for (const f of fields) {
        if (!f.local) {
          f.left = 0;
          f.top = 0;
          continue;
        }
        const r = f.root.getBoundingClientRect();
        f.left = r.left;
        f.top = r.top;
      }
    };

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.4;
    for (const f of fields) {
      for (const l of f.layers) {
        l.x = tx;
        l.y = ty;
      }
    }

    if (still) {
      measure();
      for (const f of fields) {
        for (const l of f.layers) {
          l.el.style.transform = `translate3d(${tx - f.left}px, ${ty - f.top}px, 0)`;
        }
      }
      return;
    }

    const fine = window.matchMedia('(pointer: fine)').matches;
    let raf = 0;
    let drift = 0;

    /* Light follows a hand. A hand that has stopped is not asking for
       it, and a click is someone attending to something else. */
    const IDLE_AFTER = 550;
    let lastMove = 0;
    let idle = true;

    const setIdle = (next: boolean) => {
      if (next === idle) return;
      idle = next;
      for (const f of fields) f.root.classList.toggle('is-idle', next);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      lastMove = performance.now();
      setIdle(false);
    };
    const onDown = () => {
      lastMove = 0;
      setIdle(true);
    };
    const onLeave = () => {
      lastMove = 0;
      setIdle(true);
    };

    const frame = () => {
      if (!fine) {
        drift += 0.0035;
        tx = window.innerWidth * (0.5 + Math.sin(drift) * 0.26);
        ty = window.innerHeight * (0.42 + Math.cos(drift * 0.8) * 0.2);
      } else if (!idle && performance.now() - lastMove > IDLE_AFTER) {
        setIdle(true);
      }

      for (const f of fields) {
        for (const l of f.layers) {
          const dx = (tx - l.x) * l.lag;
          const dy = (ty - l.y) * l.lag;
          l.x += dx;
          l.y += dy;

          /* Enough deformation to read as liquid, not so much that it
             becomes a line with a glow, which is what a hard stretch
             looks like once the blob is soft and blurred. */
          const want = Math.min(Math.hypot(dx, dy) / 34, 1);
          l.s += (want - l.s) * 0.1;

          const angle = Math.atan2(dy, dx);
          const along = 1 + l.s * 0.5;
          const across = 1 - l.s * 0.16;

          l.el.style.transform =
            `translate3d(${(l.x - f.left).toFixed(1)}px, ${(l.y - f.top).toFixed(1)}px, 0) ` +
            `rotate(${angle.toFixed(3)}rad) scale(${along.toFixed(3)}, ${across.toFixed(3)})`;
        }
      }

      raf = requestAnimationFrame(frame);
    };

    measure();
    setIdle(!fine ? false : true);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    if (fine) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      if (fine) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        document.removeEventListener('pointerleave', onLeave);
      }
    };
  }, [still]);

  return <FieldLayers />;
}

/** The three blobs. Also used inside sections that hide the page-wide one. */
export function FieldLayers({ local = false }: { local?: boolean }) {
  return (
    <div className={`cursor-field${local ? ' cursor-field--local' : ''}`} aria-hidden="true">
      <span className="cursor-field__blob cursor-field__blob--1" />
      <span className="cursor-field__blob cursor-field__blob--2" />
      <span className="cursor-field__blob cursor-field__blob--3" />
    </div>
  );
}
