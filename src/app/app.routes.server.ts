import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { ELanguage } from './services/language.service';
import { getEvents } from './shared/data/events';

// Defines which routes `ng build` prerenders into static HTML (see outputMode "static" in angular.json).
// Everything not prerendered is rendered in the browser via 404.html (see postbuild.ts).

const languageParams = async () => Object.values(ELanguage).map(lang => ({ lang }));

const prerenderedPages = [
  'home',
  'about-me',
  'contact',
  'dance-tantra',
  'events',
  'testimonials',
  'not-found',
  // old URLs, prerendered as redirect pages
  'tanec-tantra',
  'services',
];

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  ...prerenderedPages.map((page): ServerRoute => ({
    path: `:lang/${page}`,
    renderMode: RenderMode.Prerender,
    getPrerenderParams: languageParams,
  })),
  {
    path: ':lang/events/details/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    getPrerenderParams: async () =>
      Object.values(ELanguage).flatMap(lang => getEvents().map(event => ({ lang, id: event.id }))),
  },
  // Hidden pages (pricing, dolinka-tribe) and unknown URLs stay client-rendered, as before.
  { path: '**', renderMode: RenderMode.Client },
];
