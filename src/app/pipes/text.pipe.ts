import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {TextService} from '../services/text.service';
import {T} from '../shared/constants/text.tokens';

export enum ETextStyle {
  Header = 'header',
}

@Pipe({
  standalone: true,
  name: 'text'
})
@Injectable({ providedIn: 'root' })
export class TextPipe implements PipeTransform {
  constructor(private textService: TextService) {}

  transform(key: T, ...args: unknown[]): string {
    const text = this.textService.get(key);

    if (args.length > 0) {
      switch (args[0]) {
        case ETextStyle.Header:
          return '<span class="text-header">' + text + '</span>';
        default:
          return text;
      }
    } else {
      return text;
    }
  }
}
