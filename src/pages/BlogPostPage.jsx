import { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BlogContent } from '../components/BlogContent';
import { Icon } from '../components/Icon';
import { Layout } from '../components/Layout';
import { CONFIG } from '../data/content';
import { getBlogBySlug } from '../data/blogs';
import { usePageObservers } from '../hooks/usePageObservers';
import { fmtDate } from '../utils/motion';

export function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);
  const mainRef = useRef(null);
  usePageObservers(mainRef);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} · ${CONFIG.name}`;
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Layout>
      <main className="wrap page" ref={mainRef}>
        <header className="page-head rv">
          <Link className="btn page-back" to="/blog">
            <Icon name="arrowLeft" />
            All blogs
          </Link>
          <h1 className="page-title">{post.title}</h1>
          <p className="muted blog-date">
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
          </p>
        </header>
        <BlogContent blocks={post.blocks} />
      </main>
    </Layout>
  );
}
