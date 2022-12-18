import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CoinMarketData } from 'src/app/interfaces/coin-market-data';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {
  @Input()
  public coin!: CoinMarketData;

  @Output()
  public queryCoinDataById = new EventEmitter<string>();

  public eventEmit(id: string) {
    this.queryCoinDataById.emit(id);
  }
}
