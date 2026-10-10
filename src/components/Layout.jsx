import { useState } from 'react';
import { CommandPalette, useModKeyLabel } from './CommandPalette';
import { CursorGhost } from './CursorGhost';
import { Footer } from './Footer';
import { Nav } from './Nav';

export function Layout({ children }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  useModKeyLabel();

  return (
    <>
      <div className="site-bounds" aria-hidden="true" />
      <a className="skip" href="/">
        Skip to content
      </a>
      <div className="site-shell">
        <Nav onPaletteOpen={() => setPaletteOpen(true)} />
        {children}
        <Footer />
      </div>
      <CursorGhost />
      <CommandPalette
        open={paletteOpen}
        onOpen={() => setPaletteOpen(true)}
        onClose={() => setPaletteOpen(false)}
      />
    </>
  );
}
