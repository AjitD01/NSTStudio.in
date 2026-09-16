import React, { useState } from 'react';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  image: string;
  tag: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'brand',
    num: '1.',
    title: 'Branding & Identity',
    shortDesc: 'Craft bold, memorable brand identities that tell your story.',
    fullDesc:
      'We craft bold, memorable brand identities that tell your story and leave a lasting impression. From logos to full brand guidelines, we ensure consistency and impact across all touchpoints.',
    deliverables: [
      'Narrative Brand Strategy & Positioning',
      'Sacred Mark & Primary Logomark Craft',
      'Typographic Systems & Bespoke Palettes',
      'Comprehensive Brand Guideline Dossier',
      'Packaging & Tactile Collateral Specs',
    ],
    image: '/brand/p47_0.jpg',
    tag: 'FOUNDATIONAL IDENTITY',
  },
  {
    id: 'web',
    num: '2.',
    title: 'Web Design & Development',
    shortDesc: 'Stunning, high-performance websites tailored to your brand.',
    fullDesc:
      'Stunning, high-performance websites tailored to your brand. We design sleek, user-friendly interfaces and develop responsive, fast-loading sites that captivate and convert.',
    deliverables: [
      'High-Fidelity Interactive UI/UX Architecture',
      'Custom 3D Canvas & WebGL Atmosphere',
      'Design Token Systems & Component Libraries',
      'Fluid Animations & Micro-Interactions',
      'Mobile-First Responsive Engineering',
    ],
    image: '/brand/p59_0.jpg',
    tag: 'DIGITAL CRAFT',
  },
  {
    id: 'uiux',
    num: '3.',
    title: 'UI/UX Design',
    shortDesc: 'Intuitive, human-centered interfaces that delight and convert.',
    fullDesc:
      'We architect seamless digital journeys where every interaction feels natural, effortless, and rewarding. Rooted in cognitive ergonomics and rigorous user testing.',
    deliverables: [
      'User Journey Mapping & Information Architecture',
      'Interactive Prototypes & Wireframing',
      'Design System Documentation',
      'Cross-Platform App Interfaces (Web & Mobile)',
      'Conversion Rate & Usability Audits',
    ],
    image: '/brand/p26_1.png',
    tag: 'EXPERIENCE DESIGN',
  },
  {
    id: 'motion',
    num: '4.',
    title: 'Motion & Visual Design',
    shortDesc: 'Kinetic choreography and 3D animations that bring stories to life.',
    fullDesc:
      'Motion is the heartbeat of digital identity. We produce 3D character animations, kinetic typography, cinematic trailers, and micro-interactions that command undivided attention.',
    deliverables: [
      'Brand Motion Choreography & Kinetic Guidelines',
      '3D Mascot & Character Motion Cycles',
      'Commercial Title Sequences & Teasers',
      'Interactive Micro-Animations',
      'Exhibition & Large-Format Video Art',
    ],
    image: '/brand/p57_0.jpg',
    tag: 'KINETIC ART',
  },
];

export const WhatWeOfferSection: React.FC = () => {
  // Default to index 1 (Web Design & Development) as highlighted in the prototype!
  const [activeIdx, setActiveIdx] = useState<number>(1);
  const activeService = SERVICES_DATA[activeIdx];

  return (
    <section id="what-we-offer" className="prototype-offer-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="offer-header-split">
          <div className="offer-header-left">
            <h2 className="offer-headline-large">
              What we offer<span className="text-red-accent">.</span>
            </h2>
          </div>
          <div className="offer-header-right">
            <p className="offer-header-subtext">
              We specialize in creating bold, meaningful visual identities and
              digital experiences that set brands apart.
            </p>
          </div>
        </div>

        {/* Prototype: 2-Column Split (List on Left, Interactive Detail & Visual on Right) */}
        <div className="offer-interactive-split">
          {/* Left Column: 4 Numbered Disciplines */}
          <div className="offer-list-column">
            {SERVICES_DATA.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={service.id}
                  className={`prototype-service-row ${isActive ? 'active-row' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  <div className="row-number-title">
                    <span className="row-num">{service.num}</span>
                    <span className="row-title">{service.title}</span>
                  </div>

                  {isActive && (
                    <div className="row-mobile-preview">
                      <p className="row-desc-text">{service.fullDesc}</p>
                    </div>
                  )}

                  <div className="row-active-indicator" />
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Service Detailed Card & High-Res Visual */}
          <div className="offer-preview-column">
            <div className="preview-card-glass">
              <div className="preview-visual-frame">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="preview-image"
                />
                <div className="preview-badge-pill">
                  <span className="badge-bullet">✦</span>
                  <span>{activeService.tag}</span>
                </div>
              </div>

              <div className="preview-content-box">
                <div className="preview-title-row">
                  <span className="preview-num-accent">{activeService.num}</span>
                  <h3 className="preview-title">{activeService.title}</h3>
                </div>

                <p className="preview-full-desc">{activeService.fullDesc}</p>

                <div className="preview-deliverables-grid">
                  <span className="deliverables-title">WHAT YOU RECEIVE:</span>
                  <ul className="deliverables-list">
                    {activeService.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="deliverable-item">
                        <span className="check-icon">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
