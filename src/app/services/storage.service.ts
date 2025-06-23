import { Injectable } from '@angular/core';

export enum EStorageKey {
  Language = 'ShiatsuPetrklic - language'
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  set(key: EStorageKey, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(`Error setting localStorage key "${key}":`, e);
    }
  }

  get(key: EStorageKey): { success: true, value: string } | { success: false } {
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
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing localStorage key "${key}":`, e);
    }
  }

  clearAll(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
  }
}
