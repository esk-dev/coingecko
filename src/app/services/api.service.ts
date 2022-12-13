import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HistoricalData } from '../interfaces/historical-data';
import { CoinMarketData } from '../interfaces/coin-market-data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public fetchListCoinMarketData(
    page: number = 1
  ): Observable<CoinMarketData[]> {
    return this.http.get<CoinMarketData[]>(
      `${environment.API_BASE_URL}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
    );
  }

  public fetchCoinHistoricalData(
    id: string,
    days: number = 1,
    interval: string = 'hourly'
  ): Observable<HistoricalData> {
    return this.http.get<HistoricalData>(
      `${environment.API_BASE_URL}coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`
    );
  }
}
