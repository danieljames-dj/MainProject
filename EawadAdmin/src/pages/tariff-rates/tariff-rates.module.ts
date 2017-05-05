import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TariffRates } from './tariff-rates';

@NgModule({
  declarations: [
    TariffRates,
  ],
  imports: [
    IonicPageModule.forChild(TariffRates),
  ],
  exports: [
    TariffRates
  ]
})
export class TariffRatesModule {}
