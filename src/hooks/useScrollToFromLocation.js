import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scheduleScrollToSection } from '../utils/scroll';

export function useScrollToFromLocation() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const id = location.state?.scrollTo || location.hash.replace(/^#/, '');
    if (!id) return;

    scheduleScrollToSection(id);
  }, [
    location.pathname,
    location.hash,
    location.state?.scrollTo,
    location.state?.at,
  ]);
}
