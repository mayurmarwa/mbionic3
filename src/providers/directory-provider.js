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
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
/*
  Generated class for the DirectoryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var DirectoryProvider = (function () {
    function DirectoryProvider(http) {
        this.http = http;
        console.log('Hello DirectoryProvider Provider');
        this.directoryRef = firebase.database().ref('/directory');
    }
    DirectoryProvider.prototype.setDirectory = function () {
        var _this = this;
        this.directoryRef.on('value', function (countryList) {
            var countries = [];
            countryList.forEach(function (country) {
                countries.push(country.val());
            });
            _this.directory = countries;
            //this.loadedlist = countries;
            //console.log("here", this.directory);
            //this.loadingPopup.dismiss();
        });
    };
    return DirectoryProvider;
}());
DirectoryProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DirectoryProvider);
export { DirectoryProvider };
//# sourceMappingURL=directory-provider.js.map