import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadLocation } from './upload-location';

@NgModule({
  declarations: [
    UploadLocation,
  ],
  imports: [
    IonicPageModule.forChild(UploadLocation),
  ],
  exports: [
    UploadLocation
  ]
})
export class UploadLocationModule {}
