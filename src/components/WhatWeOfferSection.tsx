import React, { useState } from 'react';
import { LandText } from './LandText';

interface Offer {
  title: string;
  description: string;
  image: string;
}

const OFFERS: Offer[] = [
  {
    title: 'Branding & Identity',
    description:
      'We craft bold, memorable brand identities that tell your story and leave a lasting impression. From logos to full brand guidelines, we ensure consistency and impact across all touchpoints.',
    image: '/proto/offer-branding.jpg',
  },
  {
    title: 'Web Design &\nDevelopment',
    description:
      'Stunning, high-performance websites tailored to your brand. We design sleek, user-friendly interfaces and develop responsive, fast-loading sites that captivate and convert.',
    image: '/proto/offer-web.jpg',
  },
  {
    title: 'UI/UX Design',
    description:
      'Intuitive, human-centered interfaces that feel natural and effortless. We map every journey, prototype every interaction, and design systems that delight and convert.',
    image: '/proto/offer-uiux.jpg',
  },
  {
    title: 'Motion & Visual Design',
    description:
      'Kinetic typography, character animation and cinematic visuals that bring your story to life and command attention on every screen.',
    image: '/brand/p57_0.jpg',
  },
];

export const WhatWeOfferSection: React.FC = () => {
  // The prototype shows "Web Design & Development" as the active row.
  const [active, setActive] = useState(1);
  const offer = OFFERS[active];

  return (
    <section id="what-we-offer" className="offer">
      <div className="offer__head">
        <h2 className="offer__title land-heading" data-reveal>
          <LandText text="What we offer." />
        </h2>
        <p className="offer__intro" data-reveal>
          We specialize in creating bold, meaningful
          <br />
          digital experiences that set brands apart.
        </p>
      </div>

      <div className="offer__body" data-reveal>
        <ol className="offer__list">
          {OFFERS.map((item, i) => (
            <li key={item.title}>
              <button
                className={`offer__row ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={i === active}
              >
                <span className="offer__num">{i + 1}.</span>
                <span className="offer__name">{item.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="offer__card">
          <p key={offer.title} className="offer__desc">{offer.description}</p>
        </div>

        <div className="offer__media">
          <img key={offer.image} src={offer.image} alt={offer.title} decoding="async" />
        </div>
      </div>
    </section>
  );
};
