import {Component, computed, inject, Signal, signal} from '@angular/core';
import {ContentCardComponent} from "../../Components/content-card/content-card.component";
import {EventCardComponent} from "../../Components/event-card/event-card.component";
import {QuoteStripSimpleComponent} from "../../Components/quote-strip-simple/quote-strip-simple.component";
import {INVALID_QUOTE, QuoteData} from '../../shared/models/quote-data';
import {EventData, INVALID_ID} from '../../shared/models/event-data';
import {TextService} from '../../services/text.service';
import {LanguageService} from '../../services/language.service';
import {ButtonOpenLinkComponent} from '../../Components/button-open-link/button-open-link.component';
import {TextPipe} from '../../pipes/text.pipe';
import {T} from '../../shared/constants/text.tokens';

@Component({
  selector: 'app-dolinka-tribe',
  imports: [
    ContentCardComponent,
    EventCardComponent,
    QuoteStripSimpleComponent,
    ButtonOpenLinkComponent,
    TextPipe,
  ],
  templateUrl: './dolinka-tribe.html',
  styleUrls: ['./dolinka-tribe.scss'],
})
export class DolinkaTribeComponent {
  textService = inject(TextService);
  languageService = inject(LanguageService);

  readonly invalidQuote: QuoteData = INVALID_QUOTE;
  readonly link: string = 'https://forms.gle/HJVa43VwwL7rpHBA7';

  readonly event = signal<EventData>({
    id: 'LetoDolinka2026',
    date: new Date('2026-08-21T18:00:00'),
    titleCs: "Léto Dolinka 2026",
    titleEn: "Summer Dolinka 2026",
    descriptionCs: '',
    showsMarkdown: true,
    markdownCZContentPath: '/markdown/DolinkaTribe1.md',
    markdownENContentPath: '/markdown/DolinkaTribe1.md',
    imageUrl: 'images/events/dolinka.webp',
    miniatureUrl: 'images/events/miniatures/dolinka.webp',
    // postEventTextCs: null,
  });

  isEventValid = computed(() => {
    const e = this.event();
    return !!e && e.id !== INVALID_ID;
  });

  eventTitle : Signal<string> = computed(() => {
    return (this.languageService.current === 'en' ? this.event().titleEn : this.event().titleCs) || ''
  } )

  protected onSubscribe() {
    // Nothing for now
  }

  protected readonly TextService = TextService;
  protected readonly T = T;
}
