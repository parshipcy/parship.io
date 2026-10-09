import logoSrc from '../assets/Parship.png';
import { Icon } from './Icon';
import { useHomeSectionNav } from '../hooks/useHomeSectionNav';
import { toggleTheme } from '../utils/themeTransition';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'opensource', label: 'Open Source' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'mail', label: 'Mail' },
];

export function Nav({ onPaletteOpen }) {
  const onNavClick = useHomeSectionNav();
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <nav aria-label="Primary" className="nav-links">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`/#${id}`}
              data-nav={id}
              onClick={(e) => onNavClick(e, id)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <button
            type="button"
            className="kbd-btn"
            aria-label="Open command palette"
            aria-haspopup="dialog"
            onClick={onPaletteOpen}
          >
            <Icon name="search" />
            <span className="keys">
              <kbd id="mod-key">Ctrl</kbd>
              <kbd>K</kbd>
            </span>
          </button>
          <button
            type="button"
            className="icon-btn"
            id="theme-toggle"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <span className="i-sun">
              <Icon name="sun" />
            </span>
            <span className="i-moon">
              <Icon name="moon" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
