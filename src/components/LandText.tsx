import React from 'react';

/**
 * Splits a heading into letters that drop in and land on their place once the
 * heading (marked `data-reveal`) scrolls into view. Words never break mid-word.
 */
export const LandText: React.FC<{ text: string; start?: number }> = ({ text, start = 0 }) => {
  let i = start;
  const words = text.split(' ');
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="land" aria-hidden="true">
        {words.map((word, w) => (
          <React.Fragment key={w}>
            <span className="land__word">
              {[...word].map((ch) => {
                const n = i++;
                // deterministic tilt per letter so it looks hand-thrown, not mechanical
                const tilt = ((n * 37) % 23) - 11;
                return (
                  <span key={n} className="land__char" style={{ '--i': n, '--r': `${tilt}deg` } as React.CSSProperties}>
                    {ch}
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </span>
    </>
  );
};
