import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  constructor(private router: Router) {
    this.listenForRouteChanges();
  }

  private listenForRouteChanges() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.sendPageView(event.urlAfterRedirects);
      });
  }

  private sendPageView(url: string) {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-FEB23YPPSV', {
        page_path: url
      });
    }
  }
}
