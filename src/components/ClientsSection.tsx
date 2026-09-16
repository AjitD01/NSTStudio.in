import React from 'react';

interface ClientTile {
  id: string;
  name: string;
  category: string;
}

const CLIENT_TILES: ClientTile[] = [
  { id: 'ipsum', name: 'IPSUM', category: 'GLOBAL MEDIA' },
  { id: 'logo1', name: 'LOGO', category: 'VENTURE & TECH' },
  { id: 'loco', name: 'LOCO', category: 'CINEMA LABS' },
  { id: 'arpeggio', name: 'ARPEGGIO', category: 'ACOUSTIC HARDWARE' },
  { id: 'lyniq', name: 'LYNIQ', category: 'SPATIAL ARCHITECTURE' },
  { id: 'urban', name: 'URBAN VELOCITY', category: 'EV MOBILITY' },
  { id: 'indigo', name: 'INDIGO CORE', category: 'AI INFRASTRUCTURE' },
  { id: 'nexus', name: 'NEXUS', category: 'CREATIVE COMMONS' },
];

export const ClientsSection: React.FC = () => {
  // Duplicate for seamless infinite marquee scroll
  const marqueeList = [...CLIENT_TILES, ...CLIENT_TILES, ...CLIENT_TILES];

  return (
    <section className="prototype-clients-section">
      <div className="section-container">
        {/* Prototype Heading: Our Valued Clients . */}
        <div className="clients-heading-wrapper">
          <h2 className="clients-main-title">
            Our Valued Clients <span className="text-red-accent">.</span>
          </h2>
          <div className="clients-scroll-note">
            <span>Automatic scroll on repeat</span>
            <span className="note-arrow">↑</span>
          </div>
        </div>

        {/* Prototype: 3D Dark Slabs / Marquee Track */}
        <div className="clients-marquee-viewport">
          <div className="clients-marquee-track">
            {marqueeList.map((client, idx) => (
              <div key={`${client.id}-${idx}`} className="client-3d-slab">
                <div className="slab-inner">
                  <div className="slab-logo-name">{client.name}</div>
                  <div className="slab-category-tag">{client.category}</div>
                  <div className="slab-edge-glow" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="clients-swipe-annotation">
          <span className="swipe-arrow">←</span>
          <span>swipe animation</span>
        </div>
      </div>
    </section>
  );
};
