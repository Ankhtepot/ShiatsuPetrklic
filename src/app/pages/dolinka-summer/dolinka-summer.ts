import {Component, computed, signal} from '@angular/core';
import {ContentCardComponent} from "../../Components/content-card/content-card.component";
import {EventCardComponent} from "../../Components/event-card/event-card.component";
import {QuoteStripSimpleComponent} from "../../Components/quote-strip-simple/quote-strip-simple.component";
import {INVALID_QUOTE, QuoteData} from '../../shared/models/quote-data';
import {EventData, INVALID_ID} from '../../shared/models/event-data';

@Component({
  selector: 'app-dolinka-summer',
    imports: [
        ContentCardComponent,
        EventCardComponent,
        QuoteStripSimpleComponent
    ],
  templateUrl: './dolinka-summer.html',
  styleUrl: './dolinka-summer.scss',
})
export class DolinkaSummerComponent {
  readonly invalidQuote: QuoteData = INVALID_QUOTE;

  readonly event = signal<EventData>({
    id: 'LetoDolinka2026',
    date: new Date('2026-08-21T18:00:00'),
    titleCs: "Léto Dolinka 2026",
    descriptionCs: '',
    showsMarkdown: true,
    markdownCZContentPath: '/markdown/LetoDolinka2026.md',
    imageUrl: 'images/events/VedomyDotykPezinok.webp',
    miniatureUrl: 'images/events/VedomyDotykPezinok.webp',
    // postEventTextCs: null,
  });

  isEventValid = computed(() => {
    const e = this.event();
    return !!e && e.id !== INVALID_ID;
  });
}
