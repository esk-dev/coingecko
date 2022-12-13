import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ChartData } from 'src/app/interfaces/chart-data';
import { ApiService } from 'src/app/services/api.service';
import { DataMutationService } from 'src/app/services/data-mutation.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject();

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
      .subscribe((response: ChartData) => {
        console.log(response);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
