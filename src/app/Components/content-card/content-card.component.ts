import {AfterViewInit, Component, computed, input, Input, signal} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-content-card',
  standalone: true,
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
  imports: [NgStyle]
})
export class ContentCardComponent implements AfterViewInit {
  @Input() width: string = '800px'; // Can be '80%', '60%', '500px', etc.
  backgroundOpacity = input<number>(0.7);

  private screenWidth = signal(window.innerWidth);
  readonly style = computed(() => this.isMobile() ? {} : { width: this.width });
  readonly isMobile = signal(window.innerWidth < 768);

  ngAfterViewInit(): void {
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      this.screenWidth.set(newWidth);
      this.isMobile.set(newWidth < 768);
    });
  }
}
