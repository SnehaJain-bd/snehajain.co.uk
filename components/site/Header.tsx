'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { nav, site } from '@/content/site';

/*
  HEADER, PLACEHOLDER. A new design is coming. Replace this component and
  its styles in globals.css section 5. Nothing else depends on it.
*/

function Clock() {
  // Sneha's local time, not the visitor's, so "available for work" means
  // something. Rendered empty on the server to avoid a hydration mismatch.
  const [now, setNow] = useState('');

  useEffect(() => {
    const tick = () => {
      try {
        setNow(
          new Date().toLocaleTimeString('en-GB', {
            timeZone: site.timeZone,
            hour: '2-digit',
            minute: '2-digit',
          })
        );
      } catch {
        setNow('');
      }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{now || ' '}</span>;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const still = useReducedMotion();

  // Close on route change, and stop the page scrolling behind the panel.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <div className="status-bar" id="top">
        <div className="wrap status-bar__inner">
          <Clock />
          <span className="status-bar__sep">/</span>
          <span>Based in {site.location}</span>
          <span className="status-bar__avail">
            <span className="status-bar__dot" aria-hidden="true" />
            Available for work
          </span>
        </div>
      </div>

      <header className="site-head">
        <div className="wrap site-head__inner">
          <Link className="wordmark" href="/" aria-label={`${site.name}, home`}>
            <Image
              className="wordmark__dark"
              src="/img/logo-dark.png"
              alt={site.name}
              width={21}
              height={33}
              priority
            />
            <Image
              className="wordmark__cream"
              src="/img/logo-cream.png"
              alt=""
              width={21}
              height={33}
              priority
            />
          </Link>

          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>

          <nav id="nav" className="nav nav--desktop" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link className="nav__cta" href="/contact">
              Start a project
            </Link>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.nav
            id="nav-mobile"
            className="nav nav--mobile"
            aria-label="Primary"
            initial={still ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {nav.map((item, i) => (
              <m.div
                key={item.href}
                initial={still ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: still ? 0 : 0.06 + i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </m.div>
            ))}
            <Link className="nav__cta" href="/contact">
              Start a project
            </Link>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}
