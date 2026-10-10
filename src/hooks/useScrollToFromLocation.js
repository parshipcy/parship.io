import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  isHomeSectionPath,
  sectionIdFromLocation,
  sectionToLocation,
} from '../utils/homeSectionNav';
import { pinNavSection } from '../utils/navActive';
import { scheduleScrollToSection } from '../utils/scroll';

export function useScrollToFromLocation() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isHomeSectionPath(location.pathname)) return;

    const id = sectionIdFromLocation(location);
    if (!id) return;

    pinNavSection(id);
    scheduleScrollToSection(id);

    if (location.hash) {
      const target = sectionToLocation(id);
      navigate(target, {
        replace: true,
        state: { scrollTo: id, at: Date.now() },
        preventScrollReset: true,
      });
    }
  }, [
    location.pathname,
    location.search,
    location.hash,
    location.state?.scrollTo,
    location.state?.at,
    navigate,
  ]);
}
