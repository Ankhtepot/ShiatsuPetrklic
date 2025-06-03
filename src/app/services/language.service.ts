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
export class LangService {
  private langSignal = signal<Lang>(ELanguage.Cs);

  private translations = signal<Map<T, string>>(new Map());
  readonly t = computed(() => this.translations());

  private loadedLanguages = new Map<Lang, Map<T, string>>();

  constructor(private http: HttpClient) {
    this.loadTranslations(this.langSignal());
  }

  setLang(lang: Lang) {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      this.langSignal.set(lang);
      document.documentElement.lang = lang;
      this.loadTranslations(lang);
    }
  }

  async loadInitialLanguage(): Promise<void> {
    const map = await this.fetchTranslations(this.langSignal());
    this.translations.set(map);
  }

  get current(): Lang {
    return this.langSignal();
  }

  private loadTranslations(lang: Lang) {
    if (this.loadedLanguages.has(lang)) {
      this.translations.set(this.loadedLanguages.get(lang)!);
    } else {
      this.fetchTranslations(lang).then(map => this.translations.set(map));
    }
  }

  private async fetchTranslations(lang: Lang): Promise<Map<T, string>> {
    if (this.loadedLanguages.has(lang)) {
      return this.loadedLanguages.get(lang)!;
    }

    const data = await firstValueFrom(
      this.http.get<Record<string, string>>(`/languages/${lang}.json`)
    );

    const map = new Map<T, string>();
    for (const key in data) {
      if (Object.values(T).includes(key as T)) {
        map.set(key as T, data[key]);
      }
    }

    this.loadedLanguages.set(lang, map);
    return map;
  }
}
