import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BlogPostRow } from '../components/BlogSection';
import { Icon } from '../components/Icon';
import { Layout } from '../components/Layout';
import { BLOGS } from '../data/blogs';
import { CONFIG } from '../data/content';
import { usePageObservers } from '../hooks/usePageObservers';

export function BlogPage() {
  const mainRef = useRef(null);
  usePageObservers(mainRef);

  useEffect(() => {
    document.title = `Blog · ${CONFIG.name}`;
  }, []);

  return (
    <Layout>
      <main className="wrap page" ref={mainRef}>
        <header className="page-head rv">
          <Link className="btn page-back" to="/">
            <Icon name="arrowLeft" />
            Back home
          </Link>
          <h1 className="page-title">Blog</h1>
        </header>
        <div>
          {BLOGS.length ? (
            BLOGS.map((post) => <BlogPostRow key={post.slug} post={post} />)
          ) : (
            <p className="muted rv coming-soon">Coming soon</p>
          )}
        </div>
      </main>
    </Layout>
  );
}
