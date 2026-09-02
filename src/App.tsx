import React, { useState } from 'react';
import { SceneCanvas } from './three/SceneCanvas';
import { SectionIndicator } from './components/SectionIndicator';
import './index.css';

/**
 * App — Root Application component.
 * Couples WebGL Canvas scroll state to the DOM navigation indicators.
 */
export const App: React.FC = () => {
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  const handleDotClick = (targetPage: number) => {
    const container = document.querySelector('div[style*="overflow: hidden auto"]') as HTMLElement | null;
    if (container) {
      const maxScroll = container.scrollHeight - container.clientHeight;
      const target = (targetPage / 7) * maxScroll;
      container.scrollTo({ top: target, behavior: 'auto' });
    }
  };

  return (
    <>
      {/* Full-viewport 3D WebGL Canvas + 8 Synchronized Scroll Pages */}
      <SceneCanvas onScrollChange={setScrollOffset} />

      {/* Floating Luxury Navbar */}
      <nav className="overlay-navbar">
        <div className="navbar-brand">
          <span className="navbar-logo">NST</span>
          <span className="navbar-separator">/</span>
          <span className="navbar-tagline">Studio</span>
        </div>
        <div className="navbar-links">
          <a
            href="https://www.instagram.com/nststudio.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-link"
          >
            Instagram @nststudio.in
          </a>
          <span onClick={() => handleDotClick(6)} className="navbar-link navbar-contact">
            Commission Inquiry
          </span>
        </div>
      </nav>

      {/* Synchronized Cartier-Style Side Dots Navigation */}
      <SectionIndicator
        scrollOffset={scrollOffset}
        onSelectSection={handleDotClick}
      />
    </>
  );
};

export default App;
