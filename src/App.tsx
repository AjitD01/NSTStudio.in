import React, { useState, useEffect } from 'react';
import { SceneCanvas } from './three/SceneCanvas';
import { ChapterOverlay } from './components/ChapterOverlay';
import { SectionIndicator } from './components/SectionIndicator';
import { scrollManager, TOTAL_CHAPTERS } from './state/scrollStore';
import { soundManager } from './audio/SoundManager';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [audioActive, setAudioActive] = useState<boolean>(false);

  useEffect(() => {
    // Subscribe to the 60fps virtual scroll progress
    const unsubscribe = scrollManager.subscribe((curr) => {
      setProgress(curr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleSound = () => {
    soundManager.toggle();
    setAudioActive(!audioActive);
  };

  const handleDotClick = (targetIndex: number) => {
    scrollManager.setTarget(targetIndex);
    soundManager.playWarp();
  };

  return (
    <main className="nst-app-container">
      {/* 1. Global Luxury Progress Ribbon */}
      <div
        className="top-progress-ribbon"
        style={{ width: `${(progress / (TOTAL_CHAPTERS - 1)) * 100}%` }}
      />

      {/* 2. Floating Luxury Header */}
      <header className="global-header">
        <div className="brand-lockup" onClick={() => handleDotClick(0)}>
          <span className="brand-logo">NST</span>
          <span className="brand-divider">/</span>
          <span className="brand-sub">STUDIO</span>
        </div>

        <nav className="header-actions">
          <button
            className={`btn-sound-toggle ${audioActive ? 'active' : ''}`}
            onClick={toggleSound}
            title="Toggle Audio Atmosphere"
          >
            <span className="sound-icon">{audioActive ? '✦ SOUND ON' : '◇ SOUND OFF'}</span>
          </button>

          <a
            href="https://www.instagram.com/nststudio.in"
            target="_blank"
            rel="noreferrer"
            className="header-link"
          >
            INSTAGRAM @NSTSTUDIO.IN
          </a>

          <button
            className="btn-commission-cta"
            onClick={() => handleDotClick(6)}
          >
            COMMISSION INQUIRY
          </button>
        </nav>
      </header>

      {/* 3. 3D WebGL Canvas Layer (Inward Depth Camera) */}
      <SceneCanvas />

      {/* 4. Foreground Chapter Narrative Overlay */}
      <ChapterOverlay progress={progress} />

      {/* 5. Cartier Vertical Dot Navigation */}
      <SectionIndicator
        scrollOffset={progress / (TOTAL_CHAPTERS - 1)}
        onSelectSection={handleDotClick}
      />
    </main>
  );
};

export default App;
