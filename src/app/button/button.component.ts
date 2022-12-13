import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CoinMarketData } from '../interfaces/coin-market-data';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  public coin!: CoinMarketData;

  @Output()
  public queryCoinDataById = new EventEmitter<string>();

  public eventEmit(id: string) {
    this.queryCoinDataById.emit(id);
  }
}
