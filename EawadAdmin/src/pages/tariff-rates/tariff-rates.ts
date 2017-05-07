import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';

/**
 * Generated class for the TariffRates page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tariff-rates',
  templateUrl: 'tariff-rates.html',
})
export class TariffRates {

  items: [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global) {
  	this.items = [{itemID:12,itemName:"AC",rate:"23",image:""}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TariffRates');
    var xhttp = new XMLHttpRequest();
    var itemsCache = this.items;
    console.log(this.items);
    var global = this.global;
    xhttp.open("POST", this.global.apiUrl + 'getImageList', true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        itemsCache.pop();
        for (var i = 0; i < json.rows.length; i++) {
        	itemsCache.push(json.rows[i]);
      //     var xhttp = new XMLHttpRequest();
		    // var fileID = json.rows[i].fileID;
		    // xhttp.open("POST", global.apiUrl + 'getImage', true);
		    // xhttp.onload = function() {
		    // 	var jsonNew = JSON.parse(xhttp.responseText);
		    // 	json.rows[i].image = jsonNew.image;
		    //     // document.getElementById('img0').src  = json.image;
		    //     itemsCache.push(json.rows[i]);
		    // }
		    // xhttp.setRequestHeader('Content-Type', 'application/json');
		    // xhttp.send('{"fileID":"' + json.rows[i].fileID + '"}');
        }
        console.log(itemsCache);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }

  getImage(key) {
  	
  }

}
