import type { Metadata } from 'next';
import Image from 'next/image';
import CtaBand from '@/components/site/CtaBand';
import SectionHead from '@/components/site/SectionHead';
import { Highlight, Reveal, Stagger, StaggerItem } from '@/components/motion/primitives';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Software engineer turned brand designer. Grew up in northeast India, moved to the UK in 2026. Brand strategy, identity and packaging for founder-led businesses.',
  alternates: { canonical: '/about' },
};

const howIWork = [
  'You don’t need a brief. Making the brief is my job.',
  'Every direction comes with its reasoning, so there’s always something specific to react to.',
  'The price is set before we start and never changes after.',
];

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">About</p>
              <h1 className="page-hero__title">Hi, I’m Sneha.</h1>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="about-grid">
              <Reveal as="div" className="about__photo">
                <Image
                  src="/img/portrait.png"
                  alt="Portrait of Sneha Jain"
                  width={1080}
                  height={1080}
                  sizes="(max-width: 900px) 100vw, 420px"
                  priority
                />
              </Reveal>

              <Reveal className="story" delay={0.1}>
                <p className="story__lead">
                  I grew up in northeast India. Nature was just what was outside the window
                  there, and I have never really got over it. My phone is still mostly
                  sunsets and sky.
                </p>

                <h2>I started out as a software engineer.</h2>
                <p>
                  I was good at it. The problem was that almost nobody ever saw the work. It
                  shipped, it worked, and then it disappeared into a system somewhere. I
                  wanted to make things people could actually look at and hold.
                </p>
                <p>
                  So I changed careers. That was five years ago and I haven’t wondered about
                  it since.
                </p>

                <h2>I moved to the UK in February 2026.</h2>
                <p>
                  New country, no network, starting the whole thing again. I’m exploring it
                  one weekend at a time, and there is always a book I’m in the middle of.
                </p>

                <h2>I’m an introvert.</h2>
                <p>
                  Which makes putting myself online, writing posts, showing work and asking
                  people to hire me genuinely uncomfortable. I do it anyway, on purpose. It’s
                  the same thing I ask founders to do: be clear about who you are, out loud,
                  even when it feels like too much.
                </p>

                <h2>What I actually do</h2>
                <p>
                  Brand strategy, identity and packaging for founder-led businesses. Five
                  years, twenty plus clients, and more than half come back with the next
                  project. I make the decisions first, what your brand says and why, then
                  make them look good.
                </p>
              </Reveal>
            </div>

            <Reveal className="pullquote" delay={0.05}>
              <Image
                className="brandmark brandmark--braces"
                src="/img/mark-braces.png"
                alt=""
                width={430}
                height={424}
              />
              <p>
                A beautiful brand with no clear positioning is just{' '}
                <Highlight delay={0.3}>expensive decoration</Highlight>.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section section--stripes">
          <div className="wrap">
            <SectionHead eyebrow="How I work" title="Three things you can count on" />
            <Stagger as="ol" className="howiwork" gap={0.1}>
              {howIWork.map((line) => (
                <StaggerItem key={line}>{line}</StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section section--tight">
          <div className="wrap">
            <Reveal>
              <p className="proofline">
                Five years. <Highlight delay={0.25}>20+ clients.</Highlight> More than half
                come back with the next project.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <CtaBand lead="Now tell me what you’re" />
    </>
  );
}
