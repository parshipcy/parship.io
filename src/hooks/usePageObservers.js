import { useEffect } from 'react';
import { syncActiveNavFromScroll } from '../utils/navActive';

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

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        syncActiveNavFromScroll(main);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    syncActiveNavFromScroll(main);

    return () => {
      rv.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [mainRef]);
}
