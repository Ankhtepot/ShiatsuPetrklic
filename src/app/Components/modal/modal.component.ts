import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextPipe} from '../../pipes/text.pipe';
import {T} from '../../shared/constants/text.tokens';
import {GenericButtonComponent} from '../button-general/button-general.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, TextPipe, GenericButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() isCloseButtonShown: boolean = true;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }

  protected readonly T = T;
}
