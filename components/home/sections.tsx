import Link from 'next/link';
import Image from 'next/image';
import { Arrow } from '@/components/site/Footer';
import SectionHead from '@/components/site/SectionHead';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/primitives';
import Mark, { type MarkName } from '@/components/site/Mark';
import WorkIndex from '@/components/home/WorkIndex';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import { services, stages, type Stage } from '@/content/services';
import { faq } from '@/content/faq';
import { testimonials } from '@/content/testimonials';
import type { Project } from '@/lib/projects';

/* One glyph per stage. Diamond for decisions, square for the built
   thing, triangle for shipping it. */
const STAGE_MARK: Record<Stage, MarkName> = {
  decide: 'diamond',
  design: 'square',
  deploy: 'triangle',
};

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
              Most projects start with a <strong>decision</strong>. The rest tend to follow.
            </>
          }
        />

        {/*
          Grouped by when they happen rather than listed as twelve equal
          things. The argument of the whole site is that brands get
          designed before they get decided, so "Decide" being the first
          column heading is that argument made structural.
        */}
        <Stagger className="stages" gap={0.09}>
          {stages.map((st) => (
            <StaggerItem key={st.id} as="div" className="stage-col">
              <h3 className="stage-col__head">
                <Mark name={STAGE_MARK[st.id]} size={22} className="stage-col__mark" />
                <span className="stage-col__name">{st.name}</span>
              </h3>
              <p className="stage-col__blurb">{st.blurb}</p>
              <ul className="stage-col__list">
                {services
                  .filter((s) => s.stage === st.id)
                  .map((s) => (
                    <li key={s.title}>
                      <span className="stage-col__title">{s.title}</span>
                      <span className="stage-col__body">{s.body}</span>
                    </li>
                  ))}
              </ul>
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

/*
  Two shapes for the same projects.

  lead: the home page. The first project, whichever has the lowest
  order, takes the full width and gets its summary. The rest become an
  index whose covers appear under the pointer. Putting the strongest
  work on screen immediately matters, because a pure index asks a first
  time visitor to hover before they see anything at all.

  Without lead: /work, where an even grid is right, because there the
  point is the whole body of work rather than one argument.
*/
export function WorkGrid({
  projects,
  withFoot = false,
  lead = false,
}: {
  projects: Project[];
  withFoot?: boolean;
  lead?: boolean;
}) {
  if (lead && projects.length > 1) {
    const [first, ...rest] = projects;
    return (
      <>
        <Reveal as="div">
          <Link className="lead-project" href={`/work/${first.slug}`}>
            <div className="lead-project__media">
              <Image
                src={first.cover}
                alt={first.coverAlt}
                width={1400}
                height={933}
                quality={82}
                priority
                sizes="(max-width: 760px) 100vw, 60vw"
              />
            </div>
            <div className="lead-project__body">
              <h3 className="lead-project__title">
                {first.title} <span className="arw">&#8599;</span>
              </h3>
              <p className="lead-project__desc">{first.summary}</p>
              <ul className="tags">
                {first.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Link>
        </Reveal>

        <Reveal as="div" delay={0.08}>
          <WorkIndex
            items={rest.map((p) => ({
              slug: p.slug,
              title: p.title,
              sector: p.sector,
              year: p.year,
              cover: p.cover,
              coverAlt: p.coverAlt,
            }))}
          />
        </Reveal>

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
                  quality={82}
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
        {/* One at a time, so each quote gets the full width and is shown
            whole rather than trimmed to fit a card. */}
        <Reveal as="div">
          <TestimonialCarousel items={testimonials.filter((t) => t.quote.trim())} />
        </Reveal>
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
