import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export enum EStorageKey {
  Language = 'ShiatsuPetrklic - language'
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  // localStorage does not exist while prerendering at build time
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  set(key: EStorageKey, value: string): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(`Error setting localStorage key "${key}":`, e);
    }
  }

  get(key: EStorageKey): { success: true, value: string } | { success: false } {
    if (!this.isBrowser) return { success: false };
    try {
      const value = localStorage.getItem(key);
      return value !== null
        ? { success: true, value }
        : { success: false };
    } catch (e) {
      console.error(`Error accessing localStorage key "${key}":`, e);
      return { success: false };
    }
  }

  remove(key: EStorageKey): void {
    if (!this.isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing localStorage key "${key}":`, e);
    }
  }

  clearAll(): void {
    if (!this.isBrowser) return;
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
  }
}
