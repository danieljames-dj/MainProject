import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { CountForm } from '../count-form/count-form';
import { Storage } from '@ionic/storage';

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
    public alertCtrl: AlertController) {
  	this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
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
      	this.nav.insert(0, HomePage);
      	this.nav.popToRoot();
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

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
