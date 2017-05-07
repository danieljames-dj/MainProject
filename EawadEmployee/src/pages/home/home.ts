import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetEstimate } from '../get-estimate/get-estimate';
import { Global } from '../../services/global/global';
import { LocationTracker } from '../../providers/location-tracker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  obj: {"status": number, "lat":any, "lng":any,"eid":any};
  map: any;
  objTest: any;

  constructor(public navCtrl: NavController, public global: Global, public locationTracker: LocationTracker) {
  	this.obj = {"status": 0, "lat": 0.00, "lng": 0.00, "eid": this.global.user.uid};
  	this.objTest = {coords: {lat:2, lng: 3}};
  	this.map = { lat: 20.5937, lng:  78.9629, zoom: 15, markerDraggable: true };
  	this.locationTracker.lat = 20.5937;
    this.locationTracker.lng = 78.9629;
  	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", this.global.apiUrl + 'getEmpStat', true);
    var obj = this.obj;
    var global = this.global;
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        console.log(json);
        if (json.success == true && json.stat == 1) {
        	document.getElementById('h5').innerHTML = 'Status: Ready';
        	document.getElementById('button').innerHTML = 'Not Ready';
        	obj.status = 1;
        } else if (json.success == true && json.stat == 0) {
        	var xhttp1 = new XMLHttpRequest();
		    xhttp1.open("POST", global.apiUrl + 'getPickupDetailsEmployee', true);
		    // var pickupDetails = this.pickupDetails;
		    xhttp1.onload = function() {
		        var json = JSON.parse(xhttp1.responseText);
		        console.log(json);
		        // pickupDetails.status = json.success;
		        if (json.success) {
		        	document.getElementById('h5').innerHTML = `Status: On Pickup<br/><u>Contact Details of Customer</u><br/>Name: ` + json.row.uname
		        	+ `<br/>Contact: ` + json.row.ucon
		        	+ `<br/>Estimate Amount: ` + json.row.amt;
		        	document.getElementById('button').innerHTML = 'Finish Pickup';
		        }
		    }
		    xhttp1.setRequestHeader('Content-Type', 'application/json');
		    var obj1 = {"uid":"","eid":""};
		    obj1.eid = global.user.uid;
		    xhttp1.send(JSON.stringify(obj1));
        	obj.status = 0;
        } else {
        	document.getElementById('h5').innerHTML = 'Status: Not Ready';
        	document.getElementById('button').innerHTML = 'Ready';
        	obj.status = -1;
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send('{"uid":"' + this.global.user.uid + '"}');
  }

  markerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event);
    this.objTest = $event;
    this.locationTracker.lat = this.objTest.coords.lat;
    this.locationTracker.lng = this.objTest.coords.lng;
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

  buttonAct() {
  	console.log("HII", this.obj.status);
  	if (this.obj.status == 1) {
  		document.getElementById('h5').innerHTML = 'Status: Not Ready';
    	document.getElementById('button').innerHTML = 'Ready';
    	this.obj.status = -1;
    	var xhttp = new XMLHttpRequest();
    	xhttp.open("POST", this.global.apiUrl + 'setEmpStat', true);
    	xhttp.setRequestHeader('Content-Type', 'application/json');
    	xhttp.send(JSON.stringify(this.obj));
  	} else if (this.obj.status == -1) {
  		document.getElementById('h5').innerHTML = 'Status: Ready';
    	document.getElementById('button').innerHTML = 'Not Ready';
    	this.obj.status = 1;
    	var xhttp = new XMLHttpRequest();
    	xhttp.open("POST", this.global.apiUrl + 'setEmpStat', true);
    	xhttp.setRequestHeader('Content-Type', 'application/json');
    	xhttp.send(JSON.stringify(this.obj));
  	} else {
  		this.navCtrl.push(GetEstimate);
  	}
  }

  updateData() {
  	this.obj.lat = this.locationTracker.lat;
  	this.obj.lng = this.locationTracker.lng;
  	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", this.global.apiUrl + 'setEmpStat', true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(JSON.stringify(this.obj));
  }

}