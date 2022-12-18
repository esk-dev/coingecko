import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartDashboardComponent } from './chart-dashboard/chart-dashboard.component';

@NgModule({
  declarations: [LineChartComponent, ChartDashboardComponent],
  imports: [CommonModule, NgChartsModule, ChartsRoutingModule],
})
export class ChartsModule {}
