import Link from 'next/link';
import Image from 'next/image';
import { Arrow } from '@/components/site/Footer';
import SectionHead from '@/components/site/SectionHead';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives';
import { services } from '@/content/services';
import { faq } from '@/content/faq';
import { testimonials } from '@/content/testimonials';
import type { Project } from '@/lib/projects';

export function Strip() {
  return (
    <div className="strip">
      <div className="wrap strip__inner">
        <span>Brands that get chosen.</span>
      </div>
    </div>
  );
}

export function Approach() {
  return (
    <section className="section section--dark" id="approach">
      <div className="wrap">
        <SectionHead
          eyebrow="Approach"
          title="Most brands get designed before they get decided."
          lede={
            <>
              Nobody chooses a brand because <strong>the logo is nice</strong>.
            </>
          }
        />

        <Reveal className="intro__body">
          <p>
            Founders come to me having already picked a look, or having copied whoever is
            winning in their category. Then they try to work out what the brand actually
            means. It is the expensive way round, and it rarely holds.
          </p>
          <p>
            I start with the decisions. What you stand for, who you are for, what makes
            someone choose you over the thing next to you. Then I design those decisions, so
            the look has a reason to exist.
          </p>
          <p>
            I was a software engineer before I became a designer. It shows in how I work:{' '}
            <strong>systems, not moods</strong>.
          </p>
        </Reveal>

        <Reveal className="sec-foot">
          <p className="sec-foot__note">The long version</p>
          <Link className="arrow-link" href="/about">
            Why I left engineering <span>&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function Services({ alt = true }: { alt?: boolean }) {
  return (
    <section className={`section${alt ? ' section--alt' : ''}`} id="services">
      <div className="wrap">
        <SectionHead
          eyebrow="Services"
          title="Twelve services. One job: getting your brand chosen."
          lede={
            <>
              Most projects start with one of the <strong>first five</strong>. The rest tend
              to follow.
            </>
          }
        />

        <Stagger as="ol" className="services" gap={0.05}>
          {services.map((s, i) => (
            <StaggerItem key={s.title} className="service">
              <div className="service__top">
                <h3>{s.title}</h3>
                <span className="service__num">{i + 1}</span>
              </div>
              <p>{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="sec-foot">
          <p className="sec-foot__note">Not sure which of these you need?</p>
          <Link className="btn btn--solid" href="/contact">
            Let’s work it out
            <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function WorkGrid({ projects, withFoot = false }: { projects: Project[]; withFoot?: boolean }) {
  return (
    <>
      <Stagger className="work-grid" gap={0.09}>
        {projects.map((p) => (
          <StaggerItem key={p.slug} as="div">
            <Link className="project" href={`/work/${p.slug}`}>
              <div className="project__media">
                <Image
                  src={p.cover}
                  alt={p.coverAlt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 700px) 100vw, (max-width: 1240px) 50vw, 400px"
                />
              </div>
              <div className="project__body">
                <h3 className="project__title">
                  {p.title} <span className="arw">&#8599;</span>
                </h3>
                <p className="project__desc">{p.subtitle}</p>
                <ul className="tags">
                  {p.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {withFoot ? (
        <Reveal className="sec-foot">
          <p className="sec-foot__note">Every project, in full</p>
          <Link className="arrow-link" href="/work">
            See all work <span>&rarr;</span>
          </Link>
        </Reveal>
      ) : null}
    </>
  );
}

export function Testimonials() {
  return (
    <section className="section" id="voices">
      <div className="wrap">
        <SectionHead
          eyebrow="Social proof"
          title="What clients say."
          lede="Founders I’ve worked with, in their words."
        />
        <Stagger as="ul" className="voices" gap={0.1}>
          {testimonials.map((t) =>
            t.quote.trim() ? (
              <StaggerItem key={t.name} className="voice">
                <p className="voice__quote">&ldquo;{t.quote}&rdquo;</p>
                <footer className="voice__by">
                  <span>
                    <span className="voice__name">{t.name}</span>
                    <span className="voice__role">
                      {[t.role, t.brand].filter(Boolean).join(', ')}
                    </span>
                  </span>
                </footer>
              </StaggerItem>
            ) : (
              <StaggerItem key={t.name || Math.random()} className="voice voice--empty">
                <p className="voice__quote">Waiting on a real quote.</p>
                <footer className="voice__by">
                  <span>
                    <span className="voice__name">Client name</span>
                    <span className="voice__role">Role, brand</span>
                  </span>
                </footer>
              </StaggerItem>
            )
          )}
        </Stagger>
      </div>
    </section>
  );
}

export function Faq({ stripes = false }: { stripes?: boolean }) {
  return (
    <section className={`section${stripes ? ' section--stripes' : ''}`} id="faq">
      <div className="wrap">
        <SectionHead eyebrow="Questions" title="What founders ask before they hire me." />
        <Reveal className="faq-groups">
          {faq.map((group, gi) => (
            <div className="faq-group" key={group.title}>
              <div className="faq-group__head">
                <span className="faq-group__num">{gi + 1}</span>
                <h3 className="faq-group__title">{group.title}</h3>
              </div>
              {group.questions.map((item) => (
                <details className="qa" key={item.q} name={`faq-${gi}`}>
                  <summary>{item.q}</summary>
                  <div className="qa__body">{item.a}</div>
                </details>
              ))}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
