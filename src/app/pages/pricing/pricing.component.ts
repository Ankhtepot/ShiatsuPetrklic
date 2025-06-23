import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {EHeaderPosition, PricingTableComponent, TableData} from '../../Components/table/table.component';
import {T} from '../../shared/constants/text.tokens';
import {TextPipe} from '../../pipes/text.pipe';
import {TextService} from '../../services/text.service';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, ContentCardComponent, PricingTableComponent],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  standalone: true
})
export class PricingComponent {
  protected T = T;

  private textService = inject(TextService);

  data = signal<TableData>({
    headerPosition: EHeaderPosition.Center,
    headers: [this.textService.get(T.pricing_table_header_1), this.textService.get(T.pricing_table_header_2)],
    rows: [
      [
        this.textService.get(T.pricing_shiatsu_row_1_description),
        this.textService.get(T.pricing_shiatsu_row_1_price)
      ],
      [
        this.textService.get(T.pricing_shiatsu_row_2_description),
        this.textService.get(T.pricing_shiatsu_row_2_price)
      ],
      [
        this.textService.get(T.pricing_shiatsu_row_3_description),
        this.textService.get(T.pricing_shiatsu_row_3_price)
      ]
    ]
  });

}
