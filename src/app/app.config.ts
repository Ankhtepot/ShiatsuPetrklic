import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';

import {routerOptions, routes} from './app.routes';
import {ScreenService} from './services/screen.service';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {LanguageService} from './services/language.service';
import {provideMarkdown} from 'ngx-markdown';

function preloadTranslations(langService: LanguageService): () => Promise<void> {
  return () => langService.loadInitialLanguage();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    // Reuse the prerendered HTML instead of re-rendering it; also reuses HTTP responses (translations, markdown) fetched at build time
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withRouterConfig(routerOptions)),
    provideMarkdown(),
    ScreenService,
    {
      provide: APP_INITIALIZER, // Leaving this as APP_INITIALIZER to ensure translations are loaded before the app starts, even deprecated, its cleanest way to do it for now
      useFactory: preloadTranslations,
      deps: [LanguageService],
      multi: true
    }
  ]
};
