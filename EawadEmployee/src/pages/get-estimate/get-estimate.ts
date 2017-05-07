import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the GetEstimate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-get-estimate',
  templateUrl: 'get-estimate.html',
})
export class GetEstimate {

  items: [{itemID:12,itemName:"AC",rate:"23",count:0}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global) {
  	this.items = [{itemID:12,itemName:"AC",rate:"23",count:0}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetEstimate');
    var xhttp = new XMLHttpRequest();
    var itemsCache = this.items;
    console.log(this.items);
    xhttp.open("POST", this.global.apiUrl + 'getItems', true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        itemsCache.pop();
        for (var i = 0; i < json.rows.length; i++) {
        	json.rows[i].count = 0;
        	itemsCache.push(json.rows[i]);
        }
        console.log(itemsCache);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }

  getTotal() {
  	var total = 0;
  	for (var i = 0; i < this.items.length; i++) {
  		total += this.items[i].count * parseInt(this.items[i].rate);
  	}
  	return total;
  }

  bookPickup() {
  	console.log("HI", this.getTotal());
    var xhttp = new XMLHttpRequest();
    var nav = this.navCtrl;
    var amt = this.getTotal();
    var eid = this.global.user.uid;
    xhttp.open("POST", this.global.apiUrl + 'finishPickup', true);
    xhttp.onload = function() {
        nav.setRoot(HomePage);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var obj = {"amt": amt, "eid": eid};
    xhttp.send(JSON.stringify(obj));
  }

}
