import { Injectable, inject, signal, effect, DOCUMENT } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EPages } from './navigation-link.service';
import { ELanguage, LanguageService } from './language.service';
import { TextService } from './text.service';
import { T } from '../shared/constants/text.tokens';

// Must match the host in public/CNAME – the apex domain only 301-redirects here.
export const SITE_ORIGIN = 'https://www.shiatsupetrklic.com';
export const DEFAULT_LANGUAGE = ELanguage.Cs;
/** 1200×630 JPG shared on Facebook, WhatsApp etc. Pages can pass their own, see public/images/og */
export const DEFAULT_OG_IMAGE = 'images/og/preview_image_1200x630.jpg';

const OG_LOCALES: Record<ELanguage, string> = {
  [ELanguage.Cs]: 'cs_CZ',
  [ELanguage.En]: 'en_US',
};

type SeoText = T | (() => string);

export interface SeoPageConfig {
  page: EPages;
  /** Extra path segments after the page, e.g. 'details/TV-5' */
  subPath?: string;
  title: SeoText;
  description: SeoText;
  /** Pages that must not appear in search results (e.g. 404) */
  noindex?: boolean;
  /** Share image, path relative to the site root (1200×630 JPG); defaults to DEFAULT_OG_IMAGE */
  image?: string;
  /** Optional schema.org structured data for this page */
  jsonLd?: () => object | null;
}

/**
 * Keeps <head> (title, description, canonical, hreflang, Open Graph, Twitter, JSON-LD)
 * in sync with the current page and language. Everything is recomputed reactively,
 * so switching language updates the metadata without re-initializing the page.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private languageService = inject(LanguageService);
  private textService = inject(TextService);

  private pageSignal = signal<SeoPageConfig | null>(null);

  constructor() {
    effect(() => {
      const config = this.pageSignal();
      if (config) {
        this.apply(config);
      }
    });
  }

  setPage(config: SeoPageConfig) {
    this.pageSignal.set(config);
  }

  /** Absolute URL of a localized page. No trailing slash – matches routerLinks and the <route>.html snapshots. */
  getPageUrl(page: EPages, lang: ELanguage, subPath?: string): string {
    const path = [lang, page, subPath].filter(Boolean).join('/');
    return `${SITE_ORIGIN}/${path}`;
  }

  private apply(config: SeoPageConfig) {
    const lang = this.languageService.current;
    const title = this.resolve(config.title);
    const description = this.resolve(config.description);
    const url = this.getPageUrl(config.page, lang, config.subPath);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: config.noindex ? 'noindex, follow' : 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALES[lang] });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    const image = `${SITE_ORIGIN}/${(config.image ?? DEFAULT_OG_IMAGE).replace(/^\//, '')}`;
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.removeHeadElements("link[rel='canonical'], link[rel='alternate'][hreflang]");
    if (!config.noindex) {
      this.addLink({ rel: 'canonical', href: url });
      for (const alternateLang of Object.values(ELanguage)) {
        this.addLink({
          rel: 'alternate',
          hreflang: alternateLang,
          href: this.getPageUrl(config.page, alternateLang, config.subPath)
        });
      }
      this.addLink({
        rel: 'alternate',
        hreflang: 'x-default',
        href: this.getPageUrl(config.page, DEFAULT_LANGUAGE, config.subPath)
      });
    }

    this.removeHeadElements('script#page-structured-data');
    const jsonLd = config.jsonLd?.();
    if (jsonLd) {
      const script = this.document.createElement('script');
      script.id = 'page-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      this.document.head.appendChild(script);
    }
  }

  private resolve(text: SeoText): string {
    return typeof text === 'function' ? text() : this.textService.get(text);
  }

  // Snapshots already contain these elements, so remove before adding to avoid duplicates.
  private removeHeadElements(selector: string) {
    this.document.head.querySelectorAll(selector).forEach(element => element.remove());
  }

  private addLink(attributes: Record<string, string>) {
    const link = this.document.createElement('link');
    for (const [name, value] of Object.entries(attributes)) {
      link.setAttribute(name, value);
    }
    this.document.head.appendChild(link);
  }
}
