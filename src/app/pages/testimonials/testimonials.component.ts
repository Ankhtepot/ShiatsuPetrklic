import {AfterViewInit, Component, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {QuoteData} from '../../Models/quote-data';
import {getTestimonials} from '../../shared/data/testimonials';
import {QuoteStripComponent} from '../../Components/quote-strip/quote-strip.component';
import {ActivatedRoute} from '@angular/router';
import {SeoService} from '../../services/seo.service';
import {EPages} from '../../services/navigation-link.service';
import {TextService} from '../../services/text.service';
import {T} from '../../shared/constants/text.tokens';

@Component({
  selector: 'app-testimonials.component',
  standalone: true,
  imports: [CommonModule, ContentCardComponent, QuoteStripComponent],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements AfterViewInit, OnInit{
  @ViewChildren(QuoteStripComponent) quoteStrips!: QueryList<QuoteStripComponent>;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private seo: SeoService,
    private textService: TextService
  ) {}

  testimonials: QuoteData[] = getTestimonials()
    .map(({csText, enText, author}) => ({
      csText,
      enText,
      author
    }));

  ngOnInit(): void {
    this.seo.setSeo({
      title: this.textService.get(T.testimonials_page_title),
      description: this.textService.get(T.testimonials_page_description)
      // description: 'Read testimonials from clients who have experienced the benefits of Shiatsu therapy in Brno. Discover how Shiatsu has helped others and what you can expect from your sessions.'
    });

    this.seo.setCanonicalPage(EPages.Contact);
  }

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
