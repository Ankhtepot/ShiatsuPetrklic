import { Injectable, computed, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { T } from '../shared/constants/text.tokens';
import { TextService } from './text.service';

export enum EPages {
  Home = 'home',
  AboutMe = 'about-me',
  Services = 'services',
  Contact = 'contact'
}

export interface HeaderLinkConfiguration {
  navigationString: string;
  textString: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationLinkService {
  private lang = inject(LanguageService);
  private text = inject(TextService);

  public getPageLink(page: EPages): string {
    // const lang = this.lang.current;
    return `/${this.lang.current}/${page}`;
    // switch (page) {
    //   case EPages.Home:
    //     return `/${lang}/${EPages.Home}`;
    //   case EPages.AboutMe:
    //     return `/${lang}/${EPages.AboutMe}`;
    //   case EPages.Services:
    //     return `/${lang}/${EPages.Services}`;
    //   case EPages.Contact:
    //     return `/${lang}/${EPages.Contact}`;
    //   default:
    //     throw new Error(`Unknown page: ${page}`);
    // }
  }

  readonly headerLinks = computed<HeaderLinkConfiguration[]>(() => {
    const lang = this.lang.current;
    return [
      {
        navigationString: this.getPageLink(EPages.Home),
        textString: 'bi-house-door-fill',
        isIcon: true
      },
      {
        navigationString: this.getPageLink(EPages.AboutMe),
        textString: this.text.get(T.aboutMe_anchor)
      },
      {
        navigationString: this.getPageLink(EPages.Services),
        textString: this.text.get(T.services_anchor)
      },
      {
        navigationString: this.getPageLink(EPages.Contact),
        textString: this.text.get(T.contact_anchor)
      },
    ];
  });
}
