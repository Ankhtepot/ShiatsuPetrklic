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
import {LangService} from './services/language.service';

function preloadTranslations(langService: LangService): () => Promise<void> {
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
      provide: APP_INITIALIZER,
      useFactory: preloadTranslations,
      deps: [LangService],
      multi: true
    }
  ]
};
