import React, { useState } from 'react';
import { scrollManager } from '../state/scrollStore';

interface HeaderProps {
  onOpenDossier: (page?: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDossier }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    scrollManager.scrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="dzinr-site-header">
        <div className="header-container">
          {/* 1. Left Brand Monogram Lockup */}
          <div
            className="dzinr-brand-lockup cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            title="NST Studio - Back to Top"
          >
            <div className="brand-logo-symbol">
              <span className="brand-letters">NST</span>
              <span className="brand-dot-accent">.</span>
            </div>
            <div className="brand-meta-column hidden sm:flex">
              <span className="brand-studio-title">STORYTELLING STUDIO</span>
              <span className="brand-status-indicator">
                <span className="status-dot-live" />
                AVAILABLE WORLDWIDE
              </span>
            </div>
          </div>

          {/* 2. Center/Right Direct Links with DZINR Roll-up Hover Effect */}
          <nav className="dzinr-nav-menu hidden lg:flex">
            <button
              className="dzinr-nav-link"
              onClick={() => handleNavClick('projects-section')}
            >
              <span className="rollup-wrapper">
                <span className="rollup-text">Work</span>
                <span className="rollup-hover">Work</span>
              </span>
            </button>

            <button
              className="dzinr-nav-link"
              onClick={() => handleNavClick('services-section')}
            >
              <span className="rollup-wrapper">
                <span className="rollup-text">Services</span>
                <span className="rollup-hover">Services</span>
              </span>
            </button>

            <button
              className="dzinr-nav-link"
              onClick={() => handleNavClick('what-we-offer')}
            >
              <span className="rollup-wrapper">
                <span className="rollup-text">What We Offer</span>
                <span className="rollup-hover">What We Offer</span>
              </span>
            </button>

            <button
              className="dzinr-nav-link"
              onClick={() => onOpenDossier(1)}
            >
              <span className="rollup-wrapper">
                <span className="rollup-text">
                  Dossier <span className="nav-badge-pdf">PDF</span>
                </span>
                <span className="rollup-hover">
                  Dossier <span className="nav-badge-pdf">PDF</span>
                </span>
              </span>
            </button>

            <button
              className="dzinr-nav-link"
              onClick={() => handleNavClick('faq-section')}
            >
              <span className="rollup-wrapper">
                <span className="rollup-text">FAQ</span>
                <span className="rollup-hover">FAQ</span>
              </span>
            </button>

            <div className="nav-divider-vertical" />

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="dzinr-nav-link external-link"
            >
              <span className="rollup-wrapper">
                <span className="rollup-text">Instagram</span>
                <span className="rollup-hover">Instagram</span>
              </span>
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="dzinr-nav-link external-link"
            >
              <span className="rollup-wrapper">
                <span className="rollup-text">LinkedIn</span>
                <span className="rollup-hover">LinkedIn</span>
              </span>
            </a>
          </nav>

          {/* 3. Right Action: DZINR Liquid Wave "Let's Talk" CTA + Mobile Toggle */}
          <div className="dzinr-actions-group">
            <button
              className="dzinr-talk-btn"
              onClick={() => handleNavClick('contact-section')}
              aria-label="Let's Talk"
            >
              <div className="talk-liquid-wave" aria-hidden="true">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="wave-svg"
                >
                  <path
                    d="M0,30 Q50,-5 100,30 L100,100 L0,100 Z"
                    fill="#FF2222"
                  />
                </svg>
              </div>
              <span className="talk-btn-content">
                <span className="talk-text">Let's Talk</span>
                <svg
                  className="talk-arrow-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`dzinr-mobile-toggle lg:hidden ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="toggle-bar bar-1" />
              <span className="toggle-bar bar-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer (DZINR Inspired) */}
      {mobileMenuOpen && (
        <div
          className="dzinr-mobile-drawer"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-drawer-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header-row">
              <span className="drawer-brand-label">NST® // MENU</span>
              <button
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="drawer-nav-list">
              <button
                className="drawer-nav-item"
                onClick={() => handleNavClick('hero-section')}
              >
                <span className="drawer-num">01</span>
                <span className="drawer-title">Home</span>
              </button>
              <button
                className="drawer-nav-item"
                onClick={() => handleNavClick('projects-section')}
              >
                <span className="drawer-num">02</span>
                <span className="drawer-title">Work & Projects</span>
              </button>
              <button
                className="drawer-nav-item"
                onClick={() => handleNavClick('services-section')}
              >
                <span className="drawer-num">03</span>
                <span className="drawer-title">Services</span>
              </button>
              <button
                className="drawer-nav-item"
                onClick={() => handleNavClick('what-we-offer')}
              >
                <span className="drawer-num">04</span>
                <span className="drawer-title">What We Offer</span>
              </button>
              <button
                className="drawer-nav-item"
                onClick={() => {
                  onOpenDossier(1);
                  setMobileMenuOpen(false);
                }}
              >
                <span className="drawer-num">05</span>
                <span className="drawer-title">Brand Dossier (PDF)</span>
              </button>
              <button
                className="drawer-nav-item"
                onClick={() => handleNavClick('faq-section')}
              >
                <span className="drawer-num">06</span>
                <span className="drawer-title">FAQ</span>
              </button>
              <button
                className="drawer-nav-item"
                onClick={() => handleNavClick('contact-section')}
              >
                <span className="drawer-num">07</span>
                <span className="drawer-title">Contact</span>
              </button>
            </div>

            <div className="drawer-footer-row">
              <div className="drawer-socials">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="drawer-social-link"
                >
                  Instagram ↗
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="drawer-social-link"
                >
                  LinkedIn ↗
                </a>
              </div>
              <span className="drawer-copyright">
                © 2025 NIKUNJ STORYTELLING STUDIO
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
