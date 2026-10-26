import React from 'react';
import { navigate } from '../state/router';

export const HeroSection: React.FC = () => (
  <section id="hero-section" className="hero">
    <div className="hero__stars" aria-hidden="true" />

    <h1 className="hero__title">
      <span className="hero__line hero__line--light">New</span>
      <span className="hero__line hero__line--bold">
        DES<span className="hero__i">i</span>GN
      </span>
      <span className="hero__line hero__line--light">
        Era<span className="red-dot">.</span>
      </span>
    </h1>

    {/* Floating character appearing inside its beam of light */}
    <div className="hero__character" aria-hidden="true">
      <span className="hero__beam" />
      <span className="hero__rays" />
      <span className="hero__halo" />
      <img src="/nst/character/ch8.png" alt="" width="1303" height="1932" />
    </div>

    <button className="connect-btn" onClick={() => navigate('home', 'contact-section')}>
      <span>lets Connect</span>
      <svg className="connect-btn__arrow" viewBox="0 0 32 32" aria-hidden="true">
        <path className="connect-btn__shaft" d="M4 16h24" />
        <path d="M19 7l9 9-9 9" />
      </svg>
    </button>
  </section>
);
