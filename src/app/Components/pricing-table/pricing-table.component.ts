import {Component, input} from '@angular/core';
import {TextPipe} from '../../pipes/text.pipe';
import {T} from '../../shared/constants/text.tokens';
import {ContentCardComponent} from '../content-card/content-card.component';
import {TableComponent, TableData} from '../table/table.component';

@Component({
  selector: 'app-pricing-table',
  standalone: true,
  imports: [TextPipe, ContentCardComponent, TableComponent],
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent {
  protected readonly T = T;

  readonly data = input.required<TableData>();
  readonly backgroundOpacity = input(0.94);
  readonly sectionId = input('pricing');
}
