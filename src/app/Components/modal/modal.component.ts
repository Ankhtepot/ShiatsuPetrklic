import {Component, output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  closeModal = output<void>();

  /**
   * Handle clicks outside the modal content to close the modal
   */
  onBackdropClick(event: MouseEvent): void {
    // Only close if clicking on the backdrop itself, not on child elements
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }
}


