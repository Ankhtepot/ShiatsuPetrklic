import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {T} from '../../shared/constants/text.tokens';
import {TextPipe} from '../../pipes/text.pipe';

@Component({
  selector: 'app-in-construction',
  imports: [CommonModule, TextPipe],
  templateUrl: './in-construction.component.html',
  styleUrls: ['./in-construction.component.scss'],
  standalone: true
})
export class InConstructionComponent {

  protected readonly T = T;
}
