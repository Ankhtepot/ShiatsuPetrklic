import { Injectable } from '@angular/core';
import { T } from '../shared/constants/text.tokens';
import {LangService} from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  constructor(private langService: LangService) {}

  public get(textEnum: T): string {
    const text = this.langService.t().get(textEnum);
    if (text) {
      return text;
    } else {
      console.warn('Text not found for key:', textEnum);
      return '>>text not found<<';
    }
  }
}
