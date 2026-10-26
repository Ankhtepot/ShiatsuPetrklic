import {Directive, ElementRef, OnDestroy, Renderer2, booleanAttribute, inject, input, numberAttribute, afterNextRender} from '@angular/core';

/**
 * Pop-in effect: the element fades and slides into place the first time it is scrolled into view.
 *
 * Usage: `<app-button-faq popIn />`, `<app-x [popIn]="isFancy" />`, optional stagger: `popIn popInDelay="120"` (ms).
 *
 * Progressive enhancement: the element is hidden only in the browser, after hydration, and only if it is below
 * the fold. Prerendered HTML (and crawlers, no-JS visitors, reduced-motion users) always see the content.
 * The styles live in styles/_pop-in.scss.
 */
@Directive({
  selector: '[popIn]',
  standalone: true,
})
export class PopInDirective implements OnDestroy {
  readonly popIn = input(true, {transform: booleanAttribute});
  readonly popInDelay = input(0, {transform: numberAttribute});

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => this.init());
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private init() {
    if (!this.popIn()
      || typeof IntersectionObserver === 'undefined'
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Already on screen at load (e.g. top of the page): leave it alone, no flash of hidden content
    const rect = this.host.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      return;
    }

    // Transforms need a box; custom elements are inline by default
    if (getComputedStyle(this.host).display === 'inline') {
      this.renderer.setStyle(this.host, 'display', 'block');
    }
    this.renderer.setStyle(this.host, '--pop-in-delay', `${this.popInDelay()}ms`);
    this.renderer.addClass(this.host, 'pop-in');

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.renderer.addClass(this.host, 'pop-in--visible');
        this.observer?.disconnect();
      }
    }, {threshold: 0.1, rootMargin: '0px 0px -8% 0px'});
    this.observer.observe(this.host);
  }
}
