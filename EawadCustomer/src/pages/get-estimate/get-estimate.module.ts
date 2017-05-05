import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetEstimate } from './get-estimate';

@NgModule({
  declarations: [
    GetEstimate,
  ],
  imports: [
    IonicPageModule.forChild(GetEstimate),
  ],
  exports: [
    GetEstimate
  ]
})
export class GetEstimateModule {}
