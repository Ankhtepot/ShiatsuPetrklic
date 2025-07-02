import {Component, OnInit} from '@angular/core';
import {TextService} from "../../services/text.service";
import {T} from "../../shared/constants/text.tokens";
import {CommonModule} from '@angular/common';
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
  imports: [CommonModule, ContactFormComponent, ContactInformationComponent, TextPipe, ContentCardComponent]
})
export class ContactComponent implements OnInit{
  protected readonly T = T;
  labelWidth: string = '100px'; // Default width

  constructor(private textService: TextService, private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setSeo({
      title: this.textService.get(T.contact_page_title),
      description: this.textService.get(T.contact_page_description)
      // description: 'Get in touch for appointments, inquiries, or more information about Shiatsu therapy in Brno.'
    });
    this.seo.setCanonicalPage(EPages.Contact);
  }

  getText(address_value: T) {
    return this.textService.get(address_value);
  }
}
