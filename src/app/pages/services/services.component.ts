import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';

@Component({
  selector: 'app-services',
  imports: [CommonModule, ContentCardComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true
})
export class ServicesComponent {
}
