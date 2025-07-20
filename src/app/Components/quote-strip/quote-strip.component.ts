import {
  Component,
  Input,
  signal,
  OnInit,
  OnDestroy,
  inject,
  ViewChild, ElementRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {QuoteData} from '../../Models/quote-data';
import {LanguageService} from '../../services/language.service';
import {cutAtLastWholeWord} from '../../shared/utilities/string-extensions';
import {T} from '../../shared/constants/text.tokens';
import {TextPipe} from '../../pipes/text.pipe';
import {ButtonReadMoreComponent} from '../button-read-more/button-read-more.component';

@Component({
  selector: 'app-quote-strip',
  standalone: true,
  imports: [CommonModule, TextPipe, ButtonReadMoreComponent],
  templateUrl: './quote-strip.component.html',
  styleUrls: ['./quote-strip.component.scss']
})
export class QuoteStripComponent implements OnInit, OnDestroy {
  @Input() id?: string; // for static quote
  @Input() quote?: QuoteData;         // for static quote
  @Input() quotes: QuoteData[] = [];  // for dynamic mode
  @ViewChild('quoteStripEl') quoteStripEl!: ElementRef;

  private router = inject(Router);
  private languageService = inject(LanguageService);
  private intervalId: any;

  isUsingEllipsis = false;
  fadeTime = 400; // ms

  currentQuote = signal<QuoteData>({
    csText: 'empty',
    enText: 'empty',
    author: 'unknown',
  });
  readonly fadeState = signal<'visible' | 'fading-out' | 'fading-in'>('visible');

  ngOnInit(): void {
    if (this.quote) {
      this.currentQuote.set(this.quote);
    } else if (this.quotes.length > 0) {
      this.currentQuote.set(this.quotes[0]);
      this.startRotation();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  getLocalizedText(): string {
    const quote = this.currentQuote();
    if (!quote) return '';

    const language = this.languageService.languageSignal();
    const text = language === 'cs' ? quote.csText : quote.enText;

    return this.textWithEllipsis(text);
  }

  get fadeOutClass() {
    return this.fadeState() === 'fading-out';
  }

  get fadeInClass() {
    return this.fadeState() === 'fading-in';
  }

  startRotation(): void {
    if (this.quotes.length <= 1) return;

    let currentIndex = 0;

    const delay = this.currentQuote()?.changeAfter ?? 10000;

    this.intervalId = setInterval(() => {
        this.fadeState.set('fading-out');
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % this.quotes.length;
          this.currentQuote.set(this.quotes[currentIndex]);
          this.fadeState.set('fading-in');
          setTimeout(() => this.fadeState.set('visible'), this.fadeTime);
        }, this.fadeTime);
      }, delay);
  }

  textWithEllipsis(text
                     :
                     string
  ):
    string {
    const limit = this.currentQuote()?.lengthBeforeEllipsis ?? Number.MAX_SAFE_INTEGER;

    if (text.length <= limit) {
      this.isUsingEllipsis = false;
      return text;
    }

    this.isUsingEllipsis = true;
    return cutAtLastWholeWord(text, limit);
  }

  navigateToReadWhole()
    :
    void {
    const url = this.currentQuote()?.testimonialsFragment;
    if (url) {
      this.router.navigate(['/cs/testimonials'], {fragment: url});
    }
  }

  highlight(): void {
    const el = this.quoteStripEl.nativeElement as HTMLElement;
    el.classList.add('highlight-pulse');
    setTimeout(
      () => el.classList.remove('highlight-pulse'
      ), 1000);
  }

  protected readonly T = T;
}
