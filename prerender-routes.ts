import { getEvents } from './src/app/shared/data/events';

// Must match the host in public/CNAME – the apex domain only 301-redirects there.
export const SITE_ORIGIN = 'https://www.shiatsupetrklic.com';
export const LANGUAGES = ['cs', 'en'] as const;
export const DEFAULT_LANGUAGE = 'cs';

/** Localized pages listed in sitemap.xml (paths after /:lang/). */
const indexablePages: string[] = [
  'home',
  'about-me',
  'dance-tantra',
  'testimonials',
  'events',
  'contact',
  ...getEvents().map(event => `events/details/${event.id}`),
];

/** Localized pages that are prerendered but kept out of the sitemap (they are noindex). */
const hiddenPages: string[] = [
  'not-found',
];

export interface PrerenderRoute {
  path: string;
  lang?: string;
  /** Path after /:lang/, used to build hreflang alternates in the sitemap */
  page?: string;
  inSitemap: boolean;
}

const localized = (pages: string[], inSitemap: boolean): PrerenderRoute[] =>
  LANGUAGES.flatMap(lang => pages.map(page => ({ path: `/${lang}/${page}`, lang, page, inSitemap })));

export const routesToPrerender: PrerenderRoute[] = [
  { path: '/', inSitemap: false },
  ...localized(indexablePages, true),
  ...localized(hiddenPages, false),
];
