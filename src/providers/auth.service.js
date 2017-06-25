var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/first';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';
export var AuthMode;
(function (AuthMode) {
    AuthMode[AuthMode["Facebook"] = 0] = "Facebook";
    AuthMode[AuthMode["GooglePlus"] = 1] = "GooglePlus";
})(AuthMode || (AuthMode = {}));
;
var AuthService = (function () {
    function AuthService(af, platform, storage, googlePlus, fb) {
        this.af = af;
        this.platform = platform;
        this.storage = storage;
        this.googlePlus = googlePlus;
        this.fb = fb;
    }
    AuthService.prototype.getAuth = function () {
        return this.af.auth;
    };
    AuthService.prototype.login = function (mode) {
        if (mode === AuthMode.GooglePlus) {
            if (!this.platform.is('cordova'))
                return this.signInWithProvider(AuthProviders.Google);
            return this.googlePlus.login({
                'scopes': 'email profile',
                'webClientId': '639273963235-levd0bsp6858tj6dcgovohs25ehpmmbd.apps.googleusercontent.com'
            }).then(function (res) {
                return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
            }).catch(function (error) { return Promise.reject(error); });
        }
        //return this.signInWithGoogle();
        /**if (mode == AuthMode.Facebook)
          return this.signInWithFacebook();
    
        if (mode == AuthMode.Github)
          return this.signInWithGithub();**/
    };
    AuthService.prototype.login2 = function () {
        //if (mode == AuthMode.Facebook)
        //return this.signInWithFacebook();
        if (!this.platform.is('cordova'))
            return this.signInWithProvider(AuthProviders.Facebook);
        this.fb.login(['email', 'public_profile'])
            .then(function (res) {
            firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
        }).catch(function (error) { return Promise.reject(error); });
    };
    AuthService.prototype.loginUser = function (newEmail, newPassword) {
        console.log("loginUser");
        return this.af.auth.login({ email: newEmail, password: newPassword }, { provider: AuthProviders.Password, method: AuthMethods.Password });
    };
    /**
     * sign in wiht google+
     
    private signInWithGoogle() {
        if (!this.platform.is('cordova'))
            return this.signInWithProvider(AuthProviders.Google);

        return this.googlePlus.login({
            'scopes': 'email profile',
            'webClientId': '639273963235-levd0bsp6858tj6dcgovohs25ehpmmbd.apps.googleusercontent.com'
        }).then(res => {
            return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
        }).catch((error) => Promise.reject(error));
    }*/
    /**
     * sign in with facebook
     
    private signInWithFacebook() {
        if (!this.platform.is('cordova'))
            return this.signInWithProvider(AuthProviders.Facebook);

        return this.fb.login(['email', 'public_profile'])
            .then((res: FacebookLoginResponse) => {
                return firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
            }).catch((error) => Promise.reject(error));
    }*/
    /**
     * sign in with github
     */
    AuthService.prototype.signInWithProvider = function (provider, method) {
        if (method === void 0) { method = AuthMethods.Popup; }
        return this.af.auth.login({ provider: provider, method: method });
    };
    //private signInWithCredential(credential) {
    //   return firebase.auth().signInWithCredential(credential);
    //}
    AuthService.prototype.createAccount = function (data) {
        return this.af.database.object('users/' + data.uid).set({
            uid: data.uid,
            email: data.email,
            name: data.displayName,
            photoURL: data.photoURL,
            createdAt: firebase.database['ServerValue']['TIMESTAMP'],
            providerData: data.providerData[0]
        });
    };
    AuthService.prototype.createAccount2 = function (authdata, userdata) {
        console.log(authdata.auth.uid, userdata.value.email, userdata.value.name);
        return this.af.database.object('users/' + authdata.uid).set({
            name: userdata.value.name,
            mobile: userdata.value.mobile,
            companyname: userdata.value.companyname,
            email: userdata.value.email,
            uid: authdata.auth.uid,
            //photoURL: data.auth.photoURL,
            createdAt: firebase.database['ServerValue']['TIMESTAMP'],
            profiledone: true,
            isApproved: false
            //providerData: authdata.auth.provider
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.remove('currentuser').then(function (val) {
                _this.af.auth.logout();
                //this.enquiryList = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
            })
                .catch(function (err) {
                return console.log(err);
            });
        }).catch(function (err) {
            return console.log(err);
        });
    };
    AuthService.prototype.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    AuthService.prototype.signupUser = function (newEmail, newPassword) {
        return this.af.auth.createUser({ email: newEmail, password: newPassword });
    };
    Object.defineProperty(AuthService.prototype, "currentUser", {
        get: function () {
            return this.af.auth.first().map(function (user) { return user.auth; });
        },
        enumerable: true,
        configurable: true
    });
    ;
    AuthService.prototype.getFullProfile = function (uid) {
        return this.af.database.object('users/' + uid);
    };
    AuthService.prototype.getEnquiry = function (uid, eqid) {
        return this.af.database.object('users/' + uid + '/enquiries/' + eqid);
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFire, Platform, Storage, GooglePlus, Facebook])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map