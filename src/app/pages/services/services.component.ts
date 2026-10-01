import {
  AfterViewInit,
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  Injector,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {PricingTableComponent} from '../../Components/pricing-table/pricing-table.component';
import {SoftTopicCardComponent} from '../../Components/soft-topic-card/soft-topic-card.component';
import {TextPipe} from '../../pipes/text.pipe';
import {EPages} from '../../services/navigation-link.service';
import {SeoService} from '../../services/seo.service';
import {TextService} from '../../services/text.service';
import {T} from '../../shared/constants/text.tokens';
import {getShibariPricingTableData} from '../../shared/data/pricing';
import {DanceTantraSection} from '../../shared/models/common';
import {SpanExpandableComponent} from '../../Components/span-expandable/span-expandable.component';
import {ServicesNavigation} from './services-navigation/services-navigation';

@Component({
  selector: 'app-services',
  imports: [
    ContentCardComponent,
    TextPipe,
    SoftTopicCardComponent,
    PricingTableComponent,
    SpanExpandableComponent,
    ServicesNavigation
  ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true
})
export class ServicesComponent implements OnInit, AfterViewInit {
  protected readonly T = T;
  private readonly floatingNavigationGapDesktop = -30;
  private readonly floatingNavigationGapMobile = -30;
  private readonly sectionScrollSpacing = 24;

  @ViewChild('tanecTantraPage') private tanecTantraPage?: ElementRef<HTMLElement>;
  @ViewChild('floatingSectionNav') private floatingSectionNav?: ElementRef<HTMLElement>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private injector = inject(Injector);
  private fragment = toSignal(this.route.fragment, {initialValue: null});

  readonly showFloatingNavigation = signal(false);
  readonly floatingNavigationTop = signal(0);
  protected readonly shibariPricingData = computed(() => getShibariPricingTableData(this.textService));

  constructor(private seo: SeoService, private textService: TextService) {
    effect(() => {
      const fragment = this.fragment();
      if (!fragment) {
        return;
      }

      afterNextRender(() => this.scrollToFragment(fragment), {injector: this.injector});
    });
  }

  ngOnInit(): void {
    this.seo.setSeo({
      title: this.textService.get(T.services_page_title),
      description: this.textService.get(T.services_page_description)
    });

    this.seo.setCanonicalPage(EPages.Services);
  }

  ngAfterViewInit(): void {
    afterNextRender(() => this.updateFloatingNavigation(), {injector: this.injector});
  }

  sections = computed<DanceTantraSection[]>(() => [
    {
      id: 'therapeutic-shibari',
      icon: 'bi-link-45deg',
      label: this.textService.get(T.tanec_tantra_nav_therapeutic_shibari),
      eyebrow: this.textService.get(T.tanec_tantra_section_2_eyebrow),
      title: this.textService.get(T.tanec_tantra_section_2_title),
      markdownCsPath: '/markdown/services/therapeutic-shibari.cs.md',
      markdownEnPath: '/markdown/services/therapeutic-shibari.en.md',
      pricingData: this.shibariPricingData()
    },
    {
      id: 'tantric-massages',
      icon: 'bi-flower1',
      label: this.textService.get(T.tanec_tantra_nav_tantric_massages),
      eyebrow: this.textService.get(T.tanec_tantra_section_1_eyebrow),
      title: this.textService.get(T.tanec_tantra_section_1_title),
      markdownCsPath: '/markdown/services/tantric-massages.cs.md',
      markdownEnPath: '/markdown/services/tantric-massages.en.md'
      // markdownCsPath: '/markdown/services/default.cs.md',
      // markdownEnPath: '/markdown/services/default.en.md'
    },
    {
      id: 'dancing',
      icon: 'bi-music-note-beamed',
      label: this.textService.get(T.tanec_tantra_nav_dancing),
      eyebrow: this.textService.get(T.tanec_tantra_section_3_eyebrow),
      title: this.textService.get(T.tanec_tantra_section_3_title),
      markdownCsPath: '/markdown/services/dancing.cs.md',
      markdownEnPath: '/markdown/services/dancing.en.md'
      // markdownCsPath: '/markdown/services/default.cs.md',
      // markdownEnPath: '/markdown/services/default.en.md'
    },
    {
      id: 'dearmouring',
      icon: 'bi-heart',
      label: this.textService.get(T.tanec_tantra_nav_dearmouring),
      eyebrow: this.textService.get(T.tanec_tantra_section_4_eyebrow),
      title: this.textService.get(T.tanec_tantra_section_4_title),
      markdownCsPath: '/markdown/services/dearmouring.cs.md',
      markdownEnPath: '/markdown/services/dearmouring.en.md'
      // markdownCsPath: '/markdown/services/default.cs.md',
      // markdownEnPath: '/markdown/services/default.en.md'
    }
  ]);

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    this.updateFloatingNavigation();
  }

  navigateToSection(sectionId: string): void {
    const sameFragment = this.fragment() === sectionId;

    void this.router.navigate([], {
      relativeTo: this.route,
      fragment: sectionId,
      queryParamsHandling: 'preserve'
    }).then(() => {
      if (sameFragment) {
        this.scrollToFragment(sectionId);
      }
    });
  }

  private scrollToFragment(fragment: string): void {
    const target = document.getElementById(fragment);
    if (!target) {
      return;
    }

    const yOffset = this.getScrollOffset();
    const y = target.getBoundingClientRect().top + window.scrollY - yOffset;

    window.scrollTo({
      top: Math.max(y, 0),
      behavior: 'smooth'
    });
  }

  private updateFloatingNavigation(): void {
    const section = this.tanecTantraPage?.nativeElement;
    if (!section) {
      return;
    }

    const headerBottom = this.getHeaderBottom();
    const verticalGap = this.getNavigationGap();

    this.floatingNavigationTop.set(headerBottom + verticalGap);

    const sectionBottom = section.getBoundingClientRect().bottom;
    this.showFloatingNavigation.set(sectionBottom <= headerBottom + verticalGap + 8);
  }

  private getScrollOffset(): number {
    const headerBottom = this.getHeaderBottom();
    const floatingNavHeight = this.floatingSectionNav?.nativeElement.offsetHeight ?? 0;

    return headerBottom + floatingNavHeight + this.getNavigationGap() + this.sectionScrollSpacing;
  }

  private getHeaderBottom(): number {
    const header = document.querySelector('.header') as HTMLElement | null;
    if (!header) {
      return 0;
    }

    return Math.max(header.getBoundingClientRect().bottom, 0);
  }

  private getNavigationGap(): number {
    return window.innerWidth <= 768
      ? this.floatingNavigationGapMobile
      : this.floatingNavigationGapDesktop;
  }
}
