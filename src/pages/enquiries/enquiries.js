var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/*
  Generated class for the Enquiries page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EnquiriesPage = (function () {
    function EnquiriesPage(navCtrl, navParams, storage, loadingCtrl) {
        //storage.ready().then(() => {
        //storage.get('currentuser').then((val) => {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.currentuser = firebase.auth().currentUser;
        //this.currentuserid = this.currentuser.uid;
        this.segment = "received";
        //setTimeout(() => {
        this.setData();
        //},3000);
        //this.enquiryList = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
        //})
        //  .catch((err) =>
        //    console.log(err));
        //}).catch((err) =>
        //  console.log(err));     
    }
    EnquiriesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EnquiriesPage');
        this.segment = "received";
        var loading = this.loadingCtrl.create({
            content: 'Updating...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 1500);
    };
    EnquiriesPage.prototype.setData = function () {
        var _this = this;
        this.enquiryListref = firebase.database().ref('/users/' + this.currentuser.uid + '/enquiries').orderByChild("type").equalTo("received");
        //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
        //   query: {
        //       orderByChild: "type",
        //       equalTo: this.segment
        //   }
        //});
        this.enquiryListref.on('value', function (snapshot) {
            //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
            //query: {
            //    orderByChild: "type",
            //    equalTo: this.segment
            // }
            //});
            //console.log("received");
            //this.enqListRev = [];
            _this.enquiryList = [];
            _this.keys = [];
            snapshot.forEach(function (country) {
                _this.enquiryList.push(country.val());
                _this.keys.push(country.key);
            });
            for (var i in _this.enquiryList) {
                _this.enquiryList[i].key = _this.keys[i];
            }
            //this.enqListRev = this.enquiryList.reverse();
            _this.enqListRev = Observable.of(_this.enquiryList.reverse());
            console.log(_this.enqListRev);
            _this.flag = true;
        });
        this.sentListref = firebase.database().ref('/users/' + this.currentuser.uid + '/enquiries').orderByChild("type").equalTo("sent");
        //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
        //   query: {
        //       orderByChild: "type",
        //       equalTo: this.segment
        //   }
        //});
        this.sentListref.on('value', function (snapshot) {
            //this.sentListRev = [];
            _this.sentList = [];
            _this.keys2 = [];
            snapshot.forEach(function (country) {
                //console.log(country.key);
                _this.sentList.push(country.val());
                _this.keys2.push(country.key);
            });
            for (var i in _this.sentList) {
                _this.sentList[i].key = _this.keys2[i];
            }
            //this.updateEnquiryList(2);
            _this.sentListRev = Observable.of(_this.sentList.reverse());
        });
    };
    EnquiriesPage.prototype.ionViewDidEnter = function () {
    };
    EnquiriesPage.prototype.openenquirypage = function (enquiry) {
        this.navCtrl.push(EnquiryDetailsPage, { enquiry: enquiry });
    };
    EnquiriesPage.prototype.updateEnquiryList = function (type) {
        if (type == 1) {
            this.enqListRev = this.enquiryList.reverse();
            this.enqListRev = Observable.of(this.enqListRev);
        }
        else if (type == 2) {
            this.sentListRev = this.sentList.reverse();
            this.sentListRev = Observable.of(this.sentList.reverse());
        }
    };
    return EnquiriesPage;
}());
EnquiriesPage = __decorate([
    Component({
        selector: 'page-enquiries',
        templateUrl: 'enquiries.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, LoadingController])
], EnquiriesPage);
export { EnquiriesPage };
//# sourceMappingURL=enquiries.js.map