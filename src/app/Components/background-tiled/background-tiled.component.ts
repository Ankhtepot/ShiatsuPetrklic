import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-background-tiled',
  imports: [CommonModule],
  templateUrl: './background-tiled.component.html',
  styleUrls: ['./background-tiled.component.scss'],
  standalone: true
})
export class BackgroundTiledComponent {
  @Input() imagePath: string | undefined;
}
