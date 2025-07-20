import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-read-more',
  standalone: true,
  templateUrl: './button-read-more.component.html',
  styleUrls: ['./button-read-more.component.scss']
})
export class ButtonReadMoreComponent {
  @Input() label: string = 'Read more';
  @Input() alwaysShow: boolean = false;
}
