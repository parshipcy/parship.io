import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExpItem } from '../components/ExperienceSection';
import { Icon } from '../components/Icon';
import { Layout } from '../components/Layout';
import { CONFIG, EXPERIENCE } from '../data/content';
import { usePageObservers } from '../hooks/usePageObservers';

export function ExperiencePage() {
  const mainRef = useRef(null);
  usePageObservers(mainRef);

  useEffect(() => {
    document.title = `Experience · ${CONFIG.name}`;
  }, []);

  return (
    <Layout>
      <main className="wrap page" ref={mainRef}>
        <header className="page-head rv">
          <Link className="btn page-back" to="/">
            <Icon name="arrowLeft" />
            Back home
          </Link>
          <h1 className="page-title">Experience</h1>
        </header>
        <div>
          {EXPERIENCE.map((e) => (
            <ExpItem key={e.company + e.period} e={e} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
