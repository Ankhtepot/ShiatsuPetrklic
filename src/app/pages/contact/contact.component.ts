import {Component, OnInit} from '@angular/core';
import {TextService} from "../../services/text.service";
import {T} from "../../shared/constants/text.tokens";
import {ContactFormComponent} from './contact-form/contact-form.component';
import {TextPipe} from '../../pipes/text.pipe';
import {ContactInformationComponent} from './contact-information.component/contact-information.component';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {SeoService} from '../../services/seo.service';
import {EPages} from '../../services/navigation-link.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [ContactFormComponent, ContactInformationComponent, TextPipe, ContentCardComponent]
})
export class ContactComponent implements OnInit{
  protected readonly T = T;
  labelWidth: string = '100px'; // Default width

  constructor(private textService: TextService, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setPage({
      page: EPages.Contact,
      title: T.contact_page_title,
      description: T.contact_page_description
    });
  }

  getText(address_value: T) {
    return this.textService.get(address_value);
  }
}
