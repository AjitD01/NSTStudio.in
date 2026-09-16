import React, { useState } from 'react';
import { scrollManager } from '../state/scrollStore';

interface FooterProps {
  onOpenDossier: (page?: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDossier }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (id: string) => {
    scrollManager.scrollToSection(id);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterJoined(true);
    }
  };

  return (
    <footer className="prototype-footer-section">
      {/* =========================================================================
          PRE-FOOTER EMBLEM & 'HELLO / NAMASTEY' BRANDING CARD (FROM PROTOTYPE)
          ========================================================================= */}
      <div className="section-container prefooter-container">
        <div className="prefooter-composite-card">
          <div className="prefooter-top-row">
            {/* White Official Logo Box from Prototype */}
            <div className="white-emblem-box" onClick={scrollToTop} title="NST Studio - Back to Top">
              <img
                src="/nst/logo_dark.png"
                alt="NST Studio Official Mascot Mark with Camera"
                className="emblem-box-img"
              />
            </div>

            {/* Email Address */}
            <a
              href="mailto:nststudio.in@gmail.com"
              className="prefooter-email-link"
              title="Email NST Studio"
            >
              nststudio.in@gmail.com
            </a>
          </div>

          {/* Monumental Headline from Prototype */}
          <div className="prefooter-statement-block">
            <h2 className="prefooter-monumental-heading">
              Some of the Best Stories Begin with a Simple{' '}
              <span className="text-hello-namastey">Hello / Namastey</span>
            </h2>
          </div>

          {/* Twin Supporting Process Cards from Prototype */}
          <div className="prefooter-supporting-cards-grid">
            <div className="supporting-process-card">
              <p className="process-card-quote">
                The best results don't come from guesswork.{' '}
                <strong>They come from a proven process.</strong>
              </p>
              <div className="process-card-badge">PROVEN METHODOLOGY</div>
            </div>

            <div className="supporting-process-card">
              <p className="process-card-quote">
                We focus on making your business stand{' '}
                <strong>out with work that's useful, flexible, and built for the long term.</strong>
              </p>
              <div className="process-card-badge">ENDURING IMPACT</div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LYNIQ-STYLE ARCHITECTURAL FOOTER (FROM BOTTOM-RIGHT PROTOTYPE REFERENCE)
          ========================================================================= */}
      <div className="footer-lyniq-style-wrapper">
        <div className="section-container footer-inner-grid">
          {/* Column 1: Master Brand Name & Tagline */}
          <div className="footer-col-brand">
            <div className="footer-huge-logo" onClick={scrollToTop}>
              <span className="brand-lyniq-font">NST STUDIO</span>
            </div>
            <p className="footer-brand-motto">
              Nikunj Storytelling Studio · A space for stories to take form.
            </p>
            <div className="footer-tagline-highlight">
              Story First. Always.
            </div>

            {/* Direct Contact */}
            <div className="footer-quick-contact">
              <div className="contact-line">📞 +91 8651178652</div>
              <div className="contact-line">✉ hello@nststudio.in</div>
              <div className="contact-line">📍 Pune & Mumbai, Maharashtra, India</div>
            </div>
          </div>

          {/* Column 2: Stay Connected Newsletter (from LYNIQ Ref) */}
          <div className="footer-col-newsletter">
            <div className="newsletter-title">Stay connected</div>
            <p className="newsletter-description">
              Join our newsletter and stay updated on the latest trends in digital design and brand storytelling.
            </p>

            {newsletterJoined ? (
              <div className="newsletter-success-tag">
                ✓ Thank you for subscribing to Nikunj Stories.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form-inline">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-arrow-btn" aria-label="Subscribe">
                  ↗
                </button>
              </form>
            )}

            <div className="newsletter-disclaimer">
              With NST, your company gets more than just a website. We design experiences
              that resonate with your customers and drive meaningful engagement.
            </div>
          </div>

          {/* Column 3: Site Navigation Columns */}
          <div className="footer-col-nav-links">
            <div className="nav-subcolumn">
              <div className="subcolumn-header">STUDIO</div>
              <button className="subcol-link" onClick={() => handleNav('hero-section')}>
                Home
              </button>
              <button className="subcol-link" onClick={() => handleNav('about-section')}>
                About NST
              </button>
              <button className="subcol-link" onClick={() => handleNav('projects-section')}>
                Projects
              </button>
              <button className="subcol-link" onClick={() => handleNav('what-we-offer')}>
                Services
              </button>
              <button className="subcol-link" onClick={() => handleNav('faq-section')}>
                FAQ
              </button>
              <button className="subcol-link" onClick={() => handleNav('contact-section')}>
                Contact
              </button>
            </div>

            <div className="nav-subcolumn">
              <div className="subcolumn-header">CONNECT</div>
              <a
                href="https://www.facebook.com/share/1HAfkeHAq5/"
                target="_blank"
                rel="noreferrer"
                className="subcol-link external"
              >
                Facebook ↗
              </a>
              <a
                href="https://www.instagram.com/nststudio.in"
                target="_blank"
                rel="noreferrer"
                className="subcol-link external"
              >
                Instagram ↗
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="subcol-link external"
              >
                Behance ↗
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="subcol-link external"
              >
                LinkedIn ↗
              </a>
              <button
                className="subcol-link highlight"
                onClick={() => onOpenDossier(1)}
              >
                Brand Dossier 📖
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="footer-copyright-bar">
          <div className="section-container copyright-inner">
            <span className="copyright-text">
              © 2026 NST STUDIO · Nikunj Storytelling Studio. All rights reserved.
            </span>

            <div className="footer-origin-pill">
              <span className="flag-dot">🇮🇳</span>
              <span>Made with Meaning in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
