import React, { useEffect, useState } from 'react';
import { navigate, type Route } from '../state/router';

const INSTAGRAM_URL = 'https://www.instagram.com/nststudio.in/';
const LINKEDIN_URL = 'https://www.linkedin.com';

const MENU_LINKS: { label: string; route: Route; sectionId?: string }[] = [
  { label: 'Home', route: 'home' },
  { label: 'Projects', route: 'home', sectionId: 'projects-section' },
  { label: 'About', route: 'about' },
  { label: 'Blog', route: 'blog' },
  { label: 'Contact', route: 'home', sectionId: 'contact-section' },
];

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (route: Route, sectionId?: string) => {
    setMenuOpen(false);
    navigate(route, sectionId);
  };

  return (
    <>
      <header className="site-header">
        <button className="site-header__logo" onClick={() => go('home')} aria-label="NST Studio home">
          <img src="/proto/logo-light.png" alt="NST Studio" />
        </button>

        <nav className="site-header__nav" aria-label="Primary">
          <button className="nav-link" onClick={() => go('blog')}>Blogs</button>
          <button className="nav-link" onClick={() => go('home', 'services-section')}>Service</button>
          <span className="nav-link nav-social">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">In</a>
            <span className="nav-social__sep">|</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
          </span>
          {/* "+" icon morphs into "=" on hover, then opens the floating menu */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="menu-toggle__bar menu-toggle__bar--a" />
            <span className="menu-toggle__bar menu-toggle__bar--b" />
          </button>
        </nav>
      </header>

      {/* Floating "US !" speech bubble → About Us */}
      <button className="us-bubble" onClick={() => go('about')} aria-label="About Us">
        <svg viewBox="0 0 120 124" aria-hidden="true">
          <path d="M60 4a56 56 0 1 1-17 109.4L26 122l5-17A56 56 0 0 1 60 4Z" fill="#FF2222" />
        </svg>
        <span>US !</span>
      </button>

      <div
        className={`floating-menu ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      >
        <div className="floating-menu__panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Menu">
          <div className="floating-menu__media">
            <ul className="floating-menu__links">
              {MENU_LINKS.map((link, i) => (
                <li key={link.label} style={{ transitionDelay: `${120 + i * 60}ms` }}>
                  <button tabIndex={menuOpen ? 0 : -1} onClick={() => go(link.route, link.sectionId)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="floating-menu__aside">
            <button
              className="floating-menu__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              tabIndex={menuOpen ? 0 : -1}
            >
              <span />
              <span />
            </button>
            <p className="floating-menu__copy">
              Working with NST means every brand begins with its story. We uncover it,
              give it direction, and build the visual and verbal world around it.
            </p>
            <div className="floating-menu__social">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>Instagram</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
