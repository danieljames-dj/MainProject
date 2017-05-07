import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyProfile } from '../my-profile/my-profile';
import { Global } from '../../services/global/global';

/**
 * Generated class for the Events page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class Events {

	items: [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global) {
  	this.items = [{itemID:12,itemName:"AC",rate:"23"}];
  }

  ionViewDidLoad() {
  	var xhttp = new XMLHttpRequest();
    var itemsCache = this.items;
    console.log(this.items);
    xhttp.open("POST", this.global.apiUrl + 'getEvents', true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        itemsCache.pop();
        for (var i = 0; i < json.rows.length; i++) {
          itemsCache.push(json.rows[i]);
        }
        console.log(itemsCache);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
    console.log('ionViewDidLoad Events');
  }

  addEvent() {
  	console.log("Add Event");
  	this.navCtrl.push(MyProfile);
  }

}
