import React from 'react';
import { scrollManager } from '../state/scrollStore';

export const MidPageAnchor: React.FC = () => {
  return (
    <section className="blueprint-midpage-anchor">
      <div className="anchor-container">
        {/* Studio Architectural Monogram Emblem Seal */}
        <div className="anchor-character-wrapper">
          <div className="anchor-emblem-seal">
            <span className="emblem-text">NST</span>
            <span className="emblem-reg">®</span>
          </div>
          <div className="anchor-glow-halo" />
        </div>

        {/* Monumental Headline with Red Question Mark */}
        <h2 className="anchor-headline">
          Got a Project in Mind <span className="text-red-question">?</span>
        </h2>

        <p className="anchor-subtext">
          Let’s compose something extraordinary together. From private consultations
          to full-scale creative production, your story starts here.
        </p>

        <button
          className="anchor-cta-btn"
          onClick={() => scrollManager.scrollToSection('contact-section')}
        >
          Begin your Story ↓
        </button>
      </div>
    </section>
  );
};
