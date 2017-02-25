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
import 'rxjs/add/operator/map';
import firebase from 'firebase';
/*
  Generated class for the ProfileData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ProfileData = (function () {
    function ProfileData() {
        /**
        * Here we create the references I told you about 2 seconds ago ??
        */
        this.currentUser = firebase.auth().currentUser;
        this.userProfile = firebase.database().ref('/users');
    }
    /**
    * This one should be really easy to follow, we are calling a function getUserProfile() that takes no parameters.
    * This function returns a DATABASE reference to the userProfile/uid of the current user
    * and we'll use it to get the user profile info in our page.
    */
    ProfileData.prototype.getUserProfile = function () {
        console.log(this.currentUser.uid);
        return this.userProfile.child(this.currentUser.uid);
    };
    /**
    * This one takes 2 string parameters, firstName & lastName, it just saves those 2 to the userProfile/uid node
    * for the current user as the firstName & lastName properties.
    */
    ProfileData.prototype.updateName = function (Name) {
        return this.userProfile.child(this.currentUser.uid).update({
            name: Name,
        });
    };
    ProfileData.prototype.updateCompanyName = function (Name) {
        return this.userProfile.child(this.currentUser.uid).update({
            companyname: Name,
        });
    };
    ProfileData.prototype.updateAddress = function (Address) {
        return this.userProfile.child(this.currentUser.uid).update({
            address: Address,
        });
    };
    ProfileData.prototype.updateCompanyProfile = function (Profile) {
        return this.userProfile.child(this.currentUser.uid).update({
            companyprofile: Profile,
        });
    };
    ProfileData.prototype.updateMobile = function (Mobile) {
        return this.userProfile.child(this.currentUser.uid).update({
            mobile: Mobile,
        });
    };
    /**
    * Pretty much the same as before, just that instead of saving the name it's saving the date of birth
    */
    /**updateDOB(birthDate: string): any {
        return this.userProfile.child(this.currentUser.uid).update({
            birthDate: birthDate,
        });
    }
    */
    /**
    * This is were things get trickier, this one is taking the user's email and first it's calling the
    * this.currentUser auth reference to call it's updateEmail() function, it's very important that you
    * understand that this is changing your email in the AUTH portion of firebase, the one stored in the
    * userProfile/uid node hasn't changed.
    * After it successfully changes your email in the AUTH portion of firebase it updates your email in the
    * real time database in the userProfile/uid node.
    */
    ProfileData.prototype.updateEmail = function (newEmail) {
        var _this = this;
        this.currentUser.updateEmail(newEmail).then(function () {
            _this.userProfile.child(_this.currentUser.uid).update({
                email: newEmail
            });
        }, function (error) {
            console.log(error);
        });
    };
    /**
    * Just like before this is changing the user's password, but remember,
    * this has nothing to do with the database this is the AUTH portion of
    * Firebase.
    */
    ProfileData.prototype.updatePassword = function (newPassword) {
        this.currentUser.updatePassword(newPassword).then(function () {
            console.log("Password Changed");
        }, function (error) {
            console.log(error);
        });
    };
    return ProfileData;
}());
ProfileData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ProfileData);
export { ProfileData };
//# sourceMappingURL=profile-data.js.map