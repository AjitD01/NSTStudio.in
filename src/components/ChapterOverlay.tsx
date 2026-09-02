import React, { useState } from 'react';
import {
  BRAND_MANIFESTO,
  CORE_PILLARS,
  LOGO_ANATOMY,
  COLOR_PALETTE,
  TYPOGRAPHY_SYSTEM,
  MASCOT_POSES,
  COLLATERAL_ITEMS,
} from '../data/brandGuideData';

interface ChapterOverlayProps {
  currentChapter: number;
  onNavigateChapter: (index: number) => void;
  onOpenDossier: (page?: number) => void;
}

export const ChapterOverlay: React.FC<ChapterOverlayProps> = ({
  currentChapter,
  onNavigateChapter,
  onOpenDossier,
}) => {
  const [selectedPillarId, setSelectedPillarId] = useState('branding');
  const [selectedMascotIndex, setSelectedMascotIndex] = useState(0);
  const [activeLorePart, setActiveLorePart] = useState<string>('Flute');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="chapter-overlay-root">
      {/* =========================================================================
          CHAPTER 0: PROLOGUE - THE STORYTELLING STUDIO
         ========================================================================= */}
      <div className={`chapter-view ${currentChapter === 0 ? 'active' : ''}`}>
        <div className="chapter-container">
          <div className="brand-crest-lockup">
            <span className="chapter-eyebrow">
              {BRAND_MANIFESTO.name} · {BRAND_MANIFESTO.established.toUpperCase()}
            </span>
            <span className="chapter-eyebrow-accent">OFFICIAL BRAND SPECIFICATION</span>
          </div>

          <h1 className="hero-monumental-title">
            STORY <span className="text-crimson">FIRST.</span>
          </h1>

          <p className="hero-manifesto-lead">
            {BRAND_MANIFESTO.philosophy}
          </p>

          {/* Campaign Triptych: Seen, Noticed, Remembered */}
          <div className="campaign-triptych-row">
            {BRAND_MANIFESTO.campaignTriptych.map((item, idx) => (
              <div key={idx} className="triptych-cell">
                <span className="triptych-label">{item.label}</span>
                <span className="triptych-sub">{item.sub}</span>
              </div>
            ))}
          </div>

          <div className="hero-action-cluster">
            <button
              className="btn-luxury-primary"
              onClick={() => onNavigateChapter(1)}
            >
              ENTER 3D UNIVERSE <span className="btn-arrow">↓</span>
            </button>
            <button
              className="btn-luxury-secondary"
              onClick={() => onOpenDossier(1)}
            >
              OPEN BRAND DOSSIER 📖
            </button>
          </div>

          <div className="hero-scroll-cue">
            <div className="scroll-needle-track">
              <div className="scroll-needle-thumb" />
            </div>
            <span className="scroll-cue-text">INWARD WARP · SCROLL DOWN</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CHAPTER 1: THE THREE PILLARS
         ========================================================================= */}
      <div className={`chapter-view ${currentChapter === 1 ? 'active' : ''}`}>
        <div className="chapter-container wide">
          <div className="chapter-header-compact">
            <span className="chapter-kicker">CHAPTER I / 07 · FOUNDATIONAL DISCIPLINES</span>
            <h2 className="chapter-section-title">THE THREE PILLARS OF NIKUNJ</h2>
            <p className="chapter-section-desc">
              {BRAND_MANIFESTO.vision}
            </p>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="pillars-tab-row">
            {CORE_PILLARS.map((pillar) => (
              <button
                key={pillar.id}
                className={`pillar-tab-btn ${selectedPillarId === pillar.id ? 'active' : ''}`}
                onClick={() => setSelectedPillarId(pillar.id)}
              >
                <span className="tab-number">{pillar.number}</span>
                <span className="tab-title">{pillar.title}</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          {(() => {
            const activePillar = CORE_PILLARS.find((p) => p.id === selectedPillarId) || CORE_PILLARS[0];
            return (
              <div className="pillar-spotlight-card">
                <div className="pillar-spotlight-content">
                  <span className="pillar-accent-tag" style={{ color: activePillar.accentColor }}>
                    {activePillar.subtitle}
                  </span>
                  <h3 className="pillar-spotlight-heading">{activePillar.title}</h3>
                  <p className="pillar-spotlight-tagline">“{activePillar.tagline}”</p>
                  <p className="pillar-spotlight-text">{activePillar.description}</p>

                  <div className="pillar-disciplines-list">
                    <span className="list-title">Core Disciplines & Deliverables:</span>
                    <div className="disciplines-chips">
                      {activePillar.subDisciplines.map((d, i) => (
                        <span key={i} className="discipline-chip">
                          <span className="chip-bullet">✦</span> {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="spotlight-action">
                    <button
                      className="btn-card-action"
                      onClick={() => onOpenDossier(9)}
                    >
                      VIEW IN BRAND GUIDE (P.09) →
                    </button>
                  </div>
                </div>

                <div className="pillar-spotlight-media">
                  <img
                    src={activePillar.image}
                    alt={activePillar.title}
                    className="pillar-media-img"
                  />
                  <div className="pillar-media-badge">
                    <span>PLATE {activePillar.number}</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* =========================================================================
          CHAPTER 2: LOGO ANATOMY & SEMIOTIC GENESIS
         ========================================================================= */}
      <div className={`chapter-view ${currentChapter === 2 ? 'active' : ''}`}>
        <div className="chapter-container wide">
          <div className="chapter-header-compact">
            <span className="chapter-kicker">CHAPTER II / 07 · SEMIOTIC GENESIS</span>
            <h2 className="chapter-section-title">THE ANATOMY OF THE MARK</h2>
            <p className="chapter-section-desc">
              Nikunj is historically associated with Lord Krishna. The logo embodies the letter 'N',
              the contemplative sitting posture, and the vibrant red flute.
            </p>
          </div>

          <div className="logo-anatomy-grid">
            {/* Left: Anatomical interactive parts */}
            <div className="anatomy-parts-list">
              {LOGO_ANATOMY.map((part) => (
                <div
                  key={part.part}
                  className={`anatomy-part-card ${activeLorePart === part.part ? 'active' : ''}`}
                  onClick={() => setActiveLorePart(part.part)}
                >
                  <div className="part-card-header">
                    <span className="part-tag">{part.part}</span>
                    <span className="part-name">{part.name}</span>
                  </div>
                  <div className="part-symbolism">{part.symbolism}</div>
                  <p className="part-lore">{part.lore}</p>
                </div>
              ))}
            </div>

            {/* Right: Master Emblem Inspection Box */}
            <div className="anatomy-visual-pedestal">
              <div className="pedestal-emblem-wrap">
                <img
                  src="/brand/p10_0.png"
                  alt="NST Master Brand Mark"
                  className="master-emblem-graphic"
                />
                <div className="emblem-callout flute-callout">
                  <div className="callout-line" />
                  <div className="callout-content">
                    <span className="callout-badge">#FF2222</span>
                    <span className="callout-text">The Red Flute · Emotional Core</span>
                  </div>
                </div>
              </div>

              <div className="pedestal-footer-info">
                <div className="pedestal-quote">
                  “The flute symbolizes storytelling, human connection, and vibrant creative energy.”
                </div>
                <button
                  className="btn-card-action"
                  onClick={() => onOpenDossier(15)}
                >
                  EXAMINE LOGO CONSTRUCTION (P.15) →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CHAPTER 3: ATELIER STANDARDS - COLOR, TYPO, MASCOT
         ========================================================================= */}
      <div className={`chapter-view ${currentChapter === 3 ? 'active' : ''}`}>
        <div className="chapter-container wide">
          <div className="chapter-header-compact">
            <span className="chapter-kicker">CHAPTER III / 07 · BRAND ATELIER</span>
            <h2 className="chapter-section-title">COLOR SCIENCE & BRAND FACE</h2>
            <p className="chapter-section-desc">
              Harmonious chromatic precision and the 8 classical poses of the storytelling mascot.
            </p>
          </div>

          <div className="atelier-split-layout">
            {/* Color Swatches */}
            <div className="atelier-colors-panel">
              <h4 className="panel-title">OFFICIAL CHROMATIC FORMULA</h4>
              <div className="color-swatches-column">
                {COLOR_PALETTE.map((c) => (
                  <div key={c.hex} className="swatch-item">
                    <div
                      className="swatch-chip"
                      style={{ backgroundColor: c.hex, border: c.hex === '#F9F9F9' ? '1px solid #444' : 'none' }}
                    />
                    <div className="swatch-meta">
                      <div className="swatch-top">
                        <span className="swatch-name">{c.name}</span>
                        <button
                          className="btn-copy-hex"
                          onClick={() => handleCopyHex(c.hex)}
                          title="Click to Copy Hex"
                        >
                          {copiedHex === c.hex ? 'COPIED!' : c.hex}
                        </button>
                      </div>
                      <span className="swatch-role">{c.role}</span>
                      <span className="swatch-code">{c.cmyk} · RGB({c.rgb})</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Typography Preview */}
              <div className="typography-box">
                <h4 className="panel-title">TYPOGRAPHY HIERARCHY</h4>
                <div className="typo-items">
                  {TYPOGRAPHY_SYSTEM.map((t, idx) => (
                    <div key={idx} className="typo-spec-row">
                      <span className="typo-role">{t.role}</span>
                      <span className="typo-fam">{t.family} ({t.size})</span>
                      <p className="typo-sample">{t.sample}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mascot 8 Poses Carousel */}
            <div className="atelier-mascot-panel">
              <div className="mascot-panel-header">
                <h4 className="panel-title">BRAND FACE: THE 8 MASCOT POSES</h4>
                <span className="mascot-page-link" onClick={() => onOpenDossier(39)}>
                  PAGE 39 ↗
                </span>
              </div>

              {/* Mascot Composite Plate */}
              <div className="mascot-plate-wrapper">
                <img
                  src="/brand/p39_0.png"
                  alt="8 Poses of the Krishna Mascot"
                  className="mascot-plate-img"
                />
              </div>

              {/* Pose Selector Tabs */}
              <div className="mascot-pose-selector">
                <div className="pose-selector-tabs">
                  {MASCOT_POSES.map((pose, idx) => (
                    <button
                      key={pose.id}
                      className={`pose-num-btn ${selectedMascotIndex === idx ? 'active' : ''}`}
                      onClick={() => setSelectedMascotIndex(idx)}
                    >
                      {String(pose.id).padStart(2, '0')}
                    </button>
                  ))}
                </div>

                <div className="pose-active-detail">
                  <div className="pose-active-title">
                    {MASCOT_POSES[selectedMascotIndex].name}
                  </div>
                  <span className="pose-active-role">
                    {MASCOT_POSES[selectedMascotIndex].role}
                  </span>
                  <p className="pose-active-desc">
                    {MASCOT_POSES[selectedMascotIndex].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CHAPTER 4: SELECTED COMMISSIONS & TACTILE COLLATERALS
         ========================================================================= */}
      <div className={`chapter-view ${currentChapter === 4 ? 'active' : ''}`}>
        <div className="chapter-container wide">
          <div className="chapter-header-compact">
            <span className="chapter-kicker">CHAPTER IV / 07 · PHYSICAL ATELIER</span>
            <h2 className="chapter-section-title">TACTILE COMMISSIONS & COLLATERALS</h2>
            <p className="chapter-section-desc">
              Photorealistic executive stationery and monumental campaign installations from the Holy Grail specification.
            </p>
          </div>

          <div className="collaterals-gallery-grid">
            {COLLATERAL_ITEMS.map((item) => (
              <div
                key={item.id}
                className="collateral-card-modern"
                onClick={() => onOpenDossier(item.id === 'visiting-cards' ? 57 : item.id === 'executive-letterhead' ? 59 : 61)}
              >
                <div className="collateral-media-frame">
                  <img src={item.image} alt={item.title} className="collateral-img" />
                  <div className="collateral-overlay-badge">
                    <span>{item.category}</span>
                  </div>
                  <div className="hover-inspect-cue">INSPECT SPECIFICATION ↗</div>
                </div>

                <div className="collateral-info-pane">
                  <h4 className="collateral-title">{item.title}</h4>
                  <span className="collateral-subtitle">{item.subtitle}</span>
                  <p className="collateral-desc">{item.description}</p>

                  <div className="collateral-detail-chips">
                    {item.details.slice(0, 2).map((d, i) => (
                      <span key={i} className="detail-chip">
                        ✦ {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          CHAPTER 5: SOCIAL ARCHIVE & EDITORIAL CAMPAIGN
         ========================================================================= */}
      <div className={`chapter-view ${currentChapter === 5 ? 'active' : ''}`}>
        <div className="chapter-container wide">
          <div className="chapter-header-compact">
            <span className="chapter-kicker">CHAPTER V / 07 · LIVING ARCHIVE</span>
            <h2 className="chapter-section-title">SOCIAL ARCHIVE & EDITORIAL CODES</h2>
            <p className="chapter-section-desc">
              High-fashion storytelling campaigns and rigorous 1080×1350 editorial grid standards.
            </p>
          </div>

          <div className="social-editorial-grid">
            <div className="editorial-main-card">
              <img
                src="/brand/p47_0.jpg"
                alt="New Era of Design Editorial"
                className="editorial-fashion-img"
              />
              <div className="editorial-card-content">
                <span className="editorial-tag">CAMPAIGN STORYTELLING</span>
                <h3 className="editorial-heading">NEW ERA OF DESIGN</h3>
                <p className="editorial-text">
                  Combining high-fashion editorial styling with cinematic narrative depth.
                  Every social frame adheres to strict 90px clear margin guidelines ensuring typographic clarity.
                </p>
                <div className="editorial-specs-row">
                  <span className="spec-tag">POST: 1080 × 1350 PX (4:5)</span>
                  <span className="spec-tag">STORY: 1080 × 1920 PX (9:16)</span>
                  <span className="spec-tag">GRID: 90PX CLEAR MARGINS</span>
                </div>
              </div>
            </div>

            <div className="editorial-side-column">
              <div className="editorial-side-card">
                <img
                  src="/brand/p47_1.jpg"
                  alt="Editorial Layout Spread"
                  className="editorial-side-img"
                />
                <div className="side-card-info">
                  <h4 className="side-title">THE RED BRUSH IDENTITY</h4>
                  <p className="side-desc">The dynamic brushstroke signifies raw human storytelling power.</p>
                </div>
              </div>

              <div className="editorial-side-card instagram-hub-card">
                <div className="hub-header">
                  <span className="hub-brand">@nststudio.in</span>
                  <span className="hub-status">LIVE FEED</span>
                </div>
                <p className="hub-pitch">
                  Follow our continuous journey across Pune, Mumbai, and global storytelling ateliers.
                </p>
                <a
                  href="https://instagram.com/nststudio.in"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-instagram-link"
                >
                  VISIT INSTAGRAM ARCHIVE ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CHAPTER 6: PRIVATE COMMISSIONS & STUDIO INQUIRY
         ========================================================================= */}
      <div className={`chapter-view ${currentChapter === 6 ? 'active' : ''}`}>
        <div className="chapter-container">
          <div className="chapter-header-compact text-center">
            <span className="chapter-kicker">CHAPTER VI / 07 · PRIVATE COMMISSIONS</span>
            <h2 className="chapter-section-title">INITIATE A DIALOGUE</h2>
            <p className="chapter-section-desc">
              Every transformative brand begins with a genuine conversation.
              Connect directly with our creative directors in Pune & Mumbai.
            </p>
          </div>

          <div className="commission-contact-layout">
            <div className="studio-coordinates-box">
              <div className="studio-card-brand">
                <h3 className="studio-name">{BRAND_MANIFESTO.name}</h3>
                <span className="studio-legal">{BRAND_MANIFESTO.fullName}</span>
              </div>

              <div className="coordinates-list">
                <div className="coord-item">
                  <span className="coord-label">STUDIO HUBS</span>
                  <span className="coord-val">{BRAND_MANIFESTO.location}</span>
                </div>

                <div className="coord-item">
                  <span className="coord-label">DIRECT INQUIRIES</span>
                  <a href={`mailto:${BRAND_MANIFESTO.email}`} className="coord-val link">
                    {BRAND_MANIFESTO.email}
                  </a>
                </div>

                <div className="coord-item">
                  <span className="coord-label">STUDIO DIRECT</span>
                  <a href={`tel:${BRAND_MANIFESTO.phone.replace(/\\s+/g, '')}`} className="coord-val link">
                    {BRAND_MANIFESTO.phone}
                  </a>
                </div>

                <div className="coord-item">
                  <span className="coord-label">CREATIVE DIRECTION</span>
                  <span className="coord-val">{BRAND_MANIFESTO.founder}</span>
                </div>
              </div>

              <div className="studio-promise-seal">
                <span className="seal-tag">FOUNDATION</span>
                <span className="seal-text">“Stories are created, shared, and taught.”</span>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="commission-form-card">
              <h4 className="form-card-title">PROJECT COMMENCEMENT BRIEF</h4>
              <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for your brief. Nikunj Storytelling Studio will be in touch shortly."); }}>
                <div className="form-group">
                  <label className="form-label">YOUR NAME / ORGANIZATION</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maison de Luxe / Founder Name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">EMAIL COORDINATES</label>
                  <input
                    type="email"
                    required
                    placeholder="founder@domain.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">PRIMARY DISCIPLINE</label>
                  <select className="form-select">
                    <option value="branding">Branding & Visual Identity System</option>
                    <option value="film">Film & Cinematic Animation</option>
                    <option value="education">Creative Education & Masterclasses</option>
                    <option value="comprehensive">Comprehensive Brand Transformation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">PROJECT NARRATIVE</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe the story you desire to tell..."
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn-luxury-submit">
                  SUBMIT BRIEF TO ATELIER →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CHAPTER 7: EPILOGUE & BRAND ARCHIVE
         ========================================================================= */}
      <div className={`chapter-view ${currentChapter === 7 ? 'active' : ''}`}>
        <div className="chapter-container text-center">
          <span className="chapter-kicker">EPILOGUE / 07 · THE COMPLETE SPECIFICATION</span>
          <h2 className="hero-monumental-title">
            THE ARCHIVE OF <span className="text-crimson">NIKUNJ</span>
          </h2>
          <p className="hero-manifesto-lead">
            {BRAND_MANIFESTO.promise}
          </p>

          <div className="archive-launch-card">
            <div className="archive-launch-info">
              <span className="archive-tag">HOLY GRAIL DOCUMENTATION</span>
              <h3 className="archive-title">NST BRAND GUIDELINE · MARCH 2026</h3>
              <p className="archive-desc">
                The comprehensive 61-plate master manual containing the complete semiotics,
                color formulations, typography hierarchies, mascot poses, and collateral blueprints.
              </p>
            </div>

            <div className="archive-launch-actions">
              <button
                className="btn-luxury-primary"
                onClick={() => onOpenDossier(1)}
              >
                BROWSE COMPLETE BRAND GUIDELINE (26 RETINA PLATES) 📖
              </button>
              <button
                className="btn-luxury-secondary"
                onClick={() => onNavigateChapter(0)}
              >
                RETURN TO PROLOGUE ↑
              </button>
            </div>
          </div>

          <div className="studio-colophon">
            <span>© 2026 NIKUNJ STORYTELLING STUDIO · PUNE & MUMBAI, MAHARASHTRA</span>
            <span>ALL RIGHTS RESERVED · STORY FIRST.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
