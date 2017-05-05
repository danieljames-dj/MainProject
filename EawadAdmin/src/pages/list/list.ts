import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';
import { MyProfile } from '../my-profile/my-profile';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global) {
    this.items = [{itemID:12,itemName:"AC",rate:"23"}];
  }

  ionViewDidLoad() {
    var xhttp = new XMLHttpRequest();
    var itemsCache = this.items;
    console.log(this.items);
    xhttp.open("POST", this.global.apiUrl + 'getItems', true);
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
    console.log("HO");
  }

  addItem() {
    this.global.itemPageId = -1;
    this.global.itemName = "";
    this.global.rate = "";
    this.navCtrl.push(MyProfile);
    console.log("HI");
  }

  editItem(key) {
    this.global.itemPageId = parseInt(key.itemID);
    this.global.itemName = key.itemName;
    this.global.rate = key.rate;
    this.navCtrl.push(MyProfile);
  }

  deleteItem(key) {
    var xhttp = new XMLHttpRequest();
    var json = {"itemID": key.itemID};
    xhttp.open("POST", this.global.apiUrl + 'deleteItem', true);
    var nav = this.navCtrl;
    xhttp.onload = function() {
        nav.setRoot(nav.getActive().component);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(json));
    xhttp.send(JSON.stringify(json));
  }
}
