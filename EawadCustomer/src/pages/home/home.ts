import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetEstimate } from '../get-estimate/get-estimate';
import { Global } from '../../services/global/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	pickupDetails: any;

  constructor(public navCtrl: NavController, public global: Global) {
  	this.pickupDetails = {"status":false}
  }

  bookPickup() {
  	if (this.pickupDetails.status == false)
  		this.navCtrl.push(GetEstimate);
  	else {
  		var xhttp = new XMLHttpRequest();
	    xhttp.open("POST", this.global.apiUrl + 'cancelPickup', true);
	    var nav = this.navCtrl;
	    var pickupDetails = this.pickupDetails;
	    xhttp.onload = function() {
	        var json = JSON.parse(xhttp.responseText);
	        console.log(json);
	        if (json.success) {
	        	alert('Success');
	        	pickupDetails.status = false;
	        	nav.setRoot(nav.getActive().component);
	        } else {
	        	alert('Failed');
	        	nav.setRoot(nav.getActive().component);
	        }
	    }
	    xhttp.setRequestHeader('Content-Type', 'application/json');
	    var obj = {"uid":"","eid":""};
	    obj.uid = this.global.user.uid;
	    xhttp.send(JSON.stringify(obj));
  	}
  }

  ionViewDidLoad() {
  	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", this.global.apiUrl + 'getPickupDetailsUser', true);
    var pickupDetails = this.pickupDetails;
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        console.log(json);
        pickupDetails.status = json.success;
        if (json.success) {
        	document.getElementById('free').innerHTML = 'Cancel Pickup';
        	document.getElementById('h5').innerHTML = `<u>Contact Details of Employee</u><br/>Name: ` + json.row.ename
        	+ `<br/>Contact: ` + json.row.econ
        	+ `<br/>Estimate Amount: ` + json.row.amt;
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var obj = {"uid":"","eid":""};
    obj.uid = this.global.user.uid;
    xhttp.send(JSON.stringify(obj));
    console.log("Waiting for res");
  }

}
