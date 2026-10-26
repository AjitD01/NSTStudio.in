import React, { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

/**
 * "NST is a Creative Studio shaping Your Brand Story and Daring ideas" plays first,
 * then resolves into the final statement once the section is in view.
 */
export const StudioStatement: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.45);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (!inView) return undefined;
    const t = setTimeout(() => setResolved(true), 2200);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section ref={ref} className={`statement ${inView ? 'is-visible' : ''} ${resolved ? 'is-resolved' : ''}`}>
      <img className="statement__reel statement__reel--a" src="/proto/reel-a.svg" width="382" height="410" alt="" aria-hidden="true" />
      <img className="statement__reel statement__reel--b" src="/proto/reel-b.svg" width="382" height="410" alt="" aria-hidden="true" />
      <span className="cross cross--s1" aria-hidden="true" />
      <span className="cross cross--s2" aria-hidden="true" />
      <span className="cross cross--s3" aria-hidden="true" />

      <p className="statement__text statement__text--first" aria-hidden={resolved}>
        NST is a Creative Studio
        <br />
        shaping Your Brand Story
        <br />
        and Daring ideas
      </p>
      <p className="statement__text statement__text--final" aria-hidden={!resolved}>
        NST is a <strong>Creative Studio</strong>,
        <br />
        Trusted By Brands who
        <br />
        aren’t Afraid to <strong>Standout.</strong>
      </p>
    </section>
  );
};
