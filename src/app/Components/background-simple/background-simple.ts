import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-background-simple',
  imports: [CommonModule],
  templateUrl: './background-simple.html',
  styleUrls: ['./background-simple.scss'],
  standalone: true
})
export class BackgroundSimple {
  @Input() imagePath: string | undefined;
}
