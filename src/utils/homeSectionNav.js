import { scheduleScrollToSection } from './scroll';

export function goToHomeSection(navigate, pathname, id) {
  const location = { pathname: '/', hash: `#${id}` };
  const options = {
    state: { scrollTo: id, at: Date.now() },
    preventScrollReset: true,
  };

  if (pathname === '/') {
    navigate(location, { ...options, replace: true });
    scheduleScrollToSection(id);
    return;
  }

  navigate(location, options);
}
