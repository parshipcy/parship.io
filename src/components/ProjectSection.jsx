import { Icon } from './Icon';

function ProjectCard({ item }) {
  const external = item.url.startsWith('http');
  return (
    <article className="card rv">
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <a
        className="card-link"
        href={item.url}
        aria-label={`${item.title} on GitHub`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <Icon name="github" className="card-icon" />
      </a>
    </article>
  );
}

export function ProjectSection({ items }) {
  return (
    <section id="projects" className="sec" aria-labelledby="h-projects">
      <h2 id="h-projects" className="rv">
        Projects
      </h2>
      <div className="cards">
        {items.map((item) => (
          <ProjectCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
