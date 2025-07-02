import {Component, inject, OnInit} from '@angular/core';
import {TextPipe} from '../../pipes/text.pipe';
import {RouterModule} from '@angular/router';
import {T} from '../../shared/constants/text.tokens';
import {EPages, NavigationLinkService} from '../../services/navigation-link.service';
import {SeoService} from '../../services/seo.service';
import {TextService} from '../../services/text.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
  imports: [TextPipe, RouterModule]
})
export class PageNotFoundComponent implements OnInit {
  private navigationLinkService = inject(NavigationLinkService);

  homeLink = this.navigationLinkService.getPageLink(EPages.Home);

  protected readonly T = T;
  protected readonly NavigationLinkService = NavigationLinkService;
  protected readonly EPages = EPages;

  constructor(private seo: SeoService, private textService: TextService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: this.textService.get(T.page_not_found_title),
      description: this.textService.get(T.page_not_found_description)
      // description: 'The page you are looking for does not exist. Please check the URL or return to the home page.'
    });

    this.seo.setCanonicalPage(EPages.NotFound);
  }
}
