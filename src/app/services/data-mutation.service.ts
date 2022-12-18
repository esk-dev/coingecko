import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HistoricalData } from '../interfaces/historical-data';
// import { ChartData } from '../interfaces/chart-data';
import { ChartData } from 'chart.js';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DataMutationService {
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  public coinHistoricalDataMutation(
    response: Observable<HistoricalData>
  ): Observable<ChartData[]> {
    return response.pipe(
      tap((res: HistoricalData) => console.log(res)),
      map((res: HistoricalData) => {
        let dates = res.prices.map((el: Array<number>) => {
          return formatDate(el['0'], 'M/d/yy, h:mm a', this.locale);
        });
        let prices = res.prices.map((el: Array<number>) => el[1]);
        let caps = res.market_caps.map((el: Array<number>) => el[1]);

        return [
          { datasets: [{ data: prices, label: 'Prices' }], labels: dates },
          { datasets: [{ data: caps, label: 'Caps' }], labels: dates },
        ];
      })
    );
  }
}
