import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoinMarketData } from 'src/app/interfaces/coin-market-data';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public listCoinMarketData$!: Observable<CoinMarketData[]>;

  constructor(private route: Router, private apiService: ApiService) {}

  public loadCoinDataById(id: string) {
    this.route.navigate([id]);
  }

  ngOnInit(): void {
    this.listCoinMarketData$ = this.apiService.fetchListCoinMarketData();
  }
}
