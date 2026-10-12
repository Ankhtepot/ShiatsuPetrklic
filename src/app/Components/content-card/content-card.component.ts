import {AfterViewInit, Component, computed, inject, input, Input, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser, NgStyle} from '@angular/common';

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
  passthrough = input(false);

  readonly style = computed(() => this.passthrough() || this.isMobile() ? {} : { width: this.width });
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly isMobile = signal(this.isBrowser && window.innerWidth < 768);

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      this.isMobile.set(newWidth < 1200);
    });
  }
}
