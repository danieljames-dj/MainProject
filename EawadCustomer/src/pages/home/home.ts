import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetEstimate } from '../get-estimate/get-estimate';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  bookPickup() {
  	this.navCtrl.push(GetEstimate);
  }

}
