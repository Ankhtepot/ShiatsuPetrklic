import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentCardComponent } from '../../Components/content-card/content-card.component';
import { QuoteData } from '../../Models/quote-data';
import { testimonials as fullTestimonials } from '../../shared/data/testimonials';
import { QuoteStripComponent } from '../../Components/quote-strip/quote-strip.component';

@Component({
  selector: 'app-testimonials.component',
  standalone: true,
  imports: [CommonModule, ContentCardComponent, QuoteStripComponent],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  testimonials: QuoteData[] = fullTestimonials.map(({ csText, enText, author }) => ({
    csText,
    enText,
    author
  }));
}
