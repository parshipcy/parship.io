import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CONFIG } from '../data/content';
import { Icon } from './Icon';
import { reduced } from '../utils/motion';
import { goToHomeSection } from '../utils/homeSectionNav';

function buildCommands(navigate, pathname, search) {
  const go = (id) => () => goToHomeSection(navigate, pathname, search, id);
  const social = (id) => {
    const s = CONFIG.socials.find((x) => x.id === id);
    return s
      ? () =>
          window.open(
            s.url,
            s.url.startsWith('http') ? '_blank' : '_self',
            'noopener',
          )
      : null;
  };
  return [
    { label: 'Home', icon: 'home', group: 'navigate', run: go('home') },
    { label: 'Work', icon: 'link', group: 'navigate', run: go('work') },
    {
      label: 'Open Source',
      icon: 'github',
      group: 'navigate',
      run: go('opensource'),
    },
    { label: 'Projects', icon: 'link', group: 'navigate', run: go('projects') },
    { label: 'Blog', icon: 'link', group: 'navigate', run: go('blog') },
    { label: 'Mail', icon: 'mail', group: 'navigate', run: go('mail') },
    {
      label: 'GitHub',
      icon: 'github',
      group: 'connect',
      run: social('github'),
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      group: 'connect',
      run: social('linkedin'),
    },
    {
      label: 'Discord',
      icon: 'discord',
      group: 'connect',
      run: social('discord'),
    },
  ].filter((c) => c.run);
}

export function CommandPalette({ open, onOpen, onClose }) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const CMDS = useMemo(
    () => buildCommands(navigate, pathname, search),
    [navigate, pathname, search],
  );
  const inputRef = useRef(null);
  const lastFocusRef = useRef(null);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);

  const q = query.trim().toLowerCase();
  const shown = CMDS.filter((c) => c.label.toLowerCase().includes(q));
  const safeSel = Math.min(sel, Math.max(shown.length - 1, 0));

  const closePalette = useCallback(() => {
    setShow(false);
    setTimeout(
      () => {
        onClose();
        lastFocusRef.current?.focus?.({ preventScroll: true });
      },
      reduced ? 0 : 200,
    );
  }, [onClose]);

  const run = useCallback(
    (i) => {
      const c = shown[i];
      if (!c) return;
      closePalette();
      setTimeout(c.run, 60);
    },
    [shown, closePalette],
  );

  useEffect(() => {
    if (!open) {
      setShow(false);
      return;
    }
    lastFocusRef.current = document.activeElement;
    setQuery('');
    setSel(0);
    requestAnimationFrame(() => {
      setShow(true);
      inputRef.current?.focus();
    });
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) closePalette();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closePalette]);

  usePaletteShortcut(open, onOpen, closePalette);

  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => (s + 1) % Math.max(shown.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => (s - 1 + shown.length) % Math.max(shown.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(safeSel);
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`pal${show ? ' show' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closePalette();
      }}
    >
      <div className="pal-box">
        <input
          id="pal-input"
          ref={inputRef}
          type="text"
          placeholder="Type a command or search…"
          autoComplete="off"
          aria-label="Search commands"
          aria-controls="pal-list"
          role="combobox"
          aria-expanded="true"
          aria-activedescendant={shown.length ? `opt-${safeSel}` : ''}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSel(0);
          }}
          onKeyDown={onInputKeyDown}
        />
        <ul
          id="pal-list"
          role="listbox"
          onClick={(e) => {
            const li = e.target.closest('[data-i]');
            if (li) run(+li.dataset.i);
          }}
          onMouseMove={(e) => {
            const li = e.target.closest('[data-i]');
            if (li && +li.dataset.i !== safeSel) setSel(+li.dataset.i);
          }}
        >
          {shown.length ? (
            shown.map((c, i) => (
              <li
                key={c.label}
                role="option"
                id={`opt-${i}`}
                data-i={i}
                aria-selected={i === safeSel}
              >
                <Icon name={c.icon} />
                <span>{c.label}</span>
                <span
                  className={`grp${c.group === 'navigate' ? ' grp-icon' : ''}`}
                  title={c.group === 'navigate' ? 'Navigate' : 'Connect'}
                  aria-label={c.group === 'navigate' ? 'Navigate' : 'Connect'}
                >
                  {c.group === 'navigate' ? (
                    <Icon name="navigate" />
                  ) : (
                    'Connect'
                  )}
                </span>
              </li>
            ))
          ) : (
            <li className="none">No matching commands</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export function usePaletteShortcut(open, onOpen, closePalette) {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) closePalette();
        else onOpen();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpen, closePalette]);
}

export function useModKeyLabel() {
  useEffect(() => {
    const modKey = document.getElementById('mod-key');
    if (modKey && /Mac|iPhone|iPad/.test(navigator.platform)) {
      modKey.textContent = '⌘';
    }
  }, []);
}
