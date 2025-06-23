import {Component, inject, signal} from '@angular/core';
import {T} from '../../../shared/constants/text.tokens';
import { FormsModule, NgForm} from "@angular/forms";
import {TextPipe} from '../../../pipes/text.pipe';
import {CommonModule} from '@angular/common';
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';
import {environment} from '../../../../environments/environment.prod';
import {TextService} from '../../../services/text.service';
// import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  standalone: true,
  imports: [TextPipe, CommonModule, FormsModule]
})
export class ContactFormComponent {
  protected readonly T = T;
  private textService = inject(TextService);
  sending = signal(false);

  contact = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.sending.set(true);

      const body = {
        to_name: 'Petr',
        web_name: 'Shiatsu Petrklic',
        from_name: this.contact.name,
        email: this.contact.email,
        message: this.contact.message,
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
          form.resetForm();
        }, (error) => {
          console.log('FAILED...', error);
          alert(this.textService.get(T.contact_form_error_message));
        }).finally(() => {
          this.sending.set(false);
      });
    }
  }
}
