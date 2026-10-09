import { Link } from 'react-router-dom';

export function ExpItem({ e }) {
  return (
    <article className="exp rv">
      {e.logo ? (
        <img className="exp-logo" src={e.logo} alt="" width={40} height={40} />
      ) : null}
      <div className="exp-body">
        <h3>
          {e.company}
          {e.current && <span className="badge">Working</span>}
        </h3>
        {e.program ? <p className="program">{e.program}</p> : null}
        <p className="role">{e.role}</p>
        {e.description ? <p className="desc">{e.description}</p> : null}
      </div>
      <div className="meta">
        <div>{e.period}</div>
        <div>{e.location}</div>
      </div>
    </article>
  );
}

export function ExperienceSection({ items, visible }) {
  const n = visible;
  const hasMore = items.length > n;

  return (
    <section id="work" className="sec" aria-labelledby="h-work">
      <h2 id="h-work" className="rv">
        Experience
      </h2>
      <div>
        {items.slice(0, n).map((e) => (
          <ExpItem key={e.company + e.period + e.role} e={e} />
        ))}
      </div>
      {hasMore && (
        <div className="center">
          <Link className="btn" to="/experience">
            Show all work experiences
          </Link>
        </div>
      )}
    </section>
  );
}
