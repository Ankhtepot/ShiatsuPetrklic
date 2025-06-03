import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {T} from '../shared/constants/text.tokens';

export enum ELanguage {
  Cs = 'cs',
  En = 'en'
}

const SUPPORTED_LANGS = Object.values(ELanguage);
type Lang = ELanguage;

@Injectable({ providedIn: 'root' })
export class LangService {
  private langSignal = signal<Lang>(ELanguage.Cs);
  readonly lang = computed(() => this.langSignal());

  private translations = signal<Map<T, string>>(new Map());
  readonly t = computed(() => this.translations());

  constructor(private http: HttpClient) {
    this.loadTranslations(this.langSignal());
  }

  setLang(lang: Lang) {
    if (SUPPORTED_LANGS.includes(lang)) {
      this.langSignal.set(lang);
      document.documentElement.lang = lang;
      this.loadTranslations(lang);
    }
  }

  loadInitialLanguage(): Promise<void> {
    const lang = this.langSignal();
    return this.http.get<Record<T, string>>(`/languages/${lang}.json`).toPromise().then(data => {
      const map = new Map<T, string>();
      for (const key in data) {
        map.set(key as T, data[key as T]);
      }
      this.translations.set(map);
    });
  }


  get current(): Lang {
    return this.langSignal();
  }

  private loadTranslations(lang: Lang) {
    this.http.get<Record<T, string>>(`/languages/${lang}.json`).subscribe(data => {
      const map = new Map<T, string>();
      for (const key in data) {
        map.set(key as T, data[key as T]);
      }
      this.translations.set(map);
    });
  }
}
