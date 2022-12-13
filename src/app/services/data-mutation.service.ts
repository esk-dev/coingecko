import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HistoricalData } from '../interfaces/historical-data';
import { ChartData } from '../interfaces/chart-data';
@Injectable({
  providedIn: 'root',
})
export class DataMutationService {
  public coinHistoricalDataMutation(
    response: Observable<HistoricalData>
  ): Observable<ChartData> {
    return response.pipe(
      map((res: HistoricalData) => ({
        dates: res.prices.map((el: number[]) => {
          return el[0];
        }),
        prices: res.prices.map((el: number[]) => el[1]),
        caps: res.market_caps.map((el: number[]) => el[1]),
      }))
    );
  }
}
