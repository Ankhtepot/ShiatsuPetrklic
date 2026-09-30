import {EHeaderPosition, TableData} from '../../Components/table/table.component';
import {TextService} from '../../services/text.service';
import {T} from '../constants/text.tokens';

export function getShiatsuPricingTableData(textService: TextService): TableData {
  return {
    title: textService.get(T.pricing_shiatsu_table_title),
    headerPosition: EHeaderPosition.Center,
    headers: [textService.get(T.pricing_table_header_1), textService.get(T.pricing_table_header_2)],
    rows: [
      [
        textService.get(T.pricing_shiatsu_row_1_description),
        textService.get(T.pricing_1200kc)
      ],
      [
        textService.get(T.pricing_shiatsu_row_2_description),
        textService.get(T.pricing_shiatsu_row_2_price)
      ],
      [
        textService.get(T.pricing_shiatsu_row_3_description),
        textService.get(T.pricing_shiatsu_row_3_price)
      ]
    ]
  };
}

export function getShibariPricingTableData(textService: TextService): TableData {
  return {
    title: textService.get(T.pricing_shibari_table_title),
    headerPosition: EHeaderPosition.Center,
    headers: [textService.get(T.pricing_table_header_1), textService.get(T.pricing_table_header_2)],
    rows: [
      [
        textService.get(T.pricing_shibari_row_1_description),
        textService.get(T.pricing_1500kc)
      ],
      [
        textService.get(T.pricing_shibari_row_2_description),
        textService.get(T.pricing_2500kc)
      ],
    ]
  };
}
