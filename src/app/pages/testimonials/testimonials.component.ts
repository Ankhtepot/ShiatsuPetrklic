import {AfterViewInit, Component, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {QuoteData} from '../../Models/quote-data';
import {getTestimonials} from '../../shared/data/testimonials';
import {QuoteStripComponent} from '../../Components/quote-strip/quote-strip.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-testimonials.component',
  standalone: true,
  imports: [CommonModule, ContentCardComponent, QuoteStripComponent],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements AfterViewInit{
  @ViewChildren(QuoteStripComponent) quoteStrips!: QueryList<QuoteStripComponent>;

  constructor(private route: ActivatedRoute, private renderer: Renderer2) {}

  testimonials: QuoteData[] = getTestimonials()
    .map(({csText, enText, author}) => ({
      csText,
      enText,
      author
    }));

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            // el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const yOffset = -150; // adjust based on your fixed header height
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });

            // Find the component whose element matches
            this.quoteStrips.forEach(strip => {
              const nativeEl = (strip as any).quoteStripEl.nativeElement;
              if (nativeEl.id === fragment) {
                strip.highlight();
              }
            });
          }
        }, 0);
      }
    });
  }
}
