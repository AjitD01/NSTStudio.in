import React from 'react';
import { LandText } from './LandText';

export const ServicesSection: React.FC = () => (
  <section id="services-section" className="service">
    <h2 className="heading-xl service__title land-heading" data-reveal>
      <LandText text="Service" />
      <span className="red-dot land__dot">.</span>
    </h2>
    <div className="service__image" data-reveal>
      <img
        src="/proto/service-arpeggio.jpg"
        alt="Hand holding an NST Studio Pro Plan membership card"
        width="3840"
        height="1750"
        decoding="async"
      />
    </div>
  </section>
);
