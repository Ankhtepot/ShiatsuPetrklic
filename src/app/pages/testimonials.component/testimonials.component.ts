import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {QuoteData} from '../../Models/quote-data';
import {getTestimonials} from '../../shared/data/testimonials';
import {QuoteStripComponent} from '../../Components/quote-strip/quote-strip.component';
import {NavigationLinkService} from '../../services/navigation-link.service';

@Component({
  selector: 'app-testimonials.component',
  standalone: true,
  imports: [CommonModule, ContentCardComponent, QuoteStripComponent],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  private navigationLinkService = inject(NavigationLinkService);

  testimonials: QuoteData[] = getTestimonials(this.navigationLinkService)
    .map(({csText, enText, author}) => ({
      csText,
      enText,
      author
    }));
}
