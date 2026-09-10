import type { Metadata } from 'next';
import SectionHead from '@/components/site/SectionHead';
import Mark from '@/components/site/Mark';
import CtaBand from '@/components/site/CtaBand';
import WorkChapters from '@/components/work/WorkChapters';
import { Reveal } from '@/components/motion/primitives';
import { getProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Selected work',
  description:
    'Brand and packaging projects for founder-led businesses, and the decision behind each one.',
  alternates: { canonical: '/work' },
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">
                <Mark name="diamond" size={12} className="eyebrow__mark" />
                Work
              </p>
              <h1 className="page-hero__title">The decision behind each project.</h1>
              <p className="page-hero__lede">
                What each brand had to work out before any of it could look like this.
              </p>
            </Reveal>
          </div>
        </section>

        <WorkChapters projects={projects} />
      </main>
      <CtaBand />
    </>
  );
}
