import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextPipe } from '../../pipes/text.pipe';
import { T } from '../../shared/constants/text.tokens';
import { ContentCardComponent } from '../../Components/content-card/content-card.component';
import { QuoteStripComponent } from '../../Components/quote-strip/quote-strip.component';
import {getTestimonials} from '../../shared/data/testimonials';
import {NavigationLinkService} from '../../services/navigation-link.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TextPipe, ContentCardComponent, QuoteStripComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly T = T;
  private navigationLinkService = inject(NavigationLinkService);

  testimonials = signal(getTestimonials(this.navigationLinkService));
}
