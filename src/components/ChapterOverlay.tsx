import React, { useState } from 'react';
import { scrollManager } from '../state/scrollStore';
import { COLOR_PALETTE, COLLATERAL_ITEMS, BRAND_MANIFESTO } from '../data/brandGuideData';

interface ChapterOverlayProps {
  progress: number;
  onOpenDossier: (page?: number) => void;
}

export const ChapterOverlay: React.FC<ChapterOverlayProps> = ({
  progress,
  onOpenDossier,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: 'branding',
    message: '',
  });
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  /**
   * Smooth opacity falloff and scale transition matching Cartier aesthetic
   */
  const getStyle = (chapterIndex: number) => {
    const diff = progress - chapterIndex;
    const dist = Math.abs(diff);

    // Hard cutoff at 0.52 guarantees only one chapter's text is visible at any given moment
    if (dist >= 0.52) {
      return { display: 'none' as const };
    }

    const opacity = Math.max(0, 1 - Math.pow(dist / 0.5, 2));
    const scale = 1 + diff * 0.12;
    const translateY = -diff * 26;

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

          <div className="prologue-action-row">
            <div className="inward-scroll-cue" onClick={() => scrollManager.setTarget(1)}>
              <span className="cue-label">SCROLL INWARD TO ENTER</span>
              <div className="cue-line-inward">
                <div className="cue-dot-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 1: THE FOUR UNIVERSES / CORE PILLARS ===== */}
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
            <div className="universe-card" onClick={() => onOpenDossier(9)}>
              <div className="card-top">
                <span className="universe-num">01</span>
                <span className="universe-glyph">♦</span>
              </div>
              <h3 className="universe-name">Branding</h3>
              <p className="universe-text">
                Identity systems, semiotic lore, and brand guidelines built for enduring emotional connection.
              </p>
              <div className="card-footer-meta">STRATEGY &amp; DESIGN</div>
            </div>

            <div className="universe-card" onClick={() => onOpenDossier(9)}>
              <div className="card-top">
                <span className="universe-num">02</span>
                <span className="universe-glyph">▶</span>
              </div>
              <h3 className="universe-name">Film</h3>
              <p className="universe-text">
                Cinematic brand advertising films, short films, and evocative human stories on motion picture.
              </p>
              <div className="card-footer-meta">CINEMATOGRAPHY</div>
            </div>

            <div className="universe-card" onClick={() => onOpenDossier(9)}>
              <div className="card-top">
                <span className="universe-num">03</span>
                <span className="universe-glyph">✦</span>
              </div>
              <h3 className="universe-name">Animation</h3>
              <p className="universe-text">
                2D &amp; 3D kinetic storytelling, animated content for children, and whimsical character motion.
              </p>
              <div className="card-footer-meta">KINETIC CRAFT</div>
            </div>

            <div className="universe-card" onClick={() => onOpenDossier(9)}>
              <div className="card-top">
                <span className="universe-num">04</span>
                <span className="universe-glyph">●</span>
              </div>
              <h3 className="universe-name">Education</h3>
              <p className="universe-text">
                Drawing fundamentals, design basics, visual storytelling, and lateral creative thinking programmes.
              </p>
              <div className="card-footer-meta">PEDAGOGY</div>
            </div>
          </div>

          <div className="chapter-action-cta">
            <button className="btn-luxury-outline" onClick={() => onOpenDossier(9)}>
              INSPECT PILLARS IN BRAND GUIDE (P.09) ↗
            </button>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 2: THE SACRED MARK & LOGO ANATOMY ===== */}
      <div className="chapter-slide" style={getStyle(2)}>
        <div className="chapter-center-content">
          <div className="chapter-header">
            <span className="section-eyebrow">02 / SEMIOTIC GENESIS</span>
            <h2 className="section-title">Anatomy of the Mark</h2>
            <p className="section-desc">
              Nikunj is historically associated with Lord Krishna. Abstracted into the letter 'N'.
            </p>
          </div>

          <div className="thread-manifesto-container">
            <div className="thread-card">
              <span className="thread-num">I</span>
              <h4>The Sitting Krishna in 'N'</h4>
              <p>
                The classical posture of Lord Krishna resting in contemplation, embodied through the sharp architectural diagonals of the letter N.
              </p>
            </div>

            <div className="thread-card">
              <span className="thread-num">II</span>
              <h4>The Red Flute (#FF2222)</h4>
              <p>
                The emotional core of identity — symbolizing storytelling, human connection, and creative energy.
              </p>
            </div>

            <div className="thread-card">
              <span className="thread-num">III</span>
              <h4>The Film Reel Medallion</h4>
              <p>
                Hovering as a thought bubble above the creator, representing "STUDIO" and cinematic motion.
              </p>
            </div>

            <div className="thread-card">
              <span className="thread-num">IV</span>
              <h4>Loyal Canine Companion</h4>
              <p>
                Sitting beside Krishna on the jagged rock, representing loyalty, partnership, and narrative fidelity.
              </p>
            </div>
          </div>

          <div className="chapter-action-cta">
            <button className="btn-luxury-outline" onClick={() => onOpenDossier(15)}>
              EXAMINE LOGO CONSTRUCTION (P.15) ↗
            </button>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 3: ATELIER SAVOIR-FAIRE & COLOR SCIENCE ===== */}
      <div className="chapter-slide" style={getStyle(3)}>
        <div className="chapter-center-content">
          <div className="chapter-header">
            <span className="section-eyebrow">03 / BRAND ATELIER</span>
            <h2 className="section-title">Color Science &amp; Codes</h2>
            <p className="section-desc">
              Curated chromatic formulations and the 8 poses of the storytelling brand face.
            </p>
          </div>

          <div className="atelier-showcase">
            {/* Color formulas */}
            <div className="atelier-pillar">
              <span className="pillar-num">01</span>
              <h4>Chromatic Formula</h4>
              <div className="color-swatch-list">
                {COLOR_PALETTE.map((c) => (
                  <div key={c.hex} className="color-swatch-row">
                    <div
                      className="swatch-box"
                      style={{
                        backgroundColor: c.hex,
                        border: c.hex === '#F9F9F9' ? '1px solid #555' : 'none',
                      }}
                    />
                    <div className="swatch-info">
                      <span className="swatch-title">{c.name}</span>
                      <span className="swatch-detail">{c.role}</span>
                    </div>
                    <button
                      className="btn-swatch-copy"
                      onClick={() => handleCopyHex(c.hex)}
                      title="Click to copy hex"
                    >
                      {copiedHex === c.hex ? 'COPIED!' : c.hex}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Mascot 8 Poses */}
            <div className="atelier-pillar">
              <span className="pillar-num">02</span>
              <h4>Brand Face: 8 Poses</h4>
              <p className="pillar-body">
                The Krishna mascot adopts 8 distinct classical postures: The Flute Player, Standing Storyteller, Contemplative Scribe, Ascent to Horizon, Reclining Poet, Lotus Meditator, Director's Pedestal, and Open Horizons.
              </p>
              <div className="mascot-thumb-preview" onClick={() => onOpenDossier(39)}>
                <img src="/brand/p39_0.png" alt="8 Mascot Poses" />
                <span className="thumb-inspect-badge">INSPECT ALL 8 POSES (P.39) ↗</span>
              </div>
            </div>

            {/* Typography */}
            <div className="atelier-pillar">
              <span className="pillar-num">03</span>
              <h4>Typography Hierarchy</h4>
              <div className="typo-compact-list">
                <div className="typo-entry">
                  <span className="entry-tag">PRIMARY HEADINGS</span>
                  <span className="entry-name">Satoshi Bold (48–64pt)</span>
                </div>
                <div className="typo-entry">
                  <span className="entry-tag">SUBTITLES &amp; UI</span>
                  <span className="entry-name">Poppins Semi Bold &amp; Regular</span>
                </div>
                <div className="typo-entry">
                  <span className="entry-tag">SPECIAL CASE / SCRIPT</span>
                  <span className="entry-name">Courier Prime Monospace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 4: SELECTED COMMISSIONS & TACTILE COLLATERALS ===== */}
      <div className="chapter-slide" style={getStyle(4)}>
        <div className="chapter-center-content">
          <div className="chapter-header">
            <span className="section-eyebrow">04 / SELECTED COMMISSIONS</span>
            <h2 className="section-title">Tactile Collaterals</h2>
            <p className="section-desc">
              Photorealistic stationery, editorial monographs, and monumental architectural outdoor installations.
            </p>
          </div>

          <div className="gallery-grid">
            {COLLATERAL_ITEMS.map((item) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() =>
                  onOpenDossier(
                    item.id === 'visiting-cards'
                      ? 57
                      : item.id === 'executive-letterhead'
                      ? 59
                      : item.id === 'screenplay-envelopes'
                      ? 61
                      : 45
                  )
                }
              >
                <div className="card-thumb-frame">
                  <img src={item.image} alt={item.title} />
                </div>
                <span className="card-kicker">{item.category}</span>
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
                <span className="card-open-link">INSPECT SPECIFICATION ↗</span>
              </div>
            ))}
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
              Real-time dispatches, editorial spreads, and studio experiments.
            </p>
          </div>

          <div className="social-pill-header">
            <span className="social-stat">21 STUDIO POSTS</span>
            <span className="stat-separator">&middot;</span>
            <span className="social-stat">PUNE &amp; MUMBAI</span>
            <span className="stat-separator">&middot;</span>
            <span className="social-stat">DAILY NARRATIVE ATELIER</span>
          </div>

          <div className="instagram-editorial-preview">
            <div className="insta-hero-frame">
              <img src="/brand/p47_0.jpg" alt="Campaign Editorial" />
              <div className="frame-meta">
                <span className="frame-tag">CAMPAIGN STORYTELLING</span>
                <span className="frame-title">New Era of Design · 1080×1350 Standard</span>
              </div>
            </div>

            <div className="insta-hero-frame">
              <img src="/brand/p45_1.png" alt="Ideas That Move Billboard" />
              <div className="frame-meta">
                <span className="frame-tag">OUTDOOR FACADE</span>
                <span className="frame-title">“Ideas That Move” Monumental Installation</span>
              </div>
            </div>
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
              Direct access to our storytelling directors in Pune &amp; Mumbai. Tell us about your vision.
            </p>
          </div>

          <div className="commission-box">
            {formSubmitted ? (
              <div className="commission-success">
                <span className="success-icon">&check;</span>
                <h3>Inquiry Received</h3>
                <p>We will review your narrative brief and respond within 24 hours.</p>
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
                    <label>YOUR NAME / ORGANIZATION</label>
                    <input
                      type="text"
                      placeholder="e.g. Maison de Luxe / Founder Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="e.g. founder@domain.com"
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
                    placeholder="Briefly describe the challenge, aspiration, or story you want to tell..."
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

            <div className="studio-direct-coords">
              <span>DIRECT INQUIRIES: <a href={`mailto:${BRAND_MANIFESTO.email}`}>{BRAND_MANIFESTO.email}</a></span>
              <span>·</span>
              <span>PHONE: <a href={`tel:${BRAND_MANIFESTO.phone.replace(/\s+/g, '')}`}>{BRAND_MANIFESTO.phone}</a></span>
              <span>·</span>
              <span>PUNE &amp; MUMBAI, MAHARASHTRA 411046</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CHAPTER 7: MAISON EPILOGUE ===== */}
      <div className="chapter-slide" style={getStyle(7)}>
        <div className="chapter-center-content footer-content">
          <div className="footer-monogram">NST</div>
          <p className="footer-lead">NIKUNJ STORYTELLING STUDIO</p>

          <div className="epilogue-dossier-card">
            <h4>OFFICIAL BRAND SPECIFICATION</h4>
            <p>The Holy Grail master document containing 61 plates of identity lore, color science, and tactile standards.</p>
            <button className="btn-luxury-primary mt-4" onClick={() => onOpenDossier(1)}>
              BROWSE COMPLETE BRAND GUIDELINE (61 PLATES) 📖
            </button>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 NST STUDIO &middot; ALL RIGHTS RESERVED &middot; STORY FIRST</p>
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
