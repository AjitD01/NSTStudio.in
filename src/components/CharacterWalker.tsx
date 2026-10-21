import React, { useState, useEffect } from 'react';
import { scrollManager } from '../state/scrollStore';

// Upright storyteller poses only: the full set also includes lying, seated and
// meditating poses, which read as glitches when cycled as a walk.
const WALK_POSES = [1, 3, 4, 2];

export const CharacterWalker: React.FC = () => {
  const [poseIndex, setPoseIndex] = useState<number>(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const interval = setInterval(() => {
      setPoseIndex((prev) => (prev + 1) % WALK_POSES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="prototype-walker-section">
      <div className="section-container walker-flex-container">
        {/* Walking Stick Character Animation from Prototype */}
        <div className="walker-character-box">
          <div className="walker-sprite-wrapper is-walking">
            {WALK_POSES.map((pose, i) => (
              <img
                key={pose}
                src={`/nst/character/ch${pose}_light.png`}
                alt={i === 0 ? 'NST storyteller character' : ''}
                aria-hidden={i === 0 ? undefined : true}
                className={`walker-sprite-img ${i === poseIndex ? 'is-active' : ''}`}
              />
            ))}
            <div className="walker-ground-shadow" />
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
