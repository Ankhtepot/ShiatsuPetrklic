import {AfterContentChecked, Component, ElementRef, input, signal, ViewChild} from '@angular/core';
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
export class PricingTableComponent implements AfterContentChecked {
  protected readonly T = T;
  protected readonly hasProjectedContent = signal(false);

  @ViewChild('projectedContent') private projectedContent?: ElementRef<HTMLElement>;

  readonly data = input<TableData>(DefaultTableData);
  readonly backgroundOpacity = input(0.94);
  readonly sectionId = input('pricing');
  readonly tableTitle = input<string>();
  readonly embedded = input(false);

  ngAfterContentChecked(): void {
    const projectedContentElement = this.projectedContent?.nativeElement;
    if (!projectedContentElement) {
      return;
    }

    const hasProjectedContent = Array.from(projectedContentElement.childNodes).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      }

      return node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim();
    });

    if (this.hasProjectedContent() !== hasProjectedContent) {
      this.hasProjectedContent.set(hasProjectedContent);
    }
  }
}
