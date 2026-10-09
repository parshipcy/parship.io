import { useEffect } from 'react';

const SECTION_NAV_MAP = {
  home: 'home',
  work: 'work',
  opensource: 'opensource',
  blog: 'blog',
  mail: 'mail',
  projects: 'projects',
};

export function usePageObservers(mainRef) {
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const rv = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    main.querySelectorAll('.rv').forEach((el) => {
      const sibs = el.parentElement.querySelectorAll(':scope > .rv');
      el.style.setProperty(
        '--d',
        `${Math.min([...sibs].indexOf(el), 6) * 70}ms`,
      );
      rv.observe(el);
    });

    const links = document.querySelectorAll('[data-nav]');
    const act = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const navKey = SECTION_NAV_MAP[e.target.id];
            links.forEach((a) =>
              a.classList.toggle('active', a.dataset.nav === navKey),
            );
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    main.querySelectorAll('section').forEach((s) => act.observe(s));

    return () => {
      rv.disconnect();
      act.disconnect();
    };
  }, [mainRef]);
}
