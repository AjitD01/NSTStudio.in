import React from 'react';
import { scrollManager } from '../state/scrollStore';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="prototype-about-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag-kicker">THE NIKUNJ MANIFESTO</div>
          <h2 className="section-title-large">
            About NST<span className="text-red-accent">.</span>
          </h2>
          <p className="section-intro-text">
            NST — Nikunj Storytelling Studio — is built around one uncompromising belief:
            <span className="text-white font-bold"> Story First.</span>
          </p>
        </div>

        {/* Dual-Column Editorial Narrative Grid */}
        <div className="about-editorial-grid">
          {/* Left Column: What is the Story? */}
          <div className="about-card-narrative">
            <div className="narrative-kicker-row">
              <span className="narrative-num">01</span>
              <span className="narrative-label">CORE PHILOSOPHY</span>
            </div>

            <h3 className="about-manifesto-heading">
              We work across branding, film, animation, and creative storytelling — but the medium is never where we begin.
            </h3>

            <div className="about-question-callout">
              <div className="callout-prompt">We begin with a question:</div>
              <div className="callout-main-question">
                What is the story<span className="text-red-accent">?</span>
              </div>
            </div>

            <div className="story-dimensions-list">
              <div className="dimension-item">
                <span className="dimension-bullet">✦</span>
                <span>The reason a brand exists.</span>
              </div>
              <div className="dimension-item">
                <span className="dimension-bullet">✦</span>
                <span>The thought behind an idea.</span>
              </div>
              <div className="dimension-item">
                <span className="dimension-bullet">✦</span>
                <span>The memory that shaped a business.</span>
              </div>
              <div className="dimension-item">
                <span className="dimension-bullet">✦</span>
                <span>The feeling people should carry with them.</span>
              </div>
            </div>

            <p className="narrative-body-text">
              We uncover that story, give it direction, and then build the visual and verbal world around it.
            </p>

            <div className="narrative-distinction-box">
              <div className="distinction-row">
                <span className="distinction-prefix">Design</span> can make something noticed.
              </div>
              <div className="distinction-row distinction-highlight">
                <span className="distinction-prefix">Meaning</span> is what makes it remembered.
              </div>
            </div>

            <p className="narrative-conclusion-text">
              NST exists to create work that is not only seen, but felt, understood, and remembered.
            </p>
          </div>

          {/* Right Column: The Story Behind Nikunj (Sanskrit Sacred Grove) */}
          <div className="about-card-grove">
            <div className="narrative-kicker-row">
              <span className="narrative-num">02</span>
              <span className="narrative-label">THE STORY BEHIND NST</span>
            </div>

            <div className="grove-origin-badge">
              <span className="grove-sanskrit-tag">निकुञ्ज · NIKUNJ</span>
              <span className="grove-translation">A sacred, quiet grove</span>
            </div>

            <h3 className="about-grove-heading">
              Every story needs a place to begin. For us, that place is Nikunj.
            </h3>

            <p className="narrative-body-text">
              The word comes from Sanskrit, meaning a <em>grove</em> — a quiet, meaningful space where beauty,
              imagination, and connection can exist together.
            </p>

            <p className="narrative-body-text">
              That idea became the foundation of NST. We see the studio as a creative space where ideas are
              not rushed into visuals. They are first understood, questioned, and shaped.
            </p>

            <div className="india-tradition-quote-card">
              <div className="tradition-icon">🪷</div>
              <p className="tradition-quote">
                “Our inspiration comes from India's rich tradition of storytelling — stories that have travelled
                through generations carrying emotion, imagination, wisdom, and meaning. NST brings that spirit into the contemporary world.”
              </p>
            </div>

            <div className="trinity-comparison-grid">
              <div className="trinity-item">
                <span className="trinity-subject">A Brand</span>
                <span className="trinity-feature">can have a logo.</span>
              </div>
              <div className="trinity-item">
                <span className="trinity-subject">A Film</span>
                <span className="trinity-feature">can have beautiful frames.</span>
              </div>
              <div className="trinity-item">
                <span className="trinity-subject">An Animation</span>
                <span className="trinity-feature">can have movement.</span>
              </div>
            </div>

            <div className="grove-final-punchline">
              But behind all of them, there should be <strong>something worth telling.</strong>
              <br />
              That is where NST begins.
            </div>

            <div className="about-actions-row">
              <a
                href="https://www.facebook.com/share/1HAfkeHAq5/"
                target="_blank"
                rel="noreferrer"
                className="about-facebook-cta-btn"
                title="Follow NST on Facebook"
              >
                <span className="fb-icon">f</span>
                <span>Follow NST on Facebook ↗</span>
              </a>

              <button
                className="about-contact-btn"
                onClick={() => scrollManager.scrollToSection('contact-section')}
              >
                Begin your Story →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
