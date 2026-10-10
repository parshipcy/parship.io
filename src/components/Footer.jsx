import { CONFIG } from '../data/content';
import { useHomeSectionNav } from '../hooks/useHomeSectionNav';
import { sectionHref } from '../utils/homeSectionNav';
import { SocialLink } from './SocialLinks';

const FOOT_SECTIONS = [
  ['Home', 'home'],
  ['Work', 'work'],
  ['Open Source', 'opensource'],
  ['Projects', 'projects'],
  ['Blog', 'blog'],
  ['Mail', 'mail'],
];

export function Footer() {
  const goSection = useHomeSectionNav();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-cols">
          <ul className="foot-links">
            {FOOT_SECTIONS.map(([t, id]) => (
              <li key={t}>
                <a href={sectionHref(id)} onClick={(e) => goSection(e, id)}>
                  {t}
                </a>
              </li>
            ))}
          </ul>
          <div className="foot-soc">
            {CONFIG.socials.map((s) => (
              <SocialLink key={s.id} social={s} />
            ))}
          </div>
        </div>
        <p className="copy-line">
          &copy; {new Date().getFullYear()} {CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
