import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {EventCardComponent} from '../../../Components/event-card/event-card.component';
import {ActivatedRoute, Router} from '@angular/router';
import {DEFAULT_EVENT_DATA, EventData, INVALID_ID} from '../../../shared/models/event-data';
import {ContentCardComponent} from '../../../Components/content-card/content-card.component';
import {getEvents} from '../../../shared/data/events';
import {QuoteStripSimpleComponent} from '../../../Components/quote-strip-simple/quote-strip-simple.component';
import {INVALID_QUOTE, QuoteData} from '../../../shared/models/quote-data';
import {EventDetailNavigationComponent, ItemsData} from './event-detail-navigation/event-detail-navigation.component';
import {SeoService, SITE_ORIGIN} from '../../../services/seo.service';
import {EPages} from '../../../services/navigation-link.service';
import {ELanguage, LanguageService} from '../../../services/language.service';
import {T} from '../../../shared/constants/text.tokens';
import {cutAtLastWholeWord} from '../../../shared/utilities/string-extensions';

@Component({
  selector: 'app-detail.component',
  imports: [
    EventCardComponent,
    ContentCardComponent,
    QuoteStripSimpleComponent,
    EventDetailNavigationComponent
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
})
export class DetailComponent implements OnInit, AfterViewInit {
  @ViewChild('eventCard') eventCard!: EventCardComponent;

  // base data
  readonly allEvents: EventData[] = getEvents().sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  // state
  private currentId = signal<string | null>(null);
  isEventValid = computed(() => {
    const e = this.event();
    return !!e && e.id !== INVALID_ID;
  });

  // derived event
  event = computed<EventData>(() => {
    const id = this.currentId();
    if (!id) {
      return DEFAULT_EVENT_DATA;
    }
    const found = this.allEvents.find(e => e.id === id);
    return found ?? DEFAULT_EVENT_DATA;
  });

  // derived navigation data
  itemsData = computed<ItemsData>(() => {
    const id = this.currentId();
    const idx = id
      ? this.allEvents.findIndex(e => e.id === id)
      : -1;

    return {
      currentIndex: idx,
      totalItems: this.allEvents.length
    };
  });

  readonly invalidQuote: QuoteData = INVALID_QUOTE;

  private seo = inject(SeoService);
  private languageService = inject(LanguageService);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.currentId.set(id); // triggers recomputation of event & itemsData
      this.updateSeo(id);
    });
  }

  private updateSeo(id: string | null): void {
    if (!this.isEventValid()) {
      this.seo.setPage({
        page: EPages.NotFound,
        title: T.page_not_found_title,
        description: T.page_not_found_description,
        noindex: true
      });
      return;
    }

    this.seo.setPage({
      page: EPages.Events,
      subPath: `details/${id}`,
      title: () => `${this.localized(this.event().titleCs, this.event().titleEn)} – Shiatsu Petrklíč`,
      description: () => this.shortDescription(),
      // Past events without a post-event text did not take place – keep them out of search results
      noindex: this.event().date < new Date() && !this.event().postEventTextCs,
      jsonLd: () => this.eventStructuredData(id!)
    });
  }

  // English texts are often missing, fall back to Czech like the event card does.
  private localized(textCs?: string, textEn?: string): string {
    return (this.languageService.current === ELanguage.En && textEn) ? textEn : (textCs ?? '');
  }

  private shortDescription(): string {
    const event = this.event();
    const text = this.localized(event.descriptionCs, event.descriptionEn).replace(/\s+/g, ' ').trim();
    return cutAtLastWholeWord(text, 160);
  }

  private eventStructuredData(id: string): object {
    const event = this.event();
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: this.localized(event.titleCs, event.titleEn),
      description: this.shortDescription(),
      startDate: event.date.toISOString(),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      url: this.seo.getPageUrl(EPages.Events, this.languageService.current, `details/${id}`),
      ...(event.imageUrl && {image: `${SITE_ORIGIN}/${event.imageUrl.replace(/^\//, '')}`}),
      ...(event.location && {location: {'@type': 'Place', name: event.location, address: event.location}}),
      organizer: {'@type': 'Organization', name: 'Shiatsu Petrklíč', url: SITE_ORIGIN}
    };
  }

  ngAfterViewInit(): void {
    if (this.eventCard) {
      this.eventCard.setExpanded(true);
    }
  }

  private eventEffect = effect(() => {
    if (this.event() && this.eventCard) {
      this.eventCard.setExpanded(true);
    }
  });

  onNewEventIdRequested(requestedIndex: number): void {
    if (requestedIndex < 0 || requestedIndex >= this.allEvents.length) {
      return;
    }
    const id = this.allEvents[requestedIndex].id;
    this.router.navigate(['../', id], { relativeTo: this.route });
  }
}
