import type { MDXComponents } from 'mdx/types';
import Gallery from '@/components/work/Gallery';

/*
  How a case study MDX file becomes page furniture.

  The article is a contained reading column. A `## Heading` starts a
  section within it, paragraphs sit under it, and <Gallery /> breaks out
  of the column to the full width of the page. Styling lives in section
  28 of globals.css.

  The Gallery here is the fallback. app/work/[slug]/page.tsx passes its
  own, bound to that project's folder, which is what makes a bare
  <Gallery /> render the pictures without any paths in the file.
*/
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 className="case-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="case-h3">{children}</h3>,
    p: ({ children }) => <p className="case-p">{children}</p>,
    ul: ({ children }) => <ul className="case-list">{children}</ul>,
    blockquote: ({ children }) => <blockquote className="case-quote">{children}</blockquote>,
    a: ({ href, children }) => (
      <a className="textlink" href={href} rel="noopener" target="_blank">
        {children}
      </a>
    ),
    Gallery,
    ...components,
  };
}

export default useMDXComponents;
