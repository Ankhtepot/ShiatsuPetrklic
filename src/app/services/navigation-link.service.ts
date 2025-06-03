import { Injectable, computed, inject } from '@angular/core';
import { LangService } from './language.service';
import { T } from '../shared/constants/text.tokens';
import { TextService } from './text.service';

export interface HeaderLinkConfiguration {
  navigationString: string;
  textString: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationLinkService {
  private lang = inject(LangService);
  private text = inject(TextService);

  readonly headerLinks = computed<HeaderLinkConfiguration[]>(() => {
    const lang = this.lang.current;
    return [
      {
        navigationString: `/${lang}/about-me`,
        textString: this.text.get(T.aboutMe_anchor)
      },
      {
        navigationString: `/${lang}/contact`,
        textString: this.text.get(T.contact_anchor)
      }
    ];
  });
}
