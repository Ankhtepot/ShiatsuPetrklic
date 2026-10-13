import {Component, computed, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TextPipe} from '../../pipes/text.pipe';
import {T} from '../../shared/constants/text.tokens';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {QuoteStripComponent} from '../../Components/quote-strip/quote-strip.component';
import {getTestimonials} from '../../shared/data/testimonials';
import {randomizeArray} from '../../shared/utilities/randomize';
import {
  QuoteColorConfiguration,
  QuoteStripSimpleComponent
} from '../../Components/quote-strip-simple/quote-strip-simple.component';
import {AppColors} from '../../../styles/colors.gen';
import {SeoService} from '../../services/seo.service';
import {EPages, NavigationLinkService} from '../../services/navigation-link.service';
import {TextService} from '../../services/text.service';
import {PricingTableComponent} from '../../Components/pricing-table/pricing-table.component';
import {getShiatsuPricingTableData} from '../../shared/data/pricing';
import {ButtonFaqComponent} from '../../Components/button-faq/button-faq.component';

// Start of professional Shiatsu practice (1 May 2009)
const PRACTICE_START = new Date(2009, 4, 1);

function fullYearsSince(start: Date): number {
  const now = new Date();
  const hadAnniversary = now.getMonth() > start.getMonth()
    || (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());
  return now.getFullYear() - start.getFullYear() - (hadAnniversary ? 0 : 1);
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextPipe, ContentCardComponent, QuoteStripComponent, QuoteStripSimpleComponent, PricingTableComponent, ButtonFaqComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  protected readonly T = T;

  quoteColorConfiguration: QuoteColorConfiguration = {
    backgroundColor: AppColors.glassWhiteSoft,
    textColor: '#555555',
    quoteMarkColor: '#777',
    footerColor: '#595959', // #888 failed WCAG contrast on the light card
    verticalMarkColor: '#cccccc',
  };

  readonly faqItems = [
    {question: T.faq_q1, answer: T.faq_a1},
    {question: T.faq_q2, answer: T.faq_a2},
    {question: T.faq_q3, answer: T.faq_a3},
    {question: T.faq_q4, answer: T.faq_a4},
    {question: T.faq_q5, answer: T.faq_a5},
    {question: T.faq_q6, answer: T.faq_a6},
    {question: T.faq_q7, answer: T.faq_a7},
    {question: T.faq_q8, answer: T.faq_a8},
  ];

  readonly contactLink = inject(NavigationLinkService).getPageLink(EPages.Contact);
  readonly aboutMeLink = inject(NavigationLinkService).getPageLink(EPages.AboutMe);

  readonly trainingText = computed(() =>
    this.textService.get(T.home_training).replace('{years}', String(fullYearsSince(PRACTICE_START)))
  );

  constructor(private seo: SeoService, private textService: TextService) {}

  readonly pricingData = computed(() => ({
    ...getShiatsuPricingTableData(this.textService),
    introHtml: `<p class="lead">${this.textService.get(T.home_pricing_intro)}</p>`
  }));

  ngOnInit(): void {
    this.seo.setPage({
      page: EPages.Home,
      title: T.home_page_title,
      description: T.home_page_description,
      // Not shown as rich results by Google anymore, but read by AI search engines and Seznam
      jsonLd: () => ({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: this.faqItems.map(item => ({
          '@type': 'Question',
          name: this.textService.get(item.question),
          acceptedAnswer: {'@type': 'Answer', text: this.textService.get(item.answer)}
        }))
      })
    });
  }

  get randomizedTestimonials() {
    return randomizeArray(getTestimonials());
  }
}
