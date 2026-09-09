import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import MotionProvider from '@/components/motion/MotionProvider';
import { site } from '@/content/site';
import './globals.css';

/* Self hosted by Next, so no request to Google and no flash of fallback type. */
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s, ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    url: site.url,
    title: site.title,
    description: site.description,
    images: ['/img/og.png'],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBF9F4' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1512' },
  ],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.location,
    addressCountry: 'GB',
  },
  sameAs: [site.social.instagram, site.social.behance, site.social.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={workSans.variable}>
      <head>
        {/* Loretta Variable, the heading face, lives on Adobe Typekit */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/yhu7ntr.css" />
        <link rel="icon" href="/img/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
