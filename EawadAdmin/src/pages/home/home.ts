import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Global } from '../../services/global/global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  employees: [{}];

  constructor(public navCtrl: NavController, public global: Global) {
  	this.employees = [{eid:12,name:"AC",email:"23",contact:"23",salary:0.0,regStat:0}];
  }

  ionViewDidLoad() {
    var xhttp = new XMLHttpRequest();
    var itemsCache = this.employees;
    // console.log(this.items);
    xhttp.open("POST", this.global.apiUrl + 'getEmployees', true);
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

  update(key) {
  	console.log(key);
  	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", this.global.apiUrl + 'updateEmployee', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(key));
  }

}
