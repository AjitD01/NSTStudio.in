import React, { useState, useEffect } from 'react';

interface LandingAnimationProps {
  onComplete?: () => void;
}

export const LandingAnimation: React.FC<LandingAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'enter' | 'reveal' | 'exit' | 'done'>('enter');
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // 1. Reveal letters quickly
    const t1 = setTimeout(() => {
      setPhase('reveal');
    }, 100);

    // 2. Smooth 0 to 100 numeric flow counter
    const startTime = performance.now();
    const duration = 1200; // 1.2s to reach 100

    let animationFrameId: number;
    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic out ease for counter
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(eased * 100);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
      }
    };
    animationFrameId = requestAnimationFrame(updateCounter);

    // 3. Start curtain upward wipe after counter hits 100 and logo is locked
    const t2 = setTimeout(() => {
      setPhase('exit');
    }, 1650);

    // 4. Mark completed and remove from DOM
    const t3 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2500);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <aside
      className={`lyniq-landing-curtain ${phase === 'exit' ? 'curtain-exit' : ''}`}
      aria-label="Loading NST Studio"
      aria-live="polite"
      aria-busy={phase === 'enter' || phase === 'reveal'}
    >
      {/* Top Bar Indicator (DZINR Style) */}
      <div className="curtain-top-bar">
        <span className="curtain-studio-code">NST® // ARCHIVE 2025</span>
        <span className="curtain-status-pill">INITIATING STUDIO</span>
      </div>

      {/* Center Kinetic Typography */}
      <div className="curtain-content">
        <div className="kinetic-logo-row">
          <div className="letter-mask">
            <span className="kinetic-letter letter-1">N</span>
          </div>
          <div className="letter-mask">
            <span className="kinetic-letter letter-2">S</span>
          </div>
          <div className="letter-mask">
            <span className="kinetic-letter letter-3">T</span>
          </div>
          <div className="letter-mask">
            <span className="kinetic-reg">®</span>
          </div>
        </div>

        <div className="kinetic-tagline">
          <span>CINEMATIC STORY STUDIO</span>
        </div>
      </div>

      {/* Bottom DZINR-Style Numeric Flow Counter (00 - 100) */}
      <div className="curtain-bottom-bar">
        <div className="curtain-counter-box">
          <span className="curtain-counter-number">
            {count < 10 ? `0${count}` : count}
          </span>
          <span className="curtain-counter-unit">%</span>
        </div>

        <div className="curtain-meta-info">
          <span className="curtain-meta-line">STRATEGY • DIRECTION • CRAFT</span>
          <span className="curtain-meta-sub">WORLDWIDE BESPOKE COMMISSIONS</span>
        </div>
      </div>
    </aside>
  );
};
