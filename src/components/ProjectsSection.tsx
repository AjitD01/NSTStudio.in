import React, { useEffect, useRef, useState } from 'react';
import { LandText } from './LandText';

interface Folder {
  tab: string;
  tone: 'white' | 'charcoal' | 'graphite' | 'red';
  image: string;
  caption: string;
}

const CAPTION = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh';

const FOLDERS: Folder[] = [
  { tab: 'Campaign', tone: 'white', image: '/proto/project-campaign.jpg', caption: CAPTION },
  { tab: 'Branding', tone: 'charcoal', image: '/brand/p57_0.jpg', caption: CAPTION },
  { tab: 'Campaign', tone: 'graphite', image: '/brand/p51_0.jpg', caption: CAPTION },
  { tab: 'Packaging', tone: 'red', image: '/brand/p59_0.jpg', caption: CAPTION },
];

/**
 * Projects as a stack of file folders. Scrolling through the pinned section (or clicking
 * a tab) opens the next folder; its photo ascends into place ("Ascending animation").
 */
export const ProjectsSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(Math.max(-rect.top / travel, 0), 0.999);
      setActive(Math.floor(progress * FOLDERS.length));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openFolder = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const travel = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * (i + 0.5)) / FOLDERS.length, behavior: 'smooth' });
  };

  return (
    <section id="projects-section" className="projects">
      <div ref={trackRef} className="projects__track" style={{ height: `${FOLDERS.length * 75 + 25}vh` }}>
        <div className="projects__pin">
          <span className="cross cross--projects" aria-hidden="true" />
          <h2 className="heading-xl projects__title land-heading" data-reveal>
            <LandText text="Projects" />
            <span className="red-dot land__dot">.</span>
          </h2>

          <div className="folders">
            {FOLDERS.map((folder, i) => (
              <article
                key={`${folder.tab}-${i}`}
                className={`folder folder--${folder.tone} ${i === active ? 'is-open' : ''} ${i < active ? 'is-past' : ''}`}
              >
                <button
                  className="folder__tab"
                  onClick={() => openFolder(i)}
                  aria-expanded={i === active}
                  aria-label={`Open ${folder.tab} project`}
                >
                  <span>{folder.tab}</span>
                </button>
                <div className="folder__sheet">
                  <img src={folder.image} alt={`${folder.tab} project`} decoding="async" />
                  <p className="folder__caption">{folder.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
