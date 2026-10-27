import React, { useState } from 'react';
import { navigate, type Route } from '../state/router';
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  STUDIO_EMAIL,
  STUDIO_PHONE_DISPLAY,
  WHATSAPP_NUMBER,
} from '../data/contact';

const PAGE_LINKS: { label: string; route: Route; sectionId?: string }[] = [
  { label: 'About', route: 'about' },
  { label: 'Service', route: 'home', sectionId: 'services-section' },
  { label: 'Projects', route: 'home', sectionId: 'projects-section' },
  { label: 'Blog', route: 'blog' },
  { label: 'FAQ', route: 'home', sectionId: 'faq-section' },
  { label: 'Contact', route: 'home', sectionId: 'contact-section' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: INSTAGRAM_URL },
  { label: 'Facebook', href: FACEBOOK_URL },
  { label: 'LinkedIn', href: LINKEDIN_URL },
];

/** Large logo block + "Hello / Namastey" sign-off — shown on the home page above the footer. */
export const SignOff: React.FC = () => (
  <>
    <section className="logo-block" aria-label="NST Studio">
      <span className="cross cross--logo" aria-hidden="true" />
      <img src="/proto/logo-dark.png" alt="NST Studio" loading="lazy" decoding="async" data-reveal />
    </section>

    <section className="hello">
      <p className="hello__text" data-reveal>
        Some of the Best
        <br />
        Stories Begin with
        <br />
        a Simple <span className="red">Hello</span> / <span className="red">Namastey</span>
      </p>
      <a className="hello__email" href={`mailto:${STUDIO_EMAIL}`} data-reveal style={{ transitionDelay: '450ms' }}>{STUDIO_EMAIL}</a>
    </section>
  </>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  // No newsletter backend yet: open a pre-addressed subscription email.
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href =
      `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent('Newsletter subscription')}` +
      `&body=${encodeURIComponent(`Please add ${email} to the NST newsletter.`)}`;
  };

  return (
    <footer className="footer">
      <div className="footer__top" data-reveal>
        <button className="footer__logo" onClick={() => navigate('home')} aria-label="NST Studio home">
          <img src="/proto/logo-light.png" alt="NST Studio" />
        </button>

        <div className="footer__news">
          <h2 className="footer__heading">Stay<br />connected</h2>
          <p className="footer__muted">Join our newsletter and stay updated on the latest stories from the studio.</p>
          <form className="footer__form" onSubmit={subscribe}>
            <input
              type="email"
              placeholder="E-mail"
              aria-label="E-mail"
              maxLength={160}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" aria-label="Subscribe">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </button>
          </form>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <ul>
            {PAGE_LINKS.map((link) => (
              <li key={link.label}>
                <button onClick={() => navigate(link.route, link.sectionId)}>{link.label}</button>
              </li>
            ))}
          </ul>
          <ul>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer__bottom" data-reveal>
        <div className="footer__contact">
          <a href={`tel:+${WHATSAPP_NUMBER}`}>{STUDIO_PHONE_DISPLAY}</a>
          <a className="footer__mail" href={`mailto:${STUDIO_EMAIL}`}>{STUDIO_EMAIL}</a>
          <span className="footer__muted">Pune &amp; Mumbai, Maharashtra, India</span>
        </div>
        <p className="footer__about">
          With NST, your brand gets more than just a design. We uncover the story behind it and
          build experiences that resonate with your customers and drive meaningful engagement.
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} NST Studio · Nikunj Storytelling Studio</p>
      </div>
    </footer>
  );
};
