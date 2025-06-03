import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  signal,
  effect,
  inject
} from '@angular/core';
import {ScreenService} from '../../services/screen.service';
import {T} from '../../shared/constants/text.tokens';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LogoScreenComponent} from './logo-screen/logo-screen.component';

const showTime = 2000;

export interface HeaderLinkConfiguration {
  navigationString: string;
  textString: string;
}

export interface HeaderProfessionalConfiguration {
  links: HeaderLinkConfiguration[];
  dynamicShow?: boolean; // If true, header visibility is controlled by scroll events
  showLogo?: boolean;
  showTitle?: boolean;
  title?: string;
  logoPath?: string;
}

@Component({
  selector: 'app-header-professional',
  templateUrl: './header-professional.component.html',
  styleUrls: ['./header-professional.component.scss'],
  standalone: true,
  imports: [CommonModule, LogoScreenComponent, RouterModule]
})
export class HeaderProfessionalComponent implements OnDestroy {
  @Input() configuration: HeaderProfessionalConfiguration = {
    links: []
  };

  public showHeader = signal(true);
  public mediaBreakpoint = signal('');

  private screenService = inject(ScreenService);
  private router = inject(Router);

  private hideHeaderTimer: any;

  constructor() {
    this.onShowHeader(); // Still valid to call here
  }

  // ✅ Define effects directly inside the class — in injection context
  private _scrollUpEffect = effect(() => {
    if (!this.isDynamicShow) return;
    if (this.screenService.scrolledUp()) {
      this.showHeader.set(true);
      this.screenService.setHeaderVisibility(true);
    }
  });

  private _scrollDownEffect = effect(() => {
    if (!this.isDynamicShow) return;
    if (this.screenService.scrolledDown()) {
      this.showHeader.set(false);
      this.onMouseLeave();
    }
  });

  private _scrollToTopEffect = effect(() => {
    if (!this.isDynamicShow) return;
    if (this.screenService.scrolledToTop()) {
      this.onShowHeader();
    }
  });

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

  isOnEligiblePage() {
    return !this.router.url.includes('/detail/');
  }

  get isDynamicShow(): boolean {
    return this.configuration.dynamicShow ?? true;
  }


  protected readonly T = T;
}
