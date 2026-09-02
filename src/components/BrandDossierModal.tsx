import React, { useState, useEffect } from 'react';
import { BRAND_PAGES_LIST, BRAND_MANIFESTO } from '../data/brandGuideData';

interface BrandDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}

export const BrandDossierModal: React.FC<BrandDossierModalProps> = ({
  isOpen,
  onClose,
  initialPage = 1,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    if (initialPage) {
      const idx = BRAND_PAGES_LIST.findIndex((p) => p.page === initialPage);
      if (idx !== -1) setCurrentPageIndex(idx);
    }
  }, [initialPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPageIndex]);

  if (!isOpen) return null;

  const currentItem = BRAND_PAGES_LIST[currentPageIndex];

  const handlePrev = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : BRAND_PAGES_LIST.length - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev < BRAND_PAGES_LIST.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="dossier-modal-backdrop" onClick={onClose}>
      <div className="dossier-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="dossier-header">
          <div className="dossier-header-brand">
            <span className="dossier-tag">OFFICIAL BRAND SPECIFICATION</span>
            <h2 className="dossier-title">NST BRAND GUIDELINE · MARCH 2026</h2>
            <span className="dossier-subtitle">{BRAND_MANIFESTO.fullName} · {BRAND_MANIFESTO.tagline}</span>
          </div>

          <div className="dossier-controls">
            <span className="dossier-counter">
              PLATE {String(currentPageIndex + 1).padStart(2, '0')} / {String(BRAND_PAGES_LIST.length).padStart(2, '0')}
            </span>
            <button className="btn-dossier-close" onClick={onClose} title="Close Dossier (ESC)">
              ✕
            </button>
          </div>
        </div>

        {/* Main Viewing Canvas */}
        <div className="dossier-stage">
          <button className="btn-dossier-nav prev" onClick={handlePrev} title="Previous Plate">
            ‹
          </button>

          <div className="dossier-image-wrapper">
            <img
              src={currentItem.file}
              alt={currentItem.title}
              className="dossier-image-render"
            />
            <div className="dossier-caption-overlay">
              <span className="plate-num">PAGE {currentItem.page}</span>
              <span className="plate-title">{currentItem.title}</span>
            </div>
          </div>

          <button className="btn-dossier-nav next" onClick={handleNext} title="Next Plate">
            ›
          </button>
        </div>

        {/* Bottom Thumbnail Filmstrip */}
        <div className="dossier-filmstrip">
          {BRAND_PAGES_LIST.map((item, idx) => (
            <button
              key={item.page}
              className={`filmstrip-thumb ${idx === currentPageIndex ? 'active' : ''}`}
              onClick={() => setCurrentPageIndex(idx)}
              title={`Page ${item.page}: ${item.title}`}
            >
              <img src={item.file} alt={item.title} />
              <span className="thumb-label">P.{item.page}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
