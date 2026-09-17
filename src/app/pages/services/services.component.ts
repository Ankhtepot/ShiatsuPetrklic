import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {EPages} from '../../services/navigation-link.service';
import {SeoService} from '../../services/seo.service';
import {TextService} from '../../services/text.service';
import {T} from '../../shared/constants/text.tokens';
import {TextPipe} from '../../pipes/text.pipe';
import {SoftTopicCardComponent} from '../../Components/soft-topic-card/soft-topic-card.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

interface TanecTantraSection {
  id: string;
  icon: string;
  label: string;
  eyebrow: string;
  title: string;
  markdownCsPath: string;
  markdownEnPath: string;
}

@Component({
  selector: 'app-services',
  imports: [ContentCardComponent, TextPipe, SoftTopicCardComponent, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true
})
export class ServicesComponent implements OnInit {
  protected readonly T = T;
  @ViewChild('sectionNav') private sectionNav?: ElementRef<HTMLElement>;

  private route = inject(ActivatedRoute);
  private injector = inject(Injector);
  private fragment = toSignal(this.route.fragment, {initialValue: null});

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

  sections = computed<TanecTantraSection[]>(() => [
    {
      id: 'tantric-massages',
      icon: 'bi-flower1',
      label: this.textService.get(T.tanec_tantra_nav_tantric_massages),
      eyebrow: this.textService.get(T.tanec_tantra_section_1_eyebrow),
      title: this.textService.get(T.tanec_tantra_section_1_title),
      markdownCsPath: '/markdown/services/tantric-massages.cs.md',
      markdownEnPath: '/markdown/services/tantric-massages.en.md'
    },
    {
      id: 'therapeutic-shibari',
      icon: 'bi-link-45deg',
      label: this.textService.get(T.tanec_tantra_nav_therapeutic_shibari),
      eyebrow: this.textService.get(T.tanec_tantra_section_2_eyebrow),
      title: this.textService.get(T.tanec_tantra_section_2_title),
      markdownCsPath: '/markdown/services/therapeutic-shibari.cs.md',
      markdownEnPath: '/markdown/services/therapeutic-shibari.en.md'
    },
    {
      id: 'dancing',
      icon: 'bi-music-note-beamed',
      label: this.textService.get(T.tanec_tantra_nav_dancing),
      eyebrow: this.textService.get(T.tanec_tantra_section_3_eyebrow),
      title: this.textService.get(T.tanec_tantra_section_3_title),
      markdownCsPath: '/markdown/services/dancing.cs.md',
      markdownEnPath: '/markdown/services/dancing.en.md'
    },
    {
      id: 'dearmouring',
      icon: 'bi-heart',
      label: this.textService.get(T.tanec_tantra_nav_dearmouring),
      eyebrow: this.textService.get(T.tanec_tantra_section_4_eyebrow),
      title: this.textService.get(T.tanec_tantra_section_4_title),
      markdownCsPath: '/markdown/services/dearmouring.cs.md',
      markdownEnPath: '/markdown/services/dearmouring.en.md'
    }
  ]);

  private scrollToFragment(fragment: string): void {
    const target = document.getElementById(fragment);
    if (!target) {
      return;
    }

    const navHeight = this.sectionNav?.nativeElement.offsetHeight ?? 0;
    const yOffset = navHeight + 104;
    const y = target.getBoundingClientRect().top + window.scrollY - yOffset;

    window.scrollTo({
      top: Math.max(y, 0),
      behavior: 'smooth'
    });
  }
}
