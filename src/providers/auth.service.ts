import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook, GooglePlus } from 'ionic-native';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable'; 

import { AngularFire, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

export enum AuthMode {
  Facebook,
  GooglePlus,
  Github
};

@Injectable()
export class AuthService {
    constructor(public af: AngularFire, private platform: Platform) {}

  getAuth(): Observable<FirebaseAuthState> {
    return this.af.auth;
  }

  login(mode: AuthMode) {
     
    if (mode == AuthMode.GooglePlus)
      return this.signInWithGoogle();
    
    /**if (mode == AuthMode.Facebook)
      return this.signInWithFacebook();

    if (mode == AuthMode.Github)
      return this.signInWithGithub();**/
  }

  login2() {

      //if (mode == AuthMode.Facebook)
          return this.signInWithFacebook();

  }

  loginUser(newEmail: string, newPassword: string): any {
      console.log("loginUser");
      return this.af.auth.login({ email: newEmail, password: newPassword },
          { provider: AuthProviders.Password, method: AuthMethods.Password });
  }

  /**
   * sign in wiht google+
   */
  private signInWithGoogle() {
    if (!this.platform.is('cordova'))
      return this.signInWithProvider(AuthProviders.Google);
    
    return GooglePlus.login({
        'scopes': 'email profile',
        'webClientId': '468979984175-0v2kjc7nbh6j36286v61r54cingqa248.apps.googleusercontent.com'
      }).then( res => {
        return this.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
      }, (error) => Promise.reject(error));
  }

  /**
   * sign in with facebook
   */
  private signInWithFacebook() {
    if (!this.platform.is('cordova'))
      return this.signInWithProvider(AuthProviders.Facebook);
    
    Facebook.login(['email', 'public_profile'])
      .then(res => {
        return this.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
      }, (error) => Promise.reject(error));
  }

  /**
   * sign in with github
   */
  private signInWithGithub() {
    return this.signInWithProvider(AuthProviders.Github);
  }

  private signInWithProvider(provider: any, method: any = AuthMethods.Popup ) {
    return this.af.auth.login({ provider: provider, method: method })
  }

  private signInWithCredential(credential) {
    return firebase.auth().signInWithCredential(credential);
  }

  createAccount(data): firebase.Promise_Instance<void> {
    return this.af.database.object('users/' + data.uid).set(
        {
            uid         : data.auth.uid,
            email       : data.auth.email,
            name        : data.auth.displayName,
            photoURL    : data.auth.photoURL,
            createdAt   : firebase.database['ServerValue']['TIMESTAMP'],
            providerData: data.auth.providerData[0]
        });
  }

  createAccount2(authdata, userdata): firebase.Promise_Instance<void> {
      console.log(authdata.auth.uid, userdata.value.email, userdata.value.name);
      return this.af.database.object('users/' + authdata.uid).set(
          {
              name: userdata.value.name,
              mobile: userdata.value.mobile,
              companyname: userdata.value.companyname,
              email: userdata.value.email,
              uid: authdata.auth.uid,
              //photoURL: data.auth.photoURL,
              createdAt: firebase.database['ServerValue']['TIMESTAMP'],
              //providerData: authdata.auth.provider
             
          });
  }

  logout() {
    this.af.auth.logout();
  }

  resetPassword(email: string): any {
      return firebase.auth().sendPasswordResetEmail(email);
  }
  
  signupUser(newEmail: string, newPassword: string): any {
      return this.af.auth.createUser({ email: newEmail, password: newPassword });
  }
  get currentUser(): Observable<any> {
    return this.af.auth.first().map(user => user.auth);
  };

  getFullProfile(uid: string): Observable<any> {
    return this.af.database.object('users/' + uid);
  }
}
