import React, { useEffect, useState } from 'react';
import { scrollToSection, type Route } from '../state/router';
import { prefersReducedMotion } from '../hooks/useInView';

type Stage = 'idle' | 'land' | 'reveal';

const HASH: Record<Route, string> = {
  home: '#/',
  blog: '#/blog',
  about: '#/about',
  post: '#/blog/transparent-storytelling',
};
const LABEL: Record<Route, string> = { home: 'Home.', blog: 'Blog.', about: 'About Us.', post: 'Story First.' };

/**
 * Prototype "Page transition animation": the destination's name drops in letter by
 * letter and lands mid-screen, the dark background follows up behind it, the page
 * swaps underneath, then letters and background lift away to reveal it.
 */
export const PageTransition: React.FC = () => {
  const [stage, setStage] = useState<Stage>('idle');
  const [label, setLabel] = useState('');
  const [run, setRun] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const onNavigate = (e: Event) => {
      const { route, sectionId } = (e as CustomEvent<{ route: Route; sectionId?: string }>).detail;
      const current = window.location.hash || '#/';

      // In-page jumps on the same page don't need the transition.
      if (HASH[route] === current) {
        if (sectionId) scrollToSection(sectionId);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const swap = () => {
        window.location.hash = HASH[route];
        window.scrollTo({ top: 0 });
        if (sectionId) requestAnimationFrame(() => scrollToSection(sectionId));
      };

      if (prefersReducedMotion()) {
        swap();
        return;
      }

      timers.forEach(clearTimeout);
      setLabel(LABEL[route]);
      setRun((r) => r + 1);
      setStage('land');
      timers.push(setTimeout(() => { swap(); setStage('reveal'); }, 1250));
      timers.push(setTimeout(() => setStage('idle'), 2250));
    };

    window.addEventListener('nst:navigate', onNavigate);
    return () => {
      window.removeEventListener('nst:navigate', onNavigate);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={`page-curtain page-curtain--${stage}`} aria-hidden="true">
      <span className="page-curtain__bg" />
      {stage !== 'idle' && (
        <span key={run} className="page-curtain__word">
          {[...label].map((ch, i) => (
            <span
              key={i}
              className="page-curtain__char"
              style={{ '--i': i, '--r': `${((i * 37) % 23) - 11}deg` } as React.CSSProperties}
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </span>
      )}
    </div>
  );
};
