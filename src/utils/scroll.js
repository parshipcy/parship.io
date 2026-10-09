import { reduced } from './motion';

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  return true;
}

export function scrollToSectionWhenReady(id, maxAttempts = 48) {
  let attempts = 0;
  const tryScroll = () => {
    if (scrollToSection(id)) return;
    attempts += 1;
    if (attempts < maxAttempts) {
      requestAnimationFrame(tryScroll);
    }
  };
  tryScroll();
}

export function scheduleScrollToSection(id) {
  const run = () => scrollToSectionWhenReady(id);
  requestAnimationFrame(() => requestAnimationFrame(run));
  window.setTimeout(run, 280);
}
