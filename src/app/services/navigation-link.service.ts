import { Injectable, computed, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { T } from '../shared/constants/text.tokens';
import { TextService } from './text.service';

export enum EPages {
  Home = 'home',
  AboutMe = 'about-me',
  Testimonials = 'testimonials',
  Pricing = 'pricing',
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

  public getPageLink(page: EPages, anchor?: string): string {
    const baseUrl = `/${this.lang.current}/${page}`;
    return anchor ? `${baseUrl}#${anchor}` : baseUrl;
  }

  readonly headerLinks = computed<HeaderLinkConfiguration[]>(() => {
    const lang = this.lang.current;
    return [
      {
        navigationString: this.getPageLink(EPages.Home),
        textString: this.text.get(T.home_anchor),
      },
      {
        navigationString: this.getPageLink(EPages.AboutMe),
        textString: this.text.get(T.aboutMe_anchor)
      },
      {
        navigationString: this.getPageLink(EPages.Testimonials),
        textString: this.text.get(T.testimonials_anchor)
      },
      {
        navigationString: this.getPageLink(EPages.Pricing),
        textString: this.text.get(T.pricing_anchor)
      },
      // {
      //   navigationString: this.getPageLink(EPages.Services),
      //   textString: this.text.get(T.services_anchor)
      // },
      {
        navigationString: this.getPageLink(EPages.Contact),
        textString: this.text.get(T.contact_anchor)
      },
    ];
  });
}
