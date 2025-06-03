import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { T } from '../shared/constants/text.tokens';

export enum ELanguage {
  Cs = 'cs',
  En = 'en'
}

const SUPPORTED_LANGUAGES = Object.values(ELanguage);
type Lang = ELanguage;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private langSignal = signal<Lang>(ELanguage.Cs);
  readonly language = computed(() => this.langSignal());

  private translations = signal<Map<T, string>>(new Map());
  readonly t = computed(() => this.translations());

  private loadedLanguages = new Map<Lang, Map<T, string>>();

  constructor(private http: HttpClient) {
    this.loadTranslations(this.langSignal());
  }

  setLang(language: Lang) {
    if (SUPPORTED_LANGUAGES.includes(language)) {
      this.langSignal.set(language);
      document.documentElement.lang = language;
      this.loadTranslations(language);
    }
  }

  async loadInitialLanguage(): Promise<void> {
    const map = await this.fetchTranslations(this.langSignal());
    this.translations.set(map);
  }

  get current(): Lang {
    return this.langSignal();
  }

  getText(key: T): string {
    const current = this.translations().get(key);
    if (current) return current;

    const fallbackMap = this.loadedLanguages.get(ELanguage.Cs);
    const fallback = fallbackMap?.get(key);
    return fallback ?? key.toString();
  }

  private loadTranslations(language: Lang) {
    if (this.loadedLanguages.has(language)) {
      this.translations.set(this.loadedLanguages.get(language)!);
    } else {
      this.fetchTranslations(language).then(map => this.translations.set(map));
    }
  }

  private async fetchTranslations(language: Lang): Promise<Map<T, string>> {
    if (this.loadedLanguages.has(language)) {
      return this.loadedLanguages.get(language)!;
    }

    const data = await firstValueFrom(
      this.http.get<Record<string, string>>(`/languages/${language}.json`)
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
