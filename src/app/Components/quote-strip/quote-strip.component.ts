import {
  Component,
  Input,
  signal,
  computed,
  OnInit,
  OnDestroy,
  inject
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {QuoteData} from '../../Models/quote-data';
import {LanguageService} from '../../services/language.service';
import {cutAtLastWholeWord} from '../../shared/Extensions/string-extensions';

@Component({
  selector: 'app-quote-strip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-strip.component.html',
  styleUrls: ['./quote-strip.component.scss']
})
export class QuoteStripComponent implements OnInit, OnDestroy {
  @Input() quote?: QuoteData;         // for static quote
  @Input() quotes: QuoteData[] = [];  // for dynamic mode

  private router = inject(Router);
  private languageService = inject(LanguageService);
  private intervalId: any;

  isUsingEllipsis = false;

  currentQuote = signal<QuoteData>({
    csText: 'empty',
    enText: 'empty',
    author: 'unknown',
  });
  fadingOut = signal(false);

  readonly changeAfter = computed(() =>
    this.currentQuote()?.changeAfter ?? 10000
  );

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

  loadInitialQuote() {
    if (this.quotes.length > 0) {
      this.currentQuote.set(this.quotes[0]);
    }
  }

  getLocalizedText(): string {
    const quote = this.currentQuote();
    if (!quote) return '';

    const language = this.languageService.languageSignal();
    const text = language === 'cs' ? quote.csText : quote.enText;

    return this.textWithEllipsis(text);
  }


  startRotation(): void {
    if (this.quotes.length <= 1) return;

    let currentIndex = 0;

    const delay = this.currentQuote()?.changeAfter ?? 10000;

    this.intervalId = setInterval(() => {
      this.fadingOut.set(true);

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % this.quotes.length;
        this.currentQuote.set(this.quotes[currentIndex]);
        this.fadingOut.set(false);
      }, 400);
    }, delay);
  }

  textWithEllipsis(text: string): string {
    const limit = this.currentQuote()?.lengthBeforeEllipsis ?? Number.MAX_SAFE_INTEGER;

    if (text.length <= limit) {
      this.isUsingEllipsis = false;
      return text;
    }

    this.isUsingEllipsis = true;
    return cutAtLastWholeWord(text, limit);
  }

  navigateToReadWhole(): void {
    const url = this.currentQuote()?.readWholeUrl;
    if (url) {
      this.router.navigate(['/cs/testimonials'], {fragment: url});
    }
  }
}
