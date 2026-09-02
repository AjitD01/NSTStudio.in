/**
 * scrollStore — High-Performance Virtual Scroll Engine with Cartier-Style Chapter Snapping.
 * Ensures the camera flies cleanly from chamber to chamber without ever getting stuck in the middle.
 * 60fps locked, zero lag, silky smooth backward and forward navigation.
 */

export const TOTAL_CHAPTERS = 8;

export class ScrollManager {
  private static instance: ScrollManager;
  public target: number = 0;
  public current: number = 0;
  private listeners: Set<(progress: number, target: number) => void> = new Set();
  private isListening: boolean = false;
  private lastScrollTime: number = 0;

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

    // Cartier-style gesture snapping: each deliberate wheel flick advances/retreats a chamber
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = performance.now();
      // 400ms gesture throttle prevents runaway scrolling while feeling crisp and responsive
      if (now - this.lastScrollTime < 400) return;

      if (Math.abs(e.deltaY) > 15) {
        this.lastScrollTime = now;
        if (e.deltaY > 0) {
          // Inward flight to next chapter
          this.setTarget(Math.min(TOTAL_CHAPTERS - 1, Math.round(this.target) + 1));
        } else {
          // Outward flight back to previous chapter
          this.setTarget(Math.max(0, Math.round(this.target) - 1));
        }
      }
    };

    // Touch gestures for mobile/tablets
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const dy = touchStartY - touchEndY;
      if (Math.abs(dy) > 35) {
        if (dy > 0) {
          this.setTarget(Math.min(TOTAL_CHAPTERS - 1, Math.round(this.target) + 1));
        } else {
          this.setTarget(Math.max(0, Math.round(this.target) - 1));
        }
      }
    };

    // Keyboard navigation (Arrow keys, Space, PageUp/Down)
    const onKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        this.setTarget(Math.min(TOTAL_CHAPTERS - 1, Math.round(this.target) + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.setTarget(Math.max(0, Math.round(this.target) - 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.setTarget(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.setTarget(TOTAL_CHAPTERS - 1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);
  }

  public setTarget(index: number) {
    this.target = Math.max(0, Math.min(TOTAL_CHAPTERS - 1, index));
    this.notify();
  }

  public update(lerpFactor: number = 0.085): number {
    this.current += (this.target - this.current) * lerpFactor;
    // Snap when close to rest
    if (Math.abs(this.target - this.current) < 0.002) {
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
