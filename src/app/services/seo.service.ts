import { Injectable, inject, signal, effect } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavigationLinkService, EPages } from './navigation-link.service';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleSignal = signal<string>('Shiatsu Brno – Petrklíč');
  private descriptionSignal = signal<string>('Traditional Shiatsu therapy in Brno with a holistic approach to well-being.');
  private navLinks = inject(NavigationLinkService);

  constructor(private title: Title, private meta: Meta) {
    effect(() => {
      this.title.setTitle(this.titleSignal());
      this.meta.updateTag({ name: 'description', content: this.descriptionSignal() });
    });
  }

  updateTitle(title: string) {
    this.titleSignal.set(title);
  }

  updateDescription(description: string) {
    this.descriptionSignal.set(description);
  }

  setSeo({ title, description }: { title?: string; description?: string }) {
    if (title) this.updateTitle(title);
    if (description) this.updateDescription(description);
  }

  /**
   * Set canonical URL using EPages enum (localized)
   */
  setCanonicalPage(page: EPages, anchor?: string) {
    const path = this.navLinks.getPageLink(page, anchor);
    const canonicalUrl = `https://shiatsupetrklic.com${path}`;
    this.setCanonicalUrl(canonicalUrl);
  }

  /**
   * Set canonical URL with absolute string
   */
  setCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
