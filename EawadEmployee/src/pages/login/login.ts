import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { Signup } from '../signup/signup';
import { ResetPassword } from '../reset-password/reset-password';
import { CountForm } from '../count-form/count-form';
import { Storage } from '@ionic/storage';
import { Global } from '../../services/global/global';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
   public loginForm: any;
  public loading: any;

  constructor(public navCtrl: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public global: Global) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }

    loginUser(){
      if (!this.loginForm.valid){
      	alert("Invalid Values")
        console.log(this.loginForm.value);
      } else {
        var nav = this.navCtrl;
        var global = this.global;
        var email = this.loginForm.value.email;
        var authDataCache = this.authData;
        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        var loading = this.loading;
        this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", global.apiUrl + 'approvedEmployee', true);
          xhttp.onload = function() {
            var json = JSON.parse(xhttp.responseText);
            if (json.success)
              nav.setRoot(HomePage);
            else {
              authDataCache.logoutUser().then( authData => {
                // loading.dismiss();
                alert("Waiting for approval");
                nav.setRoot(nav.getActive().component);
              });
            }
          }
          xhttp.setRequestHeader('Content-Type', 'application/json');
          xhttp.send('{"email":"' + email + '"}');
        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
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

        
        this.loading.present();
      }
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPassword);
  }

  createAccount(){
    this.navCtrl.push(Signup);
    console.log("HI");
  }

}