import React, { useState, useEffect } from 'react';
import { SceneCanvas } from './three/SceneCanvas';
import { ChapterOverlay } from './components/ChapterOverlay';
import { SectionIndicator } from './components/SectionIndicator';
import { BrandDossierModal } from './components/BrandDossierModal';
import { GuideCompanion } from './components/GuideCompanion';
import { scrollManager, TOTAL_CHAPTERS } from './state/scrollStore';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [dossierPage, setDossierPage] = useState<number>(1);

  useEffect(() => {
    // Subscribe to the 60fps virtual scroll progress
    const unsubscribe = scrollManager.subscribe((curr) => {
      setProgress(curr);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleDotClick = (targetIndex: number) => {
    scrollManager.setTarget(targetIndex);
  };

  const handleOpenDossier = (page: number = 1) => {
    setDossierPage(page);
    setIsDossierOpen(true);
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
            className="header-btn-dossier"
            onClick={() => handleOpenDossier(1)}
            title="Open Holy Grail Brand Specification"
          >
            BRAND DOSSIER 📖
          </button>

          <a
            href="https://www.instagram.com/nststudio.in"
            target="_blank"
            rel="noreferrer"
            className="header-link"
          >
            @NSTSTUDIO.IN
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
      <ChapterOverlay
        progress={progress}
        onOpenDossier={handleOpenDossier}
      />

      {/* 5. Interactive Character Guide Companion Badge */}
      <GuideCompanion progress={progress} />

      {/* 6. Cartier Vertical Dot Navigation */}
      <SectionIndicator
        scrollOffset={progress / (TOTAL_CHAPTERS - 1)}
        onSelectSection={handleDotClick}
      />

      {/* 6. High-Res Holy Grail Brand Dossier Modal */}
      <BrandDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        initialPage={dossierPage}
      />
    </main>
  );
};

export default App;
