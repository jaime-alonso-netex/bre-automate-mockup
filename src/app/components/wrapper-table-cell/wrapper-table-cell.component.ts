import { Component, Input } from '@angular/core';
import { TableCellComponent, TableCellConfig } from '@netexknowledge/admin-components';

@Component({
  standalone: true,
  imports: [TableCellComponent],
  template: `<admin-table-cell 
    [tableCellConfig]="tableCellConfig"
    (buttonTableCellClicked)="handleButtonClicked($event)"
    ></admin-table-cell>`,
})
export class WrapperTableCellComponent {
  @Input() tableCellConfig!: TableCellConfig;
  handleButtonClicked(id: string) {
    console.log('Button clicked with id:', id);
  }
}
