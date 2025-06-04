import {Component, inject, Input} from '@angular/core';
import {TextService} from '../../../services/text.service';
import {T} from '../../../shared/constants/text.tokens';
import {CommonModule} from '@angular/common';
import {ContactItemComponent} from './contact-item/contact-item.component';

@Component({
  selector: 'app-contact-information',
  imports: [CommonModule, ContactItemComponent],
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss'],
  standalone: true,
})
export class ContactInformationComponent {
  private textService = inject(TextService);

  @Input() labelWidth: string = '50px';

  getText(textKey: T) : string {
    return this.textService.get(textKey);
  }

  protected readonly T = T;
}
