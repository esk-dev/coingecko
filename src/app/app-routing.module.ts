import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    title: 'Coingecko',
    loadChildren: () =>
      import('./coins-page/coins-page.module').then((m) => m.CoinsPageModule),
  },
  {
    path: ':id',
    title: '',
    loadChildren: () =>
      import('./charts/charts.module').then((m) => m.ChartsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
