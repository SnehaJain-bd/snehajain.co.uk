import Link from 'next/link';
import { site } from '@/content/site';

const arrow = <span className="arw">&rarr;</span>;

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>
                  {site.email} {arrow}
                </a>
              </li>
            </ul>
            <Link className="btn btn--solid foot-col__cta" href="/contact">
              Start a Project
              <Arrow />
            </Link>
          </div>

          <div className="foot-col">
            <h4>Menu</h4>
            <ul>
              <li>
                <Link href="/">Home {arrow}</Link>
              </li>
              <li>
                <Link href="/about">About {arrow}</Link>
              </li>
              <li>
                <Link href="/services">Services {arrow}</Link>
              </li>
              <li>
                <Link href="/work">Work {arrow}</Link>
              </li>
              <li>
                <Link href="/contact">Contact {arrow}</Link>
              </li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Social</h4>
            <ul>
              <li>
                <a href={site.social.instagram} rel="me noopener" target="_blank">
                  Instagram {arrow}
                </a>
              </li>
              <li>
                <a href={site.social.behance} rel="me noopener" target="_blank">
                  Behance {arrow}
                </a>
              </li>
              <li>
                <a href={site.social.linkedin} rel="me noopener" target="_blank">
                  LinkedIn {arrow}
                </a>
              </li>
            </ul>
          </div>

          <div className="foot-col">
            <h4>Based in</h4>
            <ul>
              <li>{site.locationLong}</li>
            </ul>
          </div>
        </div>

        <div className="foot-bar">
          <p className="foot-bar__legal">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <a href="#top">Back to top &uarr;</a>
        </div>
      </div>
    </footer>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
