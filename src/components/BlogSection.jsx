import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { fmtDate } from '../utils/motion';

export function BlogPostRow({ post }) {
  return (
    <Link className="post rv" to={`/blog/${post.slug}`}>
      <div>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <time dateTime={post.date}>
          <Icon name="cal" />
          {fmtDate(post.date)}
        </time>
      </div>
      <span className="read">
        Read more <Icon name="arrow" />
      </span>
    </Link>
  );
}

export function BlogSection({ items, visible }) {
  const n = visible ?? items.length;
  const shown = items.slice(0, n);

  if (!items.length) {
    return (
      <section id="blog" className="sec" aria-labelledby="h-blog">
        <h2 id="h-blog" className="rv">
          Blogs
        </h2>
        <p className="muted rv coming-soon">Coming soon</p>
      </section>
    );
  }

  return (
    <section id="blog" className="sec" aria-labelledby="h-blog">
      <h2 id="h-blog" className="rv">
        Blogs
      </h2>
      <div>
        {shown.map((post) => (
          <BlogPostRow key={post.slug} post={post} />
        ))}
      </div>
      <div className="center">
        <Link className="btn rv" to="/blog">
          Show all blogs
        </Link>
      </div>
    </section>
  );
}
