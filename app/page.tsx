import Hero from '@/components/home/Hero';
import { Strip, Approach, Services, WorkGrid, Testimonials, Faq } from '@/components/home/sections';
import SectionHead from '@/components/site/SectionHead';
import CtaBand from '@/components/site/CtaBand';
import { getFeatured } from '@/lib/projects';

export default async function Home() {
  const projects = await getFeatured();

  return (
    <>
      <main id="main">
        <Hero />
        <Strip />
        <Approach />
        <Services />

        <section className="section" id="work">
          <div className="wrap">
            <SectionHead
              eyebrow="Work"
              title="The decision behind each project."
              lede="What each brand had to work out before any of it could look like this."
            />
            <WorkGrid projects={projects} withFoot lead />
          </div>
        </section>

        <Testimonials />
        <Faq />
      </main>
      <CtaBand />
    </>
  );
}
