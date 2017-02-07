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
import { Facebook, GooglePlus } from 'ionic-native';
import 'rxjs/add/operator/first';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';
export var AuthMode;
(function (AuthMode) {
    AuthMode[AuthMode["Facebook"] = 0] = "Facebook";
    AuthMode[AuthMode["GooglePlus"] = 1] = "GooglePlus";
    AuthMode[AuthMode["Github"] = 2] = "Github";
})(AuthMode || (AuthMode = {}));
;
export var AuthService = (function () {
    function AuthService(af, platform) {
        this.af = af;
        this.platform = platform;
    }
    AuthService.prototype.getAuth = function () {
        return this.af.auth;
    };
    AuthService.prototype.login = function (mode) {
        if (mode == AuthMode.GooglePlus)
            return this.signInWithGoogle();
        if (mode == AuthMode.Facebook)
            return this.signInWithFacebook();
        if (mode == AuthMode.Github)
            return this.signInWithGithub();
    };
    AuthService.prototype.loginUser = function (newEmail, newPassword) {
        console.log("loginUser");
        return this.af.auth.login({ email: newEmail, password: newPassword }, { provider: AuthProviders.Password, method: AuthMethods.Password });
    };
    /**
     * sign in wiht google+
     */
    AuthService.prototype.signInWithGoogle = function () {
        var _this = this;
        if (!this.platform.is('cordova'))
            return this.signInWithProvider(AuthProviders.Google);
        return GooglePlus.login({
            'scopes': 'email profile',
            'webClientId': '468979984175-0v2kjc7nbh6j36286v61r54cingqa248.apps.googleusercontent.com'
        }).then(function (res) {
            return _this.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
        }, function (error) { return Promise.reject(error); });
    };
    /**
     * sign in with facebook
     */
    AuthService.prototype.signInWithFacebook = function () {
        var _this = this;
        if (!this.platform.is('cordova'))
            return this.signInWithProvider(AuthProviders.Facebook);
        return Facebook.login(['email', 'public_profile'])
            .then(function (res) {
            return _this.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
        }, function (error) { return Promise.reject(error); });
    };
    /**
     * sign in with github
     */
    AuthService.prototype.signInWithGithub = function () {
        return this.signInWithProvider(AuthProviders.Github);
    };
    AuthService.prototype.signInWithProvider = function (provider, method) {
        if (method === void 0) { method = AuthMethods.Popup; }
        return this.af.auth.login({ provider: provider, method: method });
    };
    AuthService.prototype.signInWithCredential = function (credential) {
        return firebase.auth().signInWithCredential(credential);
    };
    AuthService.prototype.createAccount = function (data) {
        return this.af.database.object('users/' + data.uid).set({
            uid: data.auth.uid,
            email: data.auth.email,
            displayName: data.auth.displayName,
            photoURL: data.auth.photoURL,
            createdAt: firebase.database['ServerValue']['TIMESTAMP'],
            providerData: data.auth.providerData[0]
        });
    };
    AuthService.prototype.logout = function () {
        this.af.auth.logout();
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
    AuthService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [AngularFire, Platform])
    ], AuthService);
    return AuthService;
}());
//# sourceMappingURL=auth.service.js.map