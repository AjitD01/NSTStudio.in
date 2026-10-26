import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useInView';

type Phase = 'text' | 'swoosh' | 'crack' | 'exit' | 'done';

const Tag: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <div className="opening__stage" aria-hidden={hidden}>
    <div className="opening__tag">
      <img className="opening__text" src="/proto/tag-text.png" alt={hidden ? '' : 'Story First.'} />
      <img className="opening__swoosh" src="/proto/tag-swoosh.png" alt="" />
    </div>
  </div>
);

/**
 * Prototype "Page opening animation": "Story First." appears, the red swoosh is drawn,
 * a red hairline cracks across the middle and the screen breaks apart top and bottom.
 * Both halves render the same tag, each clipped to its half, so the split runs through it.
 */
export const OpeningAnimation: React.FC = () => {
  const [phase, setPhase] = useState<Phase>(() => (prefersReducedMotion() ? 'done' : 'text'));

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    document.body.style.overflow = 'hidden';
    const timers = [
      setTimeout(() => setPhase('swoosh'), 900),
      setTimeout(() => setPhase('crack'), 2000),
      setTimeout(() => setPhase('exit'), 2450),
      setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = '';
      }, 3500),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`opening opening--${phase}`} role="status" aria-label="Loading NST Studio">
      <div className="opening__half opening__half--top">
        <Tag />
      </div>
      <div className="opening__half opening__half--bottom">
        <Tag hidden />
      </div>
      <span className="opening__crack" aria-hidden="true" />
    </div>
  );
};
