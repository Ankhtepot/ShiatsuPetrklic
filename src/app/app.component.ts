import {Component, computed, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderProfessionalComponent} from './Components/header_professional/header-professional.component';
import {BackgroundTiledComponent} from './Components/background-tiled/background-tiled.component';
import {NavigationLinkService} from './services/navigation-link.service';
import {AppColors} from '../styles/colors.gen';
import {
  HeaderProfessionalDropdownActionsConfiguration,
  HeaderProfessionalConfiguration
} from './Components/header_professional/models';
import {ELanguage, LanguageService} from './services/language.service';
import {InConstructionComponent} from './Components/in-construction/in-construction.component';
import {GoogleAnalyticsService} from './services/google-analytics.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderProfessionalComponent, BackgroundTiledComponent, InConstructionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true
})
export class AppComponent {
  backgroundImagePath = signal<string | undefined>('images/textures/texture_orange_hairy_blanket4.png');
  links = inject(NavigationLinkService).headerLinks;

  showConstruction = signal(true);

  private languageService = inject(LanguageService);

  private headerDropdownSetup: HeaderProfessionalDropdownActionsConfiguration[] = [
    // language dropdown
    {
      selectedIndex: this.languageService.current === ELanguage.Cs ? 0 : 1,
      hideTextInButton: true,
      actions: [
        {text: 'Česky', action: () => this.languageService.setLang(ELanguage.Cs), imageUrl: 'images/flags/cz.webp'},
        {text: 'English', action: () => this.languageService.setLang(ELanguage.En), imageUrl: 'images/flags/gb.webp'},]
    }
  ];

  headerConfiguration = computed<HeaderProfessionalConfiguration>(() => ({
    links: this.links(),
    showLogo: true,
    showTitle: true,
    title: 'Shiatsu Petrklíč',
    logoPath: 'images/appIcon.png',
    dynamicShow: false,
    textColor: AppColors.textOnOrange,
    backgroundGradientStart: `rgba(255, 140, 0, 1)`,
    backgroundGradientEnd: `rgba(255, 140, 0, 0.5)`,
    dropdownsConfigurations: this.headerDropdownSetup
  }));

  constructor(ga: GoogleAnalyticsService) {}
}
