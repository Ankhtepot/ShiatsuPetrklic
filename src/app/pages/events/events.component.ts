import {Component, OnInit} from '@angular/core';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {EPages} from '../../services/navigation-link.service';
import {SeoService} from '../../services/seo.service';
import {T} from '../../shared/constants/text.tokens';
import {EventData} from '../../shared/models/event-data';
import {getEvents} from '../../shared/data/events';
import {EventCardComponent} from '../../Components/event-card/event-card.component';
import {TextPipe} from '../../pipes/text.pipe';

@Component({
  selector: 'app-services',
  imports: [ContentCardComponent, EventCardComponent, TextPipe],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  // Upcoming/past split depends on the visit date, not the build date – render fresh instead of hydrating
  host: {ngSkipHydration: 'true'}
})
export class EventsComponent implements OnInit {
  public upcomingEvents : EventData[] = [];
  public pastEvents : EventData[] = [];

  constructor(private seo: SeoService) {
    this.categorizeEvents();
  }

  ngOnInit(): void {
    this.seo.setPage({
      page: EPages.Events,
      title: T.events_page_title,
      description: T.events_page_description,
      image: 'images/og/events.jpg'
    });
  }

  private categorizeEvents(): void {
    const currentDate = new Date();
    this.upcomingEvents = [];
    this.pastEvents = [];

    getEvents().forEach(event => {
      if (event.date >= currentDate) {
        this.upcomingEvents.push(event);
      } else {
        this.pastEvents.push(event);
      }
    });

    // Sort events by date
    this.upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    this.pastEvents.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  protected readonly T = T;
}
