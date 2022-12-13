import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChartData } from './interfaces/chart-data';
import { CoinMarketData } from './interfaces/coin-market-data';
import { ApiService } from './services/api.service';
import { DataMutationService } from './services/data-mutation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'coingecko';

  public listCoinMarketData$!: Observable<CoinMarketData[]>;

  public chartsData!: ChartData;

  constructor(
    private route: Router,
    private apiService: ApiService,
    private dataMutation: DataMutationService
  ) {}

  public loadCoinDataById(id: string) {
    this.route.navigate([id]);
  }

  ngOnInit(): void {
    this.listCoinMarketData$ = this.apiService.fetchListCoinMarketData();
  }
}

// this.dataMutation
//   .coinHistoricalDataMutation(this.apiService.fetchCoinHistoricalData(id))
//   .pipe(tap((res: ChartData) => console.log(res)));
