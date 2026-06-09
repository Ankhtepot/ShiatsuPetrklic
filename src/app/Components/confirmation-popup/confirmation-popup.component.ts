import {Component, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {T} from '../../shared/constants/text.tokens';
import {TextPipe} from '../../pipes/text.pipe';
import {AppColors} from '../../../styles/colors.gen';

@Component({
  selector: 'app-confirmation-popup',
  standalone: true,
  imports: [CommonModule, TextPipe],
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {
  confirmed = output<void>();
  cancelled = output<void>();

  protected readonly T = T;
  protected readonly AppColors = AppColors;

  onConfirmClick(): void {
    this.confirmed.emit();
  }

  onCancelClick(): void {
    this.cancelled.emit();
  }
}

