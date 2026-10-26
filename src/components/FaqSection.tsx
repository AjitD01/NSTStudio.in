import React, { useState } from 'react';
import { navigate } from '../state/router';
import { LandText } from './LandText';

const FAQS = [
  {
    q: 'How long does a project take?',
    a: 'A brand identity engagement typically spans 4 to 6 weeks: immersion, narrative strategy, logomark exploration, colour and typography, and the final brand guideline.',
  },
  {
    q: 'Can I update the site myself?',
    a: 'Yes. We build with clean, documented components and simple content management so your team can keep the site fresh with confidence.',
  },
  {
    q: 'Do I need to have a brand before starting?',
    a: 'Not at all. Many partnerships begin with just an idea and one question: “What is the story?” We build the brand from the ground up.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. We collaborate remotely with brands worldwide and run review loops in your timezone.',
  },
  {
    q: 'What does a project cost?',
    a: 'Every story is different. Share a few details through “Begin your Story” and we’ll come back with a tailored proposal.',
  },
];

export const FaqSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq-section" className="faq">
      <div className="faq__left" data-reveal>
        <h2 className="faq__title land-heading">
          <LandText text="FAQ" />
        </h2>
        <div className="query-card">
          <p className="query-card__text">Your querry<br />not here ?</p>
          <img className="query-card__figure" src="/nst/character/ch3.png" alt="" aria-hidden="true" />
          <button className="query-card__btn" onClick={() => navigate('home', 'contact-section')}>Ask your</button>
        </div>
      </div>

      <div className="faq__right" data-reveal style={{ transitionDelay: '450ms' }}>
        <h3 className="faq__lead">
          Before you start, here are some of the <span className="muted">things most clients want to know.</span>
        </h3>
        {/* Independently scrolling question list ("seperate scroll") */}
        <div className="faq__list" tabIndex={0} aria-label="Frequently asked questions">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button className="faq-item__q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span>{item.q}</span>
                  <span className="faq-item__icon" aria-hidden="true">+</span>
                </button>
                <div className="faq-item__a">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
