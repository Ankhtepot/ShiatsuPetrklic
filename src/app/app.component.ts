import {Component, computed, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  HeaderProfessionalComponent,
  HeaderProfessionalConfiguration
} from './Components/header_professional/header-professional.component';
import {BackgroundSimple} from './Components/background-simple/background-simple';
import {T} from './services/text.service';
import {TextPipe} from './pipes/text.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderProfessionalComponent, BackgroundSimple],
  templateUrl: '../../../shiatsu-brno/src/app/app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true
})
export class AppComponent {
  text = signal(T);
  headerConfiguration = computed<HeaderProfessionalConfiguration>(() => ({
    links: [
      {navigationString: '/about-me', textString: this.textPipe.transform(T.aboutMe_anchor)},
      // { navigationString: '/services', textString: 'Services' },
      {navigationString: '/contact', textString: this.textPipe.transform(T.contact_anchor)},
    ],
    showLogo: true,
    showTitle: true,
    title: 'Shiatsu Brno',
    logoPath: 'images/appIcon.png',
    dynamicShow: false // Set to true if you want the header to hide on scroll
  }));

  constructor(private textPipe: TextPipe) {

  }

  backgroundImagePath = signal<string | undefined>('images/textures/texture_orange_hairy_blanket.png');
}
