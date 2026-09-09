'use client';

import { useEffect, useRef } from 'react';
import { site } from '@/content/site';

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

/**
 * The form is Tally's. This only swaps data-tally-src onto src and lets
 * Tally size the frame to its content. If the script is blocked, the
 * frame still points at the form so people can fill it in.
 */
export default function TallyEmbed() {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const SRC = 'https://tally.so/widgets/embed.js';

    const load = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
        return;
      }
      const el = frame.current;
      if (el && !el.getAttribute('src')) {
        el.setAttribute('src', el.dataset.tallySrc ?? '');
      }
    };

    if (window.Tally) {
      load();
      return;
    }
    if (document.querySelector(`script[src="${SRC}"]`)) return;

    const s = document.createElement('script');
    s.src = SRC;
    s.onload = load;
    s.onerror = load;
    document.body.appendChild(s);
  }, []);

  const src =
    `https://tally.so/embed/${site.tallyFormId}` +
    '?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';

  return (
    <div className="tally-wrap">
      <iframe
        ref={frame}
        data-tally-src={src}
        loading="lazy"
        width="100%"
        height={500}
        frameBorder={0}
        title="Start a project"
      />
      <noscript>
        <p>
          <a
            className="btn btn--solid"
            href={`https://tally.so/r/${site.tallyFormId}`}
            rel="noopener"
            target="_blank"
          >
            Open the form
          </a>
        </p>
      </noscript>
    </div>
  );
}
