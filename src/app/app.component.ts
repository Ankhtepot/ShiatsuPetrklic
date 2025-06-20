import {Component, computed, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  HeaderProfessionalComponent,
  HeaderProfessionalConfiguration
} from './Components/header_professional/header-professional.component';
import {BackgroundTiledComponent} from './Components/background-tiled/background-tiled.component';
import {NavigationLinkService} from './services/navigation-link.service';
import {AppColors} from '../styles/colors.gen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderProfessionalComponent, BackgroundTiledComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true
})
export class AppComponent {
  backgroundImagePath = signal<string | undefined>('images/textures/texture_orange_hairy_blanket4.png');
  links = inject(NavigationLinkService).headerLinks;

  headerConfiguration = computed<HeaderProfessionalConfiguration>(() => ({
    links: this.links(),
    showLogo: true,
    showTitle: true,
    title: 'Shiatsu Petrklic',
    logoPath: 'images/appIcon.png',
    dynamicShow: false,
    textColor: AppColors.textOnOrange,
    backgroundGradientStart: `rgba(255, 140, 0, 1)`,
    backgroundGradientEnd: `rgba(255, 140, 0, 0.5)`,
  }));
}
