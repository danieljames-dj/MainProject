import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';
import { ListPage } from '../../pages/list/list';

/**
 * Generated class for the MyProfile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfile {

  itemName: any;
  rate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global) {
  	this.itemName = this.global.itemName;
  	this.rate = this.global.rate;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfile');
  }

  submit() {
  	console.log("Submit");
  	var api, json = {"itemID": this.global.itemPageId, "itemName": this.itemName, "rate": this.rate};
  	console.log(json);
  	if (this.global.itemPageId == -1) {
  		api = 'addItem';
  	} else {
  		api = 'editItem';
  	}
  	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", this.global.apiUrl + api, true);
    var nav = this.navCtrl;
    xhttp.onload = function() {
        nav.setRoot(ListPage);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(json));
    xhttp.send(JSON.stringify(json));
  }

}
