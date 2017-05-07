import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { Signup } from '../pages/signup/signup';
import { MyProfile } from '../pages/my-profile/my-profile';
import { TariffRates } from '../pages/tariff-rates/tariff-rates';

import { AuthData } from '../providers/auth-data';
import { HttpModule } from '@angular/http';
import { ApiService } from '../providers/api-service';
import { Global } from '../services/global/global';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const firebaseConfig = {
  apiKey: "AIzaSyDGO7z5mk145BHoZ9A1rzhQ8kiNJlRO5qc",
  authDomain: "eawadadmin-5bff2.firebaseapp.com",
  databaseURL: "https://eawadadmin-5bff2.firebaseio.com",
  projectId: "eawadadmin-5bff2",
  storageBucket: "eawadadmin-5bff2.appspot.com",
  messagingSenderId: "943317998398"
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
    MyProfile,
    TariffRates
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
    MyProfile,
    TariffRates
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
