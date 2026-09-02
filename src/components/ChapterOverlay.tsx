import React, { useState } from 'react';
import { scrollManager } from '../state/scrollStore';

interface ChapterProps {
  progress: number;
}

export const ChapterOverlay: React.FC<ChapterProps> = ({ progress }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: 'branding',
    message: '',
  });

  const getStyle = (chapterIndex: number) => {
    const diff = progress - chapterIndex; // -1 when approaching, +1 when leaving
    const dist = Math.abs(diff);

    // Hard cutoff at 0.52 guarantees only one chapter's text is visible at any given moment
    if (dist >= 0.52) {
      return { display: 'none' as const };
    }

    // High contrast opacity falloff
    const opacity = Math.max(0, 1 - Math.pow(dist / 0.5, 2));
    // Inward perspective transform: zooms slightly towards viewer as you scroll inward
    const scale = 1 + diff * 0.14;
    const translateY = -diff * 30;

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      pointerEvents: dist < 0.25 ? ('auto' as const) : ('none' as const),
    };
  };

  return (
    <div className="chapter-overlay-container">
      {/* ===== CHAPTER 0: PROLOGUE ===== */}
      <div className="chapter-slide" style={getStyle(0)}>
        <div className="chapter-center-content">
          <div className="prologue-emblem">
            <span className="prologue-kicker">00 / PROLOGUE</span>
            <div className="prologue-monogram-ring">
              <span className="monogram-text">NST</span>
            </div>
          </div>
          <h1 className="chapter-hero-title">
            NST <span className="text-red">/</span> STUDIO
          </h1>
          <p className="chapter-hero-tagline">
            NIKUNJ STORYTELLING STUDIO · STORY FIRST
          </p>
          <p className="chapter-hero-subtext">
            “Transforming businesses into memorable brands through the sacred craft of story.”
          </p>
          <div className="inward-scroll-cue" onClick={() => scrollManager.setTarget(1)}>
            <span className="cue-label">SCROLL INWARD TO ENTER</span>
            <div className="cue-line-inward">
              <div className="cue-dot-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 1: THE FOUR UNIVERSES ===== */}
      <div className="chapter-slide" style={getStyle(1)}>
        <div className="chapter-center-content">
          <div className="chapter-header">
            <span className="section-eyebrow">01 / OUR DISCIPLINES</span>
            <h2 className="section-title">The Four Universes</h2>
            <p className="section-desc">
              Four specialized realms of craft, harmonized under one narrative vision.
            </p>
          </div>
          <div className="universes-grid">
            <div className="universe-card">
              <div className="card-top">
                <span className="universe-num">01</span>
                <span className="universe-glyph">♦</span>
              </div>
              <h3 className="universe-name">Branding</h3>
              <p className="universe-text">
                Identity systems, semiotic lore, and timeless brand tokens that speak before you say a word.
              </p>
              <div className="card-footer-meta">IDENTITY · VISION</div>
            </div>
            <div className="universe-card">
              <div className="card-top">
                <span className="universe-num">02</span>
                <span className="universe-glyph">▶</span>
              </div>
              <h3 className="universe-name">Film</h3>
              <p className="universe-text">
                Cinematic brand films, documentary narratives, and evocative human stories captured on motion film.
              </p>
              <div className="card-footer-meta">CINEMATOGRAPHY</div>
            </div>
            <div className="universe-card">
              <div className="card-top">
                <span className="universe-num">03</span>
                <span className="universe-glyph">●</span>
              </div>
              <h3 className="universe-name">Animation</h3>
              <p className="universe-text">
                Frame-by-frame 2D & 3D character motion that breathes spirit, vitality, and whimsy into abstract ideas.
              </p>
              <div className="card-footer-meta">KINETIC EXPRESSION</div>
            </div>
            <div className="universe-card">
              <div className="card-top">
                <span className="universe-num">04</span>
                <span className="universe-glyph">◊</span>
              </div>
              <h3 className="universe-name">Learning</h3>
              <p className="universe-text">
                Masterclasses, design systems workshops, and visual storytelling pedagogy empowering the next generation.
              </p>
              <div className="card-footer-meta">PEDAGOGY · GUILD</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 2: THE SACRED THREAD ===== */}
      <div className="chapter-slide" style={getStyle(2)}>
        <div className="chapter-center-content">
          <div className="chapter-header">
            <span className="section-eyebrow">02 / NARRATIVE PHILOSOPHY</span>
            <h2 className="section-title">The Sacred Thread</h2>
            <p className="section-desc">
              &ldquo;The thread that holds our story together&rdquo; &mdash; An unbroken bond between truth and form.
            </p>
          </div>
          <div className="thread-manifesto-grid">
            <div className="manifesto-card">
              <span className="manifesto-kicker">01</span>
              <h4>Root In Truth</h4>
              <p>Every business possesses a core emotional truth. We unearth it through relentless research.</p>
            </div>
            <div className="manifesto-card">
              <span className="manifesto-kicker">02</span>
              <h4>Weave The Form</h4>
              <p>Typography, color science, and symbols tailored as bespoke garments for the idea.</p>
            </div>
            <div className="manifesto-card">
              <span className="manifesto-kicker">03</span>
              <h4>The Unbroken Bond</h4>
              <p>Like the sacred Rakhi, our creative bond with clients and audiences endures across time.</p>
            </div>
            <div className="manifesto-card">
              <span className="manifesto-kicker">04</span>
              <h4>Enduring Legacy</h4>
              <p>Crafted not for quarterly hype cycles, but for decades of cultural staying power.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 3: THE CRAFT ATELIER ===== */}
      <div className="chapter-slide" style={getStyle(3)}>
        <div className="chapter-center-content">
          <div className="chapter-header">
            <span className="section-eyebrow">03 / SAVOIR-FAIRE</span>
            <h2 className="section-title">The Craft Atelier</h2>
            <p className="section-desc">
              Precision typography, harmonious scales, and the unmistakable Rose Hot signature.
            </p>
          </div>
          <div className="atelier-showcase">
            <div className="atelier-card font-card">
              <span className="card-meta">PRIMARY SANS</span>
              <h3 className="font-sample-satoshi">Satoshi Geometric</h3>
              <p className="specimen-desc">Clean, architectural, authoritative. For contemporary brand headlines and interfaces.</p>
            </div>
            <div className="atelier-card font-card">
              <span className="card-meta">TYPEWRITER HERITAGE</span>
              <h3 className="font-sample-courier">Courier Prime</h3>
              <p className="specimen-desc">The authentic scriptwriter's voice. Honest, rhythmic, literary precision.</p>
            </div>
            <div className="atelier-card color-card">
              <span className="card-meta">SIGNATURE CHROMATIC</span>
              <h3 className="color-name-rose">Rose Hot</h3>
              <p className="specimen-desc">A rich fusion of Crimson Passion (#C8102E) and Ethereal Rose (#FF6B9D).</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 4: SELECTED COMMISSIONS ===== */}
      <div className="chapter-slide" style={getStyle(4)}>
        <div className="chapter-center-content">
          <div className="chapter-header">
            <span className="section-eyebrow">04 / PORTFOLIO</span>
            <h2 className="section-title">Selected Commissions</h2>
            <p className="section-desc">
              Highlights from the studio archive, translating deep lore into tactile artifacts.
            </p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-card">
              <span className="card-kicker">IDENTITY SYSTEM</span>
              <h4>SafeHold Brand Identity</h4>
              <p>Security and warmth unified into a protective modern monogram.</p>
            </div>
            <div className="gallery-card">
              <span className="card-kicker">EDITORIAL FILM</span>
              <h4>Raksha Bandhan Heritage</h4>
              <p>A cinematic celebration of the thread that binds families together.</p>
            </div>
            <div className="gallery-card">
              <span className="card-kicker">COLOR STUDY</span>
              <h4>Rose Hot Chromatic</h4>
              <p>Exploring emotional intensity through fluid gradient dynamics.</p>
            </div>
            <div className="gallery-card">
              <span className="card-kicker">TYPOGRAPHY POSTER</span>
              <h4>Courier Prime Red Ink</h4>
              <p>Homage to manual screenwriting and the tactile intimacy of letters.</p>
            </div>
            <div className="gallery-card">
              <span className="card-kicker">CHARACTER DESIGN</span>
              <h4>The Storyteller Mascot</h4>
              <p>Geometric Krishna figure with flute and film reel medallion.</p>
            </div>
            <div className="gallery-card">
              <span className="card-kicker">SEMIOTICS</span>
              <h4>"Simple Until You Realize"</h4>
              <p>The philosophical reduction of complexity into timeless elegance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 5: LIVING ARCHIVE ===== */}
      <div className="chapter-slide" style={getStyle(5)}>
        <div className="chapter-center-content">
          <div className="chapter-header">
            <span className="section-eyebrow">05 / SOCIAL ARCHIVE</span>
            <h2 className="section-title">@nststudio.in</h2>
            <p className="section-desc">
              Real-time dispatches, behind-the-scenes sketches, and studio experiments.
            </p>
          </div>
          <div className="social-pill-header">
            <span className="social-stat">21 STUDIO POSTS</span>
            <span className="stat-separator">&middot;</span>
            <span className="social-stat">11 CRAFT FOLLOWERS</span>
            <span className="stat-separator">&middot;</span>
            <span className="social-stat">DAILY NARRATIVE STUDIO</span>
          </div>
          <div className="instagram-grid">
            {[
              { id: '01', title: 'The Thread' },
              { id: '02', title: 'SafeHold Monogram' },
              { id: '03', title: 'Bond Never Breaks' },
              { id: '04', title: 'Courier In Red' },
              { id: '05', title: 'Rose Hot Flow' },
              { id: '06', title: 'Satoshi Light' },
              { id: '07', title: 'Writing Desk' },
              { id: '08', title: 'Mascot Flute' },
              { id: '09', title: 'Simple Means' },
            ].map((item) => (
              <a
                key={item.id}
                href="https://www.instagram.com/nststudio.in"
                target="_blank"
                rel="noreferrer"
                className="insta-tile"
              >
                <span className="tile-num">{item.id}</span>
                <span className="tile-label">{item.title}</span>
                <span className="tile-arrow">↗</span>
              </a>
            ))}
          </div>
          <div className="archive-cta">
            <a
              href="https://www.instagram.com/nststudio.in"
              target="_blank"
              rel="noreferrer"
              className="btn-luxury-outline"
            >
              FOLLOW @NSTSTUDIO.IN ON INSTAGRAM &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 6: PRIVATE COMMISSION ===== */}
      <div className="chapter-slide" style={getStyle(6)}>
        <div className="chapter-center-content">
          <div className="chapter-header">
            <span className="section-eyebrow">06 / PRIVATE COMMISSION</span>
            <h2 className="section-title">Begin Your Story</h2>
            <p className="section-desc">
              Every iconic creation starts with a single dialogue. Tell us about your vision.
            </p>
          </div>
          <div className="commission-box">
            {formSubmitted ? (
              <div className="commission-success">
                <span className="success-icon">&check;</span>
                <h3>Inquiry Received</h3>
                <p>We will review your narrative premise and respond within 24 hours.</p>
                <button
                  className="btn-luxury-outline mt-4"
                  onClick={() => setFormSubmitted(false)}
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form
                className="commission-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormSubmitted(true);
                }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label>YOUR NAME</label>
                    <input
                      type="text"
                      placeholder="e.g. Arthur Conan"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="e.g. studio@domain.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>COMMISSION UNIVERSE</label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                  >
                    <option value="branding">01 / Brand Identity System</option>
                    <option value="film">02 / Narrative Brand Film</option>
                    <option value="animation">03 / 2D &amp; 3D Kinetic Animation</option>
                    <option value="learning">04 / Pedagogy &amp; Design Systems</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>THE NARRATIVE PREMISE</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the challenge, aspiration, or story you want to tell..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-luxury-primary w-full">
                  SUBMIT PRIVATE COMMISSION &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 7: MAISON EPILOGUE ===== */}
      <div className="chapter-slide" style={getStyle(7)}>
        <div className="chapter-center-content footer-content">
          <div className="footer-monogram">NST</div>
          <p className="footer-lead">NIKUNJ STORYTELLING STUDIO</p>
          <div className="footer-columns">
            <div className="footer-col">
              <span className="col-title">UNIVERSES</span>
              <span>Branding</span>
              <span>Film</span>
              <span>Animation</span>
              <span>Learning</span>
            </div>
            <div className="footer-col">
              <span className="col-title">ATELIER</span>
              <span>Savoir-Faire</span>
              <span>The Sacred Thread</span>
              <span>Brand Lore</span>
            </div>
            <div className="footer-col">
              <span className="col-title">STUDIO</span>
              <span>Instagram</span>
              <span>nststudio.in@gmail.com</span>
              <span>Surat / Mumbai, India</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024–2026 NST STUDIO &middot; ALL RIGHTS RESERVED &middot; STORY FIRST</p>
            <p className="footer-quote">&ldquo;Transforming businesses into memorable brands through story.&rdquo;</p>
            <button
              className="btn-return-top"
              onClick={() => scrollManager.setTarget(0)}
            >
              &uarr; RETURN TO PROLOGUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
