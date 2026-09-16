import React, { useState } from 'react';
import { scrollManager } from '../state/scrollStore';

interface HeaderProps {
  onOpenDossier: (page?: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDossier }) => {
  const [floatingMenuOpen, setFloatingMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    scrollManager.scrollToSection(sectionId);
    setFloatingMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          {/* Official Prototype Brand Lockup (Mascot + Camera line + NST STUDIO) */}
          <div
            className="header-brand-lockup"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setFloatingMenuOpen(false);
            }}
            title="NST Studio - Back to Top"
          >
            <img
              src="/nst/logomark_light.png"
              alt="NST Official Mascot Mark"
              className="header-mascot-img"
            />
            <div className="header-brand-typography">
              <span className="brand-nst">NST</span>
              <span className="brand-dot-red">.</span>
              <span className="brand-studio">STUDIO</span>
            </div>
          </div>

          {/* Desktop Direct Links from Prototype */}
          <nav className="header-nav-menu">
            <button
              className="nav-link-item"
              onClick={() => handleNavClick('what-we-offer')}
            >
              Blogs
            </button>
            <button
              className="nav-link-item"
              onClick={() => handleNavClick('services-section')}
            >
              Service
            </button>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="nav-link-item nav-social-link"
              title="LinkedIn"
            >
              In | In
            </a>
            <button
              className="nav-link-plus-btn"
              onClick={() => handleNavClick('about-section')}
              title="About Nikunj Storytelling Studio"
            >
              +
            </button>
          </nav>

          {/* Right Floating Badge & Menu Trigger from Prototype */}
          <div className="header-actions-group">
            {/* Prototype: Red 'US 1' status pill */}
            <div
              className="header-status-pill"
              onClick={() => handleNavClick('contact-section')}
              title="Accepting Commissions worldwide"
            >
              <span className="status-pill-text">US 1</span>
            </div>

            {/* Dossier Quick Access */}
            <button
              className="header-dossier-pill"
              onClick={() => onOpenDossier(1)}
              title="Open Brand Dossier"
            >
              <span className="dossier-label">Dossier</span>
            </button>

            {/* Hamburger Button (==) Triggering Prototype's Floating Menu */}
            <button
              className={`prototype-hamburger-btn ${floatingMenuOpen ? 'active' : ''}`}
              onClick={() => setFloatingMenuOpen(!floatingMenuOpen)}
              aria-label="Toggle navigation menu"
              title="Toggle Menu"
            >
              <span className="hamburger-line line-1" />
              <span className="hamburger-line line-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Menu Modal (Matching top-right of NST WEB PROTOTYPE REF 1 (2).png) */}
      {floatingMenuOpen && (
        <div
          className="prototype-floating-menu-backdrop"
          onClick={() => setFloatingMenuOpen(false)}
        >
          <div
            className="prototype-floating-menu-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="floating-menu-close"
              onClick={() => setFloatingMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Menu Links with hover transitions */}
            <div className="floating-menu-links">
              <button
                className="floating-nav-link"
                onClick={() => handleNavClick('hero-section')}
              >
                Home
              </button>
              <button
                className="floating-nav-link"
                onClick={() => handleNavClick('projects-section')}
              >
                Projects
              </button>
              <button
                className="floating-nav-link"
                onClick={() => handleNavClick('about-section')}
              >
                About
              </button>
              <button
                className="floating-nav-link"
                onClick={() => handleNavClick('services-section')}
              >
                Blog
              </button>
              <button
                className="floating-nav-link"
                onClick={() => handleNavClick('contact-section')}
              >
                Contact
              </button>
            </div>

            {/* Subtle background branding & studio note */}
            <div className="floating-menu-footer">
              <span className="floating-menu-caption">
                NIKUNJ STORYTELLING STUDIO · STORY FIRST.
              </span>
              <a
                href="https://www.facebook.com/share/1HAfkeHAq5/"
                target="_blank"
                rel="noreferrer"
                className="floating-menu-fb-link"
              >
                Connect on Facebook ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
