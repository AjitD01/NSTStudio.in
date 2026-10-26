import React from 'react';
import { LandText } from './LandText';

const LOGOS = ['/proto/client-ipsum.svg', '/proto/client-logo-a.svg', '/proto/client-loco.svg'];

// One repeating unit of the checkerboard: black tiles alternate between the two rows.
const PATTERN = [
  { top: true, logo: 0 },
  { top: false, logo: 1 },
  { top: true, logo: 2 },
  { top: false, logo: 0 },
  { top: true, logo: 1 },
  { top: false, logo: 2 },
];

const Tile: React.FC<{ logo: number; offset: number }> = ({ logo, offset }) => (
  <div className="client-tile">
    {/* Logos inside each tile scroll upward on repeat */}
    <div className="client-tile__reel" style={{ animationDelay: `${-offset * 1.3}s` }}>
      {[0, 1, 2, 0].map((step, i) => (
        <img key={i} src={LOGOS[(logo + step) % LOGOS.length]} alt="" loading="lazy" decoding="async" />
      ))}
    </div>
  </div>
);

export const ClientsSection: React.FC = () => (
  <section className="clients" aria-label="Our valued clients">
    <h2 className="clients__title land-heading" data-reveal>
      <LandText text="Our Valued Clients" />
      <span className="red-dot red-dot--spaced land__dot">.</span>
    </h2>

    {/* Checkerboard swipes sideways on an endless loop */}
    <div className="clients__viewport">
      <div className="clients__track">
        {[0, 1].map((copy) => (
          <div key={copy} className="clients__set" aria-hidden={copy === 1}>
            {PATTERN.map((cell, i) => (
              <div key={i} className="clients__col">
                {cell.top ? <Tile logo={cell.logo} offset={i} /> : <div className="client-gap" />}
                {cell.top ? <div className="client-gap" /> : <Tile logo={cell.logo} offset={i} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);
