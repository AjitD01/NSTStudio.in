import { useEffect, useState } from 'react';

export type Route = 'home' | 'blog' | 'about' | 'post';

const ROUTES: Record<string, Route> = {
  '': 'home',
  '#/': 'home',
  '#/blog': 'blog',
  '#/about': 'about',
  '#/blog/transparent-storytelling': 'post',
};

const readRoute = (): Route => ROUTES[window.location.hash] ?? 'home';

/** Hash router: '#/blog', '#/blog/<post>' and '#/about' are separate pages, everything else is home. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

/**
 * Navigate to a page or a home-page section. The page-transition curtain listens for
 * this event, covers the screen, then performs the actual hash change underneath it.
 */
export function navigate(route: Route, sectionId?: string) {
  window.dispatchEvent(new CustomEvent('nst:navigate', { detail: { route, sectionId } }));
}

export function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
