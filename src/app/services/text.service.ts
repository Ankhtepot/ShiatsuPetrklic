import { Injectable } from '@angular/core';
import { T } from '../shared/constants/text.tokens';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  constructor(private langService: LanguageService) {}

  public get(textEnum: T): string {
    return this.langService.getText(textEnum);
  }
}
