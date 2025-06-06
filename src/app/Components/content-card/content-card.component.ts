import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-content-card',
  standalone: true,
  templateUrl: './content-card.component.html',
  imports: [
    NgStyle
  ],
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent {
  @Input() width: string = '800px';
}
