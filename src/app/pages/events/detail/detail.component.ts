import {
  AfterViewInit,
  Component,
  computed,
  effect,
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
import {QuoteData} from '../../../shared/models/quote-data';
import {EventDetailNavigationComponent, ItemsData} from './event-detail-navigation/event-detail-navigation.component';

const INVALID_QUOTE: QuoteData = {
  author: 'Shiatsu Petrklic',
  csText: 'Nastala chybička, tato událost neumí zobrazit své detailní informace.',
  enText: 'Mistake were made, this event failed to show its detail.'
}

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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('searching for id', id);
      this.currentId.set(id); // triggers recomputation of event & itemsData
    });
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
