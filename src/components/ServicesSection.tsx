import React from 'react';
import { scrollManager } from '../state/scrollStore';

interface ServicesSectionProps {
  onOpenDossier: (page?: number) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenDossier }) => {
  return (
    <section id="services-section" className="prototype-service-section">
      <div className="section-container">
        {/* Prototype: Section Header "Service." with red dot */}
        <div className="section-header-block">
          <div className="section-tag-kicker">STUDIO DISCIPLINES</div>
          <h2 className="section-title-large">
            Service<span className="text-red-accent">.</span>
          </h2>
          <p className="section-intro-text">
            We specialize in creating bold, meaningful digital experiences that set brands apart.
          </p>
        </div>

        {/* Prototype: Handheld Pro Plan Arpeggio Showcase & Atelier Banner */}
        <div className="service-hero-showcase-grid">
          {/* Handheld Physical Pro Plan Card from Prototype */}
          <div className="handheld-card-feature">
            <div className="handheld-card-stage">
              <div className="physical-white-pro-card">
                <div className="card-top-header">
                  <div className="pro-plan-badge">
                    <span className="pro-red-play-dot" />
                    <div>
                      <div className="pro-title">Pro Plan</div>
                      <div className="pro-sub">1 month</div>
                    </div>
                  </div>
                  <span className="card-atelier-tag">NST ATELIER</span>
                </div>

                <div className="card-center-brand">
                  <div className="arpeggio-logo-red">Arpeggio</div>
                  <div className="arpeggio-sub-tag">SOUND ARCHITECTURE</div>
                </div>

                <div className="card-bottom-specs">
                  <span className="card-serial">NST-2026 // PASS</span>
                  <span className="card-status-pill">ACTIVE</span>
                </div>
              </div>

              {/* Card Hover Glow */}
              <div className="card-hover-glow" />
            </div>

            <div className="handheld-card-caption">
              <span className="caption-tag">MEMBERSHIP MODEL</span>
              <h3 className="caption-heading">Dedicated Design Direction</h3>
              <p className="caption-body">
                Access an entire multi-disciplinary creative studio on subscription.
                Unlimited brand, motion, and web requests with guaranteed turnaround.
              </p>
              <button
                className="service-explore-link"
                onClick={() => scrollManager.scrollToSection('contact-section')}
              >
                Inquire About Pro Membership →
              </button>
            </div>
          </div>

          {/* Right Banner: Page Transition & Atelier Preview */}
          <div className="service-page-transition-banner">
            <div className="transition-banner-inner">
              <div className="banner-tag">PRECISION EXECUTION</div>
              <h3 className="banner-title">
                We blend creativity with precision<span className="text-red-accent">.</span>
              </h3>
              <p className="banner-desc">
                Every frame, curve, and line of code is measured against its emotional impact.
                We don't settle for aesthetics without soul.
              </p>
              <div className="banner-image-preview">
                <img
                  src="/brand/p40_0.jpg"
                  alt="NST Studio Editorial Process"
                  className="banner-preview-img"
                />
              </div>
              <button
                className="banner-cta-link"
                onClick={() => onOpenDossier(26)}
              >
                Inspect Atelier Process Dossier ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
