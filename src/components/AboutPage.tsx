import React from 'react';
import { navigate } from '../state/router';
import { LandText } from './LandText';

export const AboutPage: React.FC = () => (
  <main className="page page--about">
    <div className="page__band" />
    <section className="about">
      <h1 className="heading-xl about__title land-heading" data-reveal>
        <LandText text="About Us" />
        <span className="red-dot land__dot">.</span>
      </h1>

      <div className="about__grid">
        <div className="about__col" data-reveal>
          <p className="about__lead">
            NST — Nikunj Storytelling Studio — is built around one belief: <strong>Story First.</strong>
          </p>
          <p>
            We work across branding, film, animation, and creative storytelling — but the medium is
            never where we begin. We begin with a question: <em>What is the story?</em>
          </p>
          <p>
            The reason a brand exists. The thought behind an idea. The memory that shaped a business.
            The feeling people should carry with them. We uncover that story, give it direction, and
            then build the visual and verbal world around it.
          </p>
          <p className="about__pull">
            Design can make something noticed. <span className="red">Meaning is what makes it remembered.</span>
          </p>
        </div>

        <div className="about__col" data-reveal style={{ transitionDelay: '450ms' }}>
          <p className="about__kicker">निकुञ्ज · Nikunj</p>
          <p>
            Every story needs a place to begin. For us, that place is Nikunj — a Sanskrit word for a
            grove: a quiet, meaningful space where beauty, imagination, and connection exist together.
          </p>
          <p>
            Our inspiration comes from India’s rich tradition of storytelling — stories that have
            travelled through generations carrying emotion, imagination, wisdom, and meaning. NST
            brings that spirit into the contemporary world.
          </p>
          <p>
            A brand can have a logo. A film can have beautiful frames. An animation can have movement.
            But behind all of them, there should be something worth telling. That is where NST begins.
          </p>
          <button className="connect-btn connect-btn--inline" onClick={() => navigate('home', 'contact-section')}>
            <span>Begin your Story</span>
            <svg className="connect-btn__arrow" viewBox="0 0 32 32" aria-hidden="true">
              <path className="connect-btn__shaft" d="M4 16h24" />
              <path d="M19 7l9 9-9 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </main>
);
