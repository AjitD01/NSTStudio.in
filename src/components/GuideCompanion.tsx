import React from 'react';
import { useGuideStore, CHAPTER_GUIDE_INSIGHTS } from '../state/guideStore';

interface GuideCompanionProps {
  progress: number;
}

export const GuideCompanion: React.FC<GuideCompanionProps> = ({ progress }) => {
  const { isOpen, toggleOpen, triggerPulse } = useGuideStore();

  const chapterIndex = Math.max(0, Math.min(7, Math.round(progress)));
  const currentInsight = CHAPTER_GUIDE_INSIGHTS[chapterIndex] || CHAPTER_GUIDE_INSIGHTS[0];

  return (
    <aside
      className={`guide-companion-dock ${isOpen ? 'is-open' : 'is-collapsed'}`}
      aria-label="Character Guide Companion"
    >
      {isOpen ? (
        <div className="guide-card" onClick={triggerPulse}>
          <div className="guide-header">
            <div className="guide-avatar-badge">
              <span className="guide-avatar-indicator" />
              <img
                src={`/brand/character/pose_${chapterIndex}.png`}
                alt="Guide Avatar"
                className="guide-avatar-img"
              />
            </div>
            <div className="guide-meta">
              <span className="guide-kicker">COMPANION INSIGHT</span>
              <span className="guide-chapter-title">{currentInsight.title}</span>
            </div>
            <button
              className="guide-collapse-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleOpen();
              }}
              title="Minimize guide insight"
              aria-label="Minimize guide"
            >
              &minus;
            </button>
          </div>

          <p className="guide-speech">"{currentInsight.speech}"</p>
          <span className="guide-subtext">{currentInsight.subtext}</span>
        </div>
      ) : (
        <button
          className="guide-pill-btn"
          onClick={toggleOpen}
          title="Open character guide insight"
          aria-label="Open character guide"
        >
          <span className="guide-avatar-indicator" />
          <img
            src={`/brand/character/pose_${chapterIndex}.png`}
            alt="Guide"
            className="guide-pill-icon"
          />
          <span className="guide-pill-text">Guide Insight</span>
        </button>
      )}
    </aside>
  );
};
