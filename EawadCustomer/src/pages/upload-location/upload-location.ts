import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../../providers/location-tracker';

/**
 * Generated class for the UploadLocation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-upload-location',
  templateUrl: 'upload-location.html',
})
export class UploadLocation {

	data: {"file": any, "uid":any, "lat":any, "lng":any};
  map: any;
  obj: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global, public locationTracker: LocationTracker) {
  	this.data = {"file": "", "uid": this.global.user.uid, "lat": 0.00, "lng": 0.00};
    this.loadMap();
    this.obj = {coords: {lat:2, lng: 3}};
    this.map = { lat: 20.5937, lng:  78.9629, zoom: 15, markerDraggable: true };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadLocation');
  }

  readFile(input, key) {
  	var dataCache = this.data;
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      dataCache.file = this.result;
      document.getElementById(key).innerHTML = `<img src="` + this.result + `" id="` + key + `">`;
    };
    var inputFile = (<HTMLInputElement>document.getElementById(key + 'ip')).files[0];
    if (inputFile) {
      document.getElementById(key + 'ip').style.visibility = 'hidden';
      document.getElementById(key + 'but').style.visibility = 'visible';
      fileReader.readAsDataURL(inputFile);
    }
  }

  removeFile(key) {
    this.data.file = undefined;
    document.getElementById(key + 'but').style.visibility = 'hidden';
    document.getElementById(key + 'ip').style.visibility = 'visible';
    document.getElementById(key).innerHTML = "";
    (<HTMLInputElement>document.getElementById(key + 'ip')).value = "";
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
    console.log(this.data);
    var xhttp = new XMLHttpRequest();
    var nav = this.navCtrl;
    xhttp.open("POST", this.global.apiUrl + 'uploadLocation', true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        if (json.success) {
          alert("Uploaded");
          nav.setRoot(nav.getActive().component);
        } else {
          alert("Failed");
          nav.setRoot(nav.getActive().component);
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(this.data));
  }

}
