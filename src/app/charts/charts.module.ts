import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartsRoutingModule } from './charts-routing.module';

@NgModule({
  declarations: [LineChartComponent],
  imports: [CommonModule, NgChartsModule, ChartsRoutingModule],
})
export class ChartsModule {}
