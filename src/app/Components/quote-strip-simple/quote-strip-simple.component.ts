import {Component, computed, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuoteData} from '../../shared/models/quote-data';
import {LanguageService} from '../../services/language.service';
import {T} from '../../shared/constants/text.tokens';

export interface QuoteColorConfiguration {
  backgroundColor?: string;
  textColor?: string;
  quoteMarkColor?: string;
  footerColor?: string;
  verticalMarkColor?: string;
}

@Component({
  selector: 'app-quote-strip-simple',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-strip-simple.component.html',
  styleUrls: ['./quote-strip-simple.component.scss']
})
export class QuoteStripSimpleComponent {
  @Input() id?: string; // for static quote
  @Input() quote: QuoteData = {author: 'default', csText: 'default', enText: 'default'}; // for static quote
  @Input() colorConfiguration?: QuoteColorConfiguration;

  public readonly T = T;
  private languageService = inject(LanguageService);

  // Use computed styles to allow extension and override
  backgroundStyle = computed(() => ({
    'background-color': this.colorConfiguration?.backgroundColor || undefined,
    'color': this.colorConfiguration?.textColor || undefined
  }));

  quoteMarkStyle = computed(() => ({
    'color': this.colorConfiguration?.quoteMarkColor || undefined
  }));

  footerStyle = computed(() => ({
    'color': this.colorConfiguration?.footerColor || undefined
  }));

  verticalMarkStyle = computed(() => ({
    'border-left-color': this.colorConfiguration?.verticalMarkColor || undefined
  }))

  protected getLocalizedText(): string {
    if (!this.quote) return '';
    return this.languageService.languageSignal() === 'cs'
      ? this.quote.csText
      : this.quote.enText;
  }
}
