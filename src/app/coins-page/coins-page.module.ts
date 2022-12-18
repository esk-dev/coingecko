import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { RowComponent } from './row/row.component';
import { CoinsPageRoutingModule } from './coins-page-routing.module';

@NgModule({
  declarations: [TableComponent, RowComponent],
  imports: [CommonModule, CoinsPageRoutingModule],
})
export class CoinsPageModule {}
