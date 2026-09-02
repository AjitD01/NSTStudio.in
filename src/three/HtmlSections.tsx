import React, { useState } from 'react';

/**
 * HtmlSections — The 8 luxury editorial sections rendered inside Drei's <Scroll html>.
 * Each section occupies exactly 100vh, ensuring natural scroll rhythm, ZERO overlap on landing,
 * and seamless coordination with the 3D camera in the background.
 */

export const HtmlSections: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    universe: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="html-scroll-wrapper" style={{ width: '100vw', pointerEvents: 'none' }}>
      
      {/* 01. PROLOGUE / HERO SECTION (0vh) */}
      <section className="scroll-page hero-page" style={{ top: '0vh' }}>
        <div className="page-inner hero-inner">
          <div className="hero-eyebrow">
            <span className="accent-dot" />
            Nikunj Storytelling Studio · Est. 2024
          </div>
          
          <h1 className="hero-title">
            <span className="hero-title-main">NST</span>
            <span className="hero-title-sub">Studio</span>
          </h1>

          <div className="hero-divider">
            <span className="divider-line" />
            <span className="divider-diamond">◆</span>
            <span className="divider-line" />
          </div>

          <p className="hero-tagline">
            StoryFirst. Every powerful idea begins with a story.<br />
            Transforming businesses into memorable brands.
          </p>

          <div className="hero-disciplines">
            <span>Branding</span>
            <span className="bullet">/</span>
            <span>Film</span>
            <span className="bullet">/</span>
            <span>Animation</span>
            <span className="bullet">/</span>
            <span>Learning</span>
          </div>

          <div className="hero-scroll-cue">
            <span className="cue-text">Scroll to explore</span>
            <div className="cue-line" />
          </div>
        </div>
      </section>

      {/* 02. THE FOUR UNIVERSES (100vh) */}
      <section className="scroll-page universes-page" style={{ top: '100vh' }}>
        <div className="page-inner">
          <div className="section-header">
            <div className="section-eyebrow">01 / Our Disciplines</div>
            <h2 className="section-title">The Four Universes</h2>
            <p className="section-desc">
              Four specialized realms of craft, harmonized under one narrative vision.
            </p>
          </div>

          <div className="universes-grid">
            <div className="universe-card" style={{ pointerEvents: 'auto' }}>
              <div className="card-top">
                <span className="card-num">01</span>
                <span className="card-glyph">◆</span>
              </div>
              <h3 className="card-title">Branding</h3>
              <p className="card-desc">
                Identity systems, semiotic lore, and timeless brand tokens that speak before you say a word.
              </p>
              <div className="card-badge">Identity & Vision</div>
            </div>

            <div className="universe-card" style={{ pointerEvents: 'auto' }}>
              <div className="card-top">
                <span className="card-num">02</span>
                <span className="card-glyph">▶</span>
              </div>
              <h3 className="card-title">Film</h3>
              <p className="card-desc">
                Cinematic brand films, documentary narratives, and evocative human stories captured on motion film.
              </p>
              <div className="card-badge">Cinematography</div>
            </div>

            <div className="universe-card" style={{ pointerEvents: 'auto' }}>
              <div className="card-top">
                <span className="card-num">03</span>
                <span className="card-glyph">◎</span>
              </div>
              <h3 className="card-title">Animation</h3>
              <p className="card-desc">
                Frame-by-frame 2D & 3D character motion that breathes spirit, vitality, and whimsy into abstract ideas.
              </p>
              <div className="card-badge">Kinetic Expression</div>
            </div>

            <div className="universe-card" style={{ pointerEvents: 'auto' }}>
              <div className="card-top">
                <span className="card-num">04</span>
                <span className="card-glyph">◇</span>
              </div>
              <h3 className="card-title">Learning</h3>
              <p className="card-desc">
                Masterclasses, design systems workshops, and visual storytelling pedagogy empowering the next generation.
              </p>
              <div className="card-badge">Pedagogy & Guild</div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. THE SACRED THREAD (200vh) */}
      <section className="scroll-page thread-page" style={{ top: '200vh' }}>
        <div className="page-inner">
          <div className="section-header">
            <div className="section-eyebrow">02 / Narrative Philosophy</div>
            <h2 className="section-title">The Sacred Thread</h2>
            <p className="section-desc">
              "The thread that holds our story together" — An unbroken bond between truth and form.
            </p>
          </div>

          <div className="thread-manifesto-container" style={{ pointerEvents: 'auto' }}>
            <div className="thread-beat">
              <span className="beat-index">01</span>
              <h4 className="beat-title">Root In Truth</h4>
              <p className="beat-text">
                Every business possesses a core emotional truth. We unearth it through relentless research.
              </p>
            </div>
            <div className="thread-beat">
              <span className="beat-index">02</span>
              <h4 className="beat-title">Weave The Form</h4>
              <p className="beat-text">
                Typography, color science, and symbols tailored as bespoke garments for the idea.
              </p>
            </div>
            <div className="thread-beat">
              <span className="beat-index">03</span>
              <h4 className="beat-title">The Unbroken Bond</h4>
              <p className="beat-text">
                Like the sacred Rakhi, our creative bond with clients and audiences endures across time.
              </p>
            </div>
            <div className="thread-beat">
              <span className="beat-index">04</span>
              <h4 className="beat-title">Enduring Legacy</h4>
              <p className="beat-text">
                Crafted not for quarterly hype cycles, but for decades of cultural staying power.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04. SAVOIR-FAIRE ATELIER (300vh) */}
      <section className="scroll-page atelier-page" style={{ top: '300vh' }}>
        <div className="page-inner">
          <div className="section-header">
            <div className="section-eyebrow">03 / Savoir-Faire</div>
            <h2 className="section-title">The Craft Atelier</h2>
            <p className="section-desc">
              Precision typography, harmonious scales, and the unmistakable Rose Hot signature.
            </p>
          </div>

          <div className="atelier-showcase" style={{ pointerEvents: 'auto' }}>
            <div className="type-specimen-card">
              <div className="specimen-tag">Primary Sans</div>
              <div className="specimen-display font-satoshi">Satoshi Geometric</div>
              <p className="specimen-desc">
                Clean, architectural, authoritative. For contemporary brand headlines and interfaces.
              </p>
            </div>

            <div className="type-specimen-card">
              <div className="specimen-tag">Typewriter Heritage</div>
              <div className="specimen-display font-courier">Courier Prime</div>
              <p className="specimen-desc">
                The authentic scriptwriter's voice. Honest, rhythmic, literary precision.
              </p>
            </div>

            <div className="type-specimen-card rose-hot-card">
              <div className="specimen-tag">Signature Chromatic</div>
              <div className="specimen-display font-clash rose-hot-text">Rose Hot</div>
              <p className="specimen-desc">
                A rich fusion of Crimson Passion (#C8102E) and Ethereal Rose (#FF6B9D).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05. CURATED EXHIBITION (400vh) */}
      <section className="scroll-page gallery-page" style={{ top: '400vh' }}>
        <div className="page-inner">
          <div className="section-header">
            <div className="section-eyebrow">04 / Portfolio</div>
            <h2 className="section-title">Selected Commissions</h2>
            <p className="section-desc">
              Highlights from the studio archive, translating deep lore into tactile artifacts.
            </p>
          </div>

          <div className="gallery-grid" style={{ pointerEvents: 'auto' }}>
            <div className="gallery-card">
              <div className="card-kicker">Identity System</div>
              <h4>SafeHold Brand Identity</h4>
              <p>Security and warmth unified into a protective modern monogram.</p>
            </div>
            <div className="gallery-card">
              <div className="card-kicker">Editorial Film</div>
              <h4>Raksha Bandhan Heritage</h4>
              <p>A cinematic celebration of the thread that binds families together.</p>
            </div>
            <div className="gallery-card">
              <div className="card-kicker">Color Study</div>
              <h4>Rose Hot Chromatic</h4>
              <p>Exploring emotional intensity through fluid gradient dynamics.</p>
            </div>
            <div className="gallery-card">
              <div className="card-kicker">Typography Poster</div>
              <h4>Courier Prime Red Ink</h4>
              <p>Homage to manual screenwriting and the tactile intimacy of letters.</p>
            </div>
            <div className="gallery-card">
              <div className="card-kicker">Character Design</div>
              <h4>The Storyteller Mascot</h4>
              <p>Geometric Krishna figure with flute and film reel medallion.</p>
            </div>
            <div className="gallery-card">
              <div className="card-kicker">Semiotics</div>
              <h4>"Simple Until You Realize"</h4>
              <p>The philosophical reduction of complexity into timeless elegance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06. LIVING ARCHIVE / INSTAGRAM (500vh) */}
      <section className="scroll-page archive-page" style={{ top: '500vh' }}>
        <div className="page-inner">
          <div className="section-header">
            <div className="section-eyebrow">05 / Social Archive</div>
            <h2 className="section-title">@nststudio.in</h2>
            <p className="section-desc">
              Real-time dispatches, behind-the-scenes sketches, and studio experiments.
            </p>
          </div>

          <div className="archive-stats" style={{ pointerEvents: 'auto' }}>
            <div className="stat-pill">21 Studio Posts</div>
            <div className="stat-pill">11 Craft Followers</div>
            <div className="stat-pill">Daily Narrative Studio</div>
          </div>

          <div className="instagram-grid" style={{ pointerEvents: 'auto' }}>
            {['The Thread', 'SafeHold Monogram', 'Bond Never Breaks', 'Courier In Red', 'Rose Hot Flow', 'Satoshi Light', 'Writing Desk', 'Mascot Flute', 'Simple Means'].map((title, i) => (
              <a
                key={i}
                href="https://www.instagram.com/nststudio.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="insta-tile"
              >
                <div className="tile-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="tile-title">{title}</div>
                <div className="tile-arrow">↗</div>
              </a>
            ))}
          </div>

          <div className="archive-action" style={{ pointerEvents: 'auto' }}>
            <a
              href="https://www.instagram.com/nststudio.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-btn"
            >
              Follow @nststudio.in On Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* 07. PRIVATE COMMISSION (600vh) */}
      <section className="scroll-page commission-page" style={{ top: '600vh' }}>
        <div className="page-inner">
          <div className="section-header">
            <div className="section-eyebrow">06 / Private Commission</div>
            <h2 className="section-title">Begin Your Story</h2>
            <p className="section-desc">
              Every iconic creation starts with a single dialogue. Tell us about your vision.
            </p>
          </div>

          <div className="commission-box" style={{ pointerEvents: 'auto' }}>
            {isSubmitted ? (
              <div className="form-success">
                <h3>Inquiry Dispatched</h3>
                <p>We will review your dossier and initiate dialogue within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="luxury-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arthur Conan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. studio@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Commission Universe</label>
                  <select
                    value={formData.universe}
                    onChange={(e) => setFormData({ ...formData, universe: e.target.value })}
                    required
                  >
                    <option value="">Select a Discipline</option>
                    <option value="branding">Universe 01 — Brand Identity System</option>
                    <option value="film">Universe 02 — Cinematic Brand Film</option>
                    <option value="animation">Universe 03 — 2D/3D Kinetic Animation</option>
                    <option value="learning">Universe 04 — Creative Masterclass / Guild</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>The Narrative Premise</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the challenge, aspiration, or story you want to tell..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Submit Private Commission →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 08. MAISON FOOTER (700vh) */}
      <section className="scroll-page footer-page" style={{ top: '700vh' }}>
        <div className="page-inner footer-inner" style={{ pointerEvents: 'auto' }}>
          <div className="footer-emblem-large">NST</div>
          <div className="footer-tagline">NIKUNJ STORYTELLING STUDIO</div>
          
          <div className="footer-links-grid">
            <div className="footer-col">
              <h5>Universes</h5>
              <a href="#branding">Branding</a>
              <a href="#film">Film</a>
              <a href="#animation">Animation</a>
              <a href="#learning">Learning</a>
            </div>
            <div className="footer-col">
              <h5>Atelier</h5>
              <a href="#savoir-faire">Savoir-Faire</a>
              <a href="#philosophy">The Sacred Thread</a>
              <a href="#guidelines">Brand Lore</a>
            </div>
            <div className="footer-col">
              <h5>Studio</h5>
              <a href="https://www.instagram.com/nststudio.in/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="mailto:nststudio.in@gmail.com">nststudio.in@gmail.com</a>
              <span>Surat / Mumbai, India</span>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2024–2026 NST STUDIO · ALL RIGHTS RESERVED · STORY FIRST</p>
            <p className="quote">"Transforming businesses into memorable brands through story."</p>
          </div>
        </div>
      </section>

    </div>
  );
};
