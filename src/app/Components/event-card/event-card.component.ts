import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventData} from '../../Models/event-data';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event!: EventData;

  isExpanded = signal(false);

  openModal() {
    this.isExpanded.set(true);
  }

  closeModal() {
    this.isExpanded.set(false);
  }
}
