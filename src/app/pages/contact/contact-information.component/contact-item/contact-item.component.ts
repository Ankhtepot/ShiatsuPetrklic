import { Component, input } from '@angular/core';
import { T } from '../../../../shared/constants/text.tokens';
import {CommonModule} from '@angular/common';
import {TextPipe} from '../../../../pipes/text.pipe';

const unassignedIcon = 'unassigned-icon';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss'],
  standalone: true,
  imports: [CommonModule, TextPipe]
})
export class ContactItemComponent {
  readonly label = input<string>('label');
  readonly value = input<string>('value');
  readonly icon = input<string>(unassignedIcon);
  readonly labelWidth = input<string>('150px');
  readonly canBeCopied = input<boolean>(false);
  readonly copyText = input<string>('Copy');
  readonly successCopyMessage = input<string>('copied into the Clipboard!');
  readonly isValueHyperlink = input<boolean>(false);

  protected readonly T = T;
  protected readonly unassignedIcon = unassignedIcon;

  copyToClipboard() {
    const value = this.value();
    navigator.clipboard.writeText(value).then(() => {
      const message = `${value} ${this.successCopyMessage()}`;
      alert(message);
    });
  }
}
