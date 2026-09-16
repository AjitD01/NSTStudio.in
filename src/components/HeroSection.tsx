import React from 'react';
import { scrollManager } from '../state/scrollStore';

interface HeroSectionProps {
  onOpenDossier: (page?: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDossier }) => {
  return (
    <section id="hero-section" className="prototype-hero-section">
      {/* Background Ambience & Spotlight Layer */}
      <div className="hero-spotlight-backdrop">
        <div className="spotlight-cone-glow" />
      </div>

      <div className="hero-grid-container">
        {/* Left Monumental Typography & CTA */}
        <div className="hero-left-column">
          <div className="hero-story-tagline">
            <span className="story-pill-text">Story First</span>
            <span className="story-pill-dot" />
          </div>

          <h1 className="hero-monumental-headline">
            <span className="headline-line line-regular">New</span>
            <span className="headline-line line-bold">DESIGN</span>
            <span className="headline-line line-regular">
              Era<span className="text-red-accent">.</span>
            </span>
          </h1>

          <p className="hero-studio-description">
            Nikunj Storytelling Studio — where design begins with a question.
            Transforming brand meaning into enduring visual worlds.
          </p>

          {/* Prototype Red 'let's Connect ->' Button */}
          <div className="hero-cta-wrapper">
            <button
              className="prototype-lets-connect-btn"
              onClick={() => scrollManager.scrollToSection('contact-section')}
            >
              <span>let's Connect</span>
              <span className="lets-connect-arrow">↗</span>
            </button>

            <button
              className="hero-dossier-link-btn"
              onClick={() => onOpenDossier(1)}
            >
              Holy Grail Dossier 📖
            </button>
          </div>
        </div>

        {/* Center: "Floating character appearing" in Spotlight Beam */}
        <div className="hero-center-spotlight-column">
          <div className="spotlight-beam-visual">
            <div className="beam-cone" />
            <div className="beam-glow-pool" />

            {/* Levitating Floating Character from Prototype */}
            <div className="hero-floating-character-wrapper">
              <img
                src="/nst/character/ch1.png"
                alt="NST Studio Stylized Storyteller Character"
                className="hero-floating-character-img"
              />
              <div className="character-aura-glow" />
            </div>

            <div className="floating-indicator-label">
              <span>Floating character</span>
              <span className="label-arrow">→</span>
            </div>
          </div>
        </div>

        {/* Right / Left Floating Editorial Cards from Prototype */}
        <div className="hero-right-column">
          {/* Right Floating Card: Scarlet Design Studio Reference */}
          <div className="floating-scarlet-card">
            <div className="scarlet-header">
              <span className="scarlet-tag">2026 · ATELIER</span>
              <span className="scarlet-badge">Featured System</span>
            </div>
            <div className="scarlet-content">
              <div className="scarlet-title">Scarlet Design Studio®</div>
              <p className="scarlet-quote">“We blend creativity with precision”</p>
              <div className="scarlet-footer">
                <button
                  className="scarlet-link-btn"
                  onClick={() => scrollManager.scrollToSection('about-section')}
                >
                  About us →
                </button>
                <span className="scarlet-sub">Bespoke Production</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Editorial Blog Pill Card on Left (Matching Prototype "Blog.") */}
      <div className="hero-floating-blog-card">
        <div className="blog-card-header">
          <span className="blog-card-heading">Blog<span className="text-red-accent">.</span></span>
          <span className="blog-card-ref-tag">EDITORIAL</span>
        </div>

        <div className="blog-card-articles">
          <div
            className="blog-article-mini"
            onClick={() => onOpenDossier(6)}
          >
            <div className="article-mini-thumb thumb-1" />
            <div className="article-mini-text">
              <span className="mini-title">How to build a visual identity that stands out</span>
              <span className="mini-read">Read Article ↗</span>
            </div>
          </div>

          <div
            className="blog-article-mini"
            onClick={() => onOpenDossier(14)}
          >
            <div className="article-mini-thumb thumb-2" />
            <div className="article-mini-text">
              <span className="mini-title">How to stay relevant in a fast-changing digital world</span>
              <span className="mini-read">Read Article ↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
