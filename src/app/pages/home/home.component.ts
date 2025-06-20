import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextPipe} from '../../pipes/text.pipe';
import {T} from '../../shared/constants/text.tokens';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {QuoteStripComponent} from '../../Components/quote-strip/quote-strip.component';
import {getTestimonials} from '../../shared/data/testimonials';
import {randomizeArray} from '../../shared/utilities/randomize';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TextPipe, ContentCardComponent, QuoteStripComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly T = T;

  get randomizedTestimonials() {
    return randomizeArray(getTestimonials());
  }
}
