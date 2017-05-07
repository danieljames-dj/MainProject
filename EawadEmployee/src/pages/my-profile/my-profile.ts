import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';
import { LocationTracker } from '../../providers/location-tracker';
import { Events } from '../events/events';

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

	data: {"details": any, "uid":any, "lat":any, "lng":any};
	map: any;
	obj: any;

	eventDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global, public locationTracker: LocationTracker) {
  	this.data = {"details": "", "uid": this.global.user.uid, "lat": 0.00, "lng": 0.00};
    this.loadMap();
    this.obj = {coords: {lat:2, lng: 3}};
    this.map = { lat: 20.5937, lng:  78.9629, zoom: 15, markerDraggable: true };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfile');
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

  updateData() {
    this.data.lat = this.locationTracker.lat;
    this.data.lng = this.locationTracker.lng;
    this.data.details = this.eventDetails;
    console.log(this.data);
    var xhttp = new XMLHttpRequest();
    var nav = this.navCtrl;
    xhttp.open("POST", this.global.apiUrl + 'addEvent', true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        if (json.success) {
          alert("Added");
          nav.setRoot(Events);
        } else {
          alert("Failed");
          nav.setRoot(Events);
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log(this.data);
    xhttp.send(JSON.stringify(this.data));
  }

  submit() {
  	console.log(this.eventDetails);
  }

}
