import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentCardComponent} from '../../Components/content-card/content-card.component';
import {EHeaderPosition, PricingTableComponent, TableData} from '../../Components/table/table.component';
import {T} from '../../shared/constants/text.tokens';
import {TextService} from '../../services/text.service';
import {SeoService} from '../../services/seo.service';
import {EPages} from '../../services/navigation-link.service';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, ContentCardComponent, PricingTableComponent],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  standalone: true
})
export class PricingComponent implements OnInit {
  protected T = T;

  private textService = inject(TextService);

  constructor(private seo: SeoService) {
  }

  ngOnInit(): void {
    this.seo.setSeo({
      title: this.textService.get(T.pricing_page_title),
      description: this.textService.get(T.pricing_page_description)
      // description: 'Explore the pricing for Shiatsu therapy sessions in Brno. Find detailed information about session types and costs.'
    });

    this.seo.setCanonicalPage(EPages.Contact);
  }

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
