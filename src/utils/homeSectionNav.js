import { pinNavSection } from './navActive';
import { scheduleScrollToSection } from './scroll';

export const HOME_SECTION_IDS = new Set([
  'home',
  'work',
  'opensource',
  'projects',
  'blog',
  'mail',
]);

export const HOME_SECTION_PATH_REDIRECTS = [...HOME_SECTION_IDS].filter(
  (id) => id !== 'home' && id !== 'blog',
);

export function sectionToLocation(id) {
  const section = HOME_SECTION_IDS.has(id) ? id : 'home';
  return {
    pathname: '/',
    search: `?section=${encodeURIComponent(section)}`,
    hash: '',
  };
}

export function sectionHref(id) {
  const { pathname, search } = sectionToLocation(id);
  return `${pathname}${search}`;
}

export function isHomeSectionPath(pathname) {
  return pathname === '/';
}

export function sectionIdFromLocation(location) {
  if (location.state?.scrollTo) return location.state.scrollTo;

  const hash = location.hash.replace(/^#/, '');
  if (hash && HOME_SECTION_IDS.has(hash)) return hash;

  if (location.pathname === '/') {
    const section = new URLSearchParams(location.search).get('section');
    if (section && HOME_SECTION_IDS.has(section)) return section;
  }

  return null;
}

export function goToHomeSection(navigate, pathname, search, id) {
  const target = sectionToLocation(id);
  const options = {
    state: { scrollTo: id, at: Date.now() },
    preventScrollReset: true,
  };

  const same =
    pathname === target.pathname && (search || '') === target.search;

  if (same) {
    navigate(target, { ...options, replace: true });
    pinNavSection(id);
    scheduleScrollToSection(id);
    return;
  }

  pinNavSection(id);
  navigate(target, options);
}
