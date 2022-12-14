import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HistoricalData } from '../interfaces/historical-data';
import { ChartData } from '../interfaces/chart-data';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DataMutationService {
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  public coinHistoricalDataMutation(
    response: Observable<HistoricalData>
  ): Observable<ChartData> {
    return response.pipe(
      tap((res: HistoricalData) => console.log(res)),
      map((res: HistoricalData) => ({
        dates: res.prices.map((el: Array<number>) => {
          return formatDate(el['0'], 'M/d/yy, h:mm a', this.locale);
        }),
        prices: res.prices.map((el: Array<number>) => el[1]),
        caps: res.market_caps.map((el: Array<number>) => el[1]),
      }))
    );
  }
}
// return `${new Date(el['0']).toDateString()} ${new Date(
//   el['0']
// ).toTimeString()}`;
