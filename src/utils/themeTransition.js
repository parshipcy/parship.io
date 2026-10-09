import { reduced } from './motion';

const THEME_BG = {
  dark: '#0d0d0d',
  light: '#f6f6f4',
};

function applyTheme(next) {
  const root = document.documentElement;
  root.dataset.theme = next;
  root.style.colorScheme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* ignore */
  }
}

function getOrigin(event) {
  const target = event?.currentTarget;
  const rect = target?.getBoundingClientRect?.();
  const x =
    event?.clientX ??
    (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
  const y =
    event?.clientY ??
    (rect ? rect.top + rect.height / 2 : window.innerHeight / 2);
  return { x, y };
}

function setOriginVars(root, x, y) {
  root.style.setProperty('--theme-x', `${x}px`);
  root.style.setProperty('--theme-y', `${y}px`);
}

function pulseToggleButton(event) {
  const btn = event?.currentTarget;
  if (!btn || reduced) return;
  btn.classList.add('theme-pulse');
  btn.addEventListener(
    'animationend',
    () => btn.classList.remove('theme-pulse'),
    { once: true },
  );
}

function circleRevealFallback(x, y, next, onDone) {
  const overlay = document.createElement('div');
  overlay.className = 'theme-reveal';
  overlay.style.background = THEME_BG[next];
  overlay.style.setProperty('--theme-x', `${x}px`);
  overlay.style.setProperty('--theme-y', `${y}px`);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('theme-reveal--play'));

  overlay.addEventListener(
    'animationend',
    () => {
      onDone();
      overlay.remove();
    },
    { once: true },
  );
}

export function toggleTheme(event) {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';

  if (reduced) {
    applyTheme(next);
    return;
  }

  const { x, y } = getOrigin(event);
  setOriginVars(root, x, y);
  root.classList.add('theme-transitioning');
  pulseToggleButton(event);

  const finish = () => root.classList.remove('theme-transitioning');

  if (typeof document.startViewTransition === 'function') {
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.finished.finally(finish);
    return;
  }

  circleRevealFallback(x, y, next, () => {
    applyTheme(next);
    finish();
  });
}
