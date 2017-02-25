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
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import firebase from 'firebase';
/*
  Generated class for the AddProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AddProductPage = (function () {
    function AddProductPage(navCtrl, navParams, af, formBuilder, authService, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.af = af;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.actionSheetCtrl = actionSheetCtrl;
        this.lastImage = null;
        this.productImage = null;
        this.productImageURL = "/assets/img/noimage.png";
        this.mrateTrue = null;
        this.krateTrue = null;
        this.category = navParams.get("category");
        this.currentuser = firebase.auth().currentUser;
        //this.cattitle = this.category.title + " ";
        this.products = af.database.list('/products');
        this.userProducts = af.database.list('/users/' + this.currentuser.uid + '/products');
        this.productImageRef = firebase.storage().ref('/productImages/');
        //this.catDetails = this.af.database.object('productcategories/' + this.catid);
        this.productForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            finish: ['', Validators.required],
            thickness: ['', Validators.required],
            width: ['', Validators.required],
            length: ['', Validators.required],
            weight: ['', Validators.required],
            nos: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            composition: ['', Validators.required],
            origin: ['', Validators.required],
            brand: ['', Validators.required],
            uid: ['', Validators.required],
        });
    }
    AddProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddProductPage');
        console.log(this.currentuser.uid);
    };
    AddProductPage.prototype.submitProduct = function () {
        var _this = this;
        if (!this.productForm.valid) {
            console.log("invalid");
        }
        else {
            if ((this.productForm.value.mrate == null && this.productForm.value.krate == null) || ((this.productForm.value.mrate === "" && (this.productForm.value.krate === "" || this.productForm.value.krate === null)) || (this.productForm.value.krate === "" && (this.productForm.value.mrate === "" || this.productForm.value.mrate === null)))) {
                console.log("Enter either price");
            }
            else {
                console.log(this.productForm.value);
                this.products.push(this.productForm.value).then(function (data) {
                    if (_this.productImage != null) {
                        _this.productImageRef.child(data.key).child('productImage.png')
                            .putString(_this.productImage, 'base64', { contentType: 'image/png' })
                            .then(function (savedPicture) {
                            /**this.eventList.child(eventId).child('guestList').child(newGuest.key)
                                .child('profilePicture')
                                .set(savedPicture.downloadURL);**/
                            _this.productImageURL = savedPicture.downloadURL;
                        });
                    }
                    _this.af.database.object('products/' + data.key).update({
                        islive: true,
                        productImage: _this.productImageURL
                    });
                    _this.af.database.object('users/' + _this.currentuser.uid + '/products/' + data.key).set({
                        islive: true,
                        name: _this.productForm.value.name,
                        grade: _this.productForm.value.grade,
                        mrate: _this.productForm.value.mrate,
                        krate: _this.productForm.value.krate,
                        productImage: _this.productImageURL
                    }).then(function (info) {
                        console.log("success");
                        _this.navCtrl.pop();
                        _this.navCtrl.pop();
                    });
                });
            }
        }
    };
    AddProductPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        //this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                        _this.getPicture();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        //this.takePicture(Camera.PictureSourceType.CAMERA);
                        _this.takePicture();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    AddProductPage.prototype.takePicture = function () {
        var _this = this;
        Camera.getPicture({
            quality: 95,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            _this.productImage = imageData;
            //console.log(this.productImage);
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    AddProductPage.prototype.getPicture = function () {
        var _this = this;
        Camera.getPicture({
            quality: 95,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(function (imageData) {
            _this.productImage = imageData;
            //console.log(this.productImage);
        }, function (error) {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    };
    return AddProductPage;
}());
AddProductPage = __decorate([
    Component({
        selector: 'page-add-product',
        templateUrl: 'add-product.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, FormBuilder, AuthService, ActionSheetController])
], AddProductPage);
export { AddProductPage };
//# sourceMappingURL=add-product.js.map