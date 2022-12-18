import {
  Component,
  Input,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input()
  public lineChartData$!: ChartConfiguration['data'];

  @Input()
  public lineChartType$!: ChartType;

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },
  };

  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private dataMutation: DataMutationService,
  //   private apiService: ApiService
  // ) {}

  // ngOnInit(): void {
  //   this.activatedRoute.paramMap
  //     .pipe(
  //       // filter((params) => params.has('id')),
  //       takeUntil(this.destroy$),
  //       map((params) => params.get('id')),
  //       switchMap((id) => {
  //         return this.dataMutation.coinHistoricalDataMutation(
  //           this.apiService.fetchCoinHistoricalData(id || 'undefined')
  //         );
  //       })
  //     )
  //     .subscribe((chartData: ChartData) => {
  //       console.log(chartData);
  //       this.lineChartDataPrices = {
  //         datasets: [
  //           {
  //             data: chartData.prices,
  //             label: 'Prices',
  //           },
  //         ],
  //         labels: chartData?.dates,
  //       };

  //       this.lineChartDataCaps = {
  //         datasets: [
  //           {
  //             data: chartData.prices,
  //             label: 'Caps',
  //           },
  //         ],
  //         labels: chartData?.dates,
  //       };
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  //   this.destroy$.complete();
  // }
}
