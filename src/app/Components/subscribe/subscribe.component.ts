import {Component, inject, input, output, signal, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {T} from '../../shared/constants/text.tokens';
import {TextPipe} from '../../pipes/text.pipe';
import {GenericButtonComponent} from '../button-general/button-generic.component';
import {ModalComponent} from '../modal/modal.component';
import {ConfirmationPopupComponent} from '../confirmation-popup/confirmation-popup.component';
import {AppColors} from '../../../styles/colors.gen';
import {TextService} from '../../services/text.service';
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';
import {environment} from '../../../environments/environment.prod';

interface SubscriptionFormData {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [
    CommonModule,
    TextPipe,
    GenericButtonComponent,
    ModalComponent,
    ConfirmationPopupComponent,
    FormsModule
  ],
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {
  @ViewChild('subscribeForm') subscribeForm!: NgForm;

  eventTitle = input<string>('');
  eventId = input<string>('');
  subscribed = output<void>();

  isConfirmationVisible = signal(false);
  isSending = signal(false);
  formSubmitAttempted = signal(false);
  private textService = inject(TextService);

  formData = {
    name: '',
    email: '',
    phone: ''
  };

  protected readonly T = T;
  protected readonly AppColors = AppColors;

  readonly buttonStyles = {
    width: '20em',
  };

  onSubscribeClick(): void {
    this.resetForm();
    this.isConfirmationVisible.set(true);
  }

  onConfirmationConfirmed(): void {
    if (this.subscribeForm) {
      // Mark all fields as touched to show validation messages
      Object.keys(this.subscribeForm.controls).forEach(key => {
        const control = this.subscribeForm.controls[key];
        if (control) {
          control.markAsTouched();
        }
      });

      this.formSubmitAttempted.set(true);

      if (this.subscribeForm.valid) {
        this.sendSubscriptionEmail();
      }
    }
  }

  onConfirmationCancelled(): void {
    this.isConfirmationVisible.set(false);
    this.resetForm();
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: ''
    };
    if (this.subscribeForm) {
      this.subscribeForm.resetForm();
    }
    this.formSubmitAttempted.set(false);
  }

  private sendSubscriptionEmail(): void {
    this.isSending.set(true);

    const body = {
      to_name: 'Petr',
      web_name: 'Shiatsu Petrklic',
      from_name: this.formData.name,
      email: this.formData.email,
      message: `This person subscribed to an event ${this.eventTitle()}: ${this.eventId()}. Their phone number is ${this.formData.phone}.`,
      time: new Date().toLocaleString(),
    };

    emailjs.send(
      environment.emailServiceId,
      environment.emailTemplateId,
      body,
      environment.emailUserId)
      .then((response: EmailJSResponseStatus) => {
        console.log('SUCCESS!', response.status, response.text);
        alert(this.textService.get(T.contact_form_success_message));
        this.isConfirmationVisible.set(false);
        this.resetForm();
        this.subscribed.emit();
      }, (error) => {
        console.log('FAILED...', error);
        alert(this.textService.get(T.contact_form_error_message));
      }).finally(() => {
        this.isSending.set(false);
      });
  }
}


