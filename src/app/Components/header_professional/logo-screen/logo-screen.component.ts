import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  effect,
  inject,
  runInInjectionContext,
  Injector,
  EffectRef, Input
} from '@angular/core';
import { ScreenService } from '../../../services/screen.service';

@Component({
  selector: 'app-logo-screen',
  templateUrl: './logo-screen.component.html',
  styleUrls: ['./logo-screen.component.scss'],
  standalone: true,
})
export class LogoScreenComponent implements AfterViewInit, OnDestroy {
  @ViewChild('logo') logo!: ElementRef;

  @Input() imagePath: string | undefined;

  private screenService = inject(ScreenService);
  private injector = inject(Injector);
  private visibilityEffectRef?: EffectRef;

  ngAfterViewInit(): void {
    runInInjectionContext(this.injector, () => {
      this.visibilityEffectRef = effect(() => {
        const headerShown = this.screenService.headerVisibilityChanged();
        if (this.logo?.nativeElement) {
          if (!headerShown) {
            this.logo.nativeElement.classList.remove('hide');
            this.logo.nativeElement.classList.add('show');
          } else {
            this.logo.nativeElement.classList.remove('show');
            this.logo.nativeElement.classList.add('hide');
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.visibilityEffectRef?.destroy();
  }
}
