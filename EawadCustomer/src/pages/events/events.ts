import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  	this.items = [{evID:12,itemName:"AC",rate:"23",join:"0"}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Events');
    var xhttp = new XMLHttpRequest();
    var itemsCache = this.items;
    console.log(this.items);
    xhttp.open("POST", this.global.apiUrl + 'getEventsUser', true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        console.log(json);
        itemsCache.pop();
        for (var i = 0; i < json.rows.length; i++) {
          itemsCache.push(json.rows[i]);
        }
        console.log(itemsCache);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send('{"uid":"' + this.global.user.uid + '"}');
    console.log('ionViewDidLoad Events');
  }

  update(key) {
  	var xhttp = new XMLHttpRequest();
    var json = {"evID": key.evID,"uid": this.global.user.uid, "stat": key.join};
    xhttp.open("POST", this.global.apiUrl + 'updateEvents', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(json));
  }

}
