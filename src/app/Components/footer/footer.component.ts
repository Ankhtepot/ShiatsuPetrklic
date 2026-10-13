import {Component, computed, inject} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {filter, map} from 'rxjs';
import {TextPipe} from '../../pipes/text.pipe';
import {T} from '../../shared/constants/text.tokens';
import {StringConstants} from '../../shared/constants/string.constants';
import {EPages, NavigationLinkService} from '../../services/navigation-link.service';
import {LanguageService} from '../../services/language.service';

/** Name, address, phone and hours on every page – must match Google Business Profile, Firmy.cz and the JSON-LD in index.html */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TextPipe],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected readonly T = T;
  protected readonly businessName = 'Shiatsu Petrklíč';
  protected readonly address = StringConstants.ADDRESS.replace(';', ',');
  protected readonly phone = StringConstants.PHONE;
  protected readonly phoneHref = 'tel:' + StringConstants.PHONE.replace(/\s/g, '');
  protected readonly email = StringConstants.EMAIL;

  private navigationLinkService = inject(NavigationLinkService);
  private languageService = inject(LanguageService);

  private router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects)
    ),
    {initialValue: this.router.url}
  );

  /** The contact page has its own form, the booking button would only link to itself */
  protected readonly showCta = computed(() => !this.url().split(/[?#]/)[0].endsWith(`/${EPages.Contact}`));

  protected readonly contactLink = computed(() => {
    this.languageService.languageSignal();
    return this.navigationLinkService.getPageLink(EPages.Contact);
  });
}
