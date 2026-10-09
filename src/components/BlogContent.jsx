function Block({ block }) {
  switch (block.type) {
    case 'meta':
      return (
        <div className="blog-meta rv">
          {block.rows.map((row) => (
            <p key={row.label}>
              <strong>{row.label}:</strong>{' '}
              {row.href ? (
                <a href={row.href} target="_blank" rel="noopener noreferrer">
                  {row.text}
                </a>
              ) : null}
              {row.links?.map((link, i) => (
                <span key={link.href}>
                  {i > 0 ? ' & ' : null}
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                </span>
              ))}
            </p>
          ))}
        </div>
      );
    case 'h3':
      return <h3 className="blog-h rv">{block.text}</h3>;
    case 'p':
      if (block.html) {
        return (
          <p
            className="blog-p rv"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        );
      }
      return <p className="blog-p rv">{block.text}</p>;
    case 'ol':
      return (
        <ol className="blog-list rv">
          {block.items.map((item) => (
            <li key={typeof item === 'string' ? item : item.text}>{item}</li>
          ))}
        </ol>
      );
    case 'ul':
      return (
        <ul className="blog-list rv">
          {block.items.map((item) =>
            typeof item === 'string' ? (
              <li key={item}>{item}</li>
            ) : (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.text}
                </a>
              </li>
            ),
          )}
        </ul>
      );
    case 'note':
      return (
        <aside className="blog-note rv" role="note">
          <p>{block.text}</p>
        </aside>
      );
    case 'cta':
      return (
        <p className="blog-cta rv">
          <a
            className="btn btn-link"
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {block.text}
          </a>
        </p>
      );
    default:
      return null;
  }
}

export function BlogContent({ blocks }) {
  return (
    <article className="blog-article">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </article>
  );
}
