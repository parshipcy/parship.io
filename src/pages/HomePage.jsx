import { useEffect, useRef } from 'react';
import { BlogSection } from '../components/BlogSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { Hero } from '../components/Hero';
import { Layout } from '../components/Layout';
import { MailSection } from '../components/MailSection';
import { OpenSourceSection } from '../components/OpenSourceSection';
import { ProjectSection } from '../components/ProjectSection';
import snowfallGif from '../assets/snowfall.gif';
import { BLOGS, CONFIG, EXPERIENCE, PROJECTS, VISIBLE } from '../data/content';
import { usePageObservers } from '../hooks/usePageObservers';
import { useScrollToFromLocation } from '../hooks/useScrollToFromLocation';

export function HomePage() {
  const mainRef = useRef(null);
  usePageObservers(mainRef);
  useScrollToFromLocation();

  useEffect(() => {
    document.title = `${CONFIG.name} · ${CONFIG.headline}`;
  }, []);

  return (
    <Layout>
      <main className="wrap" ref={mainRef}>
        <Hero />
        <ExperienceSection items={EXPERIENCE} visible={VISIBLE.experience} />
        <OpenSourceSection />
        <ProjectSection items={PROJECTS} />
        <BlogSection items={BLOGS} visible={VISIBLE.blog} />
        <MailSection />
        <figure className="quote quote--scene rv">
          <div className="quote-visual" aria-hidden="true">
            <img src={snowfallGif} alt="" decoding="async" />
          </div>
          <div className="quote-body">
            <span className="qmark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote>
              <p>&quot;{CONFIG.quote.text}&quot;</p>
            </blockquote>
            <figcaption>{CONFIG.quote.by}</figcaption>
          </div>
        </figure>
      </main>
    </Layout>
  );
}
