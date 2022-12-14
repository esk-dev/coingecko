import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ChartData } from 'src/app/interfaces/chart-data';
import { ApiService } from 'src/app/services/api.service';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataMutationService } from 'src/app/services/data-mutation.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private destroy$: Subject<boolean> = new Subject();

  // private chartData!: ChartData;

  public lineChartDataPrices!: ChartConfiguration['data'];

  public lineChartDataCaps!: ChartConfiguration['data'];

  public lineChartType: ChartType = 'line';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataMutation: DataMutationService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        // filter((params) => params.has('id')),
        takeUntil(this.destroy$),
        map((params) => params.get('id')),
        switchMap((id) => {
          return this.dataMutation.coinHistoricalDataMutation(
            this.apiService.fetchCoinHistoricalData(id || 'undefined')
          );
        })
      )
      .subscribe((chartData: ChartData) => {
        console.log(chartData);
        this.lineChartDataPrices = {
          datasets: [
            {
              data: chartData.prices,
              label: 'Prices',
            },
          ],
          labels: chartData?.dates,
        };

        this.lineChartDataCaps = {
          datasets: [
            {
              data: chartData.prices,
              label: 'Caps',
            },
          ],
          labels: chartData?.dates,
        };
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
