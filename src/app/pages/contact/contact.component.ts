import { Component } from '@angular/core';
import {T, TextService} from "../../services/text.service";
import {CommonModule} from '@angular/common';
import {ContactFormComponent} from './contact-form/contact-form.component';
import {ContactInfoComponent} from './contact-info/contact-info.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [CommonModule, ContactFormComponent, ContactInfoComponent]
})
export class ContactComponent {
  protected readonly T = T;
  labelWidth: string = '100px'; // Default width

  constructor(private textService: TextService) { }

  getText(address_value: T) {
    return this.textService.get(address_value);
  }
}
