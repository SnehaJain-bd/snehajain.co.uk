import type { Metadata } from 'next';
import CtaBand from '@/components/site/CtaBand';
import SectionHead from '@/components/site/SectionHead';
import Mark, { type MarkName } from '@/components/site/Mark';

/* One mark per package, matching the services stages so a package and a
   stage read as the same family. */
const PACKAGE_MARK: MarkName[] = ['diamond', 'square', 'ring', 'triangle'];
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
  {
    n: 1,
    title: 'A short message',
    body:
      'Tell me what you make, who it is for, and what is not working yet. A paragraph is plenty, and the more you can say the less we spend the call working it out.',
  },
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
              <p className="eyebrow">
                <Mark name="diamond" size={12} className="eyebrow__mark" />
                Services
              </p>
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
                  <span className="package__top">
                    <Mark name={PACKAGE_MARK[i % PACKAGE_MARK.length]} size={20} className="package__mark" />
                    <span className="package__num">{i + 1}</span>
                  </span>
                  <h3>{p.title}</h3>
                  <p className="package__leave">{p.leave}</p>
                  <p className="package__who">{p.who}</p>
                  {p.deliverables.length ? (
                    <>
                      <span className="package__label">What you get</span>
                      <ul className="package__gets">
                        {p.deliverables.map((d) => (
                          <li key={d}>
                            <Mark name="tick" size={15} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  <div className="package__meta">
                    <span>{p.timeline}</span>
                    <span className="package__price">{p.price}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <Services />

        <section className="section">
          <div className="wrap">
            <SectionHead
              mark="triangle"
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
