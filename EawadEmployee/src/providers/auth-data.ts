import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
import { Global } from '../services/global/global';

@Injectable()
export class AuthData {

  fireAuth: any;

  constructor(public af: AngularFire, public global: Global) {
  	af.auth.subscribe( user => {
        if (user) {
            this.fireAuth = user.auth;
            console.log(user);
            this.global.user = user;
        }
    });
  }

	loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
	    return this.af.auth.login({
	      email: newEmail,
	      password: newPassword
	    });
	  }

	  resetPassword(email: string): firebase.Promise<any> {
	    return firebase.auth().sendPasswordResetEmail(email);
	  }

	  logoutUser(): firebase.Promise<any> {
	    return this.af.auth.logout();
	  }

	  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
	    return this.af.auth.createUser({ 
	      email: newEmail, 
	      password: newPassword 
	    });
	  }

}
