import React, { useState, useEffect } from 'react';
import { scrollManager } from '../state/scrollStore';

export const CharacterWalker: React.FC = () => {
  // Walking cycle frame 1 through 8
  const [frameIndex, setFrameIndex] = useState<number>(1);

  useEffect(() => {
    // 8 fps walk cycle animation
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev % 8) + 1);
    }, 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="prototype-walker-section">
      <div className="section-container walker-flex-container">
        {/* Walking Stick Character Animation from Prototype */}
        <div className="walker-character-box">
          <div className="walker-sprite-wrapper">
            <img
              src={`/nst/character/ch${frameIndex}_light.png`}
              alt="NST Walking Storyteller Character"
              className="walker-sprite-img"
            />
            <div className="walker-ground-shadow" />
          </div>
          <div className="walker-annotation-label">
            <span>Walking animation with text</span>
            <span className="annotation-arrow">←</span>
          </div>
        </div>

        {/* Prototype Monumental Question Headline */}
        <div className="walker-headline-content">
          <h2 className="walker-question-headline">
            Got a Project in Mind <span className="text-red-question">?</span>
          </h2>

          <p className="walker-subtext">
            Every story needs a place to begin. Let's sculpt your vision into an enduring legacy.
          </p>

          <button
            className="walker-cta-btn"
            onClick={() => scrollManager.scrollToSection('contact-section')}
          >
            <span>Begin your Story</span>
            <span className="btn-arrow-down">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};
