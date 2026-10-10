const SECTION_NAV_MAP = {
  home: 'home',
  work: 'work',
  opensource: 'opensource',
  blog: 'blog',
  mail: 'mail',
  projects: 'projects',
};

let pinnedNavId = null;
let pinTimer = 0;

function scrollAnchorY() {
  const navH =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
    ) || 56;
  return navH + 12;
}

function applyActive(navKey) {
  if (!navKey) return;
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === navKey);
  });
}

export function pinNavSection(sectionId) {
  const navKey = SECTION_NAV_MAP[sectionId] ?? sectionId;
  pinnedNavId = navKey;
  applyActive(navKey);
  window.clearTimeout(pinTimer);
  pinTimer = window.setTimeout(() => {
    pinnedNavId = null;
  }, 1000);
}

export function syncActiveNavFromScroll(mainEl) {
  if (pinnedNavId) {
    applyActive(pinnedNavId);
    return;
  }

  const main = mainEl ?? document.querySelector('main.wrap');
  if (!main) return;

  const sections = [...main.querySelectorAll('section')].filter(
    (s) => SECTION_NAV_MAP[s.id],
  );
  if (!sections.length) return;

  const anchor = scrollAnchorY();
  let activeId = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= anchor) {
      activeId = section.id;
    }
  }

  applyActive(SECTION_NAV_MAP[activeId]);
}
