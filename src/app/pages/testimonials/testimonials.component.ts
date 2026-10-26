import {AfterViewInit, Component, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {QuoteData} from '../../shared/models/quote-data';
import {getTestimonials} from '../../shared/data/testimonials';
import {QuoteStripComponent} from '../../Components/quote-strip/quote-strip.component';
import {ActivatedRoute} from '@angular/router';
import {SeoService} from '../../services/seo.service';
import {EPages} from '../../services/navigation-link.service';
import {T} from '../../shared/constants/text.tokens';
import {TextPipe} from '../../pipes/text.pipe';
import {PopInDirective} from '../../shared/directives/pop-in.directive';

@Component({
  selector: 'app-testimonials.component',
  standalone: true,
  imports: [PopInDirective, CommonModule, ContentCardComponent, QuoteStripComponent, TextPipe],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements AfterViewInit, OnInit{
  protected readonly T = T;

  @ViewChildren(QuoteStripComponent) quoteStrips!: QueryList<QuoteStripComponent>;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private seo: SeoService
  ) {}

  testimonials: QuoteData[] = getTestimonials()
    .map(({csText, enText, author}) => ({
      csText,
      enText,
      author
    }));

  ngOnInit(): void {
    this.seo.setPage({
      page: EPages.Testimonials,
      title: T.testimonials_page_title,
      description: T.testimonials_page_description
    });
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
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
