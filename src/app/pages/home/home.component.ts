import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {EPages} from '../../services/navigation-link.service';
import {TextService} from '../../services/text.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TextPipe, ContentCardComponent, QuoteStripComponent, QuoteStripSimpleComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  protected readonly T = T;

  quoteColorConfiguration: QuoteColorConfiguration = {
    backgroundColor: AppColors.glassWhiteSoft,
    textColor: '#555555',
    quoteMarkColor: '#777',
    footerColor: '#888888',
    verticalMarkColor: '#cccccc',
  };

  constructor(private seo: SeoService, private textService: TextService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: this.textService.get(T.home_page_title),
      description: this.textService.get(T.home_page_description)
      // description: 'Welcome to Shiatsu Brno, your destination for holistic Shiatsu therapy. Explore our services, learn about the practitioner, and read testimonials from satisfied clients.'
    });

    this.seo.setCanonicalPage(EPages.Home);
  }

  get randomizedTestimonials() {
    return randomizeArray(getTestimonials());
  }
}
