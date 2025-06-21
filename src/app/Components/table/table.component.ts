import { Component, Input, computed } from '@angular/core';
import {CommonModule} from '@angular/common';

export interface TableData {
  headers?: string[];
  headerPosition?: EHeaderPosition;
  rows: string[][];
}

export enum EHeaderPosition {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class PricingTableComponent {
  @Input({ required: true }) data!: TableData;

  // Compute the maximum number of columns in all rows
  columnCount = computed(() => {
    return Math.max(...this.data.rows.map(row => row.length));
  });
  protected readonly Array = Array;
  protected readonly EHeaderPosition = EHeaderPosition;
}
