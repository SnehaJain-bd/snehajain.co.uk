import type { Metadata } from 'next';
import TallyEmbed from '@/components/contact/TallyEmbed';
import { Reveal } from '@/components/motion/primitives';
import { site } from '@/content/site';
import Mark from '@/components/site/Mark';

export const metadata: Metadata = {
  title: 'Start a project',
  description:
    'Send a short message about your business. If it looks like a fit, we will book a call.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">
              <Mark name="ellipsis" size={12} className="eyebrow__mark" />
              Contact
            </p>
            <h1 className="page-hero__title">Tell me what you’re building.</h1>
            <p className="page-hero__lede">
              Send a short message about your business. If it looks like a fit, we’ll book a
              call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <Reveal>
              <dl className="contact__ways">
                <dt>Email</dt>
                <dd>
                  <a
                    className="contact__mail marker-link"
                    href={`mailto:${site.email}?subject=Project%20enquiry`}
                  >
                    {site.email}
                  </a>
                </dd>
                <dt>Based in</dt>
                <dd>{site.locationLong}.</dd>
                <dt>Reply time</dt>
                <dd>Within two working days.</dd>
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="contact__how">A paragraph is enough.</h2>
              <p>
                Answers land straight in my inbox. If you would rather just email, the
                address is on the left.
              </p>
              <TallyEmbed />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
