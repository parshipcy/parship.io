import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { goToHomeSection } from '../utils/homeSectionNav';

export function useHomeSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (e, id) => {
      e.preventDefault();
      goToHomeSection(navigate, pathname, id);
    },
    [navigate, pathname],
  );
}
