import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

export type SCREEN_BREAKPOINTS = 'xs' | "sm" | "md" | "lg" | "xl" | "xxl";

@Injectable()
export class ScreenService {
  private lastScrollY = window.scrollY;
  private resizeTimeout: any = null;
  private lastMediaBreakpoint = '';

  // Signals
  private _screenWidth: WritableSignal<number> = signal(-1);
  screenWidth: Signal<number> = this._screenWidth.asReadonly();

  private _mediaBreakpoint: WritableSignal<SCREEN_BREAKPOINTS> = signal('xxl');
  mediaBreakpoint: Signal<SCREEN_BREAKPOINTS> = this._mediaBreakpoint.asReadonly();

  private _scrolledUp: WritableSignal<boolean> = signal(false);
  scrolledUp: Signal<boolean> = this._scrolledUp.asReadonly();

  private _scrolledDown: WritableSignal<boolean> = signal(false);
  scrolledDown: Signal<boolean> = this._scrolledDown.asReadonly();

  private _scrolledToTop: WritableSignal<boolean> = signal(false);
  scrolledToTop: Signal<boolean> = this._scrolledToTop.asReadonly();

  private _headerVisibility: WritableSignal<boolean> = signal(true);
  headerVisibilityChanged: Signal<boolean> = this._headerVisibility.asReadonly();

  constructor() {
    this.initResize();
    this.initScroll();
    this._setScreenWidth(window.innerWidth);
    this._setMediaBreakpoint(window.innerWidth);
  }

  // Scroll Handling
  private initScroll() {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      const isScrollingDown = currentScrollY > this.lastScrollY && this.lastScrollY !== 0;
      const isScrollingUp = currentScrollY < this.lastScrollY;
      const isAtTop = currentScrollY === 0;

      this._scrolledDown.set(isScrollingDown);
      this._scrolledUp.set(isScrollingUp);
      this._scrolledToTop.set(isAtTop);

      this.lastScrollY = currentScrollY;
    });
  }

  // Resize Handling
  private initResize() {
    window.addEventListener('resize', (event: UIEvent) => {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        const width = (event.target as Window).innerWidth;
        this._setScreenWidth(width);
        this._setMediaBreakpoint(width);
      }, 1000);
    });
  }

  private _setScreenWidth(width: number): void {
    this._screenWidth.set(width);
  }

  private _setMediaBreakpoint(width: number): void {
    let newBreakpoint: SCREEN_BREAKPOINTS;

    if (width < 576) newBreakpoint = 'xs';
    else if (width < 768) newBreakpoint = 'sm';
    else if (width < 992) newBreakpoint = 'md';
    else if (width < 1200) newBreakpoint = 'lg';
    else if (width < 1600) newBreakpoint = 'xl';
    else newBreakpoint = 'xxl';

    if (newBreakpoint !== this.lastMediaBreakpoint) {
      this._mediaBreakpoint.set(newBreakpoint);
      this.lastMediaBreakpoint = newBreakpoint;
    }
  }

  // Used by header to set visibility
  setHeaderVisibility(visible: boolean): void {
    this._headerVisibility.set(visible);
  }
}
