import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';
import { BookPickup } from '../pages/book-pickup/book-pickup';
import { Events } from '../pages/events/events';
import { MyProfile } from '../pages/my-profile/my-profile';
import { TariffRates } from '../pages/tariff-rates/tariff-rates';
import { UploadLocation } from '../pages/upload-location/upload-location';
import { GetEstimate } from '../pages/get-estimate/get-estimate';

import { AuthData } from '../providers/auth-data';
import { HttpModule } from '@angular/http';
import { ApiService } from '../providers/api-service';
import { Global } from '../services/global/global';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const firebaseConfig = {
  apiKey: "AIzaSyBXU9O4oXPrBAypY-Fg1VBk8O9n5DrhYe4",
  authDomain: "eawad-bab16.firebaseapp.com",
  databaseURL: "https://eawad-bab16.firebaseio.com",
  projectId: "eawad-bab16",
  storageBucket: "eawad-bab16.appspot.com",
  messagingSenderId: "123170494584"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    ResetPassword,
    Signup,
    BookPickup,
    Events,
    MyProfile,
    TariffRates,
    UploadLocation,
    GetEstimate
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    ResetPassword,
    Signup,
    BookPickup,
    Events,
    MyProfile,
    TariffRates,
    UploadLocation,
    GetEstimate
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService, AuthData,
    Global
  ]
})
export class AppModule {}
