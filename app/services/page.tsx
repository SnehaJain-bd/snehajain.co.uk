import type { Metadata } from 'next';
import CtaBand from '@/components/site/CtaBand';
import SectionHead from '@/components/site/SectionHead';
import { Services, Faq } from '@/components/home/sections';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives';
import { packages } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services and packages',
  description:
    'Twelve services and four packages: brand strategy, visual identity, packaging and brand refresh. Fixed prices, agreed before anything begins.',
  alternates: { canonical: '/services' },
};

const steps = [
  { n: 1, title: 'Two lines', body: 'Send me two lines about your product. That is genuinely enough to start.' },
  { n: 2, title: 'A short call', body: 'We get on a call and work out what you actually need, and what you don’t.' },
  { n: 3, title: 'One page', body: 'I send one page with scope, price and timeline. The price never changes after that.' },
];

export default function ServicesPage() {
  return (
    <>
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">Services</p>
              <h1 className="page-hero__title">Four packages.</h1>
              <p className="page-hero__lede">
                Every package is a starting point. We shape the scope around what you need,
                then fix it. The price is set before we start and never changes after.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Stagger as="ol" className="packages" gap={0.09}>
              {packages.map((p, i) => (
                <StaggerItem key={p.title} className="package">
                  <span className="package__num">{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p className="package__who">{p.who}</p>
                  <p className="package__leave">{p.leave}</p>
                  <div className="package__meta">Deliverables and timeline: to confirm</div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <Services />

        <section className="section">
          <div className="wrap">
            <SectionHead
              eyebrow="How it starts"
              title="Three steps, no mystery"
              lede={<>No brief needed. <strong>Making the brief is my job.</strong></>}
            />
            <Stagger as="ol" className="steps" gap={0.1}>
              {steps.map((s) => (
                <StaggerItem key={s.n} className="step">
                  <span className="step__num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <Faq stripes />
      </main>
      <CtaBand />
    </>
  );
}
