import React, { useState, useEffect } from 'react';

interface LandingAnimationProps {
  onComplete?: () => void;
}

export const LandingAnimation: React.FC<LandingAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'enter' | 'reveal' | 'exit' | 'done'>('enter');

  useEffect(() => {
    // 1. Reveal "Story First." mark with gentle scale & glow
    const t1 = setTimeout(() => {
      setPhase('reveal');
    }, 120);

    // 2. Begin curtain lift / opening transition
    const t2 = setTimeout(() => {
      setPhase('exit');
    }, 1900);

    // 3. Mark complete & unmount
    const t3 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <aside
      className={`nst-opening-curtain ${phase === 'exit' ? 'curtain-exit' : ''}`}
      aria-label="Loading NST Studio"
      aria-live="polite"
      aria-busy={phase === 'enter' || phase === 'reveal'}
    >
      <div className="opening-curtain-inner">
        {/* Prototype: "Story First." with red brush swoosh and red dot */}
        <div className={`opening-tag-mark ${phase === 'reveal' ? 'mark-visible' : ''}`}>
          <div className="story-first-hero-title">
            <span>Story First</span>
            <span className="story-first-dot">.</span>
          </div>

          <div className="story-first-brush-wrapper">
            <svg
              className="story-first-brush-svg"
              viewBox="0 0 240 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 14C60 6 180 6 236 14"
                stroke="#FF2222"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="opening-subtitle-studio">
            NIKUNJ STORYTELLING STUDIO
          </div>
        </div>
      </div>
    </aside>
  );
};
