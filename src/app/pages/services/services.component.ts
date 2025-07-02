import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {EPages} from '../../services/navigation-link.service';
import {SeoService} from '../../services/seo.service';
import {TextService} from '../../services/text.service';
import {T} from '../../shared/constants/text.tokens';

@Component({
  selector: 'app-services',
  imports: [CommonModule, ContentCardComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true
})
export class ServicesComponent implements OnInit {
  constructor(private seo: SeoService, private textService: TextService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: this.textService.get(T.services_page_title),
      description: this.textService.get(T.services_page_description)
      // description: 'Explore the range of Shiatsu therapy services offered in Brno, including individual sessions, group workshops, and more.'
    });

    this.seo.setCanonicalPage(EPages.Contact);
  }
}
