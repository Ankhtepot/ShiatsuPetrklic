import { Component } from '@angular/core';
import {TextPipe} from '../../pipes/text.pipe';
import {RouterModule} from '@angular/router';
import {T} from '../../shared/constants/text.tokens';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
  imports: [TextPipe, RouterModule]
})
export class PageNotFoundComponent {

  protected readonly T = T;
}
