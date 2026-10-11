import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-read-more',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button-read-more.component.html',
  styleUrls: ['./button-read-more.component.scss']
})
export class ButtonReadMoreComponent {
  @Input() label: string = 'Read more';
  @Input() alwaysShow: boolean = false;
  @Input() link?: string;
}
