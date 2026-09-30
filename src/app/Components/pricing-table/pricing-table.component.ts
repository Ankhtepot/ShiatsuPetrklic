import {Component, input} from '@angular/core';
import {T} from '../../shared/constants/text.tokens';
import {ContentCardComponent} from '../content-card/content-card.component';
import {DefaultTableData, TableComponent, TableData} from '../table/table.component';

@Component({
  selector: 'app-pricing-table',
  standalone: true,
  imports: [ContentCardComponent, TableComponent],
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss']
})
export class PricingTableComponent {
  protected readonly T = T;

  readonly data = input<TableData>(DefaultTableData);
  readonly backgroundOpacity = input(0.94);
  readonly sectionId = input('pricing');
  readonly tableTitle = input<string>();
  readonly embedded = input(false);
}
