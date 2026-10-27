import React, { useState } from 'react';
import { LandText } from './LandText';

interface Offer {
  title: string;
  headline: string;
  description: string;
  process: string[];
  image: string;
}

const OFFERS: Offer[] = [
  {
    title: 'Complete Branding',
    headline: 'Build the brand before you build the noise.',
    description: 'We shape your story into a clear identity people can recognise, trust, and remember.',
    process: ['Strategy', 'Positioning', 'Naming', 'Logo', 'Visual Identity', 'Brand Guidelines'],
    image: '/brand/p51_0.jpg',
  },
  {
    title: 'Packaging',
    headline: 'Let your product tell its story before it is opened.',
    description:
      'We turn brand stories into packaging that attracts attention, communicates value, and stays memorable.',
    process: ['Packaging Strategy', 'Concept', 'Packaging Design', 'Label Design', 'Product Visuals', 'Print Artwork'],
    image: '/proto/offer-packaging.jpg',
  },
  {
    title: 'Campaigns',
    headline: 'Turn your story into a bigger conversation.',
    description:
      'We transform ideas into campaigns that capture attention and give your brand something meaningful to say.',
    process: ['Campaign Strategy', 'Big Idea', 'Creative Direction', 'Film', 'Social', 'Digital Ads', 'Outdoor'],
    image: '/brand/p45_0.jpg',
  },
  {
    title: 'Content &\nAdvertising',
    headline: 'Make the right people stop and notice.',
    description:
      'We create everyday communication that keeps your brand relevant, consistent, and connected to its audience.',
    process: ['Content Strategy', 'Social Media', 'Reels', 'Static Creatives', 'Paid Ads', 'Promotional Content'],
    image: '/brand/p47_0.jpg',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

export const WhatWeOfferSection: React.FC = () => {
  const [active, setActive] = useState(0);
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
          <div key={offer.title} className="offer__detail">
            <p className="offer__kicker">
              {pad(active + 1)} — {offer.title.replace('\n', ' ')}
            </p>
            <h3 className="offer__headline">{offer.headline}</h3>
            <p className="offer__desc">{offer.description}</p>
            <ol className="offer__process" aria-label="Process">
              {offer.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="offer__media">
          <img key={offer.image} src={offer.image} alt={offer.title.replace('\n', ' ')} decoding="async" />
        </div>
      </div>
    </section>
  );
};
