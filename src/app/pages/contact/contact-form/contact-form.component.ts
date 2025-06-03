import {Component} from '@angular/core';
import {T} from '../../../shared/constants/text.tokens';
import { FormsModule, NgForm} from "@angular/forms";
import {TextPipe} from '../../../pipes/text.pipe';
import {CommonModule} from '@angular/common';
// import emailjs, {EmailJSResponseStatus} from 'emailjs-com';
// import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  standalone: true,
  imports: [TextPipe, CommonModule, FormsModule]
})
export class ContactFormComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      // const body = {
      //   to_name: 'Petr',
      //   web_name: 'ShiatsuBrno',
      //   from_name: this.contact.name,
      //   email: this.contact.email,
      //   message: this.contact.message
      // };

      // emailjs.send(
      //   environment.emailServiceId,
      //   environment.emailTemplateId,
      //   body,
      //   environment.emailUserId)
      //   .then((response: EmailJSResponseStatus) => {
      //     console.log('SUCCESS!', response.status, response.text);
      //     alert('Email sent successfully!');
      //   }, (error) => {
      //     console.log('FAILED...', error);
      //     alert('Failed to send email. Please try again later.');
      //   });
    }
  }

  protected readonly T = T;
}
