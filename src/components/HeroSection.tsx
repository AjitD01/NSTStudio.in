import React from 'react';
import { scrollManager } from '../state/scrollStore';

interface HeroSectionProps {
  onOpenDossier: (page?: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDossier }) => {
  return (
    <section id="hero-section" className="dzinr-hero-manifesto-section">
      {/* 1. Hero Upper Grid with DZINR Split Intro Kickers */}
      <div className="hero-top-kicker-strip">
        <div className="kicker-left-group">
          <p className="kicker-line-primary">
            Strategy, Direction, <br className="hidden sm:block" />
            Performance
          </p>
          <p className="kicker-line-secondary">
            We are a cinematic storytelling studio <br className="hidden sm:block" />
            that builds unforgettable brand legacies.
          </p>
        </div>

        <button
          className="kicker-scroll-down-btn"
          onClick={() => scrollManager.scrollToSection('manifesto-block')}
          aria-label="Scroll down to manifesto"
          title="Scroll Down"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="down-arrow-svg"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* 2. Hero Monumental Architectural Headline */}
      <div className="hero-monumental-stage">
        {/* Story First Badge */}
        <div className="story-first-kicker-badge">
          <span className="story-first-text">Story First</span>
          <svg
            className="story-first-swoosh"
            viewBox="0 0 120 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8.5C35 2.5 85 3 117 8.5"
              stroke="#FF2222"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="hero-monumental-title">
          <span className="title-row">New</span>
          <span className="title-row font-serif-accent">DESIGN</span>
          <span className="title-row">
            Era<span className="text-red-accent">.</span>
          </span>
        </h1>

        <p className="hero-manifesto-subtext">
          Nikunj Storytelling Studio (NST) merges cinematic film direction with
          uncompromising digital craft. Transforming daring visions into enduring cultural marks.
        </p>

        {/* Hero Quick Action Buttons */}
        <div className="hero-actions-row">
          <button
            className="hero-btn-primary"
            onClick={() => scrollManager.scrollToSection('projects-section')}
          >
            Explore Projects
            <span className="btn-arrow-icon">→</span>
          </button>

          <button
            className="hero-btn-secondary"
            onClick={() => onOpenDossier(1)}
          >
            Brand Dossier
            <span className="btn-badge-small">PDF</span>
          </button>
        </div>
      </div>

      {/* 3. DZINR-Style Editorial Manifesto Statement Block */}
      <div id="manifesto-block" className="dzinr-manifesto-block">
        {/* Pill Tag */}
        <div className="manifesto-pill-tag">
          <span className="manifesto-icon">[ ! ]</span>
          <span className="manifesto-tag-text">
            Be the story they never stop talking about
          </span>
        </div>

        {/* Giant Manifesto Statement */}
        <h2 className="manifesto-statement-text">
          <span className="manifesto-indent hidden lg:inline-block" />
          Storytelling in the digital era isn't static anymore. Today's brands need
          energy, emotion and meaning. We bring together cinematic film direction,
          architectural design and interactive craft to compose brand legacies that
          command attention, move fast and make people feel.
        </h2>

        {/* Dividing Line & Sub-Grid */}
        <div className="manifesto-split-footer">
          <div className="manifesto-footer-left">
            <p className="footer-headline-muted">
              Designing Iconic <br className="hidden sm:block" />
              Brand Legacies Daily.
            </p>
          </div>

          <div className="manifesto-footer-right">
            <p className="footer-description-muted">
              Your brand has a story waiting to be told. We make sure it's seen, felt and
              remembered across every screen and tactile medium. We design brand identities,
              direct cinema campaigns, and compose digital experiences that turn casual viewers
              into devoted advocates.
            </p>

            <button
              className="dzinr-learn-more-btn"
              onClick={() => onOpenDossier(1)}
            >
              <span className="btn-label-text">Explore Brand Atelier</span>
              <svg
                className="learn-more-arrow"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
