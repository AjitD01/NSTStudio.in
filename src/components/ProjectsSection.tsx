import React, { useState } from 'react';
import { scrollManager } from '../state/scrollStore';

interface ProjectCase {
  id: string;
  tabTitle: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
}

const PROJECTS: ProjectCase[] = [
  {
    id: 'campaign-1',
    tabTitle: 'Campaign',
    title: 'Arpeggio Sound Architecture',
    category: 'BRANDING · CAMPAIGN · PACKAGING',
    year: '2026',
    description:
      'A holistic visual identity and acoustic hardware packaging ecosystem for high-fidelity audio equipment. Crafted with debossed foil stamping, tactile uncoated stock, and architectural precision.',
    image: '/brand/p57_0.jpg',
    tags: ['Acoustic Identity', 'Debossed Foil', 'Bespoke Type'],
  },
  {
    id: 'branding-2',
    tabTitle: 'Branding',
    title: 'Maison Monogram & Sacred Mark',
    category: 'SEMIOTICS & LOGO ARCHITECTURE',
    year: '2026',
    description:
      'Geometric deconstruction of the Krishna mascot and cinematic camera aperture into a clean, modern emblem built for global luxury recognition.',
    image: '/brand/p32_0.jpg',
    tags: ['Sacred Geometry', 'Brand Guidelines', 'Dossier'],
  },
  {
    id: 'packaging-3',
    tabTitle: 'Packaging',
    title: 'Tactile Collateral Suite',
    category: 'PRINT DIRECTION & PACKAGING',
    year: '2026',
    description:
      'Bespoke stationery, letterheads, business cards, and velvet-touch presentation boxes designed for high-touch executive interactions.',
    image: '/brand/p51_0.jpg',
    tags: ['Tactile Print', 'Luxury Stationery', 'Brand Dossier'],
  },
  {
    id: 'digital-4',
    tabTitle: 'Digital 3D',
    title: 'Kinetic Campaign Triptych',
    category: '3D WEBGL & MOTION DIRECTION',
    year: '2026',
    description:
      'Visual stories through motion that breathe soul into corporate vision. Multi-screen exhibition loops and 3D product unveilings.',
    image: '/brand/p47_0.jpg',
    tags: ['3D WebGL', 'Kinetic Typography', 'Brand Film'],
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const currentProject = PROJECTS[activeTabIdx];

  return (
    <section id="projects-section" className="prototype-projects-section">
      <div className="section-container">
        {/* Prototype Header with Plus Grid Marks */}
        <div className="projects-header-wrapper">
          <div className="grid-crosshair-mark top-left">+</div>
          <div className="grid-crosshair-mark top-right">+</div>

          <div className="section-tag-kicker">SELECTED ARCHIVE</div>
          <h2 className="section-title-large">
            Projects<span className="text-red-accent">.</span>
          </h2>
          <p className="section-intro-text">
            Crafting indelible visual and verbal worlds for brands that dare to lead.
          </p>
        </div>

        {/* Prototype: Ascending Layered Project Cards */}
        <div className="projects-ascending-stage">
          {/* Vertical Tab Navigation (Campaign / Branding / Packaging / Digital) */}
          <div className="ascending-tabs-column">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                className={`ascending-tab-item ${activeTabIdx === idx ? 'active-tab' : ''}`}
                onClick={() => setActiveTabIdx(idx)}
              >
                <span className="tab-vertical-text">{proj.tabTitle}</span>
                <span className="tab-index">0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Main Active Project Showcase Card */}
          <div className="ascending-card-surface">
            <div className="card-top-indicator-bar">
              <div className="card-nst-brand">
                <span className="brand-nst-text">NST</span>
                <span className="brand-dot-red">.</span>
                <span className="brand-cat-tag">{currentProject.category}</span>
              </div>
              <span className="card-year-tag">{currentProject.year}</span>
            </div>

            <div className="card-visual-and-content">
              <div className="card-image-display">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="card-main-image"
                />
                <div className="card-image-tint" />
              </div>

              <div className="card-editorial-details">
                <h3 className="card-project-title">{currentProject.title}</h3>
                <p className="card-project-desc">{currentProject.description}</p>

                <div className="card-tags-row">
                  {currentProject.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="card-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  className="card-inquire-btn"
                  onClick={() => scrollManager.scrollToSection('contact-section')}
                >
                  <span>Inquire for Similar Commission</span>
                  <span className="arrow-icon">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Prototype: Film Sprocket Manifesto Banner */}
        <div className="prototype-film-manifesto-banner">
          {/* Left Film Sprocket Reel */}
          <div className="film-reel-icon left-reel">
            <svg viewBox="0 0 100 100" className="reel-svg" fill="none">
              <circle cx="50" cy="50" r="44" stroke="#44444c" strokeWidth="3" strokeDasharray="4 2" />
              <circle cx="50" cy="50" r="26" stroke="#44444c" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="8" fill="#FF2222" />
              {/* Sprocket film holes */}
              <circle cx="50" cy="14" r="4" fill="#333339" />
              <circle cx="50" cy="86" r="4" fill="#333339" />
              <circle cx="14" cy="50" r="4" fill="#333339" />
              <circle cx="86" cy="50" r="4" fill="#333339" />
              <circle cx="24" cy="24" r="4" fill="#333339" />
              <circle cx="76" cy="24" r="4" fill="#333339" />
              <circle cx="24" cy="76" r="4" fill="#333339" />
              <circle cx="76" cy="76" r="4" fill="#333339" />
            </svg>
          </div>

          {/* Center Manifesto Quote from Prototype */}
          <div className="manifesto-quote-body">
            <p className="manifesto-text">
              NST is a <span className="text-red-highlight font-bold">Creative Studio</span>,
              <br />
              Trusted By Brands who
              <br />
              aren't Afraid to <span className="text-red-highlight font-bold">Standout.</span>
            </p>
          </div>

          {/* Right Film Sprocket Reel */}
          <div className="film-reel-icon right-reel">
            <svg viewBox="0 0 100 100" className="reel-svg" fill="none">
              <circle cx="50" cy="50" r="44" stroke="#44444c" strokeWidth="3" strokeDasharray="4 2" />
              <circle cx="50" cy="50" r="26" stroke="#44444c" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="8" fill="#FF2222" />
              <circle cx="50" cy="14" r="4" fill="#333339" />
              <circle cx="50" cy="86" r="4" fill="#333339" />
              <circle cx="14" cy="50" r="4" fill="#333339" />
              <circle cx="86" cy="50" r="4" fill="#333339" />
              <circle cx="24" cy="24" r="4" fill="#333339" />
              <circle cx="76" cy="24" r="4" fill="#333339" />
              <circle cx="24" cy="76" r="4" fill="#333339" />
              <circle cx="76" cy="76" r="4" fill="#333339" />
            </svg>
          </div>
        </div>

        {/* Prototype: Twin Supporting Cards Below Manifesto */}
        <div className="manifesto-subcards-row">
          {/* White Card: NST shaping brand story */}
          <div className="white-story-card">
            <h4 className="white-story-heading">
              NST is a Creative Studio shaping Your Brand Story and Daring Ideas
            </h4>
            <p className="white-story-sub">
              From Pune to global markets, we give shape to narratives that matter.
            </p>
          </div>

          {/* Physical Membership Card Graphic */}
          <div className="mini-membership-card-frame">
            <div className="mini-card-surface">
              <div className="mini-card-top">
                <span className="mini-card-chip">● Pro Plan</span>
                <span className="mini-card-tag">Arpeggio</span>
              </div>
              <div className="mini-card-center">
                <span className="mini-card-brand">Arpeggio</span>
              </div>
              <div className="mini-card-bottom">
                <span>image style in color</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
