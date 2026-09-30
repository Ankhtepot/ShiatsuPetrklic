import { Component, Input, computed } from '@angular/core';
import {CommonModule} from '@angular/common';

export interface TableData {
  title: string;
  introHtml?: string;
  headers?: string[];
  headerPosition?: EHeaderPosition;
  rows: string[][];
}

export enum EHeaderPosition {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export const DefaultTableData: TableData = {
  title: 'Default Table Title',
  headers: ['Header 1', 'Header 2'],
  headerPosition: EHeaderPosition.Center,
  rows: [
    ['Row 1, Column 1', 'Row 1, Column 2'],
    ['Row 2, Column 1', 'Row 2, Column 2'],
    ['Row 3, Column 1', 'Row 3, Column 2']
  ]
};

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input({ required: true }) data!: TableData;

  // Compute the maximum number of columns in all rows
  columnCount = computed(() => {
    return Math.max(...this.data.rows.map(row => row.length));
  });
  protected readonly Array = Array;
  protected readonly EHeaderPosition = EHeaderPosition;
}
