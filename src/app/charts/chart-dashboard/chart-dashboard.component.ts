import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataMutationService } from 'src/app/services/data-mutation.service';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss'],
})
export class ChartDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private destroy$: Subject<boolean> = new Subject();

  private chartDataSubject: Subject<ChartData[]> = new Subject();

  public readonly chartData$: Observable<ChartData[]> =
    this.chartDataSubject.asObservable();

  public readonly chartType: ChartType = 'line';

  public trackByIndex(index: number): number {
    return index;
  }
  // public lineChartOptions: ChartConfiguration['options'] = {
  //   elements: {
  //     line: {
  //       tension: 0.5,
  //     },
  //   },
  //   scales: {
  //     // We use this empty structure as a placeholder for dynamic theming.
  //     y: {
  //       position: 'left',
  //     },
  //     y1: {
  //       position: 'right',
  //       grid: {
  //         color: 'rgba(255,0,0,0.3)',
  //       },
  //       ticks: {
  //         color: 'red',
  //       },
  //     },
  //   },
  // };

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataMutation: DataMutationService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params.get('id')),
        switchMap((id) => {
          return this.dataMutation.coinHistoricalDataMutation(
            this.apiService.fetchCoinHistoricalData(id || 'undefined')
          );
        })
      )
      .subscribe((chartData: ChartData[]) =>
        this.chartDataSubject.next(chartData)
      );
  }
}
