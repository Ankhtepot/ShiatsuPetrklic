import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {EPages} from '../../services/navigation-link.service';
import {SeoService} from '../../services/seo.service';
import {TextService} from '../../services/text.service';
import {T} from '../../shared/constants/text.tokens';
import {EventData} from '../../shared/models/event-data';
import {getEvents} from '../../shared/data/events';
import {EventCardComponent} from '../../Components/event-card/event-card.component';
import {TextPipe} from '../../pipes/text.pipe';

@Component({
  selector: 'app-services',
  imports: [CommonModule, ContentCardComponent, EventCardComponent, TextPipe],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true
})
export class EventsComponent implements OnInit {
  public upcomingEvents : EventData[] = [];
  public pastEvents : EventData[] = [];

  constructor(private seo: SeoService, private textService: TextService) {
    this.categorizeEvents();
  }

  ngOnInit(): void {
    this.seo.setSeo({
      title: this.textService.get(T.services_page_title),
      description: this.textService.get(T.services_page_description)
    });

    this.seo.setCanonicalPage(EPages.Contact);
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
