import {Component, computed, Input, signal} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-content-card',
  standalone: true,
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
  imports: [NgStyle]
})
export class ContentCardComponent {
  @Input() width: string = '600px'; // Can be '80%', '60%', '500px', etc.

  private screenWidth = signal(window.innerWidth);
  readonly style = computed(() => this.isMobile() ? {} : { width: this.width });
  readonly isMobile = signal(window.innerWidth < 768);

  constructor() {
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      this.screenWidth.set(newWidth);
      this.isMobile.set(newWidth < 768);
    });
  }

}
