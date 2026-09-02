import { create } from 'zustand';

export interface GuideInsight {
  title: string;
  speech: string;
  subtext: string;
}

export const CHAPTER_GUIDE_INSIGHTS: GuideInsight[] = [
  {
    title: 'THE PROLOGUE',
    speech: 'Welcome to NST Studio. I am your guide through our atelier.',
    subtext: 'Scroll or swipe to turn each page and explore our craft from every angle.',
  },
  {
    title: 'THE FOUR UNIVERSES',
    speech: 'Listen closely: four distinct cinematic disciplines, woven into one voice.',
    subtext: 'Branding, production, post-finishing, and cultural storytelling.',
  },
  {
    title: 'THE SACRED MARK',
    speech: 'The Letter N meets the posture of devotion. Every line holds intention.',
    subtext: 'Inspired by classical lore, modern geometry, and cinematic light.',
  },
  {
    title: 'THE ATELIER STANDARDS',
    speech: 'Deep onyx, sacred crimson (#FF2222), and enduring typography.',
    subtext: 'Purity in proportion, luxury in restraint.',
  },
  {
    title: 'TACTILE COLLATERALS',
    speech: 'Feel the weight of physical paper, wax seals, and bespoke printcraft.',
    subtext: 'Digital excellence grounded in real-world tactile artifacts.',
  },
  {
    title: 'LIVING SOCIAL ARCHIVE',
    speech: 'Stories told across digital horizons, festival premieres, and cultural moments.',
    subtext: 'A campaign is noticed; a genuine story is remembered.',
  },
  {
    title: 'PRIVATE COMMISSION',
    speech: 'Let us build your next visual legacy together.',
    subtext: 'Our ateliers in Pune and Mumbai welcome visionary creators.',
  },
  {
    title: 'MAISON EPILOGUE',
    speech: 'From local roots to the global screen. Our journey has only begun.',
    subtext: 'Explore the full Brand Dossier or reach out directly to the studio.',
  },
];

interface GuideState {
  isOpen: boolean;
  activeChapter: number;
  pulseCounter: number;
  isHovered: boolean;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  setActiveChapter: (chapter: number) => void;
  triggerPulse: () => void;
  setHovered: (hovered: boolean) => void;
}

export const useGuideStore = create<GuideState>((set) => ({
  isOpen: true,
  activeChapter: 0,
  pulseCounter: 0,
  isHovered: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
  setActiveChapter: (chapter) => set({ activeChapter: chapter }),
  triggerPulse: () => set((state) => ({ pulseCounter: state.pulseCounter + 1 })),
  setHovered: (hovered) => set({ isHovered: hovered }),
}));
