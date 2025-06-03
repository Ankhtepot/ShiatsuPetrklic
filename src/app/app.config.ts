import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';

import {routerOptions, routes} from './app.routes';
import {ScreenService} from './services/screen.service';
import {provideHttpClient} from '@angular/common/http';
import {LanguageService} from './services/language.service';

function preloadTranslations(langService: LanguageService): () => Promise<void> {
  return () => langService.loadInitialLanguage();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withRouterConfig(routerOptions)),
    ScreenService,
    {
      provide: APP_INITIALIZER, // Leaving this as APP_INITIALIZER to ensure translations are loaded before the app starts, even deprecated, its cleanest way to do it for now
      useFactory: preloadTranslations,
      deps: [LanguageService],
      multi: true
    }
  ]
};
