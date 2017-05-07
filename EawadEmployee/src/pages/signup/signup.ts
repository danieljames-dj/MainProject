import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { Login } from '../login/login';
import { EmailValidator } from '../../validators/email';
import { CountForm } from '../count-form/count-form';
import { Storage } from '@ionic/storage';
import { Global } from '../../services/global/global';
import { ApiService } from '../../providers/api-service';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  public signupForm;
  loading;

  constructor(public nav: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, public rest:ApiService, public global: Global) {
  	this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: [],
      contact: [],
      salary: []
    });
    console.log("GLOBAL", this.global.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
      	console.log(this.signupForm.value.contact, this.signupForm.value.name);
      	var loading = this.loading;
      	var nav = this.nav;
      	var obj = {"uid": "", "name": "", "email": "", "contact": "", "salary": ""};
      	obj.uid = this.global.user.uid;
      	obj.name = this.signupForm.value.name;
      	obj.contact = this.signupForm.value.contact;
      	obj.email = this.signupForm.value.email;
        obj.salary = this.signupForm.value.salary;
      	var xhttp = new XMLHttpRequest();
        var authData = this.authData;
	    xhttp.open("POST", this.global.apiUrl + "registerEmployee", true);
	    xhttp.onload = function() {
	    	var json = JSON.parse(xhttp.responseText);
	    	console.log(json);
        authData.logoutUser().then( authData => {
          loading.dismiss();
          alert("Registered, waiting for approval");
          nav.setRoot(Login);
        });
	    }
	    xhttp.setRequestHeader('Content-Type', 'application/json');
	    console.log("PBJJ", obj);
	    xhttp.send(JSON.stringify(obj));
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({});
      this.loading.present();
    }
  }

}
