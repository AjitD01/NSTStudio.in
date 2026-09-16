/**
 * scrollStore — Smooth Scroll Engine for Vertical Agency Experience.
 * Binds seamlessly to continuous document scroll while keeping 60fps lerped camera smoothing.
 */

export const TOTAL_SECTIONS = 8;
export const TOTAL_CHAPTERS = 8; // Backward compatibility

export class ScrollManager {
  private static instance: ScrollManager;
  public target: number = 0;
  public current: number = 0;
  private listeners: Set<(progress: number, target: number) => void> = new Set();
  private isListening: boolean = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  public static getInstance(): ScrollManager {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  private init() {
    if (this.isListening) return;
    this.isListening = true;

    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const fraction = Math.max(0, Math.min(1, scrollY / maxScroll));
      this.target = fraction * (TOTAL_SECTIONS - 1);
      this.notify();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial sync
    setTimeout(onScroll, 50);
  }

  public setTarget(index: number) {
    this.target = Math.max(0, Math.min(TOTAL_SECTIONS - 1, index));
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const targetScrollY = (this.target / (TOTAL_SECTIONS - 1)) * maxScroll;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    this.notify();
  }

  public scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -70; // Header offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  public update(lerpFactor: number = 0.075): number {
    this.current += (this.target - this.current) * lerpFactor;
    if (Math.abs(this.target - this.current) < 0.001) {
      this.current = this.target;
    }
    this.notify();
    return this.current;
  }

  public subscribe(cb: (progress: number, target: number) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.current, this.target));
  }
}

export const scrollManager = ScrollManager.getInstance();

