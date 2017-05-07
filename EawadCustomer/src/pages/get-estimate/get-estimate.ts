import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../../providers/location-tracker';
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

  map: any;
  obj: any;

  items: [{itemID:12,itemName:"AC",rate:"23",count:0}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global, public locationTracker: LocationTracker) {
  	this.items = [{itemID:12,itemName:"AC",rate:"23",count:0}];
    this.loadMap();
    this.obj = {coords: {lat:2, lng: 3}};
    this.map = { lat: 20.5937, lng:  78.9629, zoom: 15, markerDraggable: true };
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
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", this.global.apiUrl + 'bookPickup', true);
    var locationTracker = this.locationTracker;
    var navCtrl = this.navCtrl;
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        if (json.success) {
          alert("Booked at location " + locationTracker.lat + " " + locationTracker.lng);
          navCtrl.setRoot(HomePage);
        } else {
          alert("No pickup available");
          navCtrl.setRoot(HomePage);
        }
    }
    var itemsCache = this.items;
    var getTotal = function() {
      var total = 0;
      for (var i = 0; i < itemsCache.length; i++) {
        total += itemsCache[i].count * parseInt(itemsCache[i].rate);
      }
      return total;
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var newJSON = {"uid": this.global.user.uid, "lat": locationTracker.lat, "lng": locationTracker.lng, "amt": getTotal()};
    xhttp.send(JSON.stringify(newJSON));
  }

  markerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event);
    this.obj = $event;
    this.locationTracker.lat = this.obj.coords.lat;
    this.locationTracker.lng = this.obj.coords.lng;
  }

  loadMap() {
    var mapCache = this.map;
    this.locationTracker.lat = 20.5937;
    this.locationTracker.lng = 78.9629;
  }

  showLoc() {
    console.log(this.map);
    this.locationTracker.startTracking();
    this.map.lat = this.locationTracker.lat;
    this.map.lng = this.locationTracker.lng;
    console.log(this.locationTracker.lat);
    console.log(this.locationTracker.lng);
    // this.locationTracker.stopTracking();
  }

}
