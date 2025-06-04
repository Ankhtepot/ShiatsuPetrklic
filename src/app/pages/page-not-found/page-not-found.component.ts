import {Component, inject} from '@angular/core';
import {TextPipe} from '../../pipes/text.pipe';
import {RouterModule} from '@angular/router';
import {T} from '../../shared/constants/text.tokens';
import {EPages, NavigationLinkService} from '../../services/navigation-link.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
  imports: [TextPipe, RouterModule]
})
export class PageNotFoundComponent {
  private navigationLinkService = inject(NavigationLinkService);

  homeLink = this.navigationLinkService.getPageLink(EPages.Home);

  protected readonly T = T;
  protected readonly NavigationLinkService = NavigationLinkService;
  protected readonly EPages = EPages;
}
