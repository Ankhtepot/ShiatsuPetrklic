import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextPipe} from '../../pipes/text.pipe';
import {T} from '../../shared/constants/text.tokens';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TextPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  profileImagePath = signal('images/profile.jpg'); // You can change this path
  protected readonly T = T;
}
