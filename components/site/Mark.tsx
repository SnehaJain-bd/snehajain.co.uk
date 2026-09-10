/* eslint-disable @next/next/no-img-element */

/*
  A brand mark, in the right colour for the theme.

  The graphics are an alphabet: twenty-one glyphs, each drawn in all four
  brand colours. Blue is the light mode mark and yellow the dark one, so
  neither is ever a filtered approximation of the other.

  Blue is decorative here and never carries meaning on its own, which is
  what keeps it inside the palette rule: brand blue measures 2.6:1 on the
  off-white ground and fails as text, but a drawn shape beside a heading
  is not text.

  Plain <img> inside <picture> rather than next/image, because the art
  direction has to switch on prefers-color-scheme and these files are
  three kilobytes each.
*/

export type MarkName =
  | 'diamond'
  | 'tick'
  | 'square'
  | 'ring'
  | 'chevron'
  | 'approx'
  | 'ellipsis'
  | 'braces'
  | 'brace-left'
  | 'brace-right'
  | 'heart'
  | 'question'
  | 'triangle'
  | 'asterisk'
  | 'quotes';

export default function Mark({
  name,
  size = 20,
  className,
  alt = '',
}: {
  name: MarkName;
  size?: number;
  className?: string;
  /* Leave empty unless the mark carries meaning the words do not. */
  alt?: string;
}) {
  return (
    <picture className={className}>
      <source srcSet={`/img/marks/${name}-yellow.png`} media="(prefers-color-scheme: dark)" />
      <img
        src={`/img/marks/${name}-blue.png`}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        aria-hidden={alt ? undefined : true}
      />
    </picture>
  );
}
