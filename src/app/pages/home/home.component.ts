import {Component} from '@angular/core';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TextPipe, ContentCardComponent, QuoteStripComponent, QuoteStripSimpleComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly T = T;

  quoteColorConfiguration: QuoteColorConfiguration = {
    backgroundColor: AppColors.glassWhiteSoft,
    textColor: '#555555',
    quoteMarkColor: '#777',
    footerColor: '#888888',
    verticalMarkColor: '#cccccc',
  };

  get randomizedTestimonials() {
    return randomizeArray(getTestimonials());
  }
}
