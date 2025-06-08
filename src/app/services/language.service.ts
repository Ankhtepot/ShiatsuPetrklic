import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { T } from '../shared/constants/text.tokens';

export enum ELanguage {
  Cs = 'cs',
  En = 'en'
}

const SUPPORTED_LANGUAGES = Object.values(ELanguage);
type Language = ELanguage;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly languageSignal = signal<Language>(ELanguage.Cs);
  readonly language = computed(() => this.languageSignal());

  private translations = signal<Map<T, string>>(new Map());
  readonly t = computed(() => this.translations());

  private loadedLanguages = new Map<Language, Map<T, string>>();

  constructor(private http: HttpClient) {
    this.loadTranslations(this.languageSignal());
  }

  setLang(language: Language) {
    if (SUPPORTED_LANGUAGES.includes(language)) {
      this.languageSignal.set(language);
      document.documentElement.lang = language;
      this.loadTranslations(language);
    }
  }

  async loadInitialLanguage(): Promise<void> {
    const map = await this.fetchTranslations(this.languageSignal());
    this.translations.set(map);
  }

  get current(): Language {
    return this.languageSignal();
  }

  getText(key: T): string {
    const current = this.translations().get(key);
    if (current) return current;

    const fallbackMap = this.loadedLanguages.get(ELanguage.Cs);
    const fallback = fallbackMap?.get(key);
    return fallback ?? key.toString();
  }

  private loadTranslations(language: Language) {
    if (this.loadedLanguages.has(language)) {
      this.translations.set(this.loadedLanguages.get(language)!);
    } else {
      this.fetchTranslations(language).then(map => this.translations.set(map));
    }
  }

  private async fetchTranslations(language: Language): Promise<Map<T, string>> {
    if (this.loadedLanguages.has(language)) {
      return this.loadedLanguages.get(language)!;
    }

    const baseHref = document.getElementsByTagName('base')[0]?.href || '';
    const data = await firstValueFrom(
      this.http.get<Record<string, string>>(`${baseHref}languages/${language}.json`)
    );

    const map = new Map<T, string>();
    for (const key in data) {
      if (Object.values(T).includes(key as T)) {
        map.set(key as T, data[key]);
      }
    }

    this.loadedLanguages.set(language, map);
    return map;
  }
}
