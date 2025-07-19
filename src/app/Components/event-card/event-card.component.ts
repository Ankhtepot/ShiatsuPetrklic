import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventData} from '../../Models/event-data';

@Component({
  selector: 'app-event-card',
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  standalone: true
})
export class EventCardComponent {
  @Input() event?: EventData;
}
