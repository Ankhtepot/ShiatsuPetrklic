import {
  AfterViewInit,
  Component,
  effect,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import {EventCardComponent} from '../../../Components/event-card/event-card.component';
import {ActivatedRoute} from '@angular/router';
import {DEFAULT_EVENT_DATA, EventData, INVALID_ID} from '../../../shared/models/event-data';
import {ContentCardComponent} from '../../../Components/content-card/content-card.component';
import {getEventById} from '../../../shared/data/events';
import {QuoteStripSimpleComponent} from '../../../Components/quote-strip-simple/quote-strip-simple.component';
import {QuoteData} from '../../../shared/models/quote-data';

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
    QuoteStripSimpleComponent
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
})
export class DetailComponent implements OnInit, AfterViewInit {
  @ViewChild('eventCard') eventCard!: EventCardComponent;

  isEventValid: WritableSignal<boolean> = signal<boolean>(false);
  event: WritableSignal<EventData> = signal<EventData>(DEFAULT_EVENT_DATA);
  readonly invalidQuote: QuoteData = INVALID_QUOTE

  constructor(private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    let event: EventData | undefined = getEventById(id);
    if (event && event!.id !== INVALID_ID) {
      this.isEventValid.set(true);
      this.event.set(event);
    }
  }

  ngAfterViewInit(): void {
    if (this.eventCard) {
      this.eventCard.setExpanded(true);
    }
  }

  private eventEffect = effect(() => {
    console.log("Event effect runs.");
    if (this.event() && this.eventCard) {
      this.eventCard.setExpanded(true);
    }
  })
}
