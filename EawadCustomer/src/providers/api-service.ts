import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let apiUrl = 'http://127.0.0.1:8081/';
@Injectable()
export class ApiService {

	data : any;

  constructor(public http: Http) {
    console.log('Hello ApiService Provider');
    this.data = {username: '', response: ''};

    this.http = http;
  }

  registerUser(name, email) {
  	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", apiUrl + "registerUser", true);
    xhttp.onload = function() {
    	var json = JSON.parse(xhttp.responseText);
    	console.log(json);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send('{' + '"name":"' + name + '","email":"' + email + '"}');
  }

}
