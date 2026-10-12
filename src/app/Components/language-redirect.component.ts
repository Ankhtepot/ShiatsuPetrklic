import { afterNextRender, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { SeoService } from '../services/seo.service';
import { EPages } from '../services/navigation-link.service';
import { T } from '../shared/constants/text.tokens';

@Component({
  standalone: true,
  template: ''
})
export class LanguageRedirectComponent {
  private router = inject(Router);
  private languageService = inject(LanguageService);

  constructor() {
    // The prerendered "/" points crawlers to the default-language page it redirects to
    inject(SeoService).setPage({
      page: EPages.AboutMe,
      title: T.about_me_page_title,
      description: T.about_me_page_description
    });

    // Redirect only in the browser, where the stored language preference is known
    afterNextRender(() => {
      this.router.navigate([this.languageService.current, 'about-me']);
    });
  }
}
