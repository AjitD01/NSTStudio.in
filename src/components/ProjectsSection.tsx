import React from 'react';
import { scrollManager } from '../state/scrollStore';

interface ProjectPanel {
  id: string;
  title: string;
  category: string;
  deliverable: string;
  year: string;
  description: string;
  image: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
}

const DZINR_PROJECTS: ProjectPanel[] = [
  {
    id: 'arpeggio-sound',
    title: 'Arpeggio Sound',
    category: 'Acoustic Architecture',
    deliverable: 'Brand & Packaging',
    year: '2026',
    description:
      'A holistic visual identity and acoustic hardware packaging ecosystem for high-fidelity audio equipment. Crafted with debossed foil stamping, tactile uncoated stock, and architectural precision.',
    image: '/brand/p57_0.jpg',
    bgColor: '#0c1926',
    accentColor: '#38bdf8',
    textColor: '#ffffff',
  },
  {
    id: 'sacred-mark',
    title: 'Sacred Mark Suite',
    category: 'Semiotics & Identity',
    deliverable: 'Brand Dossier (26 Pages)',
    year: '2026',
    description:
      'Geometric deconstruction of the Krishna mascot and cinematic camera aperture into a clean, modern emblem built for global luxury recognition.',
    image: '/brand/p32_0.jpg',
    bgColor: '#1e0b16',
    accentColor: '#f43f5e',
    textColor: '#ffffff',
  },
  {
    id: 'tactile-collateral',
    title: 'Tactile Collateral',
    category: 'Print Direction',
    deliverable: 'Luxury Stationery & Boxes',
    year: '2026',
    description:
      'Bespoke stationery, letterheads, business cards, and velvet-touch presentation boxes designed for high-touch executive interactions.',
    image: '/brand/p51_0.jpg',
    bgColor: '#1a1714',
    accentColor: '#f59e0b',
    textColor: '#fef3c7',
  },
  {
    id: 'kinetic-triptych',
    title: 'Kinetic Triptych',
    category: '3D WebGL Direction',
    deliverable: 'Multi-Screen Film Loops',
    year: '2026',
    description:
      'Visual stories through motion that breathe soul into corporate vision. Multi-screen exhibition loops and 3D product unveilings.',
    image: '/brand/p47_0.jpg',
    bgColor: '#180808',
    accentColor: '#ff2222',
    textColor: '#ffffff',
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects-section" className="dzinr-projects-section">
      {/* 1. Section Kicker Header */}
      <div className="projects-editorial-header">
        <div className="section-tag-kicker">SELECTED ARCHIVE // COMMISSIONS</div>
        <h2 className="section-title-monumental">
          Projects<span className="text-red-accent">.</span>
        </h2>
        <p className="section-intro-text">
          Crafting indelible visual and verbal worlds for brands that dare to lead.
        </p>
      </div>

      {/* 2. Full-Bleed DZINR-Style Project Cards Stack */}
      <div className="dzinr-project-cards-stack">
        {DZINR_PROJECTS.map((proj, idx) => (
          <article
            key={proj.id}
            className="dzinr-project-card group"
            style={{ backgroundColor: proj.bgColor, color: proj.textColor }}
            onClick={() => scrollManager.scrollToSection('contact-section')}
          >
            {/* Top Project Visual Media Container */}
            <div className="project-card-media-wrapper">
              <img
                src={proj.image}
                alt={proj.title}
                className="project-card-image"
                loading="lazy"
              />
              <div className="project-card-gradient-scrim" />
              <div className="project-index-badge">0{idx + 1}</div>
            </div>

            {/* Bottom Meta & Title Bar */}
            <div className="project-card-info-pane">
              {/* Category & Tags Strip */}
              <div className="project-meta-pills-row">
                <span
                  className="meta-pill-year"
                  style={{ borderColor: proj.accentColor, color: proj.accentColor }}
                >
                  {proj.year}
                </span>
                <span className="meta-category-tag">{proj.category}</span>
                <span className="meta-deliverable-tag hidden sm:inline-block">
                  {proj.deliverable}
                </span>
              </div>

              {/* Title & Rotating Arrow CTA Row */}
              <div className="project-title-action-row">
                <div className="project-headline-wrapper">
                  <h3 className="project-monumental-name">
                    <span className="rollup-wrapper">
                      <span className="rollup-text">{proj.title}</span>
                      <span className="rollup-hover">{proj.title}</span>
                    </span>
                  </h3>
                  <p className="project-synopsis-line hidden md:block">
                    {proj.description}
                  </p>
                </div>

                {/* DZINR Circular -45° to 0° Rotating Arrow Button */}
                <div
                  className="dzinr-arrow-circle-btn"
                  style={{ borderColor: proj.textColor }}
                >
                  <span
                    className="arrow-circle-inner"
                    style={{ backgroundColor: proj.textColor }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={proj.bgColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="arrow-svg"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 3. DZINR Closing Quote & Impact Statement */}
      <div className="dzinr-closing-statement-banner">
        <div className="closing-banner-inner">
          <div className="closing-header-row">
            <span className="closing-kicker-tag">[ ARCHIVE IMPACT ]</span>
            <h3 className="closing-big-title">Selected Works</h3>
          </div>

          <p className="closing-quote-statement">
            These are not just projects, they are stories of our clients, our craft,
            and the indelible impact we composed together.
          </p>

          <div className="closing-action-group">
            <button
              className="closing-cta-link group"
              onClick={() => scrollManager.scrollToSection('contact-section')}
            >
              <span className="cta-link-text">Begin Your Project</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cta-arrow-svg"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
