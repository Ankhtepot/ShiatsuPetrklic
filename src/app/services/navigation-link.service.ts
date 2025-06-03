import { Injectable, computed, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { T } from '../shared/constants/text.tokens';
import { TextService } from './text.service';

export interface HeaderLinkConfiguration {
  navigationString: string;
  textString: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationLinkService {
  private lang = inject(LanguageService);
  private text = inject(TextService);

  readonly headerLinks = computed<HeaderLinkConfiguration[]>(() => {
    const lang = this.lang.current;
    return [
      {
        navigationString: `/${lang}/home`,
        textString: this.text.get(T.home_anchor)
      },
      {
        navigationString: `/${lang}/about-me`,
        textString: this.text.get(T.aboutMe_anchor)
      },
      {
        navigationString: `/${lang}/services`,
        textString: this.text.get(T.services_anchor)
      },
      {
        navigationString: `/${lang}/contact`,
        textString: this.text.get(T.contact_anchor)
      },
    ];
  });
}
