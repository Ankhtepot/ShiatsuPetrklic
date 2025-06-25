import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  signal,
  effect,
  inject, computed
} from '@angular/core';
import {ScreenService} from '../../services/screen.service';
import {T} from '../../shared/constants/text.tokens';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LogoScreenComponent} from './logo-screen/logo-screen.component';
import {HeaderProfessionalConfiguration} from './models';
import {HeaderDropdownComponent} from './header-dropdown/header-dropdown.component';

const showTime = 2000;

@Component({
  selector: 'app-header-professional',
  templateUrl: './header-professional.component.html',
  styleUrls: ['./header-professional.component.scss'],
  standalone: true,
  imports: [CommonModule, LogoScreenComponent, RouterModule, HeaderDropdownComponent]
})
export class HeaderProfessionalComponent implements OnDestroy {
  @Input() configuration: HeaderProfessionalConfiguration = {
    links: []
  };

  public showHeader = signal(true);
  public mediaBreakpoint = signal('');
  menuOpen = signal(false);
  showMobileMenu = computed(() => this.menuOpen());

  hasDropdowns = computed(() =>
    !!this.configuration.dropdownsConfigurations?.length
  );

  protected readonly T = T;

  private screenService = inject(ScreenService);

  private hideHeaderTimer: any;

  constructor() {
    this.onShowHeader(); // Still valid to call here
    if (!this.configuration.textColor) {
      this.configuration.textColor = '#000'; // Default text color
    }
    if (!this.configuration.backgroundGradientStart) {
      this.configuration.backgroundGradientStart = '#fff'; // Default gradient start
    }
    if (!this.configuration.backgroundGradientEnd) {
      this.configuration.backgroundGradientEnd = '#f0f0f0'; // Default gradient end
    }
  }

  // ✅ Define effects directly inside the class — in injection context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _scrollUpEffect = effect(() => {
    if (!this.isDynamicShow) return;
    if (this.screenService.scrolledUp()) {
      this.showHeader.set(true);
      this.screenService.setHeaderVisibility(true);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _scrollDownEffect = effect(() => {
    if (!this.isDynamicShow) return;
    if (this.screenService.scrolledDown()) {
      this.showHeader.set(false);
      this.onMouseLeave();
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _scrollToTopEffect = effect(() => {
    if (!this.isDynamicShow) return;
    if (this.screenService.scrolledToTop()) {
      this.onShowHeader();
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _mediaBreakpointEffect = effect(() => {
    this.mediaBreakpoint.set(this.screenService.mediaBreakpoint());
  });

  @HostListener('window:wheel', ['$event'])
  onWindowWheel(event: WheelEvent) {
    if (window.scrollY === 0 && event.deltaY < 0) {
      this.onShowHeader();
    }
  }

  ngOnDestroy() {
    this.onMouseEnter(); // clears timer
  }

  onShowHeader() {
    this.showHeader.set(true);
    this.screenService.setHeaderVisibility(true);
    this.onMouseLeave();
  }

  onMouseEnter() {
    clearTimeout(this.hideHeaderTimer);
  }

  onMouseLeave() {
    clearTimeout(this.hideHeaderTimer);
    this.hideHeaderTimer = setTimeout(() => {
      this.showHeader.set(false);
      this.screenService.setHeaderVisibility(false);
    }, showTime);
  }

  get isDynamicShow(): boolean {
    return this.configuration.dynamicShow ?? true;
  }

  backgroundStyle() {
    const gradient = this.configuration.backgroundGradientStart && this.configuration.backgroundGradientEnd
      ? `linear-gradient(to bottom, ${this.configuration.backgroundGradientStart}, ${this.configuration.backgroundGradientEnd})`
      : 'linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.50))'; // Default gradient if not provided

    return {
      'background-image': gradient
    };
  }

  textColor() {
    return {'color': (this.configuration.textColor || '#000')}; // Default text color if not provided
  }

  toggleMobileMenu = () => this.menuOpen.update(v => !v);
  closeMobileMenu = () => this.menuOpen.set(false);
}
