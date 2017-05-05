import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookPickup } from './book-pickup';

@NgModule({
  declarations: [
    BookPickup,
  ],
  imports: [
    IonicPageModule.forChild(BookPickup),
  ],
  exports: [
    BookPickup
  ]
})
export class BookPickupModule {}
